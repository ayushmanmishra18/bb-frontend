"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, Search, Filter, Heart, Star, Navigation } from "lucide-react"

export default function BloodBanksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const bloodBanks = [
    {
      id: 1,
      name: "City General Blood Bank",
      address: "123 Healthcare Ave, Downtown",
      phone: "+1 (555) 123-4567",
      distance: "0.5 miles",
      rating: 4.8,
      hours: "24/7",
      status: "Open",
      inventory: {
        "A+": 45, "A-": 23, "B+": 67, "B-": 12,
        "AB+": 34, "AB-": 8, "O+": 89, "O-": 15
      },
      services: ["Emergency", "Donation", "Testing", "Storage"],
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      name: "Metro Hospital Blood Center",
      address: "456 Medical District, Midtown",
      phone: "+1 (555) 234-5678",
      distance: "1.2 miles",
      rating: 4.6,
      hours: "6:00 AM - 10:00 PM",
      status: "Open",
      inventory: {
        "A+": 32, "A-": 18, "B+": 54, "B-": 9,
        "AB+": 28, "AB-": 6, "O+": 76, "O-": 12
      },
      services: ["Donation", "Testing", "Consultation"],
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      name: "Community Blood Services",
      address: "789 Community Center Dr, Westside",
      phone: "+1 (555) 345-6789",
      distance: "2.1 miles",
      rating: 4.4,
      hours: "8:00 AM - 6:00 PM",
      status: "Closed",
      inventory: {
        "A+": 28, "A-": 14, "B+": 41, "B-": 7,
        "AB+": 22, "AB-": 4, "O+": 58, "O-": 9
      },
      services: ["Donation", "Mobile Units"],
      image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      name: "Regional Medical Blood Bank",
      address: "321 University Blvd, North Campus",
      phone: "+1 (555) 456-7890",
      distance: "3.5 miles",
      rating: 4.7,
      hours: "24/7",
      status: "Open",
      inventory: {
        "A+": 52, "A-": 26, "B+": 73, "B-": 15,
        "AB+": 38, "AB-": 11, "O+": 95, "O-": 18
      },
      services: ["Emergency", "Donation", "Testing", "Research"],
      image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      name: "Eastside Blood Donation Center",
      address: "654 Main Street, Eastside",
      phone: "+1 (555) 567-8901",
      distance: "4.2 miles",
      rating: 4.3,
      hours: "9:00 AM - 5:00 PM",
      status: "Open",
      inventory: {
        "A+": 19, "A-": 11, "B+": 35, "B-": 5,
        "AB+": 16, "AB-": 3, "O+": 42, "O-": 7
      },
      services: ["Donation", "Testing"],
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bank.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "open") return matchesSearch && bank.status === "Open"
    if (selectedFilter === "24h") return matchesSearch && bank.hours === "24/7"
    if (selectedFilter === "emergency") return matchesSearch && bank.services.includes("Emergency")
    
    return matchesSearch
  })

  const getStockStatus = (units: number) => {
    if (units >= 50) return { status: "Excellent", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" }
    if (units >= 30) return { status: "Good", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20" }
    if (units >= 15) return { status: "Low", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/20" }
    return { status: "Critical", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/20" }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Find Blood Banks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Locate nearby blood banks and check real-time blood availability
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blood banks by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Blood Banks</option>
                <option value="open">Currently Open</option>
                <option value="24h">24/7 Available</option>
                <option value="emergency">Emergency Services</option>
              </select>
              <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Found {filteredBloodBanks.length} blood banks near you
          </p>
        </div>

        {/* Blood Banks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBloodBanks.map((bank) => (
            <div key={bank.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Bank Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {bank.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{bank.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{bank.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{bank.hours}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                      bank.status === "Open" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}>
                      {bank.status}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{bank.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {bank.distance}
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {bank.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blood Inventory */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Blood Availability
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(bank.inventory).map(([type, units]) => {
                    const stockInfo = getStockStatus(units)
                    return (
                      <div key={type} className={`p-3 rounded-lg ${stockInfo.bg}`}>
                        <div className="text-center">
                          <div className={`font-bold text-lg ${stockInfo.color}`}>
                            {type}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {units}
                          </div>
                          <div className={`text-xs ${stockInfo.color}`}>
                            {stockInfo.status}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Request Blood</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <Navigation className="h-4 w-4" />
                    <span>Directions</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBloodBanks.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No blood banks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}