import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: NextRequest) {
    const { email, faculteId } = await req.json()
    try {
        const authorisedUser = await prisma.authorisedUser.create({
            data: {
                email,
                faculteId
            }
        })

        return NextResponse.json(authorisedUser, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const faculteId = searchParams.get("faculteId");
        const authorisedUsers = await prisma.authorisedUser.findMany({
            where: {
                ...(faculteId ? { faculteId: Number(faculteId) } : {}),
            },
        })
        return NextResponse.json(authorisedUsers)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}