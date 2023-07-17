import CourseComponent from "../(components)/CourseComponent";
import SliderMain from "../(components)/SliderMain";
import getAllCourses from "@/actions/getAllCourses";
import myUser from "@/actions/getUser";


const images = [
  '/a.avif',
  '/b.avif'
]

interface HomeProps {
  searchParams: string
}

/**
 * Renders the Home component.
 * 
 * @param {HomeProps} searchParams - The search parameters for the courses.
 * @returns {JSX.Element} The rendered Home component.
 */
export default async function Home({ searchParams }: HomeProps) {
  // Fetch all courses based on the search parameters
  const courses = await getAllCourses(searchParams);

  // Fetch the current user
  const user = await myUser();

  return (
    <main className="">
      {/* Render the main slider */}
      <SliderMain
        images={images}
      />
      <div>
        <div className="flex flex-wrap px-8">
          {
            // Render each course component
            courses.map((course: any) => 
              <CourseComponent key={course.id} data={course} currentUser={user}/>
            )
          }
        </div>
      </div>
    </main>
  )
}
