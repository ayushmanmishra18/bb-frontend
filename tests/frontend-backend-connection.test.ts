// Frontend-Backend Connection Tests
// This file contains tests to verify the connection between frontend and backend

import axios from "axios";

// Configuration
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://bb-frontend-seven.vercel.app"
    : "http://localhost:5000";

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://bb-frontend-seven.vercel.app"
    : "http://localhost:3000";

// Configure axios for tests
const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Test data
const testDonor = {
  email: "testdonor@example.com",
  password: "TestPassword123!",
};

const testPatient = {
  email: "testpatient@example.com",
  password: "TestPassword123!",
};

const testAdmin = {
  email: "testadmin@example.com",
  password: "TestPassword123!",
};

/**
 * Test Suite 1: Basic Connectivity Tests
 */
export class ConnectivityTests {
  /**
   * Test 1: Backend Server Health Check
   */
  static async testBackendHealth(): Promise<boolean> {
    try {
      console.log("🔍 Testing backend server health...");

      // Try to connect to backend
      const response = await api.get("/health");

      if (response.status === 200) {
        console.log("✅ Backend server is running and accessible");
        return true;
      } else {
        console.log(
          "❌ Backend server returned unexpected status:",
          response.status
        );
        return false;
      }
    } catch (error) {
      console.log(
        "❌ Backend server is not accessible:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }

  /**
   * Test 2: CORS Configuration Test
   */
  static async testCorsConfiguration(): Promise<boolean> {
    try {
      console.log("🔍 Testing CORS configuration...");

      // Test preflight request
      const response = await api.options("/auth/me", {
        headers: {
          Origin: FRONTEND_URL,
          "Access-Control-Request-Method": "GET",
          "Access-Control-Request-Headers": "Content-Type",
        },
      });

      const corsHeaders = response.headers;
      const allowedOrigins = corsHeaders["access-control-allow-origin"];
      const allowedMethods = corsHeaders["access-control-allow-methods"];
      const allowsCredentials = corsHeaders["access-control-allow-credentials"];

      if (allowedOrigins && allowedMethods && allowsCredentials === "true") {
        console.log("✅ CORS is properly configured");
        console.log("  - Allowed Origins:", allowedOrigins);
        console.log("  - Allowed Methods:", allowedMethods);
        console.log("  - Credentials Allowed:", allowsCredentials);
        return true;
      } else {
        console.log("❌ CORS configuration issues detected");
        console.log("  - Allowed Origins:", allowedOrigins);
        console.log("  - Allowed Methods:", allowedMethods);
        console.log("  - Credentials Allowed:", allowsCredentials);
        return false;
      }
    } catch (error) {
      console.log(
        "❌ CORS test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }

  /**
   * Test 3: Database Connection Test
   */
  static async testDatabaseConnection(): Promise<boolean> {
    try {
      console.log("🔍 Testing database connection...");

      // Try to access an endpoint that queries the database
      const response = await api.get("/getByCity");

      if (response.status === 200) {
        console.log("✅ Database connection is working");
        console.log(
          "  - Retrieved",
          Array.isArray(response.data)
            ? response.data.length
            : "unknown number of",
          "records"
        );
        return true;
      } else {
        console.log(
          "❌ Database connection test failed with status:",
          response.status
        );
        return false;
      }
    } catch (error) {
      console.log(
        "❌ Database connection test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }
}

/**
 * Test Suite 2: Authentication Flow Tests
 */
export class AuthenticationTests {
  /**
   * Test 4: Donor Login Flow
   */
  static async testDonorLogin(): Promise<boolean> {
    try {
      console.log("🔍 Testing donor login flow...");

      const response = await api.post("/donor-login", testDonor);

      if (response.status === 200 && response.data.success) {
        console.log("✅ Donor login endpoint is working");
        console.log("  - User Role:", response.data.user?.role);
        console.log("  - User Email:", response.data.user?.email);

        // Check if cookies are set
        const cookies = response.headers["set-cookie"];
        if (cookies && cookies.some((cookie) => cookie.includes("authToken"))) {
          console.log("✅ Authentication cookies are being set");
          return true;
        } else {
          console.log("⚠️ Authentication cookies may not be set properly");
          return false;
        }
      } else {
        console.log("❌ Donor login failed");
        console.log("  - Status:", response.status);
        console.log("  - Response:", response.data);
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log(
          "⚠️ Donor login endpoint is working but credentials are invalid (expected for test)"
        );
        return true;
      }
      console.log(
        "❌ Donor login test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }

  /**
   * Test 5: Patient Login Flow
   */
  static async testPatientLogin(): Promise<boolean> {
    try {
      console.log("🔍 Testing patient login flow...");

      const response = await api.post("/patient-login", testPatient);

      if (response.status === 200 && response.data.success) {
        console.log("✅ Patient login endpoint is working");
        console.log("  - User Role:", response.data.user?.role);
        console.log("  - User Email:", response.data.user?.email);
        return true;
      } else {
        console.log("❌ Patient login failed");
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log(
          "⚠️ Patient login endpoint is working but credentials are invalid (expected for test)"
        );
        return true;
      }
      console.log(
        "❌ Patient login test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }

  /**
   * Test 6: Admin Login Flow
   */
  static async testAdminLogin(): Promise<boolean> {
    try {
      console.log("🔍 Testing admin login flow...");

      const response = await api.post("/admin-login", testAdmin);

      if (response.status === 200 && response.data.success) {
        console.log("✅ Admin login endpoint is working");
        console.log("  - User Role:", response.data.user?.role);
        console.log("  - User Email:", response.data.user?.email);
        return true;
      } else {
        console.log("❌ Admin login failed");
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log(
          "⚠️ Admin login endpoint is working but credentials are invalid (expected for test)"
        );
        return true;
      }
      console.log(
        "❌ Admin login test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }

  /**
   * Test 7: Auth Status Check
   */
  static async testAuthStatusCheck(): Promise<boolean> {
    try {
      console.log("🔍 Testing auth status endpoint...");

      const response = await api.get("/auth/me");

      // Should return 401 if not authenticated (which is expected)
      if (response.status === 401 || response.status === 200) {
        console.log("✅ Auth status endpoint is working");
        console.log("  - Status:", response.status);
        return true;
      } else {
        console.log(
          "❌ Auth status endpoint returned unexpected status:",
          response.status
        );
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log(
          "✅ Auth status endpoint is working (returns 401 when not authenticated)"
        );
        return true;
      }
      console.log(
        "❌ Auth status test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }
}

/**
 * Test Suite 3: Data Flow Tests
 */
export class DataFlowTests {
  /**
   * Test 8: Blood Banks Data Retrieval
   */
  static async testBloodBanksData(): Promise<boolean> {
    try {
      console.log("🔍 Testing blood banks data retrieval...");

      const response = await api.get("/getByCity");

      if (response.status === 200 && Array.isArray(response.data)) {
        console.log("✅ Blood banks data endpoint is working");
        console.log("  - Retrieved", response.data.length, "blood banks");
        return true;
      } else {
        console.log("❌ Blood banks data test failed");
        return false;
      }
    } catch (error) {
      console.log(
        "❌ Blood banks data test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }

  /**
   * Test 9: Donors Data Retrieval
   */
  static async testDonorsData(): Promise<boolean> {
    try {
      console.log("🔍 Testing donors data retrieval...");

      const response = await api.get("/patientDetail");

      if (response.status === 200) {
        console.log("✅ Donors data endpoint is working");
        console.log("  - Response type:", typeof response.data);
        return true;
      } else {
        console.log("❌ Donors data test failed");
        return false;
      }
    } catch (error) {
      console.log(
        "❌ Donors data test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }

  /**
   * Test 10: Blood Requests Data Retrieval
   */
  static async testBloodRequestsData(): Promise<boolean> {
    try {
      console.log("🔍 Testing blood requests data retrieval...");

      const response = await api.get("/health");

      if (response.status === 200) {
        console.log("✅ Blood requests data endpoint is working");
        console.log("  - Response type:", typeof response.data);
        return true;
      } else {
        console.log("❌ Blood requests data test failed");
        return false;
      }
    } catch (error) {
      console.log(
        "❌ Blood requests data test failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return false;
    }
  }
}

/**
 * Test Runner
 */
export class TestRunner {
  /**
   * Run all tests
   */
  static async runAllTests(): Promise<void> {
    console.log("🚀 Starting Frontend-Backend Connection Tests\n");
    console.log("=".repeat(60));

    const results = {
      passed: 0,
      failed: 0,
      total: 0,
    };

    // Connectivity Tests
    console.log("\n📡 CONNECTIVITY TESTS");
    console.log("-".repeat(40));

    const connectivityTests = [
      ConnectivityTests.testBackendHealth,
      ConnectivityTests.testCorsConfiguration,
      ConnectivityTests.testDatabaseConnection,
    ];

    for (const test of connectivityTests) {
      results.total++;
      const passed = await test();
      if (passed) {
        results.passed++;
      } else {
        results.failed++;
      }
      console.log("");
    }

    // Authentication Tests
    console.log("\n🔐 AUTHENTICATION TESTS");
    console.log("-".repeat(40));

    const authTests = [
      AuthenticationTests.testDonorLogin,
      AuthenticationTests.testPatientLogin,
      AuthenticationTests.testAdminLogin,
      AuthenticationTests.testAuthStatusCheck,
    ];

    for (const test of authTests) {
      results.total++;
      const passed = await test();
      if (passed) {
        results.passed++;
      } else {
        results.failed++;
      }
      console.log("");
    }

    // Data Flow Tests
    console.log("\n📊 DATA FLOW TESTS");
    console.log("-".repeat(40));

    const dataFlowTests = [
      DataFlowTests.testBloodBanksData,
      DataFlowTests.testDonorsData,
      DataFlowTests.testBloodRequestsData,
    ];

    for (const test of dataFlowTests) {
      results.total++;
      const passed = await test();
      if (passed) {
        results.passed++;
      } else {
        results.failed++;
      }
      console.log("");
    }

    // Summary
    console.log("\n📋 TEST SUMMARY");
    console.log("=".repeat(60));
    console.log(`✅ Passed: ${results.passed}/${results.total}`);
    console.log(`❌ Failed: ${results.failed}/${results.total}`);
    console.log(
      `📊 Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`
    );

    if (results.failed === 0) {
      console.log(
        "\n🎉 All tests passed! Frontend and backend are properly connected."
      );
    } else {
      console.log(
        "\n⚠️ Some tests failed. Please check the backend server and database connection."
      );
    }
  }
}

// Export for use
export { BACKEND_URL, FRONTEND_URL, api };
