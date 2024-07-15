import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // const {
    //   params: { userId, page, pageSize },
    // } = request;
    const { searchParams } = new URL(request.url);
    const userId = +searchParams.get("userId");
    const pageSize = +searchParams.get("pageSize") || 6;
    const page = +searchParams.get("page") || 1;
    console.log({ page });
    // Calculate the offset for pagination
    const offset = (page - 1) * pageSize;

    // Fetch a paginated list of hobbies
    const hobbies = await prisma.hobby.findMany({
      skip: offset,
      take: pageSize,
    });
    console.log({ hobbies });
    // Fetch the total count of hobbies for pagination info
    const totalHobbies = await prisma.hobby.count();
    console.log({ totalHobbies });

    // Fetch the user's saved hobbies
    const userHobbies = await prisma.userHobby.findMany({
      where: {
        userId: userId,
      },
      select: {
        hobbyId: true,
      },
    });
    console.log({ userHobbies });

    // Create a Set of hobbyIds that the user has saved
    const userHobbyIds = new Set(
      userHobbies.map((userHobby) => userHobby.hobbyId),
    );

    // Add the isSaved key to each hobby
    const hobbiesWithIsSaved = hobbies.map((hobby) => ({
      ...hobby,
      isSaved: userHobbyIds.has(hobby.id),
    }));
    console.log({ hobbiesWithIsSaved });
    // Return the paginated list with the total count
    return NextResponse.json({
      message: "Validation error",
      error: true,
      data: {
        hobbies: hobbiesWithIsSaved,
        totalHobbies,
        totalPages: Math.ceil(totalHobbies / pageSize),
        currentPage: page,
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "Some error occured",
      error: true,
      errorData: error,
    });
  }
}
