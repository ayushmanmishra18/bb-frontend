"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

interface DonationRequest {
  id: string;
  donor: string;
  donorBloodType: string;
  status: "pending" | "approved" | "rejected" | "completed" | "success" | "cancelled";
  createdAt: string;
}

interface Summary {
  pending: number;
  approved: number;
  rejected: number;
  completed: number;
  success: number;
  cancelled: number;
}

export default function DonationRequestsTable() {
  const [donations, setDonations] = useState<DonationRequest[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const notify=()=>{
    toast('donation accepted!');
  }

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("https://bank-back-rni1.onrender.com/getDonations", {
          credentials: "include",
        });

        const body = await res.json();
        console.log(body)
        if (!res.ok) throw new Error(body.error || "Failed to fetch donation requests");

        setDonations(body.data || []);
        setSummary(body.summary || null);
      } catch (err: any) {
        console.error("Error fetching donations:", err);
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [router]);

  const getStatusBadge = (status: DonationRequest["status"]) => {
    const base = "inline-flex items-center px-2 py-1 text-xs rounded-full";
    const styles: Record<string, string> = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
      success: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-gray-200 text-gray-800",
    };
    return `${base} ${styles[status] || "bg-gray-100 text-gray-800"}`;
  };

  const getStatusIcon = (status: DonationRequest["status"]) => {
    const icons: Record<string, JSX.Element> = {
      approved: <CheckCircle className="mr-1 h-4 w-4 text-green-600" />,
      pending: <Clock className="mr-1 h-4 w-4 text-yellow-600" />,
      rejected: <XCircle className="mr-1 h-4 w-4 text-red-600" />,
      completed: <CheckCircle className="mr-1 h-4 w-4 text-blue-600" />,
      success: <CheckCircle className="mr-1 h-4 w-4 text-emerald-600" />,
      cancelled: <XCircle className="mr-1 h-4 w-4 text-gray-600" />,
    };
    return icons[status] || <AlertCircle className="mr-1 h-4 w-4 text-gray-600" />;
  };

  const handleApprove = (id: string) => {
    try{

    
    axios.post('http://localhost:5000/donations/accept',{
      donationRequestId:id,
      numberOfUnits:2,
      notes:"Approved Quickly",
      expiryDays:30
    },{
      withCredentials:true,
    })
    .then(response => {
  //taoster that request has been accepted 
     {notify}
     <ToastContainer /> 

       const certificateUrl=response.data?.data?.certificateUrl
       if(certificateUrl){
        const link=document.createElement('a');
        link.href=certificateUrl

        link.setAttribute('download','donation-certificate.pdf')
        document.body.appendChild(link)

        link.click()
        document.body.removeChild(link)
       }

      console.log("Donation approved:", response.data);

      // optionally trigger a toast or state update here
    })
  }catch(err){
    console.log(err);
  }
  };

  const handleReject = (id: string) => {
    console.log("Reject", id);
    // You can call API to reject here
  };

  const handleView = (id: string) => {
    console.log("View", id);
    // Optionally route to detail view
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500" />
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 p-4 rounded-lg text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(summary).map(([key, count]) => (
            <div key={key} className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
              <p className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-100">
                {key}
              </p>
              <p className="text-2xl font-bold text-red-600">{count}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requested At
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {donations.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {d.donor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {d.donorBloodType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(d.status)}>
                    {getStatusIcon(d.status)}
                    {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(d.createdAt).toLocaleDateString()}{" "}
                  {new Date(d.createdAt).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => handleView(d.id)} className="text-indigo-600 hover:text-indigo-900">
                    View
                  </button>
                  <button onClick={() => handleApprove(d.id)} className="text-green-600 hover:text-green-900">
                    Approve
                  </button>
                  <button onClick={() => handleReject(d.id)} className="text-red-600 hover:text-red-900">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
