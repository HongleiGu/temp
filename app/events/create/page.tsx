"use server";

import CreateEventPage from "@/app/components/events-page/create-event";
import fs from 'fs';
import path from 'path';
import { SocietyLogos } from "@/app/lib/utils";
import { redirect } from "next/navigation";
import nextAuthOptions from "@/auth";
import { getServerSession, Session } from "next-auth";


async function getImageList() {
	const placeholdersDir = path.join(process.cwd(), 'public/images/placeholders');
	const files = fs.readdirSync(placeholdersDir);
	return files.filter(file => file.endsWith('.jpg'));
}

export default async function CreatePage() {
	const session: Session | null = await getServerSession(nextAuthOptions)

	if (!session) {
		redirect('/')
	}

	const username = session?.user.name

	const organiserList = await getAuthorisedOrganiserList(username);

	const imageList = await getImageList();

	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<CreateEventPage imageList={imageList} organiserList={organiserList} />
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