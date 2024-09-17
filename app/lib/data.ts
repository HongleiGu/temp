import { sql } from '@vercel/postgres';
import { Event, SQLEvent } from './types';
import { convertSQLEventToEvent } from './utils';

export async function fetchEvents() {
	try {
		const data = await sql<SQLEvent>`SELECT * FROM events`
		return data.rows.map(convertSQLEventToEvent)
	} catch (error) {
		console.error('Database error:', error)
		throw new Error('Failed to fetch revenue data')
	}
}

export async function fetchUpcomingEvents() {
	try {
		const data = await sql<SQLEvent>`
			SELECT * FROM events
			WHERE (year, month, day) >= (EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(MONTH FROM CURRENT_DATE), EXTRACT(DAY FROM CURRENT_DATE))
			ORDER BY year, month, day
			LIMIT 5
		`;
		return data.rows.map(convertSQLEventToEvent);
	} catch (error) {
		console.error('Database error:', error);
		throw new Error('Failed to fetch upcoming events');
	}
}

export async function insertEvent(event: Event) {
	try {
		await sql`
      INSERT INTO events (title, description, organiser, time, date, location_building, location_area, location_address, image_url, event_type, sign_up_link)
      VALUES (
        ${event.title}, 
        ${event.description}, 
        ${event.organiser}, 
        ${event.time}, 
        ${event.date}, 
        ${event.location_building}, 
        ${event.location_area}, 
        ${event.location_address}, 
        ${event.image_url}, 
        ${event.event_type},
        ${event.sign_up_link}
      );
    `;
		return { success: true };
	} catch (error) {
		console.error('Error creating event:', error);
		return { success: false, error };
	}
}



export async function deleteEvents(eventIds: string[]): Promise<void> {
	try {
		if (eventIds.length === 0) {
			throw new Error('No event IDs provided for deletion');
		}

		await sql`
			DELETE FROM events
			WHERE id = ANY(${eventIds})
		`;

		console.log(`Deleted ${eventIds.length} events.`);
	} catch (error) {
		console.error('Database error during deletion:', error);
		throw new Error('Failed to delete events');
	}
}
