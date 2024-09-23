'use server';

import { fetchEvents } from "@/app/lib/data";
import { convertEventsToMonthYearGroupings } from "@/app/lib/utils";
import EventSection from "./event-section";

// const testEvents: Event[] = [
// 	{
// 		id: "1",
// 		title: "Short Title",
// 		description: "Short description.",
// 		organiser: "Short Organiser",
// 		time: "10:00 - 13:00",
// 		date: "01/01/2025",
// 		location_address: "Short Location",
// 		location_area: "Short Location",
// 		location_building: "Short Location",
// 		image_url: "/images/placeholders/football.jpg",
// 		event_type: 1,
// 		sign_up_link: 'https://google.com'
// 	},
// 	{
// 		id: "2",
// 		title: "This is a very long title that might break the layout if not handled properly. This is a very long string. ",
// 		description: "This is a very long description that might break the layout if not handled properly. It contains a lot of text to test the robustness of the layout and ensure that it can handle long strings without breaking.",
// 		organiser: "This is a very long organiser name that might break the layout if not handled properly",
// 		time: "11:59 - 00:00",
// 		date: "31/12/2025",
// 		location_address: "This is a very long location name that might break the layout if not handled properly",
// 		location_building: "This is a very long location name that might break the layout if not handled properly",
// 		location_area: "This is a very long location name that might break the layout if not handled properly",
// 		image_url: "/images/placeholders/social.jpg",
// 		event_type: 2
// 	}
// ];


export default async function EventsCalendarView() {
	const allEvents = await fetchEvents();

	const monthYearGroupings = convertEventsToMonthYearGroupings(allEvents)
	
	const sortedMonthYearKeys = Object.keys(monthYearGroupings).sort((a, b) => {
		const [monthA, yearA] = a.split('/');
		const [monthB, yearB] = b.split('/');
		const dateA = new Date(`${yearA}-${monthA}-01`);
		const dateB = new Date(`${yearB}-${monthB}-01`);
		return dateA.getTime() - dateB.getTime();
	})
	// TODO filters + pagination of events

	return (
		<div>
			{sortedMonthYearKeys.map((monthYearKey, index) => {
				const [month, year] = monthYearKey.split('/')
				return (
					<EventSection key={index} month={month} year={year} events={monthYearGroupings[monthYearKey]} />
				)
			})}
		</div>
	)

}