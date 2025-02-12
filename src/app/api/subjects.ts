import { NextApiRequest, NextApiResponse } from "next";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, getDoc, CollectionReference, Query, getDocs } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const addSubject = async (req: NextApiRequest, res: NextApiResponse) => {
    const { nom, description } = req.body;

    try {
        const docRef = await addDoc(collection(db, "matieres"), {
            nom,
            description,
            created_at: serverTimestamp(),
        });

        res.status(200).json({ id: docRef.id, message: "Matière ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la Matière" });
    }
};

const getSubject = async (req: NextApiRequest, res: NextApiResponse) => {
    const { subjectId } = req.query;

    try {
        if (subjectId) {
            const subjectRef = doc(db, "matieres", subjectId as string); // Référence au livre par son ID
            const docSnapshot = await getDoc(subjectRef);

            if (docSnapshot.exists()) {
                return res.status(200).json({ id: docSnapshot.id, ...docSnapshot.data() }); // Si le livre existe, on le renvoie
            } else {
                return res.status(404).json({ error: "Matière non trouvé" }); // Si le livre n'existe pas
            }
        }
        let subjectQuery: Query = collection(db, "matieres");

        const querySnapshot = await getDocs(subjectQuery);
        const subjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la Matière" });
    }
};


const updateSubject = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, ...data } = req.body;
    const facRef = doc(db, "matieres", id);

    try {
        await updateDoc(facRef, data);
        res.status(200).json({ message: "Matière mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la Matière" });
    }
};

const deleteSubjec = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, fileUrl } = req.body;
    const bookRef = doc(db, "matieres", id);

    try {
        await deleteDoc(bookRef);
        if (fileUrl) {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
        }
        res.status(200).json({ message: "Matière supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la Matière" });
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            return addSubject(req, res);
        case "GET":
            return getSubject(req, res);
        case "PUT":
            return updateSubject(req, res);
        case "DELETE":
            return deleteSubjec(req, res);
        default:
            return res.status(405).json({ error: "Méthode non autorisée" });
    }
}