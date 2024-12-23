import sgMail from '@sendgrid/mail';
import { EmailData } from './types';
import { getEmail } from './data';

if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key is missing!');
    throw new Error('SENDGRID_API_KEY environment variable not set');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const sendEmail = async ({ id, email, subject, text, html }: EmailData) => {
    console.log("sendEmail function invoked with parameters:", { id, subject, text, html });

    try {
        console.log("Fetching email for id:", id);
        const { recipient } = await getEmail(id);
        console.log("Email fetched for id:", id, "is:", recipient);

        if (!recipient || recipient === '') {
            console.error('Email could not be fetched for the organiser:', id);
            throw new Error('The email for an organiser could not be fetched, after a user triggered a message send');
        }

        const to = recipient;

        const msg = {
            to,
            from: 'hello@londonstudentnetwork.com',
            subject,
            text,
            html,
        };

        console.log("Sending email with message payload:", msg);

        await sgMail.send(msg).then((response) => {
            console.log('Email sent successfully to:', to);
            console.log('SENDGRID RESPONSE:', response);
        });
    } catch (error) {
        console.error("Error occurred during email sending or fetching logic. Error message:", error.message);
        console.error("Stack trace:", error.stack);

        throw new Error("Failed to send email or an error occurred during the attempt to retrieve organiser email by id");
    }
};
