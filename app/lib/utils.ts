import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SQLEvent, Event } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function convertSQLEventToEvent(sqlEvent: SQLEvent): Event {
	const date = `${String(sqlEvent.day).padStart(2, '0')}/${String(sqlEvent.month).padStart(2, '0')}/${sqlEvent.year}`;
	const time = `${sqlEvent.start_time} - ${sqlEvent.end_time}`;

	return {
		id: sqlEvent.id,
		title: sqlEvent.title,
		description: sqlEvent.description,
		organiser: sqlEvent.organiser,
		time: time,
		date: date,
		location_building: sqlEvent.location_building,
		location_area: sqlEvent.location_area,
		location_address: sqlEvent.location_address,
		image_url: sqlEvent.image_url,
		event_type: sqlEvent.event_type,
		sign_up_link: sqlEvent.sign_up_link,
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

export function formatDateString(dateString: string, short: boolean = true): string {
	const [day, month, year] = dateString.split('/').map(Number)
	const date = new Date(year, month - 1, day)

	const dayOfWeek = date.toLocaleString('en-US', { weekday: short ? 'short' : 'long' })
	const dayInMonth = String(day).padStart(2, '0')
	const monthName = date.toLocaleString('en-US', { month: short ? 'short' : 'long' })

	return `${dayOfWeek}, ${dayInMonth} ${monthName}`
}

export const EVENT_TAG_TYPES: { [key: number]: { label: string; color: string } } = {
	1: { label: 'SOCIAL', color: 'bg-[#f3a51a] opacity-95' },
	2: { label: 'ACADEMIC', color: 'bg-[#079fbf] opacity-95' },
	4: { label: 'SPORTING', color: 'bg-[#041A2E] opacity-95' },
};


export function generateDays() {
	return Array.from({ length: 31 }, (_, i) => i + 1);
}

export function generateMonths() {
	return [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
}

export function generateYears(startYear = 2024, range = 10) {
	return Array.from({ length: range }, (_, i) => startYear + i);
}

export function generateHours() {
	return Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
}

export function generateMinutes() {
	return Array.from({ length: 4 }, (_, i) => String(i * 15).padStart(2, '0'));
}
