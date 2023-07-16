import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import myUser from "@/app/actions/getUser";

export const runtime = 'edge';
export const preferredRegion = 'bom1';
export const revalidate = 1200;

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