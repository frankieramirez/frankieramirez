import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = 'frankie@jamel.family'; // Your recipient email address
// IMPORTANT: For production, you should verify a domain with Resend
// and use an email address from that domain as the 'from' address.
// For example: 'noreply@yourdomain.com'
// For now, we can use Resend's default for testing if you haven't set one up.
// Resend might also default to 'onboarding@resend.dev' if from is not specified or not from a verified domain.
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, message, company, subject: formSubject } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields: name, email, or message.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail], // Resend expects an array of email addresses
      subject: formSubject ? `Contact Form: ${formSubject}` : `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      reply_to: email, // Set the sender's email as the reply-to address
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ message: 'Error sending email.', error: error.message });
    }

    return res.status(200).json({ message: 'Email sent successfully!', data });
  } catch (exception) {
    console.error('Exception when sending email:', exception);
    const errorMessage = exception instanceof Error ? exception.message : 'An unknown error occurred.';
    return res.status(500).json({ message: 'Failed to send email.', error: errorMessage });
  }
}
