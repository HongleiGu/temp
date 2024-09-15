"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { logout } from '@/app/lib/actions';

export default function AuthButton() {
	const [session, setSession] = useState<any>(null);


	useEffect(() => {
		// Fetch session data from the API
		async function fetchSession() {
			const res = await fetch('/api/auth/session');
			const data = await res.json();
			setSession(data);
		}

		fetchSession();
	}, []);

	const signUserOut = async () => {
		await logout()
	}

	return (
		<>
			{session?.user ? (
				<Link href="/logout" className="py-2 px-4 text-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-red-800 border-2 border-black">
					Sign Out
				</Link>
			) : (
				<Link href="/login" className="py-2 px-4 text-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-blue-800">
					Sign In
				</Link>
			)}
		</>
	);
}
