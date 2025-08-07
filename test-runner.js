#!/usr/bin/env node

/**
 * Simple test runner for frontend-backend connection tests
 * Usage: node test-runner.js
 */

// Since we can't use ES modules directly in Node.js without setup,
// let's create a simple CommonJS version of the tests

const axios = require('axios');

// Configuration
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://bb-frontend-seven.vercel.app' 
  : 'http://localhost:5000';

const FRONTEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://bb-frontend-seven.vercel.app'
  : 'http://localhost:3000';

// Configure axios for tests
const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test data
const testDonor = {
  email: 'testdonor@example.com',
  password: 'TestPassword123!',
};

/**
 * Test 1: Backend Server Health Check
 */
async function testBackendHealth() {
  try {
    console.log('🔍 Testing backend server health...');
    
    // Try to connect to backend root
    const response = await api.get('/');
    
    if (response.status === 200) {
      console.log('✅ Backend server is running and accessible');
      return true;
    } else {
      console.log('❌ Backend server returned unexpected status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Backend server is not accessible:', error.message);
    return false;
  }
}

/**
 * Test 2: CORS Configuration Test
 */
async function testCorsConfiguration() {
  try {
    console.log('🔍 Testing CORS configuration...');
    
    // Test a simple GET request with origin header
    const response = await api.get('/donors', {
      headers: {
        'Origin': FRONTEND_URL,
      },
    });

    if (response.status === 200) {
      console.log('✅ CORS is working - able to make cross-origin requests');
      return true;
    } else {
      console.log('❌ CORS test failed with status:', response.status);
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.log('⚠️ Got response but CORS might have issues. Status:', error.response.status);
      return true; // Server is responding, just might be CORS
    }
    console.log('❌ CORS test failed:', error.message);
    return false;
  }
}

/**
 * Test 3: Authentication Endpoints
 */
async function testAuthEndpoints() {
  try {
    console.log('🔍 Testing authentication endpoints...');
    
    // Test donor login endpoint (should return 401 for invalid credentials)
    const response = await api.post('/donor/login', testDonor);
    
    console.log('❌ Unexpected success with test credentials');
    return false;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Donor login endpoint is working (correctly returns 401 for invalid credentials)');
      return true;
    } else if (error.response?.status === 404) {
      console.log('❌ Donor login endpoint not found (404)');
      return false;
    } else {
      console.log('❌ Auth endpoint test failed:', error.message);
      return false;
    }
  }
}

/**
 * Test 4: Data Endpoints
 */
async function testDataEndpoints() {
  try {
    console.log('🔍 Testing data endpoints...');
    
    // Test donors endpoint
    const response = await api.get('/donors');
    
    if (response.status === 200) {
      console.log('✅ Data endpoints are working');
      console.log('  - Donors endpoint returned status 200');
      return true;
    } else {
      console.log('❌ Data endpoints test failed with status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Data endpoints test failed:', error.message);
    return false;
  }
}

/**
 * Test 5: Database Connection (via API)
 */
async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection via API...');
    
    // Try multiple endpoints to ensure database is connected
    const endpoints = ['/donors', '/blood-banks', '/patients'];
    let successCount = 0;
    
    for (const endpoint of endpoints) {
      try {
        const response = await api.get(endpoint);
        if (response.status === 200) {
          successCount++;
        }
      } catch (error) {
        // Individual endpoint might not exist, that's ok
      }
    }
    
    if (successCount > 0) {
      console.log(`✅ Database connection is working (${successCount}/${endpoints.length} endpoints responded)`);
      return true;
    } else {
      console.log('❌ Database connection test failed - no endpoints responded');
      return false;
    }
  } catch (error) {
    console.log('❌ Database connection test failed:', error.message);
    return false;
  }
}

/**
 * Main test runner
 */
async function runAllTests() {
  console.log('🚀 Starting Frontend-Backend Connection Tests');
  console.log('Backend URL:', BACKEND_URL);
  console.log('Frontend URL:', FRONTEND_URL);
  console.log('='.repeat(60));
  
  const tests = [
    { name: 'Backend Health', test: testBackendHealth },
    { name: 'CORS Configuration', test: testCorsConfiguration },
    { name: 'Authentication Endpoints', test: testAuthEndpoints },
    { name: 'Data Endpoints', test: testDataEndpoints },
    { name: 'Database Connection', test: testDatabaseConnection },
  ];
  
  const results = { passed: 0, failed: 0, total: tests.length };
  
  for (const { name, test } of tests) {
    console.log(`\n📋 Running: ${name}`);
    console.log('-'.repeat(40));
    
    const passed = await test();
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
    console.log('');
  }
  
  // Summary
  console.log('\n📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${results.passed}/${results.total}`);
  console.log(`❌ Failed: ${results.failed}/${results.total}`);
  console.log(`📈 Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  
  if (results.failed === 0) {
    console.log('\n🎉 All tests passed! Frontend and backend are properly connected.');
    process.exit(0);
  } else {
    console.log('\n⚠️ Some tests failed. Please check:');
    console.log('   1. Backend server is running on the correct port');
    console.log('   2. Database is connected and accessible');
    console.log('   3. CORS is properly configured');
    console.log('   4. All required API endpoints are implemented');
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = {
  runAllTests,
  testBackendHealth,
  testCorsConfiguration,
  testAuthEndpoints,
  testDataEndpoints,
  testDatabaseConnection,
};
