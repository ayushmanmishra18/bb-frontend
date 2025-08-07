"use client"

import Link from "next/link"
import { Heart, Users, Activity, Award } from "lucide-react"

export default function HeroSection() {
  const features = [
    {
      icon: Heart,
      title: "Save Lives",
      description: "Your donation can save up to 3 lives"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands of life-saving donors"
    },
    {
      icon: Activity,
      title: "Real-time",
      description: "Live blood bank inventory tracking"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Get recognized for your contributions"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Connecting Lives Through{" "}
            <span className="text-red-600 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Blood Donation
            </span>
          </h1>
          
          <div className="mb-8">
            <p className="text-xl sm:text-2xl text-red-600 dark:text-red-400 font-semibold italic mb-4">
              Donate Blood. Save Lives
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Blood Connect is a comprehensive platform that bridges the gap between blood donors, 
              patients in need, and blood banks. Join our community of life-savers and make a 
              difference in someones life today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
  
  <Link
    href="/register/donor"
    className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
  >
    Become a Donor
  </Link>
  <Link
    href="/patientlist"
    className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
  >
    Active Blood Requests
  </Link>

  <Link
    href="/donorlist"
    className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
  >
    Active Blood Donors
  </Link>
</div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-300">Lives Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">5,000+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Donors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">250+</div>
              <div className="text-gray-600 dark:text-gray-300">Blood Banks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}