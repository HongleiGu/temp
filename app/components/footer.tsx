'use client';
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Subscribed with: ${email}`);
    // Add your email submission logic here, such as calling an API
  };

  return (
    <footer className="bg-blue-700 bg-opacity-25 text-white px-8 py-4 border-t-2 border-gray-300 border-opacity-25">
      <div className="max-w-7xl mx-auto my-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Social Links */}
        <div className="flex space-x-8 mt-5 mb-5">
          <a href="https://www.instagram.com/lsn.uk/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={64}
              height={64}
              className="w-12 h-12"
            />
          </a>
          <a href="https://www.linkedin.com/company/london-student-network/mycompany" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Image
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              width={64}
              height={64}
              className="w-12 h-12"
            />
          </a>
          <a href="mailto:londonstudentnetwork@gmail.com" aria-label="Email">
            <Image
              src="/icons/mail.svg"
              alt="Email"
              width={64}
              height={64}
              className="w-12 h-12 mt-1"
            />
          </a>
        </div>

        <div className="flex flex-col items-center mt-3 mb-5">
            <h2 className="text-sm text-gray-700 text-center font-semibold">Copyright © 2024 London Student Network</h2>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center">
          {/* Newsletter Heading */}
          <h2 className="text-lg text-gray-700 font-semibold mb-2 mt-2">SUBSCRIBE TO OUR NEWSLETTER</h2>

          {/* SVG Container with Input Field Inside */}
          <form onSubmit={handleSubmit} className="relative mb-5">
            {/* SVG Shape */}
            <Image
              src="/icons/subscribe-button.svg"
              alt="Newsletter Shape"
              width={320}
              height={80}
              className="block"
            />

            {/* Email Input Field */}
            <input
              type="email"
              placeholder="EMAIL"
              className="absolute text-xl left-10 top-0 w-64 py-3 px-4 text-gray-600 bg-transparent border-none outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Submit Button with Arrow */}
            <button
              type="submit"
              className="absolute right-2 top-3 font-bold bg-transparent text-gray-700 text-xl">
              →
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
