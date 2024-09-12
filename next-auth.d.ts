import NextAuth from "next-auth";

declare module "next-auth" {
	interface User {
		name: string;
		email: string;
		role: string;
	}

	interface Session {
		user: User;
	}

	interface JWT {
		role: string; // Define the role type in the JWT
	}
}
