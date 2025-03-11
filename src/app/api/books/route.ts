import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma"


export async function POST(req: NextRequest) {
    const { titre, auteurId, auteurNom, faculteId, matiereId, file } = await req.json()

    try {
        // const book = await prisma.book.create({
        //     data: {
        //     }
        // })
        // return NextResponse.json(book, { status: 201 });
    } catch (error) {
        console.error('Error creating book:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const books = await prisma.book.findMany()
    return NextResponse.json(books)
}
