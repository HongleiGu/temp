'use client';

// note for improvement, use suspense or similar library to handle initial loading of tags, as it shows an unpleasent
// unknown(number) value, while the tags are loaded in in the initial render. It only shows for less than a second however. 
// You can also just remove the fetch-predefined-tags component and couple the logic where it is needed.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/components/button';
import UserEventsList from '../components/account/user-events-list';
import AccountFields from '../components/account/account-fields';
import AccountLogo from '../components/account/account-logo';
import ForgottenPasswordModal from '../components/login/reset-password-modal';


export default function AccountPage() {
	const [showForgottenPasswordModal, setShowForgottenPasswordModal] = useState(false);
	const { data: session, status } = useSession()

	const router = useRouter()

	useEffect(() => {
		if (status === 'loading') return;
		if (!session) router.push('/login');
	}, [session, status, router]);

	const handleForgottenPasswordPress = () => {
		setShowForgottenPasswordModal(true);
	}
	

	if (status === 'loading') {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Loading your account details...</p>
			</div>
		)
	}

	if (session) {
		const { user } = session;
		console.log(session);

		return (
			<div className="min-h-screen flex flex-col justify-start p-10 bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] overflow-x-hidden">
				<h1 className="text-4xl font-semibold mb-6">Your account</h1>

				<div className="border-b border-gray-300 pb-4 ml-4 mb-10 space-y-6">
					<h2 className="text-2xl italic mb-2 ml-2">Your details</h2>
					{ user.role==='organiser' && < AccountLogo id={user.id} role={user.role}/> }
					<p className="text-sm">
						<span className="mr-10 font-semibold">Name:</span> {user?.name || 'Test User'}
					</p>
					<p className="text-sm">
						<span className="mr-10 font-semibold">Email:</span> {user?.email || 'test@lsn.co.uk'}
					</p>
					<p className="text-sm capitalize">
						<span className="mr-12 font-semibold">Role:</span> {user?.role || 'user'}
					</p>
					{ user.role==='organiser' && < AccountFields id={user.id} role={user.role}/> }
				</div>

				<div className="border-b border-gray-300 pb-4 ml-4 mb-10 space-y-6">
					<h2 className="text-2xl italic mb-2 ml-2">Your events</h2>
					{/* <p className="text-sm italic text-gray-300 ml-20 w-full">Coming Soon</p> */}
					<UserEventsList user_id={user.id} />
				</div>

				<div className="flex justify-end self-end space-x-2">
					<Button
						variant='filled'
						className="bg-sky-600 hover:bg-sky-800 text-white py-2 px-4 rounded-full"
						onClick={handleForgottenPasswordPress}
					>
						Reset Your Password
					</Button>
					<Button
						variant='filled'
						className="bg-red-600 hover:bg-red-900 text-white py-2 px-4 rounded-full"
						onClick={() => router.push('/logout')}
					>
						Sign Out
					</Button>
				</div>
				{showForgottenPasswordModal && (
					<ForgottenPasswordModal
						onClose={() => setShowForgottenPasswordModal(false)}
					/>
				)}
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
