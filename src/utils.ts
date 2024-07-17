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

  return emailSent.accepted?.length ? otpCode : null;
}

const ENCRYPTION_KEY: string = process.env.ENCRYPTION_KEY || ""; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

export function keyGen() {
  return crypto.randomBytes(32).toString("hex");
}

export async function encrypt(
  plainText: string,
  keyHex: string = ENCRYPTION_KEY,
): string {
  console.log({ ENCRYPTION_KEY });
  const iv = crypto.randomBytes(IV_LENGTH); // Directly use Buffer returned by randomBytes
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(keyHex, "hex"),
    iv,
  );
  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  // Return iv and encrypted data as hex, combined in one line
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export async function decrypt(text: string, keyHex: string = ENCRYPTION_KEY): string {
  console.log({ ENCRYPTION_KEY });

  const [ivHex, encryptedHex] = text.split(":");
  if (!ivHex || !encryptedHex) {
    throw new Error("Invalid or corrupted cipher format");
  }

  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(keyHex, "hex"),
    Buffer.from(ivHex, "hex"),
  );
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString();
}
