"use client"

import { usePathname } from "next/navigation"
import clsx from 'clsx'
import Link from "next/link";

export default function Header() {
	const pathname = usePathname();

	return (
		<header className="bg-teal-950 flex justify-between items-center px-8 py-4 shadow-md  text-black">
			<Link href='/' className="flex items-center space-x-2">
				<img src='/logo/LSN LOGO 1.png' alt='LSN logo' className="w-16" />
			</Link>

			<NavLinks pathname={pathname} />

			<div>
				<button className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300">
					Sign Up / Log In
				</button>
			</div>
		</header>
	)
}

function NavLinks({ pathname }: { pathname: string }) {
	return (
		<nav className="hidden md:flex space-x-6 text-white">
			<Link href="/about" className={clsx(
				pathname === '/about' ? 'underline' : 'no-underline',
				'hover:underline transition-all'
			)}>
				about
			</Link>
			<Link href="/menu" className={clsx(
				pathname === '/menu' ? 'underline' : 'no-underline',
				'hover:underline transition-all'
			)}>
				our menu
			</Link>
			<Link href="/contact" className={clsx(
				pathname === '/contact' ? 'underline' : 'no-underline',
				'hover:underline transition-all'
			)}>
				contact us
			</Link>

		</nav>
	);
}