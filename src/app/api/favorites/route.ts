import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: Request) {
    const { bookId, userId } = await req.json();

    try {
        const existingFavorite = await prisma.favoriteBook.findFirst({
            where: {
                bookId: +bookId,
                userId: +userId
            }
        });

        if (existingFavorite) {
            await prisma.favoriteBook.delete({
                where: {
                    userId_bookId: {
                        bookId: +bookId,
                        userId: +userId
                    }
                }
            });
            return NextResponse.json({ message: 'Favorite removed' }, { status: 200 });
        }
        const favory = await prisma.favoriteBook.create({
            data: {
                bookId: +bookId,
                userId: +userId
            }
        });

        return NextResponse.json(favory, { status: 201 });

    } catch (error) {
        console.error('Error handling favorite book:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const favories = await prisma.favoriteBook.findMany(
        {
            where: {
                userId: +userId!
            },
            include: {
                book: true,
                user: true
            }
        }
    )
    return NextResponse.json(favories)
}