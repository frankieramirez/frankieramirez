import type { NextRequest } from "next/server"; // Or use Request if preferred
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.RESEND_TO_EMAIL!;

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      message,
      company,
      subject: formSubject,
    } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, or message." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: email,
      to: [toEmail], // Resend expects an array of email addresses
      subject: formSubject
        ? `Contact Form: ${formSubject}`
        : `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email, // Set the sender's email as the reply-to address
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { message: "Error sending email.", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully!", data },
      { status: 200 }
    );
  } catch (exception) {
    console.error("Exception when sending email:", exception);
    const errorMessage =
      exception instanceof Error
        ? exception.message
        : "An unknown error occurred.";
    return NextResponse.json(
      { message: "Failed to send email.", error: errorMessage },
      { status: 500 }
    );
  }
}
