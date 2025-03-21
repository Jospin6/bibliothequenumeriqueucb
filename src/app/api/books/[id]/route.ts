import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const book = await prisma.book.findUnique({
//       where: { id: Number(params.id) },
//     });

//     if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 });

//     return NextResponse.json({
//       ...book,
//       file: Buffer.from(book.file).toString("base64"),
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(params.id) },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return new Response(book.file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${book.title}.pdf"`, // Affiche directement dans le navigateur
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

