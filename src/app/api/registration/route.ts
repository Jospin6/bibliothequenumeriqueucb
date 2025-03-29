import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

export async function POST(req: NextRequest) {
  const { email, name, postnom, password } = await req.json();

  try {
    const authorisedUser = await prisma.authorisedUser.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        isActive: true,
        faculteId: true,
      }
    });

    if (!authorisedUser) {
      return NextResponse.json({ message: "Email non autorisé. L'email doit être enregistré dans la liste des utilisateurs autorisés." }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        postnom, 
        password: hashedPassword,
        faculteId: authorisedUser.faculteId,},
    });

    const token = jwt.sign({ 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      postnom: user.postnom }, SECRET_KEY);


    const response = NextResponse.json(user, { status: 200 });

    (await cookies()).set("token_ucb", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 100 * 365 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}