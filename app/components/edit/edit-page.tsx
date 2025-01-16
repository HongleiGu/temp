"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Event, DefaultEvent } from "@/app/lib/types";
import EditEventComponent from "@/app/components/events-page/edit-event";

export default function EditPageComponent() {

	const searchParams = useSearchParams();
	const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'unauthenticated'>('loading');
	const [event, setEvent] = useState<Event>(DefaultEvent)

	const session = useSession();
	const loggedIn = session.status === 'authenticated';

	async function validateEditPrivileges() {
		const id = searchParams.get('id')

		if (!id) {
			setStatus('invalid');
			return;
		}

		if (!loggedIn) {
			setStatus('unauthenticated');
			return;
		}

		try {
			console.log(`USER: `, session.data.user)
			const response = await fetch('/api/events/edit-fetch', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					event_id: id,
					user_id: session.data.user.id
				}),
			})

			const data = await response.json()

			if (data.success) {
				if (data.status === 'valid') {
					setStatus('valid');
					const parsedEvent: Event = data.event;
					console.log(`Got back: `, parsedEvent)
					setEvent(parsedEvent)
				} else if (data.status === 'unauthenticated') { // TODO: return case on unauthenticated
					setStatus('unauthenticated');
				} else if (data.status === 'invalid') {
					setStatus('invalid');
				}
			} else {
				console.error('Error finding event:', data.error);
				setStatus('invalid');
			}
		} catch (error) {
			console.error('Error finding event:', error);
			setStatus('invalid');
		}
	}

	useEffect(() => {
		const validatePrivileges = async () => {
			await validateEditPrivileges();
		}
		validatePrivileges();
	}, [searchParams, session]);

	if (status === 'unauthenticated') return <UnauthenticatedScreen />

	if (status === 'invalid') return <InvalidScreen />

	if (status === 'loading') return <LoadingScreen />

	return (
		<EditEventComponent event={event} />
	)
}


function LoadingScreen() {
	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-3xl">Loading...</h1>
			</div>
		</main>
	)
}

function InvalidScreen() {
	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-3xl">Invalid details provided!</h1>
			</div>
		</main>
	)
}

function UnauthenticatedScreen() {
	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-3xl">Please log in to access event editing</h1>
			</div>
		</main>
	)
}