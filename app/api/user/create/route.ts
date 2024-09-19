import { insertUserInformation } from '@/app/lib/data';
import { NextResponse } from 'next/server';
import { createUserInformationObject } from '@/app/lib/utils';

export async function POST(req: Request) {
	const data = await req.json();
	const userInformation = await createUserInformationObject(data);
	const response = await insertUserInformation(userInformation)	
	return NextResponse.json(response)
}