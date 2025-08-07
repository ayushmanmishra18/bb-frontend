'use client';

const compatibility: Record<string, string[]> = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], // Universal donor
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"], // Universal receiver
};

export default function BloodCompatibilityPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-6">
          🩸 Blood Type Compatibility
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Know which blood types are compatible for donation. This helps to save lives by ensuring the right match!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(compatibility).map(([donor, recipients]) => (
            <div key={donor} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <h2 className="text-2xl font-semibold text-red-400 mb-2">
                Donor: {donor}
              </h2>
              <p className="text-gray-300">Can donate to:</p>
              <ul className="list-disc list-inside mt-2 text-gray-200">
                {recipients.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
