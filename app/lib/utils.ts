import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SQLEvent, Event } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertSQLEventToEvent(sqlEvent: SQLEvent): Event {
	const location = `${sqlEvent.location_building}, ${sqlEvent.location_area}, ${sqlEvent.location_address}`;
	const date = `${String(sqlEvent.day).padStart(2, '0')}/${String(sqlEvent.month).padStart(2, '0')}/${sqlEvent.year}`;
	const time = `${sqlEvent.start_time} - ${sqlEvent.end_time}`;

	return {
		id: sqlEvent.id,
		title: sqlEvent.title,
		description: sqlEvent.description,
		organiser: sqlEvent.organiser,
		time: time,
		date: date,
		location: location,
		image_url: sqlEvent.image_url,
		event_type: sqlEvent.event_type
	};
}

export function convertEventsToMonthYearGroupings(events: Event[]) {
	const months: { [key: string]: Event[] } = {}

	events.forEach((event) => {
		const monthYear = `${event.date.substring(3)}`

		if (!months[monthYear]) {
			months[monthYear] = []
		}
		months[monthYear].push(event)
	})
	return months
}

export function getMonthName(month: string): string {
	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	const monthIndex = parseInt(month, 10) - 1; 
	return monthNames[monthIndex] || "Invalid month";
}

export function sortEventsByDate(events: Event[]): Event[] {
	return events.sort((a, b) => {
		const [dayA, monthA, yearA] = a.date.split('/').map(Number)
		const [dayB, monthB, yearB] = b.date.split('/').map(Number)
		const dateA = new Date(yearA, monthA - 1, dayA)
		const dateB = new Date(yearB, monthB - 1, dayB)
		return dateA.getTime() - dateB.getTime()
	})
}

export function formatDateString(dateString: string): string {
	const [day, month, year] = dateString.split('/').map(Number)
	const date = new Date(year, month - 1, day)

	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase()
	const dayInMonth = String(day).padStart(2, '0')
	const monthName = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()

	return `${dayOfWeek}, ${dayInMonth} ${monthName}`
}