import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function POST(req: Request) {
    const {userId, role } = await req.json()
    
    try {
        const user = await prisma.user.update({
            where: {id: userId},
            data: {role,}
        })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
    
}