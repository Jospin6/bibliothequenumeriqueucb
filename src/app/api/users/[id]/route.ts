
// ➜ 🟠 Mettre à jour un utilisateur
export async function PUT(req: Request) {
    // try {
    //     const { id, ...data } = await req.json();
    //     const userRef = doc(db, "utilisateurs", id);

    //     await updateDoc(userRef, data);
    //     return NextResponse.json({ message: "User mis à jour avec succès" }, { status: 200 });
    // } catch (error) {
    //     return NextResponse.json({ error: "Erreur lors de la mise à jour du user" }, { status: 500 });
    // }
}

// ➜ 🔴 Supprimer un utilisateur
export async function DELETE(req: Request) {
    // try {
    //     const { id, fileUrl } = await req.json();
    //     const userRef = doc(db, "utilisateurs", id);

    //     await deleteDoc(userRef);

    //     if (fileUrl) {
    //         const fileRef = ref(storage, fileUrl);
    //         await deleteObject(fileRef);
    //     }

    //     return NextResponse.json({ message: "User supprimé avec succès" }, { status: 200 });
    // } catch (error) {
    //     return NextResponse.json({ error: "Erreur lors de la suppression du user" }, { status: 500 });
    // }
}