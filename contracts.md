# Portfolio Website - Frontend & Backend Integration Contracts

## Overview
This document defines the API contracts between the React frontend and FastAPI backend for Yashwanth A L's portfolio website.

## Current Mock Data Structure
The frontend currently uses mock data from `/src/data/mock.js` containing:
- Personal information (name, contact, social links)
- Education timeline
- Professional experience
- Projects showcase
- Skills categorization
- Achievements and certificates

## API Endpoints to Implement

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`
**Purpose:** Store contact form submissions in MongoDB

**Request Body:**
```json
{
  "name": "string",
  "email": "string (email format)",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "mongodb_document_id"
}
```

**MongoDB Collection:** `contact_submissions`
**Document Structure:**
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "message": "string",
  "timestamp": "datetime",
  "status": "new" // for future admin panel
}
```

### 2. Portfolio Data Endpoints (Future Enhancement)
These endpoints will replace mock data when dynamic content management is needed:

**GET /api/profile** - Personal information
**GET /api/education** - Education timeline
**GET /api/experience** - Professional experience
**GET /api/projects** - Projects showcase
**GET /api/skills** - Skills data
**GET /api/achievements** - Achievements and certificates

## Frontend Integration Changes

### Contact Form Component
**File:** `/src/components/Contact.js`
**Changes Required:**
1. Replace mock form submission with actual API call
2. Add proper error handling for API failures
3. Update success/loading states based on API response

**Current Mock Code to Replace:**
```javascript
// Remove this mock timeout simulation
setTimeout(() => {
  setIsSubmitting(false);
  setIsSubmitted(true);
  // ...
}, 1500);
```

**Replace With:**
```javascript
const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
if (response.data.success) {
  setIsSubmitted(true);
  setFormData({ name: '', email: '', message: '' });
}
```

### Resume Download Feature
**Current:** Placeholder button
**Backend Implementation:** 
- Store resume file in `/backend/static/resume.pdf`
- Add endpoint `GET /api/resume/download` 
- Return file as download response

## Environment Variables
**Backend (.env):**
- `MONGO_URL` - Already configured
- `DB_NAME` - Already configured

**Frontend (.env):**
- `REACT_APP_BACKEND_URL` - Already configured

## Error Handling Strategy
1. **Network Errors:** Show user-friendly message, allow retry
2. **Validation Errors:** Display field-specific error messages
3. **Server Errors:** Log for debugging, show generic error to user

## Data Validation
**Backend Validation:**
- Email format validation using Pydantic
- Required field validation
- Message length limits (max 1000 characters)
- Name length limits (max 100 characters)

**Frontend Validation:**
- HTML5 form validation (already implemented)
- Additional client-side validation for better UX

## Future Enhancements
1. **Admin Panel:** CRUD operations for all portfolio data
2. **File Upload:** Resume and project image uploads
3. **Analytics:** Track form submissions and page views
4. **Email Integration:** Send notification emails on form submission

## Implementation Priority
1. ✅ Frontend with mock data (COMPLETED)
2. 🔄 Contact form backend API (NEXT)
3. 🔄 Frontend-backend integration (NEXT)
4. 🔄 Resume download functionality
5. ⏳ Future: Dynamic content management APIs

## Testing Strategy
1. **Backend API Testing:** Use testing agent to verify all endpoints
2. **Frontend Integration Testing:** Verify form submissions work end-to-end
3. **Error Scenario Testing:** Network failures, validation errors, server errors
4. **Cross-browser Testing:** Ensure compatibility across browsers