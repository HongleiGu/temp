import { Event } from "@/app/lib/types";
import EventCard from "./event-card";
import { getMonthName, sortEventsByDate } from "@/app/lib/utils";

interface EventSectionProps {
	month: string
	year: string
	events: Event[]
}

const testEvents: Event[] = [
	{
		id: "1",
		title: "Short Title",
		description: "Short description.",
		organiser: "Short Organiser",
		time: "10:00 - 13:00",
		date: "01/01/2023",
		location_address: "Short Location",
		location_area: "Short Location",
		location_building: "Short Location",
		image_url: "/images/placeholders/football.jpg",
		event_type: 1
	},
	{
		id: "2",
		title: "This is a very long title that might break the layout if not handled properly. This is a very long string. ",
		description: "This is a very long description that might break the layout if not handled properly. It contains a lot of text to test the robustness of the layout and ensure that it can handle long strings without breaking.",
		organiser: "This is a very long organiser name that might break the layout if not handled properly",
		time: "11:59 - 00:00",
		date: "31/12/2023",
		location_address: "This is a very long location name that might break the layout if not handled properly",
		location_building: "This is a very long location name that might break the layout if not handled properly",
		location_area: "This is a very long location name that might break the layout if not handled properly",
		image_url: "/images/placeholders/social.jpg",
		event_type: 2
	}
];

export default function EventSection({ month, year, events }: EventSectionProps) {
	
	const sortedEvents = sortEventsByDate(events.concat(testEvents))

	return (
		<section className="mb-8">
			<h2 className="text-3xl font-semibold mb-4 capitalize">{getMonthName(month)} {year}</h2>
			<div className="border-b border-gray-400 mb-4" />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{sortedEvents.map((event, index) => (
					<EventCard key={index} event={event} />
				))}
			</div>
		</section>

	)
}