import { getOrganiserCards } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
	const response = await getOrganiserCards();
	return NextResponse.json(response);
}