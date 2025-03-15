import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const auteurId = Number(formData.get("auteurId"));
        const faculteId = formData.get("faculteId") ? Number(formData.get("faculteId")) : null;
        const subjectId = formData.get("subjectId") ? Number(formData.get("subjectId")) : null;
        const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null;
        const file = formData.get("file") as File;

        if (!file) return NextResponse.json({ error: "File is required" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());

        const book = await prisma.book.create({
            data: { title, auteurId, faculteId, subjectId, categoryId, file: buffer },
        });

        return NextResponse.json(book, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const faculteId = searchParams.get("faculteId");

        const books = await prisma.book.findMany({
            where: faculteId ? { faculteId: Number(faculteId) } : {},
            include: {
                auteur: true,
                faculty: true,
                subject: true,
                category: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(books, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
