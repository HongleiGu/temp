'use server';

import { auth } from '@/auth';

export default async function AccountPage() {
	// const { data: session, status } = useSession()

	const session = await auth()

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold">Account Information</h1>
			<p><strong>Name:</strong> {session?.user.name}</p>
			<p><strong>Email:</strong> {session?.user.email}</p>
			<p><strong>Role:</strong> {session?.user.role}</p>
		</div>
	)
}
