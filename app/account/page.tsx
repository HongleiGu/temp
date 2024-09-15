'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AccountPage() {

	const session = await auth()

	if (!session) {
		redirect('/login');
	}

	return (
		<div className="p-8 min-h-screen">
			<h1 className="text-2xl font-bold">Account Information</h1>
			<p><strong>Name:</strong> {session?.user.name}</p>
			<p><strong>Email:</strong> {session?.user.email}</p>
			<p><strong>Role:</strong> {session?.user.role}</p>
		</div>
	)
}
