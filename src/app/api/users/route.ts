import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function GET(req: Request) {
    const users = await prisma.user.findMany({
        include: {
            faculty: true,
        }
    })
    return NextResponse.json(users)
}