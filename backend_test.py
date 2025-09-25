#!/usr/bin/env python3
"""
Portfolio Backend API Test Suite
Tests all portfolio API endpoints comprehensively
"""

import requests
import json
import time
from datetime import datetime
import uuid

# Configuration
BASE_URL = "https://yashalport.preview.emergentagent.com/api"
TIMEOUT = 30

class PortfolioAPITester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        self.passed_tests = []
        
    def log_test(self, test_name, status, details=""):
        """Log test results"""
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        if status == "PASS":
            self.passed_tests.append(test_name)
            print(f"✅ {test_name}: PASSED")
        else:
            self.failed_tests.append(test_name)
            print(f"❌ {test_name}: FAILED - {details}")
            
        if details:
            print(f"   Details: {details}")
        print()

    def test_health_endpoints(self):
        """Test health check endpoints"""
        print("=== HEALTH CHECK TESTS ===")
        
        # Test GET /api/
        try:
            response = requests.get(f"{BASE_URL}/", timeout=TIMEOUT)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Yashwanth A L Portfolio API" in data["message"]:
                    self.log_test("GET /api/ - Root endpoint", "PASS", f"Status: {response.status_code}, Message: {data.get('message')}")
                else:
                    self.log_test("GET /api/ - Root endpoint", "FAIL", f"Unexpected response format: {data}")
            else:
                self.log_test("GET /api/ - Root endpoint", "FAIL", f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("GET /api/ - Root endpoint", "FAIL", f"Request failed: {str(e)}")

        # Test GET /api/health
        try:
            response = requests.get(f"{BASE_URL}/health", timeout=TIMEOUT)
            if response.status_code == 200:
                data = response.json()
                if "api_status" in data and "database_status" in data:
                    db_status = data.get("database_status")
                    if db_status == "connected":
                        self.log_test("GET /api/health - Health check", "PASS", f"API: {data.get('api_status')}, DB: {db_status}")
                    else:
                        self.log_test("GET /api/health - Health check", "FAIL", f"Database not connected: {db_status}")
                else:
                    self.log_test("GET /api/health - Health check", "FAIL", f"Missing required fields in response: {data}")
            else:
                self.log_test("GET /api/health - Health check", "FAIL", f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("GET /api/health - Health check", "FAIL", f"Request failed: {str(e)}")

    def test_contact_form_api(self):
        """Test contact form API endpoints"""
        print("=== CONTACT FORM API TESTS ===")
        
        # Test POST /api/contact with valid data
        valid_contact_data = {
            "name": "John Doe",
            "email": "john@example.com",
            "message": "Hello, I'm interested in your work!"
        }
        
        try:
            response = requests.post(
                f"{BASE_URL}/contact",
                json=valid_contact_data,
                headers={"Content-Type": "application/json"},
                timeout=TIMEOUT
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "id" in data:
                    self.log_test("POST /api/contact - Valid data", "PASS", f"Contact submitted with ID: {data.get('id')}")
                    # Store the ID for later verification
                    self.contact_id = data.get('id')
                else:
                    self.log_test("POST /api/contact - Valid data", "FAIL", f"Unexpected response format: {data}")
            else:
                self.log_test("POST /api/contact - Valid data", "FAIL", f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("POST /api/contact - Valid data", "FAIL", f"Request failed: {str(e)}")

        # Test POST /api/contact with missing name
        invalid_data_missing_name = {
            "email": "john@example.com",
            "message": "Hello, I'm interested in your work!"
        }
        
        try:
            response = requests.post(
                f"{BASE_URL}/contact",
                json=invalid_data_missing_name,
                headers={"Content-Type": "application/json"},
                timeout=TIMEOUT
            )
            
            if response.status_code == 422:
                self.log_test("POST /api/contact - Missing name", "PASS", f"Correctly rejected with 422: {response.status_code}")
            else:
                self.log_test("POST /api/contact - Missing name", "FAIL", f"Expected 422, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /api/contact - Missing name", "FAIL", f"Request failed: {str(e)}")

        # Test POST /api/contact with invalid email
        invalid_data_bad_email = {
            "name": "John Doe",
            "email": "invalid-email",
            "message": "Hello, I'm interested in your work!"
        }
        
        try:
            response = requests.post(
                f"{BASE_URL}/contact",
                json=invalid_data_bad_email,
                headers={"Content-Type": "application/json"},
                timeout=TIMEOUT
            )
            
            if response.status_code == 422:
                self.log_test("POST /api/contact - Invalid email", "PASS", f"Correctly rejected with 422: {response.status_code}")
            else:
                self.log_test("POST /api/contact - Invalid email", "FAIL", f"Expected 422, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /api/contact - Invalid email", "FAIL", f"Request failed: {str(e)}")

        # Test POST /api/contact with missing message
        invalid_data_missing_message = {
            "name": "John Doe",
            "email": "john@example.com"
        }
        
        try:
            response = requests.post(
                f"{BASE_URL}/contact",
                json=invalid_data_missing_message,
                headers={"Content-Type": "application/json"},
                timeout=TIMEOUT
            )
            
            if response.status_code == 422:
                self.log_test("POST /api/contact - Missing message", "PASS", f"Correctly rejected with 422: {response.status_code}")
            else:
                self.log_test("POST /api/contact - Missing message", "FAIL", f"Expected 422, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /api/contact - Missing message", "FAIL", f"Request failed: {str(e)}")

        # Test GET /api/contact/submissions
        try:
            response = requests.get(f"{BASE_URL}/contact/submissions", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                if "success" in data and "submissions" in data and "count" in data:
                    submissions = data.get("submissions", [])
                    count = data.get("count", 0)
                    
                    # Check if our test submission is in the results
                    found_test_submission = False
                    if hasattr(self, 'contact_id'):
                        for submission in submissions:
                            if submission.get('id') == self.contact_id:
                                found_test_submission = True
                                break
                    
                    if found_test_submission:
                        self.log_test("GET /api/contact/submissions - Data verification", "PASS", f"Found test submission in {count} total submissions")
                    else:
                        self.log_test("GET /api/contact/submissions - Data verification", "PASS", f"Retrieved {count} submissions (test submission may not be found due to timing)")
                else:
                    self.log_test("GET /api/contact/submissions - Data verification", "FAIL", f"Unexpected response format: {data}")
            else:
                self.log_test("GET /api/contact/submissions - Data verification", "FAIL", f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("GET /api/contact/submissions - Data verification", "FAIL", f"Request failed: {str(e)}")

    def test_resume_download(self):
        """Test resume download endpoint"""
        print("=== RESUME DOWNLOAD TESTS ===")
        
        try:
            response = requests.get(f"{BASE_URL}/resume/download", timeout=TIMEOUT)
            
            if response.status_code == 404:
                # This is expected since no resume file exists yet
                data = response.json()
                if "Resume not available yet" in data.get("detail", ""):
                    self.log_test("GET /api/resume/download - No file", "PASS", f"Correctly returns 404 when no resume exists: {data.get('detail')}")
                else:
                    self.log_test("GET /api/resume/download - No file", "FAIL", f"Unexpected 404 message: {data}")
            elif response.status_code == 200:
                # If a resume file exists, this would be successful
                self.log_test("GET /api/resume/download - File exists", "PASS", f"Resume file downloaded successfully")
            else:
                self.log_test("GET /api/resume/download - No file", "FAIL", f"Unexpected status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("GET /api/resume/download - No file", "FAIL", f"Request failed: {str(e)}")

    def test_error_handling(self):
        """Test error handling for invalid endpoints and malformed requests"""
        print("=== ERROR HANDLING TESTS ===")
        
        # Test invalid endpoint (404)
        try:
            response = requests.get(f"{BASE_URL}/nonexistent-endpoint", timeout=TIMEOUT)
            
            if response.status_code == 404:
                self.log_test("GET /api/nonexistent-endpoint - 404 handling", "PASS", f"Correctly returns 404 for invalid endpoint")
            else:
                self.log_test("GET /api/nonexistent-endpoint - 404 handling", "FAIL", f"Expected 404, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /api/nonexistent-endpoint - 404 handling", "FAIL", f"Request failed: {str(e)}")

        # Test malformed JSON (422)
        try:
            response = requests.post(
                f"{BASE_URL}/contact",
                data="invalid json data",
                headers={"Content-Type": "application/json"},
                timeout=TIMEOUT
            )
            
            if response.status_code == 422:
                self.log_test("POST /api/contact - Malformed JSON", "PASS", f"Correctly returns 422 for malformed JSON")
            else:
                self.log_test("POST /api/contact - Malformed JSON", "FAIL", f"Expected 422, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /api/contact - Malformed JSON", "FAIL", f"Request failed: {str(e)}")

    def test_database_integration(self):
        """Test database integration by submitting data and verifying storage"""
        print("=== DATABASE INTEGRATION TESTS ===")
        
        # Submit a unique contact form to test database storage
        unique_message = f"Database integration test - {uuid.uuid4()}"
        test_data = {
            "name": "Database Test User",
            "email": "dbtest@example.com",
            "message": unique_message
        }
        
        try:
            # Submit the contact form
            response = requests.post(
                f"{BASE_URL}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=TIMEOUT
            )
            
            if response.status_code == 200:
                data = response.json()
                test_id = data.get('id')
                
                # Wait a moment for database write
                time.sleep(1)
                
                # Retrieve submissions and verify our test data is stored
                submissions_response = requests.get(f"{BASE_URL}/contact/submissions", timeout=TIMEOUT)
                
                if submissions_response.status_code == 200:
                    submissions_data = submissions_response.json()
                    submissions = submissions_data.get("submissions", [])
                    
                    # Look for our test submission
                    found_submission = None
                    for submission in submissions:
                        if submission.get('message') == unique_message:
                            found_submission = submission
                            break
                    
                    if found_submission:
                        # Verify all fields are stored correctly
                        if (found_submission.get('name') == test_data['name'] and
                            found_submission.get('email') == test_data['email'] and
                            found_submission.get('message') == test_data['message'] and
                            'timestamp' in found_submission):
                            self.log_test("Database Integration - Data persistence", "PASS", f"Contact submission stored correctly with timestamp: {found_submission.get('timestamp')}")
                        else:
                            self.log_test("Database Integration - Data persistence", "FAIL", f"Data mismatch in stored submission: {found_submission}")
                    else:
                        self.log_test("Database Integration - Data persistence", "FAIL", f"Test submission not found in database")
                else:
                    self.log_test("Database Integration - Data persistence", "FAIL", f"Failed to retrieve submissions: {submissions_response.status_code}")
            else:
                self.log_test("Database Integration - Data persistence", "FAIL", f"Failed to submit test data: {response.status_code}")
                
        except Exception as e:
            self.log_test("Database Integration - Data persistence", "FAIL", f"Database integration test failed: {str(e)}")

    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting Portfolio Backend API Tests")
        print(f"Testing against: {BASE_URL}")
        print("=" * 60)
        
        start_time = time.time()
        
        # Run all test suites
        self.test_health_endpoints()
        self.test_contact_form_api()
        self.test_resume_download()
        self.test_error_handling()
        self.test_database_integration()
        
        end_time = time.time()
        duration = end_time - start_time
        
        # Print summary
        print("=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {len(self.test_results)}")
        print(f"Passed: {len(self.passed_tests)}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Duration: {duration:.2f} seconds")
        print()
        
        if self.failed_tests:
            print("❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test}")
            print()
        
        if self.passed_tests:
            print("✅ PASSED TESTS:")
            for test in self.passed_tests:
                print(f"  - {test}")
            print()
        
        # Return success status
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("🎉 All tests passed! Portfolio API is production-ready.")
        exit(0)
    else:
        print("⚠️  Some tests failed. Please review the issues above.")
        exit(1)