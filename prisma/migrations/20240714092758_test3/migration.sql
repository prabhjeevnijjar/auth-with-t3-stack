/*
  Warnings:

  - You are about to drop the `Interests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedInterests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavedInterests" DROP CONSTRAINT "SavedInterests_usersId_fkey";

-- DropTable
DROP TABLE "Interests";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "SavedInterests";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHobby" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hobbyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserHobbies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hobby_name_key" ON "Hobby"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserHobby_userId_hobbyId_key" ON "UserHobby"("userId", "hobbyId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserHobbies_AB_unique" ON "_UserHobbies"("A", "B");

-- CreateIndex
CREATE INDEX "_UserHobbies_B_index" ON "_UserHobbies"("B");

-- AddForeignKey
ALTER TABLE "UserHobby" ADD CONSTRAINT "UserHobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHobby" ADD CONSTRAINT "UserHobby_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "Hobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHobbies" ADD CONSTRAINT "_UserHobbies_A_fkey" FOREIGN KEY ("A") REFERENCES "Hobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHobbies" ADD CONSTRAINT "_UserHobbies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
