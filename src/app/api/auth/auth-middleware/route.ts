// pages/api/auth-middleware.ts
import { type NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "~/utils";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest) {
  const token = await req.json();

  try {
    const decoded = jwt.verify(token?.token, process.env.JWT_SECRET_KEY ?? "");


    const decrypted = await decrypt(decoded.encData);
    const userDat = JSON.parse(decrypted);

    // Check if user exists in the database
    const user = await prisma.user.findUnique({
      where: { id: userDat.userId },
    });
    console.log({ user });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        error: true,
        errorData: null,
      });
    }
    return NextResponse.json({
      message: "User verified",
      error: false,
      data: user,
    });

  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({
      message: "Something went wrong",
      error: true,
      errorData: null,
    });
  }
}
