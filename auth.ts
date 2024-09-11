import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import { sql } from "@vercel/postgres";
import type { User } from "./app/lib/types";
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
	try {
		const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
		return user.rows[0];
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}


export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	session: {
		strategy: "jwt",
		maxAge: 1 * 24 * 60 * 60, // 1 day
	},
	providers: [Credentials({
		async authorize(credentials) {
			const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) })
				.safeParse(credentials)
			if (parsedCredentials.success) {
				const { email, password } = parsedCredentials.data
				const user = await getUser(email)
				if (!user) return null
				const passwordCorrect = await bcrypt.compare(password, user.password)

				if (passwordCorrect) return user
			}

			console.log('Invalid credentials')
			return null
		}
	})],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;  // Attach role to the token
			}
			console.log(token)
			return token;
		},
		async session({ session, token, user }) {
			if (token) {
				session.user.role = token.role;  // Attach role to the session
			}

			console.log(`SESSION:`)
			console.log(session.user)
			return session;
		},
	},
	secret: process.env.AUTH_SECRET
})