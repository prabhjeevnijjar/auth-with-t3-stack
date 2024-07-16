import { PrismaClient } from "@prisma/client";
import { addMinutes } from "date-fns";
import nodemailer from "nodemailer";

import crypto from "crypto";
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_FROM_EMAIL, // Your email address
    pass: process.env.NODEMAILER_PASSWORD, // Your email password or app-specific password
  },
});

export async function generateOtp(user) {
  const otpCode = String(Math.floor(100000 + Math.random() * 900000)); // Generate a 6-character OTP
  const expiresAt = addMinutes(new Date(), 10); // OTP expires in 10 minutes

  await prisma.otp.upsert({
    where: { userId: user.id },
    update: { code: otpCode, expiresAt },
    create: { userId: user.id, code: otpCode, expiresAt },
  });

  // Return or send the OTP code to the user (e.g., via email or SMS)

  // Send the OTP to the user's email
  const emailSent = await transporter.sendMail({
    from: "prabhjeevnijjar@gmail.com", // Your email address
    to: user?.email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otpCode}`,
  });
  console.log({ emailSent });

  return emailSent.accepted?.length ?  otpCode : null;
}

const algorithm = "aes-256-ctr";
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const encrypt = async (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash: string) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex"),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
};
