import { updateDescription } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { id, newDescription } = await req.json();
	const response = await updateDescription(id, newDescription);
	return NextResponse.json(response);
}