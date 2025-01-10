"use server"

import { sql } from "@vercel/postgres";
import { SQLEvent } from "./types";
import { convertSQLEventToEvent } from "./utils";

export async function fetchEventsById(id: string) {
	try {
		const data = await sql<SQLEvent>`
			SELECT * FROM events
			WHERE id = ${id}
		`;
		return convertSQLEventToEvent(data.rows[0]);
	} catch (error) {
		console.error('Database error:', error);
		throw new Error('Failed to fetch upcoming events');
	}
}