"use client";

import { useState } from 'react';
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import Link from "next/link";

export default function Header() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<header className="fixed top-0 left-0 w-full bg-opacity-50 backdrop-blur-lg border-b-2 border-gray-300 border-opacity-25 flex justify-between items-center px-8 shadow-md text-white z-50">
			<Link href='/' className="flex items-center space-x-2">
				<img src='/logo/LSN LOGO 1.png' alt='LSN logo' className="w-16 md:w-24" />
			</Link>

			<NavLinks pathname={pathname} className="hidden md:flex" />

			<div className="flex items-center space-x-4">
				<Link href='/signin' className='py-2 px-4 rounded-lg shadow-lg text-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-blue-800'>
					Sign In
				</Link>

				<button onClick={toggleMenu} className="md:hidden p-2" >
					<img src="/icons/menu.svg" alt="Menu Icon" className="w-6 h-6" />
				</button>
			</div>

			{isMenuOpen && (
				<div className="absolute top-16 right-8 p-6 rounded-lg shadow-lg">
					<NavLinks pathname={pathname} className="flex flex-col space-y-4" />
				</div>
			)}
			
		</header>
	);
}

function NavLinks({ pathname, className }: { pathname: string, className?: string }) {
	return (
		<nav className={clsx(className, "space-x-8 text-white")}>
			<Link href="/events" className={clsx(
				pathname === '/events' ? 'underline' : 'no-underline',
				'hover:underline transition-all md:text-xl'
			)}>
				Events
			</Link>
			<Link href="/about" className={clsx(
				pathname === '/about' ? 'underline' : 'no-underline',
				'hover:underline transition-all md:text-xl'
			)}>
				About
			</Link>
			<Link href="/contact" className={clsx(
				pathname === '/contact' ? 'underline' : 'no-underline',
				'hover:underline transition-all md:text-xl'
			)}>
				Contact Us
			</Link>
		</nav>
	);
}

