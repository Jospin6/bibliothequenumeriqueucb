"use client";
import { useState } from "react";
import Popup from "@/components/ui/popup";
import { UserForm } from "@/components/forms/userForm";
import { FacultyForm } from "@/components/forms/facultyForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { BookForm } from "@/components/forms/bookForm";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<React.ReactNode>(null);
  const [formTitle, setFormTitle] = useState("");

  const handleOpen = (form: React.ReactNode, title: string) => {
    setActiveForm(form);
    setFormTitle(title);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => handleOpen(<UserForm />, "Formulaire Utilisateur")}
      >
        Ajouter un utilisateur
      </button>
      <button 
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
        onClick={() => handleOpen(<FacultyForm />, "Formulaire Faculté")}
      >
        Ajouter une faculté
      </button>
      <button 
        className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
        onClick={() => handleOpen(<SubjectForm />, "Formulaire Matière")}
      >
        Ajouter une matière
      </button>
      <button 
        className="px-4 py-2 bg-blue-900 text-white rounded-lg"
        onClick={() => handleOpen(<BookForm />, "Formulaire Livre")}
      >
        Ajouter un livre
      </button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">{formTitle}</h2>
        <div className="mt-2">
          {activeForm}
        </div>
      </Popup>
    </div>
  );
}
