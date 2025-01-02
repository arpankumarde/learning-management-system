"use server";

import prisma from "@/lib/prisma";

export async function getAllCourses() {
  try {
    const courses = await prisma.course.findMany();

    return { courses };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch courses" };
  }
}

export async function getCourseById(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { course_id: courseId },
      include: { instructor: true, chapters: { include: { materials: true } } },
    });

    return { course };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch course" };
  }
}
