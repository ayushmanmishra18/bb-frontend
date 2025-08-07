"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Heart,
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  // Ensure component is mounted before accessing theme to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if current page is a login page
  const isLoginPage = pathname.startsWith("/login");

  const roles = [
    { id: "admin", label: "Blood Bank Admin", color: "text-red-600" },
    { id: "donor", label: "Donor", color: "text-blue-600" },
    { id: "patient", label: "Patient", color: "text-green-600" },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  const handleRoleSelect = (type: "register" | "login", role: string) => {
    router.push(`/${type}/${role}`);
    setShowRegisterDropdown(false);
    setShowLoginDropdown(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setShowUserDropdown(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-red-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors">
              <Heart className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Blood Connect
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <div className="h-5 w-5" />
              ) : theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {isAuthenticated ? (
              /* User Dropdown */
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserDropdown(!showUserDropdown);
                    setShowRegisterDropdown(false);
                    setShowLoginDropdown(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <User className="h-4 w-4" />
                  <span>{user?.name || "User"}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      showUserDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 z-20">
                    <div className="py-2">
                      <Link
                        href={`/dashboard/${user?.role}`}
                        className="flex items-center px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <Heart className="h-4 w-4 mr-2 text-red-600" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Register Dropdown - Only show if not on login page */}
                {!isLoginPage && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRegisterDropdown(!showRegisterDropdown);
                        setShowLoginDropdown(false);
                        setShowUserDropdown(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      <span>Register</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          showRegisterDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {showRegisterDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 z-20">
                        <div className="py-2">
                          {roles.map((role) => (
                            <button
                              key={role.id}
                              onClick={() =>
                                handleRoleSelect("register", role.id)
                              }
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                            >
                              <span className={`${role.color} font-medium`}>
                                {role.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* Login Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowLoginDropdown(!showLoginDropdown);
                      setShowRegisterDropdown(false);
                      setShowUserDropdown(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <span>Login</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showLoginDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {showLoginDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 z-20">
                      <div className="py-2">
                        {roles.map((role) => (
                          <button
                            key={role.id}
                            onClick={() => handleRoleSelect("login", role.id)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                          >
                            <span className={`${role.color} font-medium`}>
                              {role.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <div className="h-5 w-5" />
              ) : theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-4 space-y-4">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Authentication Section */}
              {isAuthenticated ? (
                /* Authenticated User Section */
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <User className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/${user?.role}`}
                    className="flex items-center w-full py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-2 text-red-600" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white mt-2"
                  >
                    <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  {/* Register Section - Only show if not on login page */}
                  {!isLoginPage && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Register as:
                      </p>
                      {roles.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => handleRoleSelect("register", role.id)}
                          className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span className={`${role.color} font-medium`}>
                            {role.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Login Section */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Login as:
                    </p>
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => handleRoleSelect("login", role.id)}
                        className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className={`${role.color} font-medium`}>
                          {role.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
