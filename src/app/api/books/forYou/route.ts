import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const faculteId = searchParams.get("faculteId");
  
      const books = await prisma.book.findMany({
        where: {
          ...(faculteId ? { faculteId: Number(faculteId) } : {}),
        },
        include: {
          auteur: true,
          faculty: true,
          subject: true,
          FavoriteBook: true,
          View: true,
          _count: {
            select: { View: true },
          },
        },
        orderBy: [
          {
            View: {
              _count: "desc",
            },
          },
        ],
        take: 10,
      });
  
      return NextResponse.json(books, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }