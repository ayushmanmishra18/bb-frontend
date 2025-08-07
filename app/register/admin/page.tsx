"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { z } from "zod";

const bloodBankSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  adminName: z.string().min(2, "Admin name is too short"),
  licenseNumber: z.string().min(2, "License number is too short"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    adminName: "",
    licenseNumber: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = bloodBankSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setError(null);
    setSuccess(null);
// connection set up
axios.post("http://localhost:5000/register-bloodBank", 
  {
    ...formData,
    totalBloodBags: 0, // Backend expects this, but will override to 0 
  },
  {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    }
  }
)

      .then(res => {
        setSuccess("Registration successful!");
        setTimeout(() => router.push("/dashboard/admin"), 1500);
      })
      .catch(err => {
        setError(err.response?.data?.message || "Registration failed");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center space-x-2 mb-6">
          <Building2 className="h-7 w-7 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blood Bank Registration</h2>
        </div>
        {/* Backend error/success messages */}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="Blood Bank Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="Admin Name"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
            />
            {errors.adminName && <p className="text-red-600 text-xs mt-1">{errors.adminName}</p>}
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
            {errors.licenseNumber && <p className="text-red-600 text-xs mt-1">{errors.licenseNumber}</p>}
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login/admin" className="text-red-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}