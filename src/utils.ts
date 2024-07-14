import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { addMinutes } from 'date-fns';

const prisma = new PrismaClient();

export async function generateOtp(userId: number) {
  const otpCode = uuidv4().slice(0, 6); // Generate a 6-character OTP
  const expiresAt = addMinutes(new Date(), 10); // OTP expires in 10 minutes

  await prisma.otp.upsert({
    where: { userId },
    update: { code: otpCode, expiresAt },
    create: { userId, code: otpCode, expiresAt },
  });

  // Return or send the OTP code to the user (e.g., via email or SMS)
  return otpCode;
}
