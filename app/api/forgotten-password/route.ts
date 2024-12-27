import { v4 as uuidv4 } from 'uuid';
import { sendResetPasswordEmail } from "@/app/lib/send-email";
import { NextResponse, NextRequest } from "next/server";
import { insertResetToken } from '@/app/lib/data';

// Reset a password from an email
export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json() 

		if (!email) {
			console.error('Error with the server, could not extract user email');
			return NextResponse.json({ error: "Failed to extract user email" }, { status: 500 });
		}

		const token = await generateResetToken(email) // Generates token and inserts into redis 

		await sendResetPasswordEmail(email, token);

		return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
	} catch (error) {
		console.error('[POST] Error while sending email:', error);
		return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
	}
}

async function generateResetToken(email: string): Promise<string> {
	const token = uuidv4()

	await insertResetToken(email, token)

	return token;
}