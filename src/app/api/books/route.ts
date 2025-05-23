import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const auteurId = Number(formData.get("auteurId"));
        const faculteId = formData.get("faculteId") ? Number(formData.get("faculteId")) : null;
        const subjectId = formData.get("subjectId") ? Number(formData.get("subjectId")) : null;
        const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null;
        const file = formData.get("file") as File;
        const fileType = formData.get("fileType") as string;

        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        // Convertir le fichier en Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Enregistrer dans la base de données (Postgres avec Prisma)
        const book = await prisma.book.create({
            data: {
                title,
                auteurId,
                faculteId,
                fileType,
                subjectId,
                file: buffer, // Stocker en BLOB ou Base64 selon la DB
            },
        });

        return NextResponse.json(book, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const config = { api: { bodyParser: false } }; // Désactiver le bodyParser de Next.js pour `formidable`


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const faculteId = searchParams.get("faculteId");
        const subjectId = searchParams.get("subjectId");
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const books = await prisma.book.findMany({
            skip,
            take: limit,
            where: {
                ...(faculteId !== null && faculteId !== undefined ? { faculteId: Number(faculteId) } : {}),
                ...(subjectId !== null && subjectId !== undefined ? { subjectId: Number(subjectId) } : {}),
            },
            include: {
                auteur: true,
                faculty: true,
                subject: true,
                FavoriteBook: true,
                View: true
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(books, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
