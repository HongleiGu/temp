import { FormattedPartner } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

function Partners({ filteredPartners }: { filteredPartners: FormattedPartner[] }) {
	return (
		<>
			{filteredPartners.map((partner: FormattedPartner) => (
				<div key={partner.id} className="bg-transparent p-6 rounded-lg flex flex-col md:flex-row items-center justify-center md:justify-between border-2 border-blue-100">
					{/* Left Side: Partner Info */}
					<div className="flex flex-col space-y-4 w-2/3 md:pr-4 justify-between">

						<div className="flex flex-col space-y-4">
							{/* Partner Name */}
							<h2 className="text-2xl font-medium text-center md:text-left  text-white">{partner.name}</h2>

							{/* Description */}
							<p className="text-gray-200">{partner.description}</p>
						</div>

						{/* Tags */}
						<div className="flex flex-wrap gap-2 left-0">
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
					<div className="flex flex-col items-center space-y-4 w-1/3 relative">
						{/* Logo */}
						<div className="w-32 h-32 relative mb-5  mt-[5px]">
							<Image
								src={partner.logo && partner.logo !== '' ? partner.logo : '/images/no-logo-found.jpg'}
								alt={partner.name}
								width={200}
								height={200}
								objectFit="contain"
								className="object-contain"
							/>
						</div>

						{/* Links */}
						<div className="flex flex-row items-center gap-4 relative bottom-[-10px] justify-center w-full mr-10">

							<Link href={`/societies/message/${partner.id}`} passHref>
								<button className="bg-transparent text-white py-2 px-4 rounded-lg hover:text-gray-400 transition text-sm mr-0">
									<div className='flex'>
										<p className="mt-[6px]">Message</p>
										<Image
											src='/icons/send-message-icon.png'
											alt='send icon'
											width={32}
											height={32}
											className="object-cover"
										/>
									</div>
								</button>
							</Link>

							{partner.website && partner.website !== 'No website available' && (
								<a
									href={partner.website.startsWith('http') ? partner.website : `https://${partner.website}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-white hover:text-gray-400 px-4 py-2 rounded-lg transition text-sm flex flex-row"
								>
									Website
									<Image
										src='/icons/web.png'
										alt='website icon'
										width={20}
										height={20}
										className=" ml-2 object-cover"
									/>
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
