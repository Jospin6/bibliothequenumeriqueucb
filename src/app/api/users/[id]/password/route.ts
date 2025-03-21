import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma"
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
    const { id, oldPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { password: hashedPassword }
    });

    return NextResponse.json(updatedUser);
}
