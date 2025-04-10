import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split("/").pop() as string
  try {
    const book = await prisma.book.findUnique({
      where: { id: +id },
      include: {
        auteur: true,
        faculty: true,
        subject: true,
        FavoriteBook: true,
        View: true
      }
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // return new Response(book.file, {
    //   headers: {
    //     "Content-Type": "application/pdf",
    //     "Content-Disposition": `inline; filename="${book.title}.pdf"`, // Affiche directement dans le navigateur
    //   },
    // });
    return NextResponse.json(book, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split("/").pop() as string
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const subjectId = formData.get("subjectId") ? Number(formData.get("subjectId")) : null;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Convertir le fichier en Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Enregistrer dans la base de données (Postgres avec Prisma)
    const book = await prisma.book.update({
      where: { id: +id, },
      data: {
        title,
        subjectId,
        file: buffer,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


