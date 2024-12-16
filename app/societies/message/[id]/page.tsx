'use client';  // Ensuring this is client-side

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';  // Correct hook for dynamic routing in the App Directory
import partners from '../../partners';

export default function MessagePage() {
  const [message, setMessage] = useState('');
  const [partner, setPartner] = useState<any>(null); // Store partner details
  const { id } = useParams(); // Use useParams for dynamic routing to get the dynamic id from the URL
  const pathname = usePathname(); // Optional: Useful for debugging to know the current path

  // Load partner information based on the id
  useEffect(() => {
    if (id) {
      const partnerData = partners.find((partner) => partner.id.toString() === id);
      setPartner(partnerData);  // Set partner data when id is available
    }
  }, [id]);  // Only run this effect when the id changes

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here we should send the message to the backend, but for now, we'll just redirect
    window.location.href = '../thank-you';  // Simple redirect as fallback (you can also use a Next.js navigation method)
  };

  if (!partner) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] p-10">
        <h1 className="text-4xl font-semibold text-center text-white mb-10">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] p-10">
      {/* Adjust the header to be a fixed distance from the top */}
      <h1 className="absolute top-20 text-4xl font-semibold text-center text-white">
        Send a Message to {partner.name}
      </h1>

      <div className="p-6 mt-32 rounded-lg max-w-[48rem] w-full border-2 bg-transparent border-transparent">  {/* Adjusted for spacing */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-full">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-white placeholder-gray-500 bg-transparent"  
              placeholder="Your Message" 
            />
          </div>

          <div className="flex justify-end items-center mt-4">  {/* Aligns the button to the right */}
            <button
              type="submit"
              className="bg-transparent text-white py-2 px-6 rounded-lg border-2 border-[#3c82f6] hover:bg-blue-900"  
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
