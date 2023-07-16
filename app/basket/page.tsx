import CourseComponent from "../(components)/CourseComponent";
import getBasketItems from "../actions/getBasketItems";
import { myUser } from "../actions/getUser";


export default async function page() {

  const courses = await getBasketItems();
  const currentUser = await myUser();

  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-center">No course found</p>
      </div>
    )
  }

  return (
    <div className="items-center">
      <div className="p-12 flex gap-2 flex-wrap">
        {courses.map((item: any) => (
          <CourseComponent
            key={item.id}
            currentUser={currentUser}
            data={item}
          />
        ))}
      </div>
    </div>
  )
}