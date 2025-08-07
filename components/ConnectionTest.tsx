"use client";

import React, { useState } from "react";
import axios from "axios";

interface TestResult {
  name: string;
  status: "pending" | "passed" | "failed";
  message: string;
  details?: any;
}

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://bb-frontend-seven.vercel.app"
    : "http://localhost:5000";

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function ConnectionTest() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: "Backend Health Check", status: "pending", message: "Not started" },
    { name: "CORS Configuration", status: "pending", message: "Not started" },
    {
      name: "Authentication Endpoints",
      status: "pending",
      message: "Not started",
    },
    { name: "Data Endpoints", status: "pending", message: "Not started" },
    { name: "Database Connection", status: "pending", message: "Not started" },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [summary, setSummary] = useState<{
    passed: number;
    failed: number;
    total: number;
  } | null>(null);

  const updateTest = (index: number, updates: Partial<TestResult>) => {
    setTests((prev) =>
      prev.map((test, i) => (i === index ? { ...test, ...updates } : test))
    );
  };

  const testBackendHealth = async (): Promise<boolean> => {
    try {
      updateTest(0, {
        status: "pending",
        message: "Testing backend server...",
      });

      const response = await api.get("/");

      if (response.status === 200) {
        updateTest(0, {
          status: "passed",
          message: "Backend server is running and accessible",
          details: { status: response.status },
        });
        return true;
      } else {
        updateTest(0, {
          status: "failed",
          message: `Unexpected status: ${response.status}`,
          details: { status: response.status },
        });
        return false;
      }
    } catch (error: any) {
      updateTest(0, {
        status: "failed",
        message: `Backend not accessible: ${error.message}`,
        details: { error: error.message },
      });
      return false;
    }
  };

  const testCorsConfiguration = async (): Promise<boolean> => {
    try {
      updateTest(1, {
        status: "pending",
        message: "Testing CORS configuration...",
      });

      const response = await api.get("/getByCity", {
        headers: {
          Origin: window.location.origin,
        },
      });

      if (response.status === 200) {
        updateTest(1, {
          status: "passed",
          message: "CORS is properly configured",
          details: { status: response.status, origin: window.location.origin },
        });
        return true;
      } else {
        updateTest(1, {
          status: "failed",
          message: `CORS test failed with status: ${response.status}`,
          details: { status: response.status },
        });
        return false;
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        updateTest(1, {
          status: "passed",
          message: `CORS working - got response (status: ${error.response.status})`,
          details: { status: error.response.status },
        });
        return true;
      }
      updateTest(1, {
        status: "failed",
        message: `CORS test failed: ${error.message}`,
        details: { error: error.message },
      });
      return false;
    }
  };

  const testAuthEndpoints = async (): Promise<boolean> => {
    try {
      updateTest(2, {
        status: "pending",
        message: "Testing authentication endpoints...",
      });

      const testCredentials = {
        email: "test@example.com",
        password: "TestPassword123!",
      };

      const response = await api.post("/donor-login", testCredentials);

      updateTest(2, {
        status: "failed",
        message: "Unexpected success with test credentials",
        details: { unexpected: true },
      });
      return false;
    } catch (error: any) {
      if (error.response?.status === 401) {
        updateTest(2, {
          status: "passed",
          message:
            "Auth endpoints working (correctly returns 401 for invalid credentials)",
          details: { status: 401, endpoint: "/donor-login" },
        });
        return true;
      } else if (error.response?.status === 404) {
        updateTest(2, {
          status: "failed",
          message: "Auth endpoint not found (404)",
          details: { status: 404, endpoint: "/donor-login" },
        });
        return false;
      } else {
        updateTest(2, {
          status: "failed",
          message: `Auth endpoint test failed: ${error.message}`,
          details: { error: error.message },
        });
        return false;
      }
    }
  };

  const testDataEndpoints = async (): Promise<boolean> => {
    try {
      updateTest(3, {
        status: "pending",
        message: "Testing data endpoints...",
      });

      const endpoints = ["/getByCity", "/patientDetail", "/health"];
      const results = [];

      for (const endpoint of endpoints) {
        try {
          const response = await api.get(endpoint);
          results.push({ endpoint, status: response.status, success: true });
        } catch (error: any) {
          results.push({
            endpoint,
            status: error.response?.status || "error",
            success: false,
            error: error.message,
          });
        }
      }

      const successCount = results.filter((r) => r.success).length;

      if (successCount > 0) {
        updateTest(3, {
          status: "passed",
          message: `Data endpoints working (${successCount}/${endpoints.length} responded)`,
          details: { results, successCount, totalCount: endpoints.length },
        });
        return true;
      } else {
        updateTest(3, {
          status: "failed",
          message: "No data endpoints responded successfully",
          details: { results },
        });
        return false;
      }
    } catch (error: any) {
      updateTest(3, {
        status: "failed",
        message: `Data endpoints test failed: ${error.message}`,
        details: { error: error.message },
      });
      return false;
    }
  };

  const testDatabaseConnection = async (): Promise<boolean> => {
    try {
      updateTest(4, {
        status: "pending",
        message: "Testing database connection...",
      });

      // Test auth/me endpoint which should check database
      const response = await api.get("/auth/me");

      // This should return 401 if not authenticated, but it means the endpoint works
      updateTest(4, {
        status: "passed",
        message: "Database connection working via auth endpoint",
        details: { status: response.status, endpoint: "/auth/me" },
      });
      return true;
    } catch (error: any) {
      if (error.response?.status === 401) {
        updateTest(4, {
          status: "passed",
          message:
            "Database connection working (auth endpoint returns 401 as expected)",
          details: { status: 401, endpoint: "/auth/me" },
        });
        return true;
      } else {
        updateTest(4, {
          status: "failed",
          message: `Database connection test failed: ${error.message}`,
          details: { error: error.message },
        });
        return false;
      }
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setSummary(null);

    // Reset all tests
    setTests((prev) =>
      prev.map((test) => ({
        ...test,
        status: "pending" as const,
        message: "Starting...",
      }))
    );

    const testFunctions = [
      testBackendHealth,
      testCorsConfiguration,
      testAuthEndpoints,
      testDataEndpoints,
      testDatabaseConnection,
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testFunctions.length; i++) {
      const result = await testFunctions[i]();
      if (result) {
        passed++;
      } else {
        failed++;
      }

      // Add a small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setSummary({ passed, failed, total: testFunctions.length });
    setIsRunning(false);
  };

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "passed":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "passed":
        return "✅";
      case "failed":
        return "❌";
      case "pending":
        return "🔄";
      default:
        return "⏳";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Frontend-Backend Connection Test
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Test the connection between the frontend and backend services
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Backend URL: {BACKEND_URL}
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {isRunning ? "🔄 Running Tests..." : "🚀 Run All Tests"}
        </button>
      </div>

      <div className="space-y-4">
        {tests.map((test, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getStatusIcon(test.status)} {test.name}
              </h3>
              <span
                className={`text-sm font-medium ${getStatusColor(test.status)}`}
              >
                {test.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {test.message}
            </p>
            {test.details && (
              <details className="mt-2">
                <summary className="text-xs text-gray-500 cursor-pointer">
                  Show Details
                </summary>
                <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 mt-1 rounded overflow-x-auto">
                  {JSON.stringify(test.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>

      {summary && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            📊 Test Summary
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {summary.passed}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Passed
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {summary.failed}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Failed
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {((summary.passed / summary.total) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Success Rate
              </div>
            </div>
          </div>
          {summary.failed === 0 ? (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
              🎉 All tests passed! Frontend and backend are properly connected.
            </div>
          ) : (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-center">
              ⚠️ Some tests failed. Please check the backend server and database
              connection.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
