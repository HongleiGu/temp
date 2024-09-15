"use server";

import { auth } from "@/auth";
import Link from "next/link";

export default async function EventCreationPage() {

	const session = auth();

	if (!session) {
		return NotLoggedIn()
	}

	return (
		<div className="min-w-screen min-h-screen">
			<div className="flex flex-col items-center">
				<h1>Let's create an event!</h1>
			</div>
		</div>
	)
}

function NotLoggedIn() {
	return (
		<div>
			<h2>It looks like you're not logged in!</h2>
			<h3>To create an account please 
			<Link
			src="/login"
			> log into your account
			</Link></h3>
			</div>
		
	)
}