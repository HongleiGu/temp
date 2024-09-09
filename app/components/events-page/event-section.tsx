import { Event } from "@/app/lib/types";
import EventCard from "./event-card";

interface EventSectionProps {
	month: string
	year: string
	events: Event[]
}

export default function EventSection({ month, year, events }: EventSectionProps) {
	return (
		<section className="mb-8">
			<h2 className="text-3xl font-semibold mb-4 capitalize">{month} {year}</h2>
			<div className="border-b border-gray-400 mb-4" />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				{events.map((event, index) => (
					<EventCard key={index} event={event} />
				))}
			</div>
		</section>

	)
}