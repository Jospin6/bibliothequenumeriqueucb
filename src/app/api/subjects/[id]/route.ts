import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma/prisma"


export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const subject = await prisma.findUnique({
        where: parseInt(id)
    })
    if (!subject) {
        NextResponse.json({message: "Subject not found"})
    }
    return NextResponse.json(subject)
}

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const {name} = await req.json()

    const subject = await prisma.subject.update({
        where: {id: parseInt(id)},
        data: {name}
    })
    return NextResponse.json(subject)
}

export async function DELETE(req: Request) {
   const url = new URL(req.url)
   const id = url.pathname.split('/').pop() as string
   await prisma.subject.delete({where: {id: parseInt(id)}})
   return NextResponse.json({message: "Subject deleted"})
}