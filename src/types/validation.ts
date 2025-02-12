import { userSchema, bookSchema } from "@/lib/validationSchema";
import * as z from "zod";

export type UserFormValues = z.infer<typeof userSchema>;
export type BookFormValues = z.infer<typeof bookSchema>;
