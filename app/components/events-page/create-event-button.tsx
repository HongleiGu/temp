'use client';

import { useState } from 'react';
import { Button } from '../../components/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function CreateEventButton() {
	const [error, setError] = useState('');
	const router = useRouter();

	const session = useSession();

	const handleCreateEvent = async () => {
		setError(''); // Reset error state
		if (!session) {
			router.push('/events/create');
		} else {
			router.push('/login');
			// setError('You must be logged in to create an event.');
		}
	};

	return (
		<div className="self-end">
			<Button
				variant="outline"
				size="lg"
				className="text-xl mb-2 text-white hover:bg-slate-800"
				onClick={handleCreateEvent}
			>
				<PlusIcon width={18} height={18} className="mr-2" />
				Add Event
			</Button>
			{/* {error && (
				<p className="text-red-500 mt-4 text-center">{error}</p>
			)} */}
		</div>
	);
}
