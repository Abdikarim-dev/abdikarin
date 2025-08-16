import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, projectType, message, date, time } =
      body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Add error handling and logging
    try {
      await transporter.verify();
      console.log("Email configuration verified");
    } catch (error) {
      console.error("Email configuration error:", error);
    }
    // Recipient email (your email where you want to receive contact messages)
    const recipientEmail = process.env.RECIPIENT_EMAIL || "cadde402@gmail.com";

    // Format meeting time information if provided
    let meetingInfo = "";
    if (date && time) {
      meetingInfo = `\n\nRequested Meeting: ${date} at ${time}`;
    }
    const mailOptions = {
      from: {
        name: "Abdikarim", // Replace with your actual company name
        address: process.env.EMAIL_USER,
      },
      to: recipientEmail || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Message: ${projectType || "General Inquiry"}`,
      headers: {
        Priority: "high",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Project Type: ${projectType || "N/A"}
Message:
${message}
${meetingInfo || (date && time ? `Requested Meeting: ${date} at ${time}` : "")}
  `,
      html: `
<div style="font-family: Arial, sans-serif;">
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || "N/A"}</p>
  <p><strong>Project Type:</strong> ${projectType || "N/A"}</p>
  <p><strong>Message:</strong></p>
  <p>${message.replace(/\n/g, "<br>")}</p>
  ${
    date && time
      ? `<p><strong>Requested Meeting:</strong> ${date} at ${time}</p>`
      : ""
  }
</div>
  `,
    };

    // Send email
    // Ensure email address is defined before sending
    if (!process.env.EMAIL_USER) {
      throw new Error("Sender email address is not configured");
    }

    await transporter.sendMail({
      ...mailOptions,
      from: {
        name: "Qabiir",
        address: process.env.EMAIL_USER, // Now guaranteed to be defined
      },
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
