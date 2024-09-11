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
			// const user = auth?.user
			// const isAdmin = auth?.user?.role === 'admin'
			// const onAdminPage = nextUrl.pathname.startsWith('/admin');
			// if (onAdminPage) {
			// 	console.log(`!! ${auth?.user } trying to access /admin`)
			// 	if (isAdmin) return true
			// 	return false // Redirect unauthenticated users to login page
			// }
			return true
		},
	},
} satisfies NextAuthConfig;