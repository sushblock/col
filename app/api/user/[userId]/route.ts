
import prisma from '@/app/lib/prismadb'
import { NextResponse, NextRequest } from "next/server"
import bcrypt from 'bcrypt'
import myUser from '@/app/actions/getUser'


export const config = {
    runtime: 'edge', // this is a pre-requisite
    regions: ['bom1'], // only execute this function on iad1
};

interface IParams {
    userId?:string
}


export async function PUT( 
    request: NextRequest, 
    {params}:{params:IParams}    
) {
    const {userId} = params
    const json = await request.json()
    const {
        name,
        email,
        password
    } = json
    const currentUser = await myUser()

    if(!currentUser) {
        return NextResponse.error()
    }

    if(!userId || typeof userId !== 'string') {
        throw new Error('Invalid Id')
    }

    const hashedPasswordupdated = bcrypt.hashSync(password, 12);

    const updated = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name,
            email,
            hashedPassword:hashedPasswordupdated
        }
    })

    return NextResponse.json(updated)

}