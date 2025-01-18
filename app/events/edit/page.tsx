"use client";

import { Suspense } from "react";
import EditPageComponent from "@/app/components/edit/edit-page";
import { Event, EditEventProps } from "@/app/lib/types";

// No need for suspense, EditPageComponent already handles loading and edge cases
export default function EditPage({ eventProp, onClose } : EditEventProps) {

	return (
		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<EditPageComponent eventProp={eventProp} onClose={onClose} />
		</main>
	)

}


// function LoadingScreen() {
// 	return (
// 		<main className="min-h-screen w-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
// 			<div className="flex flex-col items-center justify-center">
// 				<h1 className="text-3xl">Loading...</h1>
// 			</div>
// 		</main>
// 	)
// }
