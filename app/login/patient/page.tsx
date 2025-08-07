"use client"

import { useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function PatientLoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    alert("Patient login successful (mock)!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center space-x-2 mb-6">
          <User className="h-7 w-7 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Login</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <input className="block w-full px-4 py-2 text-base rounded-lg border border-input bg-background text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          <input className="block w-full px-4 py-2 text-base rounded-lg border border-input bg-background text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Do not have an account?{" "}
          <Link href="/register/patient" className="text-red-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}