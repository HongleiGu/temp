import { fetchUserEvents } from "@/app/lib/data"
import EventCard from "../events-page/event-card";

export const revalidate = 3600 // once an hour

interface UserEventsListProps {
	user_id: string
}

/* TODO: Make api call to get events for user_id */

export default async function UserEventsList({ user_id }: UserEventsListProps) {
	console.log('Fetching for user id ', user_id)
	return (
		<p>Hi</p>
	)
	// const userEvents = await fetchUserEvents(user_id);

	// return (
	// 	<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
	// 		{userEvents.map((event, index) => (
	// 			<EventCard key={index} event={event} />
	// 		))}
	// 	</div>
	// )
}