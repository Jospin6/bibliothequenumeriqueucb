import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"


export async function POST(req: Request) {
    const { name } = await req.json()

    try {
        const fac = await prisma.faculty.create({
            data: {
                name,
            }
        })
        return NextResponse.json(fac, { status: 201 });
    } catch (error) {
        console.error('Error creating the faculty:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
    
}

export async function GET(req: Request) {
    const faculties = await prisma.faculty.findMany({
        include: {
            users: true,
            subjects: true,
            books: {
                include: {
                    auteur: true,
                    subject: true,
                    FavoriteBook: true,
                    View: true
                }
            },
            AuthorisedUser: true
        }
    })
    return NextResponse.json(faculties)
}

