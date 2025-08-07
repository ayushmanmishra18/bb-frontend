"use client"

import { User ,Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Find Blood Banks", href: "/blood-banks" },         // Page to list/search blood banks
    { name: "Become a Donor", href: "/register/donor" },        // Donor registration page
    { name: "Request Blood", href: "/dashboard/patient" },      // Patient dashboard/request page (or create /request-blood if you want a separate request page)
    { name: "About Us", href: "/about" }                // About page
                            
  ]


 

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-600 rounded-lg">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold">Blood Connect</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Connecting lives through blood donation. Join our community of life-savers and make a difference in someones life today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">Utkarsh Ayushman Krishna Hemant  </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-1" />
                <span className="text-gray-300">
                  Noida <br />
                  Medical District<br />
                  201304
                  
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-600 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Heart className="h-5 w-5 text-white animate-pulse" fill="currentColor" />
              <span className="font-semibold">Emergency Blood Needed</span>
            </div>
            <div className="text-sm">
              <span>24/7 Emergency Hotline: </span>
              <span className="font-bold">1-800-BLOOD-NOW</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}