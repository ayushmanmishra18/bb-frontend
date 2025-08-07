"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { User } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function PatientLoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field-specific error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setError(null);
    setIsLoading(true);

    try {
      await login(formData.email, formData.password, "patient");
      // Navigation handled by AuthContext
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center space-x-2 mb-6">
          <User className="h-7 w-7 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patient Login
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <input
              className="block w-full px-4 py-2 text-base rounded-lg border border-input bg-background text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              className="block w-full px-4 py-2 text-base rounded-lg border border-input bg-background text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Do not have an account?{" "}
          <Link
            href="/register/patient"
            className="text-red-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
