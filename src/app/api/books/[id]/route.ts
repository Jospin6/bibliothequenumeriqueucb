import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma/prisma"


export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop() as string;
    const book = await prisma.book.findUnique({
        where: { id: parseInt(id) },
    });

    if (!book) {
        return NextResponse.json({ message: 'Book Not Found' }, { status: 404 });
    }
    return NextResponse.json(book);
    
}

export async function PUT(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop() as string;
    const { titre, auteurId, auteurNom, faculteId, matiereId, file } = await req.json();
    const book = await prisma.book.update({
        where: { id: parseInt(id) },
        data: {
            titre,
            auteurId,
            auteurNom,
            faculteId,
            matiereId,
            file,
        },
      });
      return NextResponse.json(book);
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop() as string;
    await prisma.book.delete({
        where: { id: parseInt(id) },
    });
    return NextResponse.json({ message : 'Book deleted' });
}