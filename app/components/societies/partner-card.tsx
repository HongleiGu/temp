"use client"

import { FormattedPartner } from "@/app/lib/types"
import Image from "next/image"
import Link from "next/link"
import { formattedWebsite } from "@/app/lib/utils";
import PartnerTags from "./partner-tags";
import PartnerWebsite from "./partner-website";
import PartnerMessage from "./partner-message";

export default function PartnerCard({ partner, skeleton=false }:{ partner:FormattedPartner, skeleton: boolean }) {
  const handleMessageClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => { // turns message button into link
		e.preventDefault();
		e.stopPropagation();
		const url = `/societies/message/${id.toString()}`;

		const newTab = window.open(url, '_blank'); // open in new tab
		
		if (newTab) {
		  newTab.focus(); // focus on new tab
		}
	};

	const handleWebsiteClick = (e: React.MouseEvent<HTMLButtonElement>, website: string) => { // turns website button into link
		e.preventDefault();
		e.stopPropagation();
		window.open(formattedWebsite(website), '_blank'); // open in new tab
	};
  return (
      <>
          <Link
            className="flex flex-col p-4 rounded-sm shadow-lg relative transition-transform duration-300 ease-in-out hover:scale-105 bg-white" 
            href={`/societies/society/${partner.id}`} 
            passHref 
          >
            {/* <EventCardTags eventType={event.event_type} /> */}
            {/* logo */}
            <Image
				src={partner.logo && partner.logo !== '' ? partner.logo : '/images/no-logo-found.jpg'}
				alt={partner.name}
				width={200}
				height={200}
				className={`w-full h-40 object-contain mb-1 border border-black`}
			/>
            <div className="flex flex-col justify-between flex-grow">
              <div>
                {/* maybe we should make this scrollable? since description can be long */}
                <p className="text-gray-700 text-sm line-clamp-3 text-ellipsis">{partner.description}</p>
                <h3 className="text-slate-700 text-xl font-bold mt-2 mb-2 line-clamp-3">{partner.name}</h3>
              </div>
              <PartnerTags keywords={partner.keywords}/>
            </div>
            <div className="relative flex flex-row grid-cols-2 justify-between flex-grow">
              <PartnerWebsite
                handleWebsiteClick={handleWebsiteClick}
                partner={partner}
              />
              <PartnerMessage
                handleMessageClick={handleMessageClick}
                partner={partner}
              />
            </div>
          </Link>
        </>
    // <Link href={`/societies/society/${partner.id}`} key={partner.id} passHref className="transition-transform duration-300 ease-in-out hover:scale-95">
		// 		<div className="bg-transparent p-6 rounded-lg flex flex-col md:flex-row items-center justify-center md:justify-between border-2 border-blue-100">
		// 			{/* Left Side: Partner Info */}
		// 			<div className="flex flex-col space-y-4 w-2/3 md:pr-4 justify-between">

		// 				<div className="flex flex-col space-y-4">
		// 					{/* Partner Name */}
		// 					<h2 className="text-2xl font-medium text-center md:text-left  text-white">{partner.name}</h2>

		// 					{/* Description */}
		// 					<p className="text-gray-200 line-clamp-3 text-ellipsis">{partner.description}</p>
		// 				</div>

		// 				{/* Tags */}
		// 				<div className="flex flex-wrap gap-2 left-0">
		// 					{partner.keywords.map((tag, index) => (
		// 						<span
		// 							key={index}
		// 							className="text-white px-2 py-1 rounded-full text-[10px] shadow-lg hover:cursor-default"
		// 							style={{
		// 								backgroundColor: '#1A4E85', // Lighter background color than card background
		// 							}}
		// 						>
		// 							{tag}
		// 						</span>
		// 					))}
		// 				</div>
		// 			</div>

		// 			{/* Vertical Line Divider */}
		// 			<div className="border-l-2 border-gray-300 h-full mx-4"></div>

		// 			{/* Right Side: Logo and Links */}
		// 			<div className="flex flex-col items-center space-y-4 w-1/3 relative">
		// 				{/* Logo */}
		// 				<div className="w-32 h-32 relative mb-5  mt-[5px]">
		// 					<Image
		// 						src={partner.logo && partner.logo !== '' ? partner.logo : '/images/no-logo-found.jpg'}
		// 						alt={partner.name}
		// 						width={200}
		// 						height={200}
		// 						objectFit="contain"
		// 						className="object-contain"
		// 					/>
		// 				</div>

		// 				{/* Links */}
		// 				<div className="flex flex-col items-center gap-4 relative bottom-[-10px] justify-center w-full">
		// 					<button onClick={(e) => handleMessageClick(e, partner.id)} className="bg-transparent text-white py-2 px-4 rounded-lg hover:text-gray-400 transition text-sm mr-0">
		// 						<div className='flex'>
		// 							<p className="mt-[6px]">Message</p>
		// 							<Image
		// 								src='/icons/send-message-icon.png'
		// 								alt='send icon'
		// 								width={32}
		// 								height={32}
		// 								className="object-cover"
		// 							/>
		// 						</div>
		// 					</button>

		// 					{partner.website && partner.website !== 'No website available' && (
		// 						<button onClick={(e) => handleWebsiteClick(e, partner.website)} className="bg-transparent text-white py-2 rounded-lg hover:text-gray-400 transition text-sm mr-0">
		// 							<span className="text-white hover:text-gray-400 px-4 py-2 rounded-lg transition text-sm flex flex-row">
		// 								Website
		// 								<Image
		// 								src='/icons/web.png'
		// 								alt='website icon'
		// 								width={20}
		// 								height={20}
		// 								className=" ml-2 object-cover"
		// 								/>
		// 							</span>
		// 						</button>
		// 					)}
		// 				</div>
		// 			</div>
		// 		</div>
		// 		</Link>
  )
}

{/* <>
      <div 
        className="flex flex-col p-4 rounded-sm shadow-lg relative transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 bg-white" 
        onClick={handleCardClick}
      >
        <EventCardTags eventType={event.event_type} />
        <Image
          src={event.image_url}
          alt={event.title}
          width={200}
          height={40}
          className={`w-full h-40 ${event.image_contain ? 'object-contain' : 'object-cover'} mb-1 border border-black`}
        />
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <p className="text-gray-700 text-sm uppercase">{formatDateString(event.date)} |  {event.time}</p>
            <h3 className="text-slate-700 text-xl font-bold mt-2 mb-2 line-clamp-3">{event.title}</h3>
          </div>
          <div>
            <p className="text-gray-500 text-xs ">{event.location_area}</p>
            <p className="text-black text-right mt-2 truncate text-ellipsis">{event.organiser}</p>
          </div>
        </div>
      </div>
    </> */}