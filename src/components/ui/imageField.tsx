import React from "react";
import { UseFormRegister, UseFormSetValue, FieldErrors, UseFormTrigger, UseFormWatch } from "react-hook-form";

type ImageFieldProps = {
  name: string;
  accept: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
};

export const ImageField: React.FC<ImageFieldProps> = ({ name, accept, register, setValue, trigger, watch, errors }) => {
  const selectedFile = watch(name); // Récupère la valeur du fichier sélectionné

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setValue(name, file, { shouldValidate: true });
      trigger(name); 
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {!selectedFile ? (
        <>
          <input
            type="file"
            id={name}
            accept={accept}
            {...register(name, { required: "Ce champ est requis" })}
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor={name} className="px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg cursor-pointer">
            Choisir un fichier
          </label>
        </>
      ) : (
        <strong>{selectedFile.name}</strong> // Affichage du nom du fichier
      )}
    </div>
  );
};
