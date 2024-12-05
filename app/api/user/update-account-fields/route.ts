import { updateAccountInfo } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { id, newLogo, newDescription, newWebsite, newTags } = await req.json();
	const response = await updateAccountInfo(id, newLogo, newDescription, newWebsite, newTags);
	return NextResponse.json(response);
}