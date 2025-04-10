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
    const { searchParams } = new URL(req.url);
    const faculteId = searchParams.get("faculteId");
    if (faculteId) {
        const subject = await prisma.subject.findMany({
            where: {faculteId: +faculteId},
            include: {
                books: {
                    include: {
                        auteur: true,
                        faculty: true,
                        subject: true,
                        FavoriteBook: true,
                        View: true
                    },
                }
            }
        })
        return NextResponse.json(subject)
    }
    const subject = await prisma.subject.findMany()
    return NextResponse.json(subject)
}

