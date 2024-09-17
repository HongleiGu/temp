"use server";

import { fetchUpcomingEvents } from "@/app/lib/data";
import UpcomingEventsView from "./upcoming-events";

export default async function UpcomingEventsSection() {
	return (
		<section className="min-h-screen bg-[#041A2E] flex flex-col items-center justify-start overflow-hidden snap-start">
			<h2 className="text-4xl md:text-6xl ml-28 w-full mt-12 md:mt-28 mb-12 md:mb-28">Popular Events</h2>
			<UpcomingEventsView />
		</section>
	)
}