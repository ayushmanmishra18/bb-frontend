"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("donor" | "patient" | "admin")[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles = ["donor", "patient", "admin"],
  redirectTo = "/login/donor",
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (user && !allowedRoles.includes(user.role)) {
        // User doesn't have permission for this route
        router.push(`/dashboard/${user.role}`);
        return;
      }
    }
  }, [user, isLoading, isAuthenticated, router, allowedRoles, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (user && !allowedRoles.includes(user.role)) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
