import myUser from "@/actions/getUser"
import getCourseById from "@/actions/getCourseById"
import Induvidual from "../Individual"

interface IParams {
    courseId?:string
}

export default async function page({params}: {params:IParams}) {

    const course = await getCourseById(params);
    const currentUser = await myUser()

  return (
    <Induvidual
    courseId={course?.id}
    currentUser={currentUser}
    price={course?.price}
    imageSrc={course?.imageSrc}
    name={course?.name}
    author={course?.author}
    description={course?.description}
    />
  )
}