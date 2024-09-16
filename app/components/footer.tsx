'use client';
import Link from 'next/link';
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
		<footer className="bg-blue-600/25 text-white px-8 py-4 border-t-2 border-gray-300 border-opacity-25">
			<div className="mx-auto my-auto flex flex-col sm:flex-row justify-between items-center h-full space-y-6 sm:space-y-0">

				{/* Social Links */}
				<div className="flex flex-row my-5 mx-4 justify-between space-x-8">


					<Link href="https://www.instagram.com/lsn.uk/" target="_blank" rel="noreferrer" aria-label="Instagram">
						<Image
							src="/icons/instagram.svg"
							alt="Instagram"
							width={24}
							height={24}
							className="w-6 h-6"
						/>
					</Link>
					<Link href="https://www.linkedin.com/company/london-student-network/mycompany" target="_blank" rel="noreferrer" aria-label="LinkedIn">
						<Image
							src="/icons/linkedin.svg"
							alt="LinkedIn"
							width={24}
							height={24}
							className="w-6 h-6"
						/>
					</Link>
					<Link href="mailto:londonstudentnetwork@gmail.com" aria-label="Email">
						<Image
							src="/icons/mail.svg"
							alt="Email"
							width={24}
							height={24}
							className="w-6 h-6 mt-1"
						/>
					</Link>
				</div>

				<div className="hidden md:flex flex-col mt-3 mb-5 flex-end">
					<h2 className="text-sm text-white/70 text-center font-semibold">Copyright © 2024 London Student Network</h2>
				</div>

				{/* Newsletter Subscription */}
				<div className="flex flex-col items-center justify-end">
					<h2 className="w-full text-start text-sm lg:text-md text-white font-semibold mb-2 mt-2">SUBSCRIBE TO OUR NEWSLETTER</h2>
					<form onSubmit={handleSubmit} className="flex items-center h-auto">
						<input
							type="email"
							placeholder="Enter your email"
							className="h-full px-4 py-2 bg-transparent text-white outline-none ring-2 ring-white/20"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<button
							type="submit"
							className="h-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							→
						</button>
					</form>

				</div>
			</div>
		</footer>
	);
}
