import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: Request) {
    const { bookId, userId } = await req.json();

    try {
        const existingView = await prisma.view.findFirst({
            where: {
                bookId: +bookId,
                userId: +userId
            }
        });

        if (!existingView) {
            const view = await prisma.view.create({
                data: {
                    bookId: +bookId,
                    userId: +userId
                }
            });
            return NextResponse.json(view, { status: 201 });
        }
        

        return NextResponse.json({message: "existing view"}, { status: 201 });

    } catch (error) {
        console.error('Error handling favorite book:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const views = await prisma.view.findMany(
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
    return NextResponse.json(views)
}