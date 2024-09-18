import { insertEvent } from '@/app/lib/data';
import { NextResponse } from 'next/server';
import { createSQLEventObject } from '@/app/lib/utils';

export async function POST(req: Request) {
	const data = await req.json();
	const sqlEvent = await createSQLEventObject(data);
	const response = await insertEvent(sqlEvent)	
	return NextResponse.json(response)
}