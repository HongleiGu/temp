import { sql } from "@vercel/postgres";
import { SQLEvent } from "./types";
import { convertSQLEventToEvent } from "./utils";

export async function fetchEventsById(id: string) {
	try {
		const data = await sql<SQLEvent>`
			SELECT *
			FROM events
			WHERE id::text LIKE '%' || ${id}
		`;
		console.log(data.rows[0])
		await delay(4000);
		return convertSQLEventToEvent(data.rows[0]);
	} catch (error) {
		console.error('Database error:', error);
		throw new Error('Failed to fetch upcoming events');
	}
}

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
