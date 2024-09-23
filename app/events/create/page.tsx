"use server";

import CreateEventPage from "@/app/components/events-page/create-event";
import { SocietyLogos } from "@/app/lib/utils";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CreatePage() {
	const session = await auth()

	if (!session) {
		redirect('/login')
	}

	const username = session?.user.name

	const organiserList = await getAuthorisedOrganiserList(username);


	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<CreateEventPage organiserList={organiserList} />
		</main>
	)

}


// Returns the list of Organisers a user is allowed to post for
async function getAuthorisedOrganiserList(username: string | undefined | null): Promise<string[]> {
	
	try {
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