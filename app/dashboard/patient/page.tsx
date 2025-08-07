"use client";

import { useState } from "react";
import {
  Heart,
  Clock,
  MapPin,
  Phone,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function PatientDashboard() {
  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <PatientDashboardContent />
    </ProtectedRoute>
  );
}

function PatientDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview");

  const patientStats = [
    { title: "Active Requests", value: "2", icon: Heart, color: "bg-red-500" },
    {
      title: "Fulfilled Requests",
      value: "5",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending Approval",
      value: "1",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Emergency Requests",
      value: "0",
      icon: AlertCircle,
      color: "bg-orange-500",
    },
  ];

  const bloodRequests = [
    {
      id: 1,
      bloodType: "O+",
      units: 2,
      urgency: "High",
      hospital: "City General Hospital",
      date: "2024-01-15",
      status: "Active",
      description: "Surgery scheduled for tomorrow",
    },
    {
      id: 2,
      bloodType: "O+",
      units: 1,
      urgency: "Medium",
      hospital: "Metro Medical Center",
      date: "2024-01-10",
      status: "Fulfilled",
      description: "Regular treatment",
    },
    {
      id: 3,
      bloodType: "O+",
      units: 3,
      urgency: "Critical",
      hospital: "Emergency Care Unit",
      date: "2024-01-05",
      status: "Fulfilled",
      description: "Emergency surgery",
    },
  ];

  const nearbyBloodBanks = [
    {
      id: 1,
      name: "City Blood Bank",
      distance: "0.5 miles",
      phone: "+1 (555) 123-4567",
      availability: { "O+": 45, "O-": 12, "A+": 23, "A-": 8 },
      status: "Open",
    },
    {
      id: 2,
      name: "Metro Hospital Blood Center",
      distance: "1.2 miles",
      phone: "+1 (555) 234-5678",
      availability: { "O+": 67, "O-": 15, "A+": 34, "A-": 11 },
      status: "Open",
    },
    {
      id: 3,
      name: "Community Blood Services",
      distance: "2.1 miles",
      phone: "+1 (555) 345-6789",
      availability: { "O+": 23, "O-": 6, "A+": 18, "A-": 4 },
      status: "Closed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Patient Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your blood requests and find nearby blood banks
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {patientStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
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

        {/* Emergency Request Button */}
        <div className="mb-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  Need Blood Urgently?
                </h3>
                <p className="text-red-600 dark:text-red-300">
                  Submit an emergency blood request for immediate assistance
                </p>
              </div>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
                Emergency Request
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "requests", label: "My Requests" },
                { id: "bloodbanks", label: "Nearby Blood Banks" },
                { id: "newrequest", label: "New Request" },
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
            {/* Active Requests */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Active Requests
              </h3>
              <div className="space-y-4">
                {bloodRequests
                  .filter((req) => req.status === "Active")
                  .map((request) => (
                    <div
                      key={request.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full text-sm font-medium">
                          {request.bloodType}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.urgency === "Critical"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : request.urgency === "High"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {request.urgency} Priority
                        </span>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {request.units} units needed
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.hospital} • {request.date}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {request.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Request Blood
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Submit a new blood request
                      </p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Find Blood Banks
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Locate nearby blood banks
                      </p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Emergency Hotline
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Call 1-800-BLOOD-NOW
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Blood Requests
                </h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </button>
                  <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Hospital
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {bloodRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full text-sm font-medium">
                          {request.bloodType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {request.units}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {request.hospital}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {request.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.urgency === "Critical"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : request.urgency === "High"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {request.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === "Active"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : request.status === "Fulfilled"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "bloodbanks" && (
          <div className="space-y-6">
            {nearbyBloodBanks.map((bank) => (
              <div
                key={bank.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {bank.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{bank.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{bank.phone}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      bank.status === "Open"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {bank.status}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(bank.availability).map(([type, units]) => (
                    <div
                      key={type}
                      className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="font-semibold text-red-600 dark:text-red-400 mb-1">
                        {type}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {units} units
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "newrequest" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Submit New Blood Request
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blood Type Required
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white">
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Units Required
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Number of units"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hospital/Medical Center
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Hospital name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urgency Level
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white">
                    <option value="">Select Urgency</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medical Reason/Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Please describe the medical reason for this blood request..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Required Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
