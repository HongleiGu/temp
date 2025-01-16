"use client";

import { Suspense } from "react";
import EditPageComponent from "@/app/components/edit/edit-page";
import { Event } from "@/app/lib/types";

export default function EditPage({event}: {event: Event}) {

	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
				<Suspense fallback={<LoadingScreen />} >
					<EditPageComponent eventProp={event} />
				</Suspense>
			</main>
	)

}


function LoadingScreen() {
	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-3xl">Loading...</h1>
			</div>
		</main>
	)
}