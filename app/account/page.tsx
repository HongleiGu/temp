'use client';

import { useSession } from 'next-auth/react';

export default function AccountPage() {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (!session) {
		return <div>You are not logged in</div>
	}

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold">Account Information</h1>
			<p><strong>Name:</strong> {session.user.name}</p>
			<p><strong>Email:</strong> {session.user.email}</p>
			<p><strong>Role:</strong> {session.user.role}</p>
		</div>
	)
}
