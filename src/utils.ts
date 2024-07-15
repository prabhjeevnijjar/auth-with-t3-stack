import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { addMinutes } from "date-fns";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_FROM_EMAIL, // Your email address
    pass: process.env.NODEMAILER_PASSWORD, // Your email password or app-specific password
  },
});

export async function generateOtp(user) {
  const otpCode = uuidv4().slice(0, 6); // Generate a 6-character OTP
  const expiresAt = addMinutes(new Date(), 10); // OTP expires in 10 minutes
  console.log("i ame herere"+{ user });
  await prisma.otp.upsert({
    where: { userId: user.id },
    update: { code: otpCode, expiresAt },
    create: { userId: user.id, code: otpCode, expiresAt },
  });

  // Return or send the OTP code to the user (e.g., via email or SMS)

  // Send the OTP to the user's email
  const emailSent = await transporter.sendMail({
    from: "prabhjeevnijjar@gmail.com", // Your email address
    to: user.email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otpCode}`,
  });
  console.log({ emailSent });

  return otpCode;
}
