import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateOtp } from "~/utils";

const prisma = new PrismaClient();

const User = z
  .object({
    username: z.string().min(2, "Name must be at least 2 characters"),
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
        message: "Validation erroe",
        error: true,
        errorData: data.error.errors,
      });
    console.log({ data });
    // check if email already exists in db then return already register else register new

    const user = await prisma.user.findUnique({
      where: {
        email: data.data.email,
      },
    });
    if (user) {
      return NextResponse.json({
        message: "User already exists",
        error: true,
        errorData: null,
      });
    } else {
     
      const res = await prisma.user.create({
        data: {
          username: data.data.username,
          email: data.data.email,
          password: data.data.password,
        },
      });
      // generate otp
      const otpGen = await generateOtp(+res.id);
      // send otp to email
      if(otpGen) {
        
      }
      console.log({ res });
      return NextResponse.json({ message: "User registered" });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Some error occured",
      error: true,
      errorData: error,
    });
  }
}
