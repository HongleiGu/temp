'use client';

import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce'; // Install lodash.debounce if not already installed
import Link from 'next/link';
import fetchPartners from '../components/societies/partners';


export default function SocietyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [partners, setPartners] = useState([]);

  useEffect(() => {
	const fetch = async() => {
		const result = await fetchPartners();
		setPartners(result);
	}
	fetch();
  }, []);

  // Debounced function for handling input
  const handleInputChange = useMemo(
    () =>
      debounce((value) => {
        setSearchQuery(value.toLowerCase());
      }, 300),
    []
  );

  // Filter partners based on searchQuery
  const filteredPartners = useMemo(() => {
    if (!searchQuery) return partners;
    return partners.filter((partner) =>
      partner.name.toLowerCase().includes(searchQuery) ||
      partner.keywords.some((keyword: string) =>
        keyword.toLowerCase().includes(searchQuery)
      )
    );
  }, [searchQuery]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] p-10 relative">
      <div className="flex flex-row items-center justify-between w-full max-w-[1000px] mb-10"> {/* Flex-row container */}
        <h1 className="text-4xl font-semibold text-white">Our Partners</h1>
        
        {/* Search Box */}
        <div className="relative flex items-center w-[100px] sm:w-[100px] md:w-[200px] lg:w-[300px] transition-all duration-100 ease-in-out bg-transparent backdrop-blur-lg bg-opacity-30 rounded-lg">
          <input
            type="text"
            placeholder="Search partners..."
            className="rounded-full border-[1px] border-white bg-transparent px-6 py-3 w-[300px] min-w-[50px] text-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-[250px] md:w-[300px]"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
      </div>

      {/* Partners List */}
      <div className="flex flex-col space-y-8 w-full max-w-[1000px] overflow-x-auto mt-16"> {/* Added margin-top to avoid overlap */}
        {filteredPartners.length > 0 ? (
          filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-transparent p-6 rounded-lg flex flex-row items-center justify-between border-2 border-blue-100 min-w-[800px]"
            >
              {/* Left Side: Partner Info */}
              <div className="flex flex-col space-y-4 w-2/3 pr-4">
                <h2 className="text-2xl font-medium text-white">{partner.name}</h2>
                <p className="text-white">{partner.keywords.join(', ')}</p>
                <p className="text-gray-200">{partner.description}</p>
              </div>

              {/* Vertical Line Divider */}
              <div className="border-l-2 border-gray-300 h-full mx-4"></div>

              {/* Right Side: Logo and Links */}
              <div className="flex flex-col items-center space-y-4 w-1/3">
                <div className="w-24 h-24">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Link 
                    href={partner.website} 
                    className="text-white hover:text-gray-400 px-[-2] transition w-32 inline-block text-center"
                  >
                    Visit Website
                  </Link>
                  <Link href={`/societies/message/${partner.id}`} passHref>
                    <button className="bg-[#064580] text-white py-2 px-2 rounded-lg hover:bg-[#083157] transition w-32">
                      Message
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No partners match your search.</p>
        )}
      </div>
    </main>
  );
}
