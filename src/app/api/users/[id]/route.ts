import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)},
        include: {
            faculty: true,
            // books: tru
            View: true,
            FavoriteBook: {
                include: {
                    book: {
                        include: {
                            FavoriteBook: true,
                            faculty: true,
                            subject: true,
                            View: true
                        }
                    }
                }
            }
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
    const {name, postnom} = await req.json()
    const user = await prisma.user.update({
        where: {id: parseInt(id)},
        data: {
            name, 
            postnom
        }
    })
    return NextResponse.json(user)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.user.delete({where: {id: parseInt(id)}})
}