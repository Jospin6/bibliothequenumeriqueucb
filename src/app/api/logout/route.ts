import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    (await cookies()).delete("token_ucb");
    return NextResponse.json({ message: "Déconnexion réussie" }, { status: 200 });
  }