import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)},
        include: {
            faculty: true,
        }
    })
    if (!user) {
        return NextResponse.json({message: "User not found"})
    }
    return NextResponse.json(user)
}

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const {email, name, postnom, role, faculteId, password} = await req.json()
    const user = await prisma.user.update({
        where: {id: parseInt(id)},
        data: {
            email, 
            name, 
            postnom, 
            role, 
            faculteId, 
            password
        }
    })
    return NextResponse.json(user)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.user.delete({where: {id: parseInt(id)}})
}