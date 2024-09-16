"use server";

import CreateEventPage from "@/app/components/events-page/create-event";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CreatePage() {

	const session = await auth();

	if (!session) {
		redirect('/login')
	}

	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<CreateEventPage />
		</main>
	)

}
