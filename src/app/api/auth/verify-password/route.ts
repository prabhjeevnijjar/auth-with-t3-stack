import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateOtp } from "~/utils";

const prisma = new PrismaClient();

const User = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  })
  .required();

export async function POST(request: Request) {
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

    if (user?.isVerified) {
      // if email exist and hav verified otp and match the password
      console.log("=====1==========", data.data.password)
      console.log("=====2==========", user.password)

      if (user.password === data.data.password) {
        const otpGen = await generateOtp(user);
        // if password matches send otp to email
        if (otpGen) return NextResponse.json({
          message: "OTP sent on Email",
          error: false,
          errorData: null,
        });
      } else {
        return NextResponse.json({
          message: "Incorrect password",
          error: true,
          errorData: null,
        });
      }
      
    } else {
      return NextResponse.json({
        message: "User not registered!",
        error: true,
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
