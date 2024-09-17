
import EventsCalendarView from '../components/events-page/events-calendar-view';
import CreateEventButton from '../components/events-page/create-event-button';
import EventKeys from '../components/events-page/events-key';


export default function EventPage() {
	
	return (
		<main className='relative flex flex-col min-h-screen mx-auto p-8 pt-28 bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] '>
			<CreateEventButton />

			<h1 className="text-4xl font-bold mb-8 text-center">UPCOMING EVENTS</h1>

			<EventsCalendarView />

			<EventKeys />

		</main>
	)
}