import {NextResponse, NextRequest} from 'next/server';
import prisma from '@/lib/prismadb';
import * as bcrypt from 'bcrypt';


export async function POST(request: NextRequest){
    const body = await request.json();

    const {name, email, password} = body;

    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}