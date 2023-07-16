import myUser from "../actions/getUser"
import getCurrUsersCourse from "../actions/getCurrUsersCourse"
import MyCourseClient from "./MyCourseClient"


interface IParams {
    params: {
        courseId?: string
    }
}

export default async function page({ params }: { params: IParams }) {

    const currentUser = await myUser();

    if (!currentUser) {
        return "Not authorized to access this page"
    }

    const courses = await getCurrUsersCourse();

    if (courses.length === 0) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <p className="text-center">No course found</p>
            </div>
        )
    }


    return (
        <div className="flex gap-6 px-12 py-8 lg:flex-row flex-col">
            {courses.map((item) => (
                <MyCourseClient
                    data={item}
                    currentUser={currentUser}
                    key={item.id}
                />
            ))}
        </div>
    )
}