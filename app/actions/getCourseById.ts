import prisma from '../lib/prismadb'

interface IParams {
    courseId?:string
}

/**
 * Retrieves a course by its ID.
 * 
 * @param params - The parameters for retrieving the course.
 * @returns The course object with additional information.
 */
export default async function getCourseById(
    params: IParams
) {
    try {
        // Destructure the courseId from the params object
        const { courseId } = params;

        // Retrieve the course from the database, including the user information
        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                user: true
            }
        });

        // If the courseId is not provided, return null
        if (!courseId) {
            return null;
        }

        // Return the course object with additional information
        return {
            ...course,
            createdAt: course?.createdAt.toString(),
            user: {
                ...course?.user,
                createdAt: course?.user.createdAt.toString(),
                updatedAt: course?.user.updatedAt.toString(),
            }
        }

    } catch (error: any) {
        // Throw an error if any exception occurs
        throw new Error(error);
    }
}
