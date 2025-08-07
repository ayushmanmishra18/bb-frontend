"use client"
import { User } from "lucide-react"
import Image from "next/image"

import { Heart, Users, Award, Target, Shield, Globe } from "lucide-react"
import Link from "next/link"  
export default function AboutPage() {
  const stats = [
    { number: "50,000+", label: "Lives Saved", icon: Heart },
    { number: "25,000+", label: "Active Donors", icon: Users },
    { number: "500+", label: "Blood Banks", icon: Shield },
    { number: "100+", label: "Cities Covered", icon: Globe }
  ]

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We believe in the power of human kindness and the willingness to help others in their time of need."
    },
    {
      icon: Shield,
      title: "Safety",
      description: "We maintain the highest standards of safety and quality in all our blood collection and distribution processes."
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster a strong community of donors, patients, and healthcare providers working together to save lives."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, continuously improving our services and technology."
    }
  ]

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Leading hematologist with 15+ years in blood banking"
    },
    {
      name: "Michael Chen",
      role: "Technology Director",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Expert in healthcare technology and digital transformation"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Operations Manager",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Specialist in blood bank operations and quality assurance"
    },
    {
      name: "David Thompson",
      role: "Community Outreach",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Passionate about building donor communities nationwide"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Blood Connect
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            Connecting lives through technology, compassion, and community-driven blood donation
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Blood Connect was founded with a simple yet powerful mission: to bridge the gap between 
                those who need blood and those willing to donate it. We leverage cutting-edge technology 
                to create a seamless, efficient, and life-saving network.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every day, thousands of people require blood transfusions for surgeries, cancer treatment, 
                chronic illnesses, and traumatic injuries. Our platform ensures that help is always within reach.
              </p>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <Heart className="h-8 w-8 text-red-600" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Every Drop Counts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    One donation can save up to three lives
                  </p>
                </div>
              </div>
            </div>
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Blood donation"
                  className="rounded-lg shadow-lg w-full h-84 object-cover"
                  width={500}
                  height={500}
              />
              <div className="absolute inset-0 bg-red-600/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Together, we are making a difference across the nation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <value.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Dedicated professionals working to save lives every day
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-red-600/10 rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join our community of life-savers and help us continue our mission of connecting lives through blood donation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/donor" className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Become a Donor
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  )
}