import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp, query, where, getDocs, Query, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { startOfWeek, endOfWeek } from "date-fns";

// ➜ 🟢 Ajouter un livre avec fichier (POST)
export async function POST(req: Request) {
    
}

// ➜ 🟡 Récupérer les livres (GET)
export async function GET(req: Request) {
    
}

// ➜ 🟠 Mettre à jour un livre (PUT)
export async function PUT(req: Request) {
    
}

// ➜ 🔴 Supprimer un livre (DELETE)
export async function DELETE(req: Request) {
   
}
