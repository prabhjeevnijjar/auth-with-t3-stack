import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { z } from "zod";
import jwt from "jsonwebtoken";
import { encrypt } from "~/utils";

const prisma = new PrismaClient();

const User = z
  .object({
    email: z.string().email("Invalid email format"),
    code: z
      .string()
      .min(6, { message: "Otp of length 6 is required" })
      .max(6, { message: "Otp of length 6 is required" }),
  })
  .required();

export async function POST(request: Request, res: Response) {
  try {
    const data = await User.safeParseAsync(await request.json()); // Parse JSON data from the request body
    // validation
    if (!data.success)
      return NextResponse.json({
        message: "Validation error",
        error: true,
        errorData: data.error.errors,
      });
    console.log({ data });

    // check if user email exists in DB
    // if password matches send OTP

    const user = await prisma.user.findUnique({
      where: {
        email: data.data.email,
      },
    });
    console.log({ user });
    if (user) {
      const { id: userId } = user;
      // if email exist match the password
      const otpRecord = await prisma.otp.findUnique({
        where: { userId },
      });
      console.log({ otpRecord });
      if (!otpRecord) {
        return NextResponse.json({ message: "OTP not found" });
      }

      if (otpRecord.expiresAt < new Date()) {
        return NextResponse.json({ message: "OTP Expired" });
      }

      if (otpRecord.code !== data.data.code) {
        return NextResponse.json({
          message: "Invalid OTP",
          error: false,
          errorData: null,
        });
      } else {
        // update user table with otp isVerified
        const updateUser = await prisma.user.update({
          where: {
            email: data.data.email,
          },
          data: {
            isVerified: true,
          },
        });
        console.log({ updateUser });
        // delete otp record

        await prisma.otp.delete({
          where: { userId },
        });
        // Generate JWT with encrypted data
        const encData = await encrypt(
          JSON.stringify({
            userId: user.id,
            username: user.username,
            email: user.email,
          }),
        );
        console.log({ encData });

        const token = jwt.sign(
          encData,
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }, // Token expiration time
        );
        // generate cookie and encrypt it
        cookies().set({
          name: "name",
          value: token,
          httpOnly: true,
          maxAge: 3600, // 1 hour
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });
        return NextResponse.json({
          message: "OTP Verified",
          error: true,
          errorData: null,
        });
      }
    } else {
      return NextResponse.json({
        message: "User not found!",
        error: false,
        errorData: null,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Some error occured",
      error: true,
      errorData: error,
    });
  }
}
