import { userSchema, bookSchema, facultySchema, subjectSchema,  } from "@/lib/validationSchema";
import * as z from "zod";

export type UserFormValues = z.infer<typeof userSchema>;
export type BookFormValues = z.infer<typeof bookSchema>;
export type faculteFormValues = z.infer<typeof facultySchema>;
export type SubjectFormValues = z.infer<typeof subjectSchema>;
