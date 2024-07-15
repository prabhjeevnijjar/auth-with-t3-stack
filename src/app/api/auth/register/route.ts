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

const createNewUser = async (data) => {
  console.log("here i am");
  const res = await prisma.user.create({
    data: {
      username: data.data.username,
      email: data.data.email,
      password: data.data.password,
    },
  });
  // generate otp
  console.log({ res });

  const otpGen = await generateOtp(res);
  // send otp to email
  if (otpGen) {
    console.log({ otpGen });
  }
  console.log({ res });
  return res;
};

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
    console.log(data.data.username);
    // check if email already exists in db then return already register else register new

    // check if user is verified anf trying to register redirect them to login page
    // if user is not verified and is registered in db delete that record and add new and register again
    const verifiedUser = await prisma.user.findMany({
      where: {
        AND: [
          {
            email: data.data.email,
          },
          {
            username: data.data.username,
          },
        ],
      },
    });
    console.log({ verifiedUser });
    // if user not found with the email and username create new and unique entry
    if (!verifiedUser?.length) {
      const user = await prisma.user.findMany({
        where: {
          OR: [
            {
              email: data.data.email,
            },
            {
              username: data.data.username,
            },
          ],
        },
      });
      console.log({ user });
      if (user?.length) {
        return NextResponse.json({
          message:
            "Email OR Username already exists, Please use another combination",
          error: true,
          errorData: null,
        });
      } else {
        const newUser = await createNewUser(data);
        if (newUser)
          return NextResponse.json({
            message: "User registered, OTP sent on email",
          });
      }
    } else if (verifiedUser?.length && verifiedUser[0]?.isVerified) {
      // user found and otp is verified
      return NextResponse.json({
        message: "Already registerd",
        error: false,
        errorData: null,
      });
    } else if (verifiedUser?.length && !verifiedUser[0]?.isVerified) {
      // user found and otp is not verified
      // if user is not verified and is registered in db delete that record and add new and register again
      const deleteUser = await prisma.user.delete({
        where: {
          email: data.data.email,
        },
      });
      console.log({ deleteUser });
      // create new
      const newUser = await createNewUser(data);
      if (newUser)
        return NextResponse.json({
          message: "User registered, OTP sent on email",
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
