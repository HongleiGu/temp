import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import nextAuthOptions from '@/auth';

export async function GET() {
	const session = await getServerSession(nextAuthOptions)
	// console.log(session)
	return NextResponse.json(session);
}
