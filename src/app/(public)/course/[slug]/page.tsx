import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiPencilLine, PiHourglass } from "react-icons/pi";
import { IoMdFunnel } from "react-icons/io";
import { TbLanguage } from "react-icons/tb";
import { FaCartShopping, FaFilePdf } from "react-icons/fa6";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Coins, Monitor, Timer } from "lucide-react";
import { getCourseById } from "@/actions/course";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FiExternalLink } from "react-icons/fi";
import { MdTextSnippet } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params)?.slug;

  const { course, error } = await getCourseById(slug);

  if (error) {
    notFound();
  }

  const renderMaterialIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Monitor className="size-6" />;
      case "LIVE_SESSION":
        return <RiLiveFill className="size-6" />;
      case "PDF":
        return <FaFilePdf className="size-6" />;
      default:
        return <MdTextSnippet className="size-6" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 relative pb-4">
      <div className="relative pt-10 mb-[92px] bg-[#F5F7FE] flex justify-between px-4">
        <div className="container mx-auto max-w-[1155px]">
          <div className="test-series-details space-y-4 w-full lg:w-3/5">
            <h1 className="text-4xl font-bold">{course?.title}</h1>

            <div className="flex gap-4 items-center font-sm">
              <Link
                href={`/instructor/${course?.instructor?.user_id}`}
                className="font-bold text-violet-600 hover:text-violet-700 bg-violet-100/70 border border-slate-500 px-3 py-0.5 rounded-full"
              >
                By: {course?.instructor?.firstName}{" "}
                {course?.instructor?.lastName}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="py-4 mx-auto max-w-[1155px] flex flex-wrap justify-between gap-3 z-10">
          <div className="flex flex-1 items-center gap-2 py-2 px-2.5 rounded-lg bg-white shadow-[0_4px_8px_hsl(0,0%,0%,10%)]">
            <div className="bg-[#DDFBE3] p-2 rounded-md text-[#19A03B]">
              <Timer className="size-9" />
            </div>
            <div>
              <div className="font-semibold text-[1rem] text-[#3D3D3D]">
                Unlimited Attempt
              </div>
              <div className="text-sm text-[#4f4f4f]">
                No Limit on Course viewership
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2 py-2 px-2.5 rounded-lg bg-white shadow-[0_4px_8px_hsl(0,0%,0%,10%)]">
            <div className="bg-[#FFF6ED] p-2 rounded-md text-[#FE6111]">
              <Calendar className="size-9" />
            </div>
            <div className="">
              <div className="font-semibold text-[1rem] text-[#3D3D3D]">
                Lifetime Validiity
              </div>
              <div className="text-sm text-[#4f4f4f]">
                <span className="tag limited-seats">
                  This Course Never expires
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2 py-2 px-2.5 rounded-lg bg-white shadow-[0_4px_8px_hsl(0,0%,0%,10%)]">
            <div className="bg-[#F4F0FF] p-2 rounded-md text-[#882CFF]">
              <Monitor className="size-9" />
            </div>
            <div className="">
              <div className="font-semibold text-[1rem] text-[#3D3D3D]">
                Real Exam Simulator
              </div>
              <div className="text-sm text-[#4f4f4f]">
                Get Ready For Real World
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2 py-2 px-2.5 rounded-lg bg-white shadow-[0_4px_8px_hsl(0,0%,0%,10%)]">
            <div className="bg-[#CBFCFF] p-2 rounded-md text-[#04BBDC] flex items-center justify-center">
              <Coins className="size-9" />
            </div>
            <div>
              <div className="font-semibold text-[1rem] text-[#3D3D3D]">
                Price
              </div>
              <div className="text-sm text-[#4f4f4f]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">₹{course?.price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col gap-1 justify-center items-center">
              <Button className="font-semibold px-2" asChild>
                <Link href={`/checkout/${course?.course_id}`}>
                  <FaCartShopping />
                  Buy Now
                </Link>
              </Button>
              <p className="text-xs">100+ learners joined</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-[1155px]">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="lg:w-8/12 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course?.chapters?.map((chapter) => (
                  <Accordion
                    type="single"
                    key={chapter?.chapter_id}
                    collapsible
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="bg-white rounded-md mb-4 px-2">{chapter?.title}</AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {chapter?.materials?.map((material) => (
                          <Link
                            href={material?.contentUrl}
                            key={material?.material_id}
                            className="bg-white p-2 rounded-lg flex items-center justify-between gap-2"
                          >
                            {renderMaterialIcon(material?.type)}
                            <span>{material?.type}</span>
                            <FiExternalLink size={20} />
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>

            <div className="lg:w-4/12 hidden lg:block relative">
              <div className="*:text-[#454545] p-3 space-y-4 bg-white rounded-lg sticky top-0">
                <div>
                  <Image
                    src={course?.banner ?? ""}
                    alt="Test Series Cover Image"
                    width={1000}
                    height={500}
                    className="rounded-md"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="inline-flex gap-2 font-semibold text-sm">
                      <PiPencilLine size={20} className="text-orange-600" />{" "}
                      Made By
                    </label>
                    <Link
                      href={`/instructor/${course?.instructor?.user_id}`}
                      className="font-semibold text-sm"
                    >
                      {course?.instructor?.firstName}{" "}
                      {course?.instructor?.lastName}
                    </Link>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="inline-flex gap-2 font-semibold text-sm">
                      <IoMdFunnel size={20} className="text-orange-600" /> Level
                    </label>
                    <span className="font-semibold text-sm">Hard</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="inline-flex gap-2 font-semibold text-sm">
                      <TbLanguage size={20} className="text-orange-600" />{" "}
                      Language
                    </label>
                    <span className="font-semibold text-sm">English</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="inline-flex gap-2 font-semibold text-sm">
                      <PiHourglass size={20} className="text-orange-600" />{" "}
                      Duration
                    </label>
                  </div>

                  <Button className="rounded-full w-full py-2 text-white font-bold">
                    <Link href={`/checkout/${course?.course_id}`}>
                      {course?.price === 0
                        ? "Join for Free"
                        : `Buy Now @ Rs.${course?.price}`}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Card className="my-2">
            <CardHeader>
              <CardTitle>About this test series</CardTitle>
            </CardHeader>
            <CardContent className="prose !max-w-full">
              {course?.description}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Page;
