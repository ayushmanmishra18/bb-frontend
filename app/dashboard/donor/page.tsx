"use client"

import { useState } from "react"
import { Heart, Calendar, Award, Activity, Clock, MapPin, Phone, Mail } from "lucide-react"

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const donorStats = [
    { title: "Total Donations", value: "12", icon: Heart, color: "bg-red-500" },
    { title: "Lives Saved", value: "36", icon: Activity, color: "bg-green-500" },
    { title: "Next Eligible", value: "45 days", icon: Clock, color: "bg-blue-500" },
    { title: "Donor Points", value: "1,200", icon: Award, color: "bg-purple-500" }
  ]

  const donationHistory = [
    { id: 1, date: "2024-01-15", location: "City Blood Bank", units: 1, status: "Completed" },
    { id: 2, date: "2023-11-20", location: "Metro Hospital", units: 1, status: "Completed" },
    { id: 3, date: "2023-09-10", location: "City Blood Bank", units: 1, status: "Completed" },
    { id: 4, date: "2023-07-05", location: "Community Center", units: 1, status: "Completed" }
  ]

  const upcomingDrives = [
    {
      id: 1,
      title: "Community Blood Drive",
      date: "2024-02-15",
      time: "9:00 AM - 5:00 PM",
      location: "Community Center, Downtown",
      organizer: "Red Cross"
    },
    {
      id: 2,
      title: "Corporate Donation Day",
      date: "2024-02-20",
      time: "10:00 AM - 4:00 PM",
      location: "Tech Park, Building A",
      organizer: "TechCorp"
    }
  ]

  const achievements = [
    { title: "First Time Donor", icon: "🩸", earned: true },
    { title: "5 Donations", icon: "🏆", earned: true },
    { title: "10 Donations", icon: "🥇", earned: true },
    { title: "Life Saver", icon: "❤️", earned: true },
    { title: "25 Donations", icon: "🌟", earned: false },
    { title: "50 Donations", icon: "💎", earned: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Donor Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your donations and continue saving lives
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {donorStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "history", label: "Donation History" },
                { id: "drives", label: "Upcoming Drives" },
                { id: "achievements", label: "Achievements" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Next Donation Eligibility */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Next Donation Eligibility
              </h3>
              <div className="text-center py-6">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  45 Days
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Until you can donate again
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Set Reminder
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Donations
              </h3>
              <div className="space-y-4">
                {donationHistory.slice(0, 3).map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {donation.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {donation.date} • {donation.units} unit
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                      {donation.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Donation History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {donationHistory.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {donation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {donation.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {donation.units}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "drives" && (
          <div className="space-y-6">
            {upcomingDrives.map((drive) => (
              <div key={drive.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {drive.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{drive.date} • {drive.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{drive.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4" />
                        <span>Organized by {drive.organizer}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Your Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                      : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/20"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className={`font-semibold ${
                      achievement.earned
                        ? "text-green-800 dark:text-green-200"
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {achievement.title}
                    </h4>
                    {achievement.earned && (
                      <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                        Earned
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}