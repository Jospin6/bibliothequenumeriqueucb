import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"


export async function POST(req: Request) {
    const {name, faculteId } = await req.json()
    
    try {
        const subject = await prisma.subject.create({
            data: {
                name,
                faculteId
            }
        })
        return NextResponse.json(subject)
    } catch (error) {
        console.log("subject error", error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
    
}

export async function GET(req: Request) {
    const subject = await prisma.subject.findMany()
    return NextResponse.json(subject)
}

