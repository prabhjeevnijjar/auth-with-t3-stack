import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "~/utils-client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("name");

    // middle ware to check if user is authenticated else redirect to /login page
    const result = await isAuthenticated(token?.value);
    if (!token || !result.data.userId)
      return NextResponse.json({
        message: "User not authenticated",
        error: true,
        data: null,
      });
    const { searchParams } = new URL(request.url);
    const userId = result?.data?.userId;
    const pageSize = +searchParams.get("pageSize") || 6;
    const page = +searchParams.get("page") || 1;

    // Calculate the offset for pagination
    const offset = (page - 1) * pageSize;

    // Fetch a paginated list of hobbies
    const hobbies = await prisma.hobby.findMany({
      skip: offset,
      take: pageSize,
    });

    // Fetch the total count of hobbies for pagination info
    const totalHobbies = await prisma.hobby.count();

    // Fetch the user's saved hobbies
    const userHobbies = await prisma.userHobby.findMany({
      where: {
        userId: userId,
      },
      select: {
        hobbyId: true,
      },
    });

    // Create a Set of hobbyIds that the user has saved
    const userHobbyIds = new Set(
      userHobbies.map((userHobby) => userHobby.hobbyId),
    );

    // Add the isSaved key to each hobby
    const hobbiesWithIsSaved = hobbies.map((hobby) => ({
      ...hobby,
      isSaved: userHobbyIds.has(hobby.id),
    }));
    // Return the paginated list with the total count
    return NextResponse.json({
      message: "Data fetch success",
      error: false,
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
