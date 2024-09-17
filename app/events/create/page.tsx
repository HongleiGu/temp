"use server";

import CreateEventPage from "@/app/components/events-page/create-event";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import fs from 'fs';
import path from 'path';
import { getAuthorisedOrganiserList, isLoggedIn } from "@/app/lib/actions";

async function getImageList() {
	const placeholdersDir = path.join(process.cwd(), 'public/images/placeholders');
	const files = fs.readdirSync(placeholdersDir);
	return files.filter(file => file.endsWith('.jpg'));
}


export default async function CreatePage() {

	const response = await isLoggedIn();
	if (!response.response) {
		return redirect('/login')
	}

	const organiserList = await getAuthorisedOrganiserList();

	const imageList = await getImageList();

	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<CreateEventPage imageList={imageList} organiserList={organiserList} />
		</main>
	)

}
