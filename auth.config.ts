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
			const isLoggedIn = !!auth?.user;
			const isAdmin = auth?.user?.role === 'admin'
			const onAdminPage = nextUrl.pathname.startsWith('/admin');
			if (onAdminPage && isAdmin) {
				console.log(`Admin: ${auth?.user}`)
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			}
			return true;
		},
	},
} satisfies NextAuthConfig;
