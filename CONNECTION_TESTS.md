# Frontend-Backend Connection Tests

This document outlines the tests created to verify the connection between the Blood Bank frontend and backend systems.

## Test Files Created

### 1. TypeScript Test Suite (`tests/frontend-backend-connection.test.ts`)
A comprehensive TypeScript test suite with three main test categories:

#### Connectivity Tests
- **Backend Health Check**: Verifies the backend server is running and accessible
- **CORS Configuration**: Tests cross-origin resource sharing setup
- **Database Connection**: Validates database connectivity through API endpoints

#### Authentication Tests
- **Donor Login Flow**: Tests donor authentication endpoint
- **Patient Login Flow**: Tests patient authentication endpoint  
- **Admin Login Flow**: Tests admin authentication endpoint
- **Auth Status Check**: Verifies authentication status endpoint

#### Data Flow Tests
- **Blood Banks Data**: Tests blood banks data retrieval
- **Donors Data**: Tests donors data endpoint
- **Blood Requests Data**: Tests blood requests data endpoint

### 2. React Component Test (`components/ConnectionTest.tsx`)
An interactive React component that provides a visual interface for testing frontend-backend connectivity:

- **Real-time Testing**: Run tests from within the Next.js application
- **Visual Results**: Color-coded test results with detailed information
- **Interactive Interface**: User-friendly test execution with progress indicators
- **Detailed Reporting**: Expandable details for each test result

#### Usage
Access the component at `/test` route in your Next.js application:
```
http://localhost:3000/test
```

### 3. Node.js CLI Test (`test-connection.js`)
A simple command-line test script that can be run independently:

```bash
node test-connection.js
```

#### Features
- **No Dependencies**: Uses only Node.js built-in modules
- **CLI Output**: Formatted console output with emojis and colors
- **Exit Codes**: Returns appropriate exit codes for CI/CD integration
- **Timeout Handling**: 5-second timeout for each test

### 4. Backend Health Endpoint
Added a comprehensive health check endpoint to the backend:

#### Endpoint: `/health` and `/`
Returns detailed system information:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-08-07T12:00:00.000Z",
    "server": "Blood Bank Backend",
    "version": "1.0.0",
    "environment": "development",
    "uptime": 3600,
    "memory": {
      "used": 25.5,
      "total": 50.2
    },
    "endpoints": {
      "auth": {
        "donorLogin": "/donor/login",
        "patientLogin": "/patient/login",
        "adminLogin": "/admin/login",
        "authStatus": "/auth/me"
      },
      "data": {
        "donors": "/donors",
        "patients": "/patients",
        "bloodBanks": "/blood-banks",
        "bloodRequests": "/blood-requests"
      }
    }
  }
}
```

## Test Configuration

### Backend URL Configuration
Tests automatically detect the environment:
- **Development**: `http://localhost:5000`
- **Production**: `https://bb-frontend-seven.vercel.app`

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000` (development frontend)
- `https://bb-frontend-seven.vercel.app` (production frontend)

## Running the Tests

### Option 1: React Component (Recommended)
1. Start both frontend and backend servers
2. Navigate to `http://localhost:3000/test`
3. Click "Run All Tests" button
4. View results in real-time

### Option 2: Node.js CLI Test
```bash
# From the frontend directory
node test-connection.js
```

### Option 3: TypeScript Test Suite
```bash
# From the frontend directory
npm run test:connection
```

## Test Scenarios

### Positive Test Cases
- Backend server is running and accessible
- CORS is properly configured
- Authentication endpoints return appropriate responses
- Data endpoints are accessible
- Database connection is working

### Negative Test Cases
- Invalid login credentials return 401
- Non-existent endpoints return 404
- Unauthenticated requests to protected endpoints return 401

### Edge Cases
- Network timeouts
- Server errors
- Malformed requests
- Missing headers

## Expected Test Results

### When Backend is Running
```
✅ Backend Health Check - PASSED
✅ CORS Configuration - PASSED  
✅ Authentication Endpoints - PASSED
✅ Data Endpoints - PASSED
✅ Database Connection - PASSED

📊 Success Rate: 100%
🎉 All tests passed! Frontend and backend are properly connected.
```

### When Backend is Down
```
❌ Backend Health Check - FAILED
❌ CORS Configuration - FAILED
❌ Authentication Endpoints - FAILED
❌ Data Endpoints - FAILED
❌ Database Connection - FAILED

📊 Success Rate: 0%
⚠️ Some tests failed. Please check the backend server and database connection.
```

## Troubleshooting

### Common Issues

#### Backend Not Accessible
- Check if backend server is running on port 5000
- Verify firewall settings
- Ensure correct backend URL in configuration

#### CORS Errors
- Verify CORS configuration in backend
- Check if frontend origin is allowed
- Ensure credentials are enabled

#### Authentication Failures
- Verify JWT secret configuration
- Check database user records
- Ensure password hashing is working

#### Database Connection Issues
- Check Prisma database connection
- Verify database server is running
- Check environment variables

### Debug Information
Each test provides detailed error information including:
- HTTP status codes
- Error messages
- Request/response headers
- Timing information

## Integration with CI/CD

The Node.js CLI test can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions step
- name: Test Frontend-Backend Connection
  run: |
    cd bb-frontend
    node test-connection.js
```

Exit codes:
- `0`: All tests passed
- `1`: One or more tests failed

## Maintenance

### Adding New Tests
1. Add test function to the appropriate test class
2. Update test runner to include new test
3. Add documentation for the new test

### Updating Endpoints
When new endpoints are added to the backend:
1. Update the health check endpoint information
2. Add new test cases if needed
3. Update test documentation

### Configuration Updates
When backend/frontend URLs change:
1. Update configuration in all test files
2. Update CORS settings in backend
3. Test in both development and production environments
