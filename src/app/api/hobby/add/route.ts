import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const HobbySchema = z
  .object({
    userId: z.number(),
    hobbyName: z.string().min(3, { message: "Hobby name is too short" }),
  })
  .required();

export async function POST(request: Request) {
  try {
    const data = await HobbySchema.safeParseAsync(await request.json()); // Parse JSON data from the request body
    // validation
    if (!data.success)
      return NextResponse.json({
        message: "Validation error",
        error: true,
        errorData: data.error.errors,
      });
    console.log({ data });
    // Check if hobby exists in DB
    const hobbbyExists = await prisma.hobby.findUnique({
      where: {
        name: data.data.hobbyName,
      },
    });
    console.log({ hobbbyExists });
    if (hobbbyExists) {
      // Find or create the hobby
      const hobby = await prisma.hobby.upsert({
        where: { name: data.data.hobbyName },
        update: {},
        create: { name: data.data.hobbyName },
      });

      // Check if the hobby is already linked to the user
      const existingUserHobby = await prisma.userHobby.findUnique({
        where: {
          userId_hobbyId: {
            userId: data.data.userId,
            hobbyId: hobby.id,
          },
        },
      });

      if (existingUserHobby) {
        // If the hobby is already linked, remove it
        const hobbyDeleted = await prisma.userHobby.delete({
          where: {
            userId_hobbyId: {
              userId: data.data.userId,
              hobbyId: hobby.id,
            },
          },
        });
        return NextResponse.json({
          message: "Hobby Deleted",
          error: true,
          data: hobbyDeleted,
        });
      } else {
        // If the hobby is not linked, add it
        const hobbyCreated = await prisma.userHobby.create({
          data: {
            userId: data.data.userId,
            hobbyId: hobby.id,
          },
        });
        return NextResponse.json({
          message: "Hobby Created",
          error: false,
          data: hobbyCreated,
        });
      }
    } else {
      return NextResponse.json({
        message: "Hobby does not exist in db",
        error: true,
        data: null,
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
