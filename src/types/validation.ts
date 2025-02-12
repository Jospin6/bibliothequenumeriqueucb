import { userSchema, bookSchema, subjectAndFacultySchema } from "@/lib/validationSchema";
import * as z from "zod";

export type UserFormValues = z.infer<typeof userSchema>;
export type BookFormValues = z.infer<typeof bookSchema>;
export type SubjectAndFacutlyFormValues = z.infer<typeof subjectAndFacultySchema>;
