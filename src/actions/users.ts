"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function createUser(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "STUDENT" | "INSTRUCTOR";
}) {
  try {
    const hashedPassword = await bcrypt.hash(payload?.password, 10);

    const user = await prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          firstName: payload?.first_name,
          lastName: payload?.last_name,
          email: payload?.email,
          password: hashedPassword,
          role: payload?.role,
        },
      });

      if (newUser?.role === "INSTRUCTOR") {
        await prisma.instructor.create({
          data: {
            user_id: newUser?.user_id,
          },
        });
      }

      return newUser;
    });

    revalidatePath("/");

    return { user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
}

export async function loginUser(payload: { email: string; password: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const isValid = await bcrypt.compare(payload?.password, user?.password);

    if (!isValid) {
      return { error: "Invalid password" };
    }

    revalidatePath("/");

    return { user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to login" };
  }
}
