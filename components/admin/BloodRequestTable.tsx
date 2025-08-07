"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PackagePlus, FileText } from "lucide-react";
import axios from "axios"; // Import axios

// Interface for an approved donation request
interface ApprovedRequest {
  id: string;
  donor: string;
  donorBloodType: string;
  status: "approved"; // Status will always be 'approved'
  createdAt: string;
}

/**
 * A React component that fetches and displays a table of approved donation requests using axios.
 */
export default function ApprovedRequestsTable() {
  const [approvedRequests, setApprovedRequests] = useState<ApprovedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Effect to fetch data when the component mounts
  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        // Fetching approved donation requests from the specific endpoint using axios
        const response = await axios.get("https://bank-back-rni1.onrender.com/getBloodRequests", {
          withCredentials: true, // Necessary for cookie-based authentication
        });

        const body = response.data;
        
        if (!body.success) {
            throw new Error(body.message || "Failed to fetch approved requests.");
        }

        setApprovedRequests(body.data || []);

      } catch (err: any) {
        console.error("Error fetching approved requests:", err);
        // Handle axios-specific errors or general errors
        if (axios.isAxiosError(err)) {
            setError(err.response?.data?.error || err.message || "An error occurred while fetching data.");
        } else {
            setError(err.message || "An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedRequests();
  }, [router]); // Re-run if the router object changes

  // Handler for viewing request details
  const handleViewDetails = (id: string) => {
    console.log("Viewing details for:", id);
    
  };

  // Handler for creating a blood unit from an approved request
  const handleCreateUnit = (id: string) => {
    console.log("Creating blood unit from request:", id);
    // Here you would typically open a modal or navigate to a form
    // to create a new blood unit record based on this approved donation.
  };

  // Loading state UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500" />
        <p className="ml-4 text-gray-600 dark:text-gray-300">Loading Approved Requests...</p>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">{error}</div>;
  }
  
  // Empty state UI
  if (approvedRequests.length === 0) {
      return (
          <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">No Approved Requests</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">There are currently no donation requests that have been approved.</p>
          </div>
      )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Donor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Blood Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date Approved</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {approvedRequests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{req.donor}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{req.donorBloodType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(req.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <button 
                  onClick={() => handleViewDetails(req.id)} 
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
                  title="View Details"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  View
                </button>
                <button 
                  onClick={() => handleCreateUnit(req.id)} 
                  className="inline-flex items-center text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                  title="Create Blood Unit"
                >
                  <PackagePlus className="h-4 w-4 mr-1" />
                  Create Unit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
