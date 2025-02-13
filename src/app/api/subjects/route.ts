import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, getDoc, Query, getDocs } from "firebase/firestore";

// ➜ 🟢 Ajouter une matière (POST)
export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const docRef = await addDoc(collection(db, "matieres"), {
            nom: formData.get("nom") as string,
            description: formData.get("description") as string,
            created_at: serverTimestamp(),
        });

        return NextResponse.json({ id: docRef.id, message: "Matière ajoutée avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'ajout de la matière" }, { status: 500 });
    }
}

// ➜ 🟡 Récupérer une ou plusieurs matières (GET)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const subjectId = searchParams.get("subjectId");

        if (subjectId) {
            const subjectRef = doc(db, "matieres", subjectId);
            const docSnapshot = await getDoc(subjectRef);

            if (docSnapshot.exists()) {
                return NextResponse.json({ id: docSnapshot.id, ...docSnapshot.data() }, { status: 200 });
            } else {
                return NextResponse.json({ error: "Matière non trouvée" }, { status: 404 });
            }
        }

        let subjectQuery: Query = collection(db, "matieres");
        const querySnapshot = await getDocs(subjectQuery);
        const subjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json(subjects, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la récupération des matières" }, { status: 500 });
    }
}

// ➜ 🟠 Mettre à jour une matière (PUT)
export async function PUT(req: Request) {
    try {
        const { id, ...data } = await req.json();
        const subjectRef = doc(db, "matieres", id);

        await updateDoc(subjectRef, data);
        return NextResponse.json({ message: "Matière mise à jour avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la mise à jour de la matière" }, { status: 500 });
    }
}

// ➜ 🔴 Supprimer une matière (DELETE)
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const subjectRef = doc(db, "matieres", id);

        await deleteDoc(subjectRef);
        return NextResponse.json({ message: "Matière supprimée avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la suppression de la matière" }, { status: 500 });
    }
}
