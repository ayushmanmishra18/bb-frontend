"use client";

import { useState } from "react";
import {
  Heart,
  Users,
  Droplets,
  Activity,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import axios from "axios";
import DonationRequestsTable from "@/components/admin/DonationRequestsTable";
import ApprovedRequestsTable from "@/components/admin/BloodRequestTable";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Donors",
      value: "1,247",
      icon: Users,
      color: "bg-blue-500",
    },
    { title: "Blood Units", value: "856", icon: Droplets, color: "bg-red-500" },
    {
      title: "Requests Today",
      value: "23",
      icon: Activity,
      color: "bg-green-500",
    },
    {
      title: "Critical Stock",
      value: "4",
      icon: Heart,
      color: "bg-orange-500",
    },
  ];

  const recentDonations = [
    {
      id: 1,
      donor: "John Smith",
      bloodType: "O+",
      units: 1,
      date: "2024-01-15",
      status: "Completed",
    },
    {
      id: 2,
      donor: "Sarah Johnson",
      bloodType: "A-",
      units: 1,
      date: "2024-01-15",
      status: "Processing",
    },
    {
      id: 3,
      donor: "Mike Wilson",
      bloodType: "B+",
      units: 1,
      date: "2024-01-14",
      status: "Completed",
    },
    {
      id: 4,
      donor: "Emily Davis",
      bloodType: "AB+",
      units: 1,
      date: "2024-01-14",
      status: "Completed",
    },
  ];

  const bloodInventory = [
    { type: "A+", units: 45, status: "Good", color: "text-green-600" },
    { type: "A-", units: 23, status: "Low", color: "text-orange-600" },
    { type: "B+", units: 67, status: "Good", color: "text-green-600" },
    { type: "B-", units: 12, status: "Critical", color: "text-red-600" },
    { type: "AB+", units: 34, status: "Good", color: "text-green-600" },
    { type: "AB-", units: 8, status: "Critical", color: "text-red-600" },
    { type: "O+", units: 89, status: "Excellent", color: "text-blue-600" },
    { type: "O-", units: 15, status: "Low", color: "text-orange-600" },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "inventory", label: "Blood Inventory" },
    { id: "donations", label: "Recent Donations" },
    { id: "requests", label: "Blood Requests" },
    { id: "donation-requests", label: "Donation Requests" },
  ];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your blood bank operations and inventory
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
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

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
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

        {/* Donation Requests Tab Content */}
        {activeTab === "donation-requests" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Donation Requests
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage all incoming blood donation requests from Donors.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search requests..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <select className="block w-40 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <DonationRequestsTable />
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Blood Requests
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage all incoming blood requests from patients and
                    hospitals.
                  </p>
                </div>

                {/* Search and Filter Controls */}
                <div className="flex space-x-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search requests..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <select className="block w-40 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Fulfilled</option>
                    <option>In Progress</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card Body containing the data table */}
            <div className="px-6 py-4">
              <ApprovedRequestsTable />
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentDonations.slice(0, 3).map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {donation.donor}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Donated {donation.bloodType} • {donation.date}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donation.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Stock Alert */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Critical Stock Alert
              </h3>
              <div className="space-y-3">
                {bloodInventory
                  .filter(
                    (item) =>
                      item.status === "Critical" || item.status === "Low"
                  )
                  .map((item) => (
                    <div
                      key={item.type}
                      className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-red-600 dark:text-red-400">
                            {item.type}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.units} units available
                          </p>
                          <p className={`text-sm ${item.color}`}>
                            {item.status} Stock
                          </p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                        Request
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Blood Inventory
                </h3>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Stock</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {bloodInventory.map((item) => (
                  <div
                    key={item.type}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl font-bold text-red-600 dark:text-red-400">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {item.units}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Units Available
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Excellent"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : item.status === "Good"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : item.status === "Low"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "donations" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Donations
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
                      Donor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {donation.donor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full text-xs font-medium">
                          {donation.bloodType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {donation.units}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {donation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            donation.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
