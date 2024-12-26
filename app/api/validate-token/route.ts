import { validateToken } from "@/app/lib/data";
import { NextResponse, NextRequest } from "next/server";

// Validate token for resetting a password
export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json()
		
		if (!token) {
			return NextResponse.json({ error: 'Token not provided', status: "invalid" }, { status: 500 });
		}

		const status = await validateToken(token)

		if (status === 'invalid') {
			return NextResponse.json({ status: "invalid" }, { status: 500 });
		}
		else if (status === 'expired') {
			return NextResponse.json({ status: "expired" }, { status: 500 });
		}

		return NextResponse.json({ status: "valid" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ status: "invalid", error: "Error in validating token" }, { status: 500 });
	}
}