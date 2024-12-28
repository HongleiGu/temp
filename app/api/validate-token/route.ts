import { validateToken } from "@/app/lib/data";
import { NextResponse, NextRequest } from "next/server";

// Validate token for resetting a password
export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json()
		
		if (!token) {
			return NextResponse.json({ error: 'Token not provided', status: "invalid" }, { status: 400 }); // 400 Bad Request
		}

		const status = await validateToken(token, 'reset_password')

		if (status === 'invalid') {
			return NextResponse.json({ message: "invalid" }, { status: 403 }); // 403 Forbidden
		}
		else if (status === 'expired') {
			return NextResponse.json({ message: "expired" }, { status: 403 }); // 403 Forbidden
		}

		return NextResponse.json({ message: "valid" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "invalid", error: "Error in validating token" }, { status: 500 });
	}
}
