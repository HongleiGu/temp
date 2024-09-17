import { Event } from '@/app/lib/types';
import { insertEvent } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const event: Event = await req.json();
	const response = await insertEvent(event)	
	return NextResponse.json(response)
}