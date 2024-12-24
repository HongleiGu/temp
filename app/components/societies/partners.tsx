import { FormattedPartner } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

function Partners({ filteredPartners }: { filteredPartners: FormattedPartner[] }) {
    console.log(filteredPartners);
    return (
        <>
          {filteredPartners.map((partner: FormattedPartner) => (
            <div key={partner.id} className="bg-transparent p-6 rounded-lg flex flex-row items-centre justify-between border-2 border-blue-100 min-w-[800px]">
              {/* Left Side: Partner Info */}
              <div className="flex flex-col space-y-4 w-2/3 pr-4 relative">
                {/* Partner Name */}
                <h2 className="text-2xl font-medium text-white">{partner.name}</h2>
      
                {/* Description */}
                <p className="text-gray-200">{partner.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 absolute bottom-[-10px] left-0">
                  {partner.keywords.map((tag, index) => (
                  <span
                      key={index}
                      className="text-white px-2 py-1 rounded-full text-[10px] shadow-lg hover:cursor-default"
                      style={{
                        backgroundColor: '#1A4E85', // Lighter background color than card background
                      }}
                  >
                      {tag}
                  </span>
                  ))}
                </div>      
              </div> 
      
              {/* Vertical Line Divider */}
              <div className="border-l-2 border-gray-300 h-full mx-4"></div>
      
              {/* Right Side: Logo and Links */}
              <div className="flex flex-col items-start space-y-4 w-1/3 relative">
                {/* Logo */}
                <div className="w-32 h-32 relative mb-5 ml-12  mt-[5px]">
                  <Image
                    src={partner.logo && partner.logo !== '' ? partner.logo : '/images/no-image-found.png'}
                    alt={partner.name}
                    width={200}
                    height={200}
                    objectFit="contain"
                    className="object-contain"
                  />
                </div>
      
                {/* Links */}
                <div className="flex items-center gap-4 relative bottom-[-10px] justify-center w-full pr-10">

                    <Link href={`/societies/message/${partner.id}`} passHref>
                        <button className="bg-transparent text-white py-2 px-4 rounded-lg hover:bg-[#083157] transition text-sm mr-0">
                            <div className='flex'>
                                <p className="mt-[6px]">Message</p>
                                <Image
                                    src='/icons/send-icon-6851743_1920-removebg-preview.png'
                                    alt='send icon'
                                    width={32}
                                    height={32}
                                    objectFit="contain"
                                    className="object-contain"
                                />    
                            </div>
                        </button>
                    </Link>

                    {partner.website && partner.website !== 'No website available' && ( 
                        <a
                        href={partner.website.startsWith('http') ? partner.website : `https://${partner.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-400 px-4 py-2 rounded-lg transition text-sm"
                        >
                        Website
                        </a>
                    )}
    
                </div>
              </div>
            </div>
          ))}
        </>
      );
      
}

export default Partners;
