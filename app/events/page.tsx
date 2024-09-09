import { events as placeholderEvents } from '../lib/placeholder-data'
import { Event } from '../lib/types';
import EventSection from '@/app/components/events-page/event-section';

const groupEventsByMonth = (events: Event[]): { [key: string]: Event[] } => {
	const months: { [key: string]: Event[] } = {}

	events.forEach((event) => {
		const eventDate = new Date(event.date)
		const year = eventDate.getFullYear()
        const month = eventDate.toLocaleString('default', { month: 'long' }).toLowerCase()
        
        const monthYear = `${month}-${year}`
        
        if (!months[monthYear]) {
            months[monthYear] = []
        }
        months[monthYear].push(event)
	});

	return months;
};

export default function EventPage() {

	const events = groupEventsByMonth(placeholderEvents);

	return (
		<main className='relative h-full mx-auto p-8 pt-28 bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] '>
			<h1 className="text-4xl font-bold mb-8 text-center">UPCOMING EVENTS</h1>

			{ Object.keys(events).map((monthYearKey) => {
				const [month, year] = monthYearKey.split('-')
				return (
					<EventSection key={monthYearKey} month={month} events={events[monthYearKey]} year={year} />
				)
			}
			)}

		</main>
	)
}