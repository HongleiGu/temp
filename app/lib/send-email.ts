import sgMail from '@sendgrid/mail';
import { EmailData } from './types';
import { getEmail } from './data';
import EmailPayload from '../components/templates/user-to-society-email'; // this might have security issues because of user inputs.
import EmailPayloadFallback from '../components/templates/user-to-society-email-fallback';

if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key is missing!');
    throw new Error('SENDGRID_API_KEY environment variable not set');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const sendEmail = async ({ id, email, subject, text }: EmailData) => {

    try {
        const recipient = await getEmail(id);

        if (!recipient.email || recipient.email === '') {
            console.error('Email could not be fetched for the organiser:', id);
            throw new Error('The email for an organiser could not be fetched, after a user triggered a message send');
        }

        const to = recipient.email;
        const customPayload = EmailPayload({ email, subject, text });
        const customPayloadFallback = EmailPayloadFallback({ email, subject, text });

        const msg = {
            to,
            from: 'hello@londonstudentnetwork.com',
            subject: 'New communication from the London Student Network',
            text: customPayloadFallback, // this is ok, as sendgrid uses text only as a fallback
            html: customPayload,
        };

        await sgMail.send(msg);
        
    } catch (error) {
        console.error("Error occurred during email sending or fetching logic. Error message:", error.message);
        console.error("Stack trace:", error.stack);

        throw new Error("Failed to send email or an error occurred during the attempt to retrieve organiser email by id");
    }
};
