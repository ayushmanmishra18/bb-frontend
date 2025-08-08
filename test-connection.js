const https = require('https');
const http = require('http');

// Configuration
const BACKEND_HOST = 'localhost';
const BACKEND_PORT = 5000;
const TEST_TIMEOUT = 5000; // 5 seconds

console.log('🚀 Frontend-Backend Connection Test');
console.log('=' .repeat(50));
console.log(`Testing backend at: http://${BACKEND_HOST}:${BACKEND_PORT}`);
console.log('');

// Test results
let results = { passed: 0, failed: 0, total: 0 };

// Helper function to make HTTP requests
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BACKEND_HOST,
      port: BACKEND_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      timeout: TEST_TIMEOUT
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body,
          data: body ? JSON.parse(body) : null
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test functions
async function testBackendHealth() {
  console.log('🔍 Test 1: Backend Server Health Check');
  console.log('-'.repeat(40));
  
  try {
    const response = await makeRequest('/');
    
    if (response.status === 200) {
      console.log('✅ Backend server is running and accessible');
      console.log(`   Status: ${response.status}`);
      results.passed++;
    } else {
      console.log(`❌ Backend server returned status: ${response.status}`);
      results.failed++;
    }
  } catch (error) {
    console.log('❌ Backend server is not accessible');
    console.log(`   Error: ${error.message}`);
    results.failed++;
  }
  
  results.total++;
  console.log('');
}

async function testCorsHeaders() {
  console.log('🔍 Test 2: CORS Configuration');
  console.log('-'.repeat(40));
  
  try {
    const response = await makeRequest('/getByCity?field=1&city=test');
    
    const corsHeader = response.headers['access-control-allow-origin'];
    const credentialsHeader = response.headers['access-control-allow-credentials'];
    
    if (corsHeader && credentialsHeader) {
      console.log('✅ CORS headers are present');
      console.log(`   Allow-Origin: ${corsHeader}`);
      console.log(`   Allow-Credentials: ${credentialsHeader}`);
      results.passed++;
    } else {
      console.log('⚠️ CORS headers may not be properly configured');
      console.log(`   Allow-Origin: ${corsHeader || 'Not set'}`);
      console.log(`   Allow-Credentials: ${credentialsHeader || 'Not set'}`);
      results.failed++;
    }
  } catch (error) {
    console.log('❌ CORS test failed');
    console.log(`   Error: ${error.message}`);
    results.failed++;
  }
  
  results.total++;
  console.log('');
}

async function testAuthEndpoint() {
  console.log('🔍 Test 3: Authentication Endpoint');
  console.log('-'.repeat(40));
  
  try {
    const testData = {
      email: 'test@example.com',
      password: 'TestPassword123!'
    };
    
    const response = await makeRequest('/donor-login', 'POST', testData);
    
    if (response.status === 401) {
      console.log('✅ Authentication endpoint is working');
      console.log('   Correctly returns 401 for invalid credentials');
      results.passed++;
    } else if (response.status === 404) {
      console.log('❌ Authentication endpoint not found (404)');
      results.failed++;
    } else {
      console.log(`⚠️ Unexpected response: ${response.status}`);
      results.failed++;
    }
  } catch (error) {
    console.log('❌ Authentication endpoint test failed');
    console.log(`   Error: ${error.message}`);
    results.failed++;
  }
  
  results.total++;
  console.log('');
}

async function testDataEndpoints() {
  console.log('🔍 Test 4: Data Endpoints');
  console.log('-'.repeat(40));
  
  const endpoints = ['/getByCity?field=1&city=test', '/patientDetail', '/health'];
  let successCount = 0;
  
  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(endpoint);
      console.log(`   ${endpoint}: Status ${response.status}`);
      if (response.status === 200) {
        successCount++;
      }
    } catch (error) {
      console.log(`   ${endpoint}: Error - ${error.message}`);
    }
  }
  
  if (successCount > 0) {
    console.log(`✅ Data endpoints working (${successCount}/${endpoints.length} successful)`);
    results.passed++;
  } else {
    console.log('❌ No data endpoints are working');
    results.failed++;
  }
  
  results.total++;
  console.log('');
}

async function testAuthMeEndpoint() {
  console.log('🔍 Test 5: Auth Status Endpoint');
  console.log('-'.repeat(40));
  
  try {
    const response = await makeRequest('/auth/me');
    
    if (response.status === 401) {
      console.log('✅ Auth status endpoint is working');
      console.log('   Correctly returns 401 when not authenticated');
      results.passed++;
    } else if (response.status === 200) {
      console.log('✅ Auth status endpoint is working');
      console.log('   Returns 200 (user might be authenticated)');
      results.passed++;
    } else {
      console.log(`❌ Auth status endpoint returned unexpected status: ${response.status}`);
      results.failed++;
    }
  } catch (error) {
    console.log('❌ Auth status endpoint test failed');
    console.log(`   Error: ${error.message}`);
    results.failed++;
  }
  
  results.total++;
  console.log('');
}

// Main test runner
async function runAllTests() {
  console.log('Starting tests...\n');
  
  await testBackendHealth();
  await testCorsHeaders();
  await testAuthEndpoint();
  await testDataEndpoints();
  await testAuthMeEndpoint();
  
  // Summary
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed}/${results.total}`);
  console.log(`❌ Failed: ${results.failed}/${results.total}`);
  console.log(`📈 Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  console.log('');
  
  if (results.failed === 0) {
    console.log('🎉 All tests passed! Frontend and backend are properly connected.');
    process.exit(0);
  } else {
    console.log('⚠️ Some tests failed. Please check:');
    console.log('   1. Backend server is running on port 5000');
    console.log('   2. All API endpoints are properly configured');
    console.log('   3. CORS settings allow frontend origin');
    console.log('   4. Database is connected and accessible');
    process.exit(1);
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('❌ Test runner failed:', error.message);
  process.exit(1);
});
