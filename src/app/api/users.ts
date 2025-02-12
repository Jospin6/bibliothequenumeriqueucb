import { NextApiRequest, NextApiResponse } from "next";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, getDoc, Query, getDocs } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { nom, postnom, email, role, faculteId, password } = req.body;

    try {
        const docRef = await addDoc(collection(db, "utilisateurs"), {
            nom,
            postnom,
            email,
            role,
            faculteId,
            password,
            created_at: serverTimestamp(),
        });

        res.status(200).json({ id: docRef.id, message: "User ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du user" });
    }
};

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    const { UserId } = req.query;

    try {
        if (UserId) {
            const userRef = doc(db, "utilisateurs", UserId as string); // Référence au livre par son ID
            const docSnapshot = await getDoc(userRef);

            if (docSnapshot.exists()) {
                return res.status(200).json({ id: docSnapshot.id, ...docSnapshot.data() }); // Si le livre existe, on le renvoie
            } else {
                return res.status(404).json({ error: "User non trouvé" }); // Si le livre n'existe pas
            }
        }

        let userQuery: Query = collection(db, "utilisateurs");

        const querySnapshot = await getDocs(userQuery);
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de user" });
    }
};


const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, ...data } = req.body;
    const userRef = doc(db, "utilisateurs", id);

    try {
        await updateDoc(userRef, data);
        res.status(200).json({ message: "User mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la user" });
    }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, fileUrl } = req.body;
    const bookRef = doc(db, "utilisateurs", id);

    try {
        await deleteDoc(bookRef);
        if (fileUrl) {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
        }
        res.status(200).json({ message: "user supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la user" });
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            return addUser(req, res);
        case "GET":
            return getUsers(req, res);
        case "PUT":
            return updateUser(req, res);
        case "DELETE":
            return deleteUser(req, res);
        default:
            return res.status(405).json({ error: "Méthode non autorisée" });
    }
}