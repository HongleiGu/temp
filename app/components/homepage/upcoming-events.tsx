"use server"

import { fetchUpcomingEvents } from "@/app/lib/data"
import UpcomingEvents from "./events-view";

export default async function UpcomingEventsView() {

	const events = await fetchUpcomingEvents();

	return (
		<div className="p-4">
			<UpcomingEvents events={events} />
		</div>
	)

}