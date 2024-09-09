'use server';

import { signOut } from '@/auth';

export default async function SignOutButton() {
	return (
		<form
			action={async () => {
				await signOut()
			}}
		>
			<button className='py-2 px-4 rounded-lg shadow-lg text-xl transition-all duration-300 ease-in-out hover:shadow-inner hover:bg-blue-800'>
				Sign Out
			</button>
		</form>
	);
}
