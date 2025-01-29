import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Material } from "@prisma/client";

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string; resourceid: string }>;
}) => {
  const { slug, resourceid } = await params;

  const course = await prisma.course.findUnique({
    where: {
      course_id: slug,
    },
    include: {
      chapters: {
        include: {
          materials: true,
        },
      },
    },
  });

  const renderMaterial = (material: Material) => {
    if (material.type === "VIDEO") {
      return (
        <iframe
          height="400"
          src={material?.contentUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full min-h-full"
        ></iframe>
      );
    } else {
      return <>url</>;
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="text-white text-lg">LMS | {course?.title}</div>
        </div>
      </nav>

      <div className="flex h-full">
        <div className="w-9/12">
          <div className="h-full p-4">
            <div className="min-h-dvh">
              {course?.chapters.map((chapter) =>
                chapter.materials.map((material) => {
                  if (material?.material_id === resourceid) {
                    return (
                      <div key={material.material_id}>
                        {renderMaterial(material)}
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
        </div>
        <div className="w-3/12">
          <div className="px-4 border-l border-gray-200">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={
                course?.chapters.find((chapter) =>
                  chapter.materials.find(
                    (material) => material.material_id === resourceid
                  )
                )?.chapter_id
              }
            >
              {course?.chapters.map((chapter) => (
                <AccordionItem
                  value={chapter.chapter_id}
                  key={chapter?.chapter_id}
                  className="py-2"
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                      {chapter?.title}
                      <Plus
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 opacity-60 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="pb-2 text-muted-foreground space-y-2">
                    {chapter.materials.map((material) => (
                      <Button
                        variant={"secondary"}
                        key={material.material_id}
                        asChild
                        className="block"
                      >
                        <Link
                          href={`/student/dashboard/course/${slug}/${material.material_id}`}
                        >
                          {material.type}
                        </Link>
                      </Button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
