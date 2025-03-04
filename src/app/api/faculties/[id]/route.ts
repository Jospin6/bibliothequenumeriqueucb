import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma/prisma"


export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop() as string

    const faculty = await prisma.faculty.findUnique({
        where: {id: parseInt(id)}
    })

    if (!faculty) {
        NextResponse.json({message: "Fac not found"}, {status: 404})
    }
    return NextResponse.json(faculty)
}

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop() as string
    const { name } = await req.json()

    const faculty = await prisma.faculty.update({
        where: {id: parseInt(id)},
        data: {name}
    })
    return NextResponse.json(faculty)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop() as string
    await prisma.faculty.delete({where: {id: parseInt(id)}})
    return NextResponse.json({message: "Fac deleted"})   
}