import { getAllCourses } from "@/actions/course";
import CourseCard from "../_components/CourseCard";

const Page = async () => {
  const { courses } = await getAllCourses();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl text-primary font-bold text-center">
        All Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses?.map((course) => (
          <CourseCard key={course?.course_id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Page;
