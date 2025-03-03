import { NextResponse } from "next/server";

// ➜ 🟢 Ajouter un utilisateur
export async function POST(req: Request) {
    // try {
    //     const formData = await req.formData();

    //     const docRef = await addDoc(collection(db, "utilisateurs"), {
    //         nom: formData.get("nom") as string,
    //         postnom: formData.get("postnom") as string,
    //         email: formData.get("email") as string,
    //         role: formData.get("role") as string,
    //         faculteId: formData.get("faculteId") as string,
    //         password: formData.get("password") as string,
    //         created_at: serverTimestamp(),
    //     });

    //     return NextResponse.json({ id: docRef.id, message: "User ajouté avec succès" }, { status: 200 });
    // } catch (error) {
    //     console.error("Erreur API Users:", error); // 🔍 Voir le vrai problème dans la console
    //     return NextResponse.json({ error: "Erreur lors de l'ajout du user" }, { status: 500 });
    // }
}

// ➜ 🟡 Récupérer les utilisateurs
export async function GET(req: Request) {
    // try {
    //     const { searchParams } = new URL(req.url);
    //     const userId = searchParams.get("UserId");

    //     if (userId) {
    //         const userRef = doc(db, "utilisateurs", userId);
    //         const docSnapshot = await getDoc(userRef);

    //         if (docSnapshot.exists()) {
    //             return NextResponse.json({ id: docSnapshot.id, ...docSnapshot.data() }, { status: 200 });
    //         } else {
    //             return NextResponse.json({ error: "User non trouvé" }, { status: 404 });
    //         }
    //     }

    //     let userQuery: Query = collection(db, "utilisateurs");
    //     const querySnapshot = await getDocs(userQuery);
    //     const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    //     return NextResponse.json(users, { status: 200 });

    // } catch (error) {
    //     return NextResponse.json({ error: "Erreur lors de la récupération des users" }, { status: 500 });
    // }
}




