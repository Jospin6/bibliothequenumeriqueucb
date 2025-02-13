type InputFieldProps = {
  name: string;
  placeholder: string;
  register: any; // Le register provenant de useForm
  errors: any; // Les erreurs de validation
};

export const InputField: React.FC<InputFieldProps> = ({ name, placeholder, register, errors }) => {
  return (
    <div className="mb-4">
      <input {...register(name)} placeholder={placeholder} className="border border-gray-400 rounded-lg px-2 w-full h-[35px]" />
      {errors[name] && <span className="text-red-600">{errors[name]?.message}</span>} {/* Affiche l'erreur si elle existe */}
    </div>
  );
};

  