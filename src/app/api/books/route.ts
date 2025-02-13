import { NextResponse } from "next/server";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, Query, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { startOfWeek, endOfWeek } from "date-fns";

// ➜ 🟢 Ajouter un livre avec fichier (POST)
export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const titre = formData.get("titre") as string;
        const auteurId = formData.get("auteurId") as string;
        const auteurNom = formData.get("auteurNom") as string;
        const faculteId = formData.get("faculteId") as string;
        const matiereId = formData.get("matiereId") as string;
        const file = formData.get("file") as File;
        let fileUrl = "";

        if (file) {
            const fileRef = ref(storage, `documents/${file.name}`);
            const fileBuffer = await file.arrayBuffer();
            await uploadBytes(fileRef, new Uint8Array(fileBuffer));
            fileUrl = await getDownloadURL(fileRef);
        }

        const docRef = await addDoc(collection(db, "livres"), {
            titre,
            auteurId,
            auteurNom,
            faculteId,
            matiereId,
            url: fileUrl,
            date_ajout: serverTimestamp(),
            consultations: 0,
        });

        return NextResponse.json({ id: docRef.id, message: "Livre ajouté avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'ajout du livre" }, { status: 500 });
    }
}

// ➜ 🟡 Récupérer les livres (GET)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const bookId = searchParams.get("bookId");
        const filter = searchParams.get("filter");
        const faculteId = searchParams.get("faculteId");

        if (bookId) {
            const bookRef = doc(db, "livres", bookId);
            const docSnapshot = await getDoc(bookRef);

            if (docSnapshot.exists()) {
                return NextResponse.json({ id: docSnapshot.id, ...docSnapshot.data() }, { status: 200 });
            } else {
                return NextResponse.json({ error: "Livre non trouvé" }, { status: 404 });
            }
        }

        let booksQuery: Query = collection(db, "livres");

        // Filtre par semaine courante
        if (filter === "week") {
            const now = new Date();
            const start = startOfWeek(now, { weekStartsOn: 1 });
            const end = endOfWeek(now, { weekStartsOn: 1 });
            booksQuery = query(booksQuery, where("date_ajout", ">=", start), where("date_ajout", "<=", end));
        }

        // Filtre par faculté
        if (faculteId) {
            booksQuery = query(booksQuery, where("faculteId", "==", faculteId));
        }

        const querySnapshot = await getDocs(booksQuery);
        const books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json(books, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la récupération des livres" }, { status: 500 });
    }
}

// ➜ 🟠 Mettre à jour un livre (PUT)
export async function PUT(req: Request) {
    try {
        const { id, ...data } = await req.json();
        const bookRef = doc(db, "livres", id);

        await updateDoc(bookRef, data);
        return NextResponse.json({ message: "Livre mis à jour avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la mise à jour du livre" }, { status: 500 });
    }
}

// ➜ 🔴 Supprimer un livre (DELETE)
export async function DELETE(req: Request) {
    try {
        const { id, fileUrl } = await req.json();
        const bookRef = doc(db, "livres", id);

        await deleteDoc(bookRef);

        if (fileUrl) {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
        }

        return NextResponse.json({ message: "Livre supprimé avec succès" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la suppression du livre" }, { status: 500 });
    }
}
