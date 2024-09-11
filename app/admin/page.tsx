"use server";

import { hasAdminPermissions } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { useActionState } from "react";

export default async function AdminPage() {

	const isAdmin = await hasAdminPermissions('/login')

	if (!isAdmin) {
		return redirect('/login')
	}

	return (
		<main className="w-screen h-screen">
			<div className="flex flex-col h-full justify-center items-center bg-gradient-to-b from-[#082257]  to-[#064580]">
				<h1>ADMIN PAGE</h1>
			</div>

		</main>
	)
}

