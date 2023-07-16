import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import myUser from "@/app/actions/getUser";

export const config = {
    runtime: 'edge', // this is a pre-requisite
    regions: ['bom1'], // only execute this function on iad1
};

export async function POST(request: NextRequest) {
    const currentUser = await myUser();

    if(!currentUser) {
        return console.log('No permission, no user registered');
    } 
    const body = await request.json();

    const {
        name,
        author,
        imageSrc,
        description,
        price
    } = body



    const course = await prisma.course.create({
        data: {
            name,
            author,
            imageSrc,
            description,
            price,
            userId: currentUser.id
        }
    })

    return NextResponse.json(course);
}