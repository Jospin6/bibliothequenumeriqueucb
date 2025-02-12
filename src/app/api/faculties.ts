import { NextApiRequest, NextApiResponse } from "next";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, getDoc, Query, getDocs } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const addFac = async (req: NextApiRequest, res: NextApiResponse) => {
    const { nom, description } = req.body;

    try {
        const docRef = await addDoc(collection(db, "facultes"), {
            nom,
            description,
            created_at: serverTimestamp(),
        });

        res.status(200).json({ id: docRef.id, message: "Faculté ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la Faculté" });
    }
};

const getFacs = async (req: NextApiRequest, res: NextApiResponse) => {
    const { faculteId } = req.query;

    try {
        if (faculteId) {
            const facRef = doc(db, "facultes", faculteId as string); // Référence au livre par son ID
            const docSnapshot = await getDoc(facRef);

            if (docSnapshot.exists()) {
                return res.status(200).json({ id: docSnapshot.id, ...docSnapshot.data() }); // Si le livre existe, on le renvoie
            } else {
                return res.status(404).json({ error: "Matière non trouvé" }); // Si le livre n'existe pas
            }
        }

        let facQuery: Query = collection(db, "facultes");

        const querySnapshot = await getDocs(facQuery);
        const faculties = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(faculties);

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la faculté" });
    }
};


const updateFac = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, ...data } = req.body;
    const facRef = doc(db, "facultes", id);

    try {
        await updateDoc(facRef, data);
        res.status(200).json({ message: "Faculté mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la Faculté" });
    }
};

const deleteFac = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, fileUrl } = req.body;
    const bookRef = doc(db, "facultes", id);

    try {
        await deleteDoc(bookRef);
        if (fileUrl) {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
        }
        res.status(200).json({ message: "Faculté supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la Faculté" });
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            return addFac(req, res);
        case "GET":
            return getFacs(req, res);
        case "PUT":
            return updateFac(req, res);
        case "DELETE":
            return deleteFac(req, res);
        default:
            return res.status(405).json({ error: "Méthode non autorisée" });
    }
}