import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, message, recaptchaToken } = data

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" },
    )

    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      return NextResponse.json({ success: false, message: "reCAPTCHA verification failed" }, { status: 400 })
    }

    // Here you would typically send an email or store the contact in a database
    // Example using a hypothetical email service:
    /*
    await sendEmail({
      to: 'me@frankieramirez.com',
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })
    */

    // For now, we'll just log the data and return success
    console.log("Contact form submission:", { name, email, message })

    return NextResponse.json({
      success: true,
      message: "Message received! I will get back to you soon.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message: "An error occurred processing your request" }, { status: 500 })
  }
}
