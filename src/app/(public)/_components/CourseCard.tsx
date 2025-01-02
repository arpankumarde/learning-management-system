import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { type Course } from "@prisma/client";
import { FaCartShopping } from "react-icons/fa6";

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="flex flex-col justify-between rounded-md">
      <Link href={`/course/${course?.course_id}`}>
        <div className="bg-gray-200 rounded-t-sm overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
          <Image
            src={
              course?.banner ??
              "https://dh2vqdcou0l91.cloudfront.net/static/no-banner-thumbnail.png"
            }
            alt={course?.title}
            className="object-cover aspect-video"
            width={600}
            height={400}
          />
        </div>
        <CardContent className="p-3 space-y-4">
          <h2 className="!text-xl lg:text-base font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
            {course?.title}
          </h2>
        </CardContent>
      </Link>
      <CardFooter className="flex-col p-3">
        <div className="w-full text-gray-600 font-semibold">
          <div>
            <span className="inline-flex gap-2">Difficulty Level: Hard</span>
          </div>

          <div>
            <span className="inline-flex gap-2">Chapters: 12</span>
          </div>
        </div>

        <Separator className="mb-3" />
        <div className="w-full flex justify-between items-center">
          <Button size={"sm"} asChild className="text-xs py-1">
            <Link href={`/checkout/${course?.course_id}`}>
              <FaCartShopping />
              Buy Now
            </Link>
          </Button>
          <span>
            <span className="font-semibold text-lg">₹ {course?.price}</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
