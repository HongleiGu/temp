"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './dropdown';
import { UserCircleIcon } from '@heroicons/react/24/outline';


export default function AccountButton() {
	const { data: session } = useSession()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center focus:outline-none">
					<UserCircleIcon className="h-10 w-10 text-white [&>path]:stroke-[0.7] " />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="bg-white text-black p-2 transition-all duration-300 ease-out transform scale-95 opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100"
			>
				{session?.user ? (
					<>
						<DropdownMenuItem asChild>
							<Link href="/account" className="py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 rounded-md">
								My Account
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/logout" className="py-2 px-4 text-lg text-red-600 hover:bg-blue-100 rounded-md">
								Sign Out
							</Link>
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem asChild>
							<Link href="/sign" className="py-2 px-4 text-lg text-blue-600 hover:bg-blue-100 rounded-md">
								Sign In
							</Link>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}