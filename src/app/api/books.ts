import { NextApiRequest, NextApiResponse } from "next";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, CollectionReference, Query, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import multer from "multer";
import { promisify } from "util";
import { startOfWeek, endOfWeek } from "date-fns";

const upload = multer({ storage: multer.memoryStorage() });
const runMiddleware = promisify(upload.single('file'));

const addBook = async (req: NextApiRequest & { file?: Express.Multer.File }, res: NextApiResponse) => {
    const { titre, auteurId, auteurNom, faculteId, matiereId, typeDocument } = req.body;
    const file = req.file;
    let fileUrl = "";

    try {
        if (file) {
            const fileRef = ref(storage, `documents/${file.originalname}`);
            await uploadBytes(fileRef, file.buffer);
            fileUrl = await getDownloadURL(fileRef);
        }

        const docRef = await addDoc(collection(db, "livres"), {
            titre,
            auteurId,
            auteurNom,
            faculteId,
            matiereId,
            url: fileUrl,
            typeDocument,
            date_ajout: serverTimestamp(),
            consultations: 0,
        });

        res.status(200).json({ id: docRef.id, message: "Livre ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du livre" });
    }
};

const getBooks = async (req: NextApiRequest, res: NextApiResponse) => {
    const { filter, faculteId } = req.query;
    let booksQuery: CollectionReference | Query = collection(db, "livres");

    try {
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
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des livres" });
    }
};

const updateBook = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, ...data } = req.body;
    const bookRef = doc(db, "livres", id);

    try {
        await updateDoc(bookRef, data);
        res.status(200).json({ message: "Livre mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du livre" });
    }
};

const deleteBook = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, fileUrl } = req.body;
    const bookRef = doc(db, "livres", id);

    try {
        await deleteDoc(bookRef);

        if (fileUrl) {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
        }

        res.status(200).json({ message: "Livre supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du livre" });
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            return addBook(req, res);
        case "GET":
            return getBooks(req, res);
        case "PUT":
            return updateBook(req, res);
        case "DELETE":
            return deleteBook(req, res);
        default:
            return res.status(405).json({ error: "Méthode non autorisée" });
    }
}