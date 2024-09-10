// // auth.config.ts
// import Credentials from "next-auth/providers/credentials";
// import type { User } from "./app/lib/types";
// import { sql } from "@vercel/postgres";
// import bcrypt from 'bcrypt';
// import { z } from 'zod';
// import { NextAuthConfig } from "next-auth";

// async function getUser(email: string): Promise<User | undefined> {
// 	try {
// 		const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
// 		return user.rows[0];
// 	} catch (error) {
// 		console.error('Failed to fetch user:', error);
// 		throw new Error('Failed to fetch user.');
// 	}
// }

// export const authConfig = {
//     session: {
//         strategy: 'jwt',
//         maxAge: 24 * 60 * 60,  // 1 day
//     },
//     pages: {
//         signIn: '/login',  // Custom login page
//         signOut: '/logout', // Optional
//         error: '/auth/error', // Error page
//         verifyRequest: '/auth/verify-request',  // For email verification
//     },
//     providers: [
//         Credentials({
//             async authorize(credentials) {
//                 const schema = z.object({
//                     email: z.string().email(),
//                     password: z.string().min(6),
//                 });

//                 const { email, password } = schema.parse(credentials);

//                 // Fetch user
//                 const user = await getUser(email);
//                 if (!user) return null;

//                 // Check password
//                 const isValidPassword = await bcrypt.compare(password, user.password);
//                 if (!isValidPassword) return null;

//                 return user;  // Must return user object with id, email, role, etc.
//             }
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.role = user.role;
//             }
//             return token;
//         },
//         async session({ session, token, user }) {
// 			console.log(`Session: ${session}, Token: ${token}, User: ${user}`)
// 			if (token) {
// 				session.user.role = token.role;  // Attach role to the session
// 			}
// 			console.log(session)
// 			return session;
// 		},
//         async authorized({ auth, request }) {
//             const { nextUrl } = request;
//             const isAdmin = auth?.user?.role === 'admin';
//             const isOnAdminPage = nextUrl.pathname.startsWith("/admin");

//             if (isOnAdminPage) {
// 				if (isAdmin) return true
// 				else return false
//             }

//             return true
//         }
//     },
//     secret: process.env.NEXTAUTH_SECRET
// } as NextAuthConfig

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	providers: [
		// added later in auth.ts since it requires bcrypt which is only compatible with Node.js, while this file is also used in non-Node.js environments
	],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isAdmin = auth?.user?.role === 'admin'
			const onAdminPage = nextUrl.pathname.startsWith('/admin');
			if (onAdminPage) {
				console.log(`!! ${auth?.user?.role} trying to access /admin`)
				if (isAdmin) return true
				return false // Redirect unauthenticated users to login page
			}
			return true
		},
	},
} satisfies NextAuthConfig;