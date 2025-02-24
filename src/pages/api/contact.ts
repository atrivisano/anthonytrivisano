// src/pages/api/sendgrid.ts
import type { APIRoute } from 'astro';

export const prerender = false;

const SENDGRID_API_KEY = import.meta.env.SENDGRID_API_KEY;
const FROM_EMAIL = import.meta.env.FROM_EMAIL;
const TO_EMAIL = import.meta.env.TO_EMAIL;

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { name, email, subject, message } = data;

        // Validate form data
        if (!name || !email || !subject || !message) {
            return new Response(
                JSON.stringify({
                    message: 'Missing required fields',
                }),
                { status: 400 }
            );
        }

        // SendGrid API request
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${SENDGRID_API_KEY}`,
            },
            body: JSON.stringify({
                personalizations: [
                    {
                        to: [{ email: TO_EMAIL }],
                        subject: `Contact Form: ${subject}`,
                    },
                ],
                from: { email: FROM_EMAIL, name: 'Contact Form' },
                reply_to: { email: email, name: name },
                content: [
                    {
                        type: 'text/plain',
                        value: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                    },
                    {
                        type: 'text/html',
                        value: `
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `,
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('SendGrid API error:', errorData);
            return new Response(
                JSON.stringify({
                    message: 'Failed to send email. Please try again later.',
                }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({
                message: 'Email sent successfully!',
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Server error:', error);
        return new Response(
            JSON.stringify({
                message: 'Server error. Please try again later.',
            }),
            { status: 500 }
        );
    }
};