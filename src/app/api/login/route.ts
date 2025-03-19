import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('Utilisateur non trouvé')
  }

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

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Mot de passe incorrect')
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name, postnom: user.postnom }, SECRET_KEY, {
    expiresIn: "7d", 
  });

  
  const response = NextResponse.json({ message: "Connexion réussie" }, { status: 200 });

  (await cookies()).set("token_ucb", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, 
  });
  return response;
}