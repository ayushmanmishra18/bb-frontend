"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Patient interface to ensure type safety
interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  BloodBank: string;
  BloodType: string;
  city: string;
  status: boolean;
}

export default function PatientListPage() {
  const [cityFilter, setCityFilter] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

   // Fetch patients when component mounts or cityFilter changes
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        // If a city is entered, call the search by city endpoint
        if (cityFilter) {
          response = await axios.get("https://bank-back-rni1.onrender.com/getByCity", {
            params: {
              field: 1,
              city: cityFilter.toLowerCase(),
              match: "startsWith",
            },
          });
        } else {
          // If no city filter, fetch all patients from the main endpoint
          response = await axios.get("https://bank-back-rni1.onrender.com/patientDetail");
        }

       // Inside your fetchPatients function, after getting response.data:
const apiResponseData = response.data;
let patientsData: Patient[] = [];

// Handle different API response structures
if (Array.isArray(apiResponseData)) {
  patientsData = apiResponseData;
} else if (apiResponseData && Array.isArray(apiResponseData.patients)) {
  patientsData = apiResponseData.patients;
} else if (apiResponseData && apiResponseData.success && Array.isArray(apiResponseData.data)) {
  patientsData = apiResponseData.data;
} else {
  setError(
    apiResponseData.message ||
      "No patients found. The API response was not in the expected format."
  );
  patientsData = [];
}

setPatients(patientsData);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to fetch patients. Please check if your backend server is running correctly.");
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [cityFilter]); // The effect re-runs whenever cityFilter changes

  const handleDonateClick = (patient: Patient) => {
    // Post a donation request to the backend
    axios
      .post(
        "https://bank-back-rni1.onrender.com/donate",
        {
          patientId:String( patient.id),
          urgencyLevel: "high",
          requiredUnits: 2,
          notes: "Needs quickly",
          preferredDate: new Date().toISOString(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Success:", res.data);
        // Redirect to the donation confirmation page
        router.push(
          `/donationconfirm?patientName=${encodeURIComponent(
            patient.name
          )}&bloodType=${encodeURIComponent(patient.BloodType)}`
        );
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        // Display a user-friendly error message
        setError("Failed to process donation. Please try again.");
      });
  };

  const getBloodTypeColor = (bloodType: string) => {
    const colors: { [key: string]: string } = {
      'A+': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'A-': 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      'B+': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'B-': 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'AB+': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'AB-': 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'O+': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'O-': 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    };
    return colors[bloodType] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Patients Needing Blood Donations
          </h1>
          <div className="flex justify-center mt-4">
           <a
              href="/bloodcompatibilty"
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 transition"
            >
              🩸 Check Blood Compatibility
            </a>
          </div>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Find and help patients in need of blood donations
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Search by city..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 max-w-2xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        ) : patients.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {patients.map((patient, idx) => (
              <div
                key={patient.email + patient.phone + idx}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{patient.name}</h3>
                      <div className="mt-1 flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBloodTypeColor(patient.BloodType)}`}>
                          {patient.BloodType}
                        </span>
                      </div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                      <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{patient.city}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{patient.phone}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{patient.BloodBank}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleDonateClick(patient)}
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No patients found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {cityFilter
                ? `No patients found in ${cityFilter}. Try another city.`
                : "There are currently no patients registered in the system."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
