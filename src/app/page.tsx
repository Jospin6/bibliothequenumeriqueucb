"use client";
import { useState } from "react";
import Popup from "@/components/ui/popup";
import { UserForm } from "@/components/forms/userForm";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        Ouvrir le Popup
      </button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold">Titre du Popup</h2>
        <div className="mt-2">
          <UserForm />
        </div>
      </Popup>
    </div>
  );
}
