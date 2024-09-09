import { Event } from "@/app/lib/types";

interface EventCardProps {
	event: Event
}

export default function EventCard({ event }: EventCardProps) {
	return (
		<div className="flex flex-col bg-white  p-4 rounded-sm shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90">
			<img src={event.image} alt={event.event_title} className="w-full h-40 object-cover rounded-md mb-2" />
			<div className="flex flex-col justify-between flex-grow">
				<div>
					<p className="text-gray-700 text-xs">{event.date} | {event.time_start} - {event.time_end}</p>
					<h3 className="text-slate-700 text-xl font-bold mt-2 mb-2 line-clamp-3">{event.event_title}</h3>
				</div>
				<div>
					<p className="text-gray-500">{event.location}</p>
					<p className="text-gray-600 mt-2">{event.organiser_name}</p>
				</div>
			</div>
		</div>
	)
}