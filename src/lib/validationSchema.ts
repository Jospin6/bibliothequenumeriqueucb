import * as z from "zod";

// Utilisateur Schema
export const userSchema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    postnom: z.string().min(1, "Le postnom est requis"),
    email: z.string().email("Email invalide"),
    faculteId: z.string().min(1, "Faculté requise"),
    role: z.enum(["admin", "etudiant", "professeur"]),
    password: z.string().min(6, "Mot de passe trop court"),
});

// Livre Schema
export const bookSchema = z.object({
    titre: z.string().min(1, "Titre requis"),
    faculteId: z.string().min(1, "Faculté requise"),
    matiereId: z.string().min(1, "Matière requise"),
    date_ajout: z.date().default(() => new Date()),
    consultations: z.number().default(0),
    file: z.instanceof(File).optional(), // Ajout du champ file
});

// Matière et faculté Schema
export const facultySchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
});

export const subjectSchema = z.object({
    name: z.string().min(1, "name are required !"),
    faculteId: z.number()
})