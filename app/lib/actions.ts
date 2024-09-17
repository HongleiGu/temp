'use server';

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth";
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
			return 'Invalid credentials';
		}
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.'
				default:
					return 'Something went wrong.'
			}
		}
		throw error
	}
	redirect(`/account`)
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


export async function hasAdminPermissions(redirectPage?: string) {
	const session = await auth()

	if (redirectPage) {
		if (!session) {
			redirect(redirectPage)
		}
	}

	try {
		const role = session?.user.role

		console.log(`ROLE: ${role}`)

		if (role && role === 'admin') {
			return true
		}
		redirect(redirectPage || '/login')
	} catch (error: unknown) {
		console.log(error)
		return false
	}
}

export async function isLoggedIn() {
	const session = await auth()

	if (!session) {
		return { response: false }
	} else {
		return { response: true }
	}
}

// Returns the list of Organisers a user is allowed to post for
export async function getAuthorisedOrganiserList(): Promise<string[]> {
	const session = await auth()

	try {
		const username = session?.user.name

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