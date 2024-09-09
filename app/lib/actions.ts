'use server';

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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