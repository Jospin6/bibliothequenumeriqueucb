import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma/prisma"


export async function POST(req: Request) {
    const {email, name, postnom, role, faculteId, password} = await req.json()
    try {
        const user = await prisma.user.create({
            data: {
                email, 
                name, 
                postnom, 
                role, 
                faculteId, 
                password,
            }
        })
        return NextResponse.json(user)
    } catch (error) {
        console.log("Error creating the user", error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}

export async function GET(req: Request) {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}