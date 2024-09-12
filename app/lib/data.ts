import { sql } from '@vercel/postgres';
import { SQLEvent } from './types';
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