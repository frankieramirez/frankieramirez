import { NextResponse } from "next/server"

export async function GET() {
  // Return the reCAPTCHA site key from the server
  return NextResponse.json({
    siteKey: process.env.RECAPTCHA_SITE_KEY || "",
  })
}
