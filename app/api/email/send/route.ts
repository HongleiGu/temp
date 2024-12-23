import { sendEmail } from '@/app/lib/send-email';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        console.log('[POST] Received email request'); // Log the start of the request

        const { id, email, subject, text, html } = await req.json();
        console.log('[POST] Parsed request body:', { id, email, subject, text, html }); // Log parsed request data

        // Validate email fields
        if (!id || !subject || (!text && !html)) {
            console.warn('[POST] Validation failed: Missing email fields'); // Log validation issue
            return NextResponse.json({ error: "missing email fields" });
        }

        console.log('[POST] Sending email'); // Log before sending the email
        await sendEmail({ id, email, subject, text, html });

        console.log('[POST] Email sent successfully'); // Log success
        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error('[POST] Error while sending email:', error); // Log the error details
        return NextResponse.json({ error: "failed to send email" });
    }
}
