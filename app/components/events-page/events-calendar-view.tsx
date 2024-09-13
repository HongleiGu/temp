'use server';

import { fetchEvents } from "@/app/lib/data";
import { Event } from "@/app/lib/types";
import { convertEventsToMonthYearGroupings } from "@/app/lib/utils";
import EventSection from "./event-section";

export default async function EventsCalendarView() {
	const allEvents = await fetchEvents();

	const monthYearGroupings = convertEventsToMonthYearGroupings(allEvents)

	// TODO filters + pagination of events

	return (
		<>
			{Object.keys(monthYearGroupings).map((monthYearKey) => {
				const [month, year] = monthYearKey.split('/')
				return (
					<EventSection month={month} year={year} events={monthYearGroupings[monthYearKey]} />
				)
			})}
		</>
	)

}