"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function DonationConfirmationPage() {
  const searchParams = useSearchParams();
  const patientName = searchParams.get("name");
  const bloodType = searchParams.get("bloodType");

  useEffect(() => {
    toast.success("Donation registered successfully!", { duration: 3000 });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-50 dark:from-gray-950 dark:to-gray-900 px-6 py-12">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-red-200 dark:border-gray-700 p-0 overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Hero Message */}
        <div className=" w-full md:w-1/2 p-8 flex flex-col justify-center text-center">
          <h1 className="text-4xl font-bold text-red-700 dark:text-red-400 mb-4">
            🎉 Thank You, Hero!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Your donation will help{" "}
            <span className="font-semibold text-red-800 dark:text-red-300">
              {patientName || "a patient in need"}
              {bloodType && ` (${bloodType})`}
            </span>
            . You're a lifesaver!
          </p>
        </div>

        {/* Right Section - Info Blocks */}
        <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6 bg-white dark:bg-gray-800">
          <div className="border border-red-100 dark:border-red-900 rounded-xl p-4 bg-red-50 dark:bg-gray-700">
            <h2 className="text-xl font-semibold text-red-500 dark:text-red-300 mb-2">🩸 What to Expect</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
              <li>Only ~10 minutes of your time.</li>
              <li>Bring your ID and donor card.</li>
              <li>Stay hydrated and eat beforehand.</li>
            </ul>
          </div>

          <div className="border border-green-100 dark:border-green-900 rounded-xl p-4 bg-green-50 dark:bg-green-900">
            <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">✅ Quick Precautions</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-100 space-y-1">
              <li>Don’t donate on an empty stomach.</li>
              <li>Mention any recent illnesses or medication.</li>
              <li>Avoid strenuous activity post-donation.</li>
            </ul>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 pt-2">
            Please visit the nearest blood bank to complete your donation. <br />
            <span className="font-medium text-red-600 dark:text-red-400">
              One donation can save up to three lives!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
