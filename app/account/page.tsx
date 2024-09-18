'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/components/button';

export default function AccountPage() {
	const { data: session, status } = useSession({ required: true })
	const router = useRouter()

	useEffect(() => {
		if (!session && status === "authenticated") {
			signOut({ callbackUrl: '/login' });  // Force sign out because session is invalid
		}
	}, [session, status]);

	if (status === 'loading') {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Loading your account details...</p>
			</div>
		)
	}


	if (session) {
		const { user } = session;

		return (
			<div className="min-h-screen mx-auto p-8 bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157]">
				<h1 className="text-3xl font-semibold">Account Details</h1>
				<div className="mt-8 p-6 rounded-lg shadow-lg">
					<div className="flex items-center space-x-4">
						<div className="text-lg font-semibold">Welcome, {user?.name || 'undefined'}!</div>
					</div>
					<div className="mt-4">
						<p>
							<span className="font-medium">Email: </span>{user?.email || 'No email available'}
						</p>
						<p>
							<span className="font-medium">Role: </span>{user?.role || 'undefined'}
						</p>
					</div>
					<div className="mt-8">
						<Button variant='outline' size='lg' onClick={() => router.push('/events')}>
							View Events
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="text-center">
				<ExclamationCircleIcon className="h-10 w-10 text-red-500 mx-auto" />
				<p className="mt-2 text-lg">Something went wrong. Please try again later.</p>
			</div>
		</div>
	);
}
