"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link'
import Image from 'next/image';
import AnimatedMenuButton from './homepage/header-menu-button';
import { motion } from 'framer-motion';
import AuthButton from './auth-button';


export default function Header() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [headerHeight, setHeaderHeight] = useState(0);
	// const { data: session } = useSession();

	useEffect(() => {
		const header = document.querySelector('header');
		if (header) {
			setHeaderHeight(header.clientHeight);
		}
	}, []);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header className="sticky top-0 left-0 w-full  backdrop-blur-lg border-b-2 border-gray-300 border-opacity-25 flex justify-between items-center px-8 shadow-md text-white bg-blue-700 bg-opacity-25 z-50">
			<Link href='/' onClick={closeMenu} className="flex items-center space-x-2">
				<Image src='/logo/LSN LOGO 1.png' alt='LSN logo' width={20} height={20} className='w-16 md:w-24'/>
				{/* <img src='/logo/LSN LOGO 1.png' alt='LSN logo' className="w-16 md:w-24" /> */}
			</Link>

			<NavLinks pathname={pathname} className="hidden md:flex space-x-8" />

			{/* <div className="flex items-center space-x-4">
				<Link href='/login' className='hidden md:block py-2 px-4 rounded-lg shadow-lg text-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-blue-800'>
					Sign In
				</Link>

				<AnimatedMenuButton onClick={toggleMenu} isActive={isMenuOpen} className='md:hidden' />
			</div> */}

			<div className="flex items-center space-x-4">
				{/* {session?.user ? (
					<Link href='/login' className='hidden md:block py-2 px-4 rounded-lg shadow-lg text-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-blue-800'>
						Sign Out
					</Link>
				) : */}
					{/* <Link href='/login' className='hidden md:block py-2 px-4 rounded-lg shadow-lg text-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-blue-800'>
						Sign In
					</Link> */}
				{/* } */}
				<AuthButton />
				<AnimatedMenuButton onClick={toggleMenu} isActive={isMenuOpen} className='md:hidden' />
			</div>

			{/* {isMenuOpen && (
				<motion.div
					initial={{ x: "100%" }}
					animate={isMenuOpen ? { x: "0%" } : { x: "100%" }}
					exit={{ x: "100%" }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="fixed top-0 right-0 w-3/4 h-screen bg-slate-800 text-white p-8 border-t-2 border-gray-300 border-opacity-25 space-y-8 flex flex-col shadow-lg z-40 md:hidden"
					style={{ top: headerHeight }}
				>
					<NavLinks pathname={pathname} onClick={closeMenu} className="flex flex-col space-y-4" />

					<div className="border-t border-gray-600 my-4" />

					<Link href='/login' onClick={closeMenu} className='py-2 px-4 mt-auto text-xl w-full text-center'>
						Sign In
					</Link>
				</motion.div>
			)} */}
			{isMenuOpen && (
				<SideMenu closeMenu={closeMenu} headerHeight={headerHeight} pathname={pathname} />
			)}

		</header>
	);
}

function NavLinks({ pathname, className, onClick }: { pathname: string, className?: string, onClick?: () => void }) {
	return (
		<nav className={clsx(className, "text-white")}>
			<Link href="/events" onClick={onClick} className={clsx(
				pathname === '/events' ? 'underline' : 'no-underline',
				'hover:underline transition-all md:text-xl'
			)}>
				Events
			</Link>
			<Link href="/about" onClick={onClick} className={clsx(
				pathname === '/about' ? 'underline' : 'no-underline',
				'hover:underline transition-all md:text-xl'
			)}>
				About
			</Link>
			<Link href="/contact" onClick={onClick} className={clsx(
				pathname === '/contact' ? 'underline' : 'no-underline',
				'hover:underline transition-all md:text-xl'
			)}>
				Contact Us
			</Link>
		</nav>
	);
}



function SideMenu({ closeMenu, headerHeight, pathname }: { closeMenu: () => void, headerHeight: number, pathname: string }) {
	return (
		<motion.div
			initial={{ x: "100%" }}
			animate={{ x: "0%" }}
			exit={{ x: "100%" }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className="fixed top-0 right-0 w-3/4 h-screen bg-slate-800 text-white p-8 border-t-2 border-gray-300 border-opacity-25 space-y-8 flex flex-col shadow-lg z-40 md:hidden"
			style={{ top: headerHeight }}
		>
			<NavLinks pathname={pathname} onClick={closeMenu} className="flex flex-col space-y-4" />

			<div className="border-t border-gray-600 my-4" />
			{/* {session?.user ? (
				<Link href='/login' className='py-2 px-4 mt-auto text-xl w-full text-center text-red-900'>
					Sign Out
				</Link>
			) :
			} */}
			<Link href='/login' onClick={closeMenu} className='py-2 px-4 mt-auto text-xl w-full text-center'>
				Sign In
			</Link>
		</motion.div>
	)
}