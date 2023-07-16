import { NextResponse, NextRequest } from "next/server";
import myUser from "@/app/actions/getUser";
import prisma from '@/app/lib/prismadb';


export const config = {
    runtime: 'edge', // this is a pre-requisite
    regions: ['bom1'], // only execute this function on iad1
};

interface IParams {
    courseId?:string
}
export async function DELETE(
    request:NextRequest, {
        params
    }: {params:IParams}
) {
    const currentUser = await myUser()


    if(!currentUser) {
        return NextResponse.error()
    }

    const {courseId} = params


    if(!courseId || typeof courseId !== 'string') {
        throw new Error('Invalid Id')
    }

    const course = await prisma.course.deleteMany({
        where: {
            id:courseId,
            userId:currentUser.id
        }
    });

    return NextResponse.json(course)
}


export async function PUT( 
    request: NextRequest, 
    {params}:{params:IParams}    
) {
    const {courseId} = params
    const json = await request.json()
    const currentUser = await myUser()


    if(!currentUser) {
        return NextResponse.error()
    }

    if(!courseId || typeof courseId !== 'string') {
        throw new Error('Invalid Id')
    }

    const updated = await prisma.course.update({
        where: {
            id: courseId,
        },
        data:  json
    })

    return NextResponse.json(updated)

}