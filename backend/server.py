from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Yashwanth A L Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Serve static files (for resume downloads)
app.mount("/static", StaticFiles(directory=ROOT_DIR / "static"), name="static")

# Portfolio Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=1000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Full name")
    email: EmailStr = Field(..., description="Valid email address")
    message: str = Field(..., min_length=1, max_length=1000, description="Message content")

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    id: str

# Legacy models (keep for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Portfolio API Routes
@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(submission: ContactSubmissionCreate):
    """
    Submit contact form data to the portfolio
    """
    try:
        # Create contact submission object
        contact_obj = ContactSubmission(**submission.dict())
        
        # Insert into MongoDB
        result = await db.contact_submissions.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            logging.info(f"Contact form submitted successfully: {contact_obj.id}")
            return ContactSubmissionResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon.",
                id=contact_obj.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact submission")
            
    except Exception as e:
        logging.error(f"Contact form submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact/submissions")
async def get_contact_submissions(limit: int = 50):
    """
    Get all contact form submissions (for admin use)
    """
    try:
        submissions = await db.contact_submissions.find().sort("timestamp", -1).limit(limit).to_list(limit)
        
        # Remove MongoDB ObjectId fields to avoid JSON serialization issues
        for submission in submissions:
            if '_id' in submission:
                del submission['_id']
        
        return {
            "success": True,
            "submissions": submissions,
            "count": len(submissions)
        }
    except Exception as e:
        logging.error(f"Error fetching submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")

@api_router.get("/resume/download")
async def download_resume():
    """
    Download resume PDF file
    """
    resume_path = ROOT_DIR / "static" / "resume.pdf"
    
    if not resume_path.exists():
        # Create placeholder resume file
        resume_path.parent.mkdir(exist_ok=True)
        with open(resume_path, "w") as f:
            f.write("Resume placeholder - replace with actual PDF file")
        
        raise HTTPException(
            status_code=404, 
            detail="Resume not available yet. Please check back later."
        )
    
    return FileResponse(
        path=resume_path,
        filename="Yashwanth_AL_Resume.pdf",
        media_type="application/pdf"
    )

# Health check and legacy routes
@api_router.get("/")
async def root():
    """
    API Health Check
    """
    return {
        "message": "Yashwanth A L Portfolio API",
        "status": "online",
        "version": "1.0.0"
    }

@api_router.get("/health")
async def health_check():
    """
    Detailed health check including database connectivity
    """
    try:
        # Test database connection
        await db.list_collection_names()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "api_status": "online",
        "database_status": db_status,
        "timestamp": datetime.utcnow().isoformat()
    }

# Legacy routes (keep for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
