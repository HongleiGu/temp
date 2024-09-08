import { events as placeholderEvents } from '../lib/placeholder-data'
import { Event } from '../lib/types';
import EventSection from '@/app/components/events-page/event-section';

const groupEventsByMonth = (events: Event[]): { [month: string]: Event[] } => {
	const months: { [key: string]: Event[] } = {};

	events.forEach((event) => {
		const month = new Date(event.date).toLocaleString('default', { month: 'long' }).toLowerCase();
		if (!months[month]) {
			months[month] = [];
		}
		months[month].push(event);
	});

	return months;
};

export default function EventPage() {

	const events = groupEventsByMonth(placeholderEvents);

	return (
		<main className='relative h-screen mx-auto p-8 mt-24 bg-[#696969]'>
			<h1 className="text-4xl font-bold mb-8 text-center">Events</h1>

			{ Object.keys(events).map(month =>
				<EventSection month={month} events={events[month]} />
			)}

		</main>
	)
}