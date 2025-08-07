"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import { FiSearch, FiPhone, FiMapPin } from "react-icons/fi";

interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  BloodBank: string;
  BloodType: string;
  city: string;
  status: boolean;
}

export default function DonorListPage() {
  const [cityFilter, setCityFilter] = useState("");
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = cityFilter.trim() 
        ? `https://bank-back-rni1.onrender.com/getByCity?field=2&city=${encodeURIComponent(cityFilter.toLowerCase())}&match=startsWith`
        : 'https://bank-back-rni1.onrender.com/donorDetail';
      
      console.log('Fetching donors from:', url);
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      
      let donorsData = [];
      if (Array.isArray(response.data)) {
        donorsData = response.data;
      } else if (response.data.data) {
        donorsData = response.data.data || [];
      } else if (response.data.donors) {
        donorsData = response.data.donors;
      }
      
      console.log('Processed donors data:', donorsData);
      setDonors(donorsData);

      if (donorsData.length === 0) {
        setError(cityFilter ? `No donors found in ${cityFilter}` : "No donors available");
      }
    } catch (err) {
      console.error("Error fetching donors:", err);
      setError("Failed to fetch donors. Please try again.");
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cityFilter === "" || cityFilter.length >= 2) {
        fetchDonors();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cityFilter]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Find Blood Donors
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {cityFilter 
                ? `Searching donors in ${cityFilter}`
                : "Search for blood donors by city or view all available donors"}
            </p>
          </div>
          
        </div>

        <div className="mb-8 relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by city..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-lg shadow mb-6">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        ) : donors.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No donors found
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {cityFilter
                ? `No donors found in ${cityFilter}`
                : "There are currently no donors registered in the system."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {donors.map((donor) => (
              <div key={donor.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-md transition-shadow">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {donor.name}
                        </h3>
                        <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full">
                          {donor.BloodType}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiMapPin className="mr-1.5 h-4 w-4" />
                        <span>{donor.city}</span>
                        <span className="mx-2">•</span>
                        <span>{donor.BloodBank}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <a
                      href={`tel:${donor.phone}`}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 text-sm font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                    >
                      <FiPhone className="mr-1.5 h-4 w-4" />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}