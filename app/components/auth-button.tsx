"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AuthButton() {

	const session = useSession();

	return (
		<>
			{session?.data?.user ? (
				<Link href="/logout" className="py-2 px-4 text-xl rounded-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-red-800">
					Sign Out
				</Link>
			) : (
				<Link href="/sign" className="py-2 px-4 text-xl rounded-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-blue-800">
					Sign In
				</Link>
			)}
		</>
	);
}
