'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { AuthError } from "next-auth";
import { SocietyLogos } from "./utils";

export async function authenticate(prevState: string | undefined, formData: FormData) {
	try {
		console.log('Attempting sign in!')

		const result = await signIn('credentials', {
			redirect: false,
			email: formData.get('email'),
			password: formData.get('password')
		});

		if (result?.error) {
			return { response: false, error: "Invalid credentials" }
		} else {
			return { response: true }
		}
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { response: false, error: "Invalid credentials" }
				default:
					return { response: false, error: "Something went wrong" }
			}
		}
		throw error
	}
}


export async function logout() {
	try {
		await signOut({ redirect: false });
		return { success: true };
	} catch (error) {
		console.error('Failed to sign out:', error);
		return { success: false };
	}
}


export function hasAdminPermissions() {
	const session = useSession()

	if (!session) {
		return { response: false }
	}

	try {
		const role = session?.data?.user.role

		console.log(`ROLE: ${role}`)

		if (role && role === 'admin') {
			return { response: true }
		}
		return { response: false }
	} catch (error: unknown) {
		console.log(error)
		return { response: false }
	}
}

export function isLoggedIn() {
	const session = useSession()

	if (!session) {
		return { response: false }
	} else {
		return { response: true }
	}
}

// Returns the list of Organisers a user is allowed to post for
export async function getAuthorisedOrganiserList(): Promise<string[]> {
	
	const session = useSession()

	try {
		const username = session?.data?.user.name

		if (username) {
			return [username, ...SocietyLogos.map(society => society.name)]
		} else {
			throw new Error('User is not authenticated');
		}
	} catch (error) {
		console.error('Failed to get authorised organiser list:', error);
		return [];
	}

}