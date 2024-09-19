import { NextResponse } from 'next/server';
import { deleteEvents } from '@/app/lib/data';
import { z } from 'zod';

// Define the schema for the expected body
const DeleteEventSchema = z.object({
	ids: z.array(z.string().uuid()), // expecting an array of valid UUID strings
});

// The POST function for the delete API route
export async function POST(request: Request) {
	try {
		// Parse the JSON body of the request
		const body = await request.json();

		// Validate the body with the schema
		const { ids } = DeleteEventSchema.parse(body);

		// Call the server-side delete function with the validated IDs
		await deleteEvents(ids);

		// Return success response
		return NextResponse.json({ message: 'Events deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting events:', error);

		// Handle validation errors from zod
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 });
		}

		// General error handling
		return NextResponse.json({ error: 'Failed to delete events' }, { status: 500 });
	}
}
