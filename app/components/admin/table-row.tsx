import { Event } from '@/app/lib/types';

interface TableRowProps {
	event: Event;
	isSelected: boolean;
	toggleSelection: () => void;
}

export default function TableRow({ event, isSelected, toggleSelection }: TableRowProps) {
	return (
		<tr className="border-b border-gray-200">
			<td className="p-2">
				<input
					type="checkbox"
					checked={isSelected}
					onChange={toggleSelection}
				/>
			</td>
			<td className="p-2 whitespace-nowrap">{`${event.day}/${event.month}/${event.year}`}</td>
			<td className="p-2 whitespace-nowrap">{event.organiser}</td>
			<td className="p-2 truncate">{event.title}</td>
			<td className="p-2 whitespace-nowrap">{`${event.start_time} - ${event.end_time}`}</td>
			<td className="p-2 truncate">{`${event.location_building}, ${event.location_area}, ${event.location_address}`}</td>
			<td className="p-2">
				<img
					src={event.image}
					alt={event.title}
					className="w-10 h-10 object-cover cursor-pointer"
					onClick={() => {/* Logic to open modal or expand image */ }}
				/>
			</td>
			<td className="p-2 truncate">{event.description}</td>
			<td className="p-2">
				{/* Render tags from a util function that converts event_type to tags */}
				{event.event_type}
			</td>
		</tr>
	)
}

// Utility function to render tags
// const renderTags = (eventType: number) => {
// 	const tags = mapEventTypeToTags(eventType); // Map event_type to a list of tags
// 	return (
// 		<div className="flex flex-wrap gap-1">
// 			{tags.map((tag, index) => (
// 				<span key={index} className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs">
// 					{tag}
// 				</span>
// 			))}
// 		</div>
// 	)
// }
