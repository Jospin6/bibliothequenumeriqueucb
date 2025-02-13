import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, getDoc, Query, getDocs } from "firebase/firestore";

// ➜ 🟢 Ajouter une faculté (POST)
export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const docRef = await addDoc(collection(db, "facultes"), {
            nom: formData.get("nom") as string,
            description: formData.get("description") as string,
            created_at: serverTimestamp(),
        });

        return NextResponse.json({ id: docRef.id, message: "Faculté ajoutée avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'ajout de la faculté" }, { status: 500 });
    }
}

// ➜ 🟡 Récupérer une ou plusieurs facultés (GET)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const faculteId = searchParams.get("faculteId");

        if (faculteId) {
            const facRef = doc(db, "facultes", faculteId);
            const docSnapshot = await getDoc(facRef);

            if (docSnapshot.exists()) {
                return NextResponse.json({ id: docSnapshot.id, ...docSnapshot.data() }, { status: 200 });
            } else {
                return NextResponse.json({ error: "Faculté non trouvée" }, { status: 404 });
            }
        }

        let facQuery: Query = collection(db, "facultes");
        const querySnapshot = await getDocs(facQuery);
        const faculties = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json(faculties, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la récupération des facultés" }, { status: 500 });
    }
}

// ➜ 🟠 Mettre à jour une faculté (PUT)
export async function PUT(req: Request) {
    try {
        const { id, ...data } = await req.json();
        const facRef = doc(db, "facultes", id);

        await updateDoc(facRef, data);
        return NextResponse.json({ message: "Faculté mise à jour avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la mise à jour de la faculté" }, { status: 500 });
    }
}

// ➜ 🔴 Supprimer une faculté (DELETE)
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const facRef = doc(db, "facultes", id);

        await deleteDoc(facRef);
        return NextResponse.json({ message: "Faculté supprimée avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la suppression de la faculté" }, { status: 500 });
    }
}
