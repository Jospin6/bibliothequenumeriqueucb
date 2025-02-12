type InputFieldProps = {
  name: string;
  placeholder: string;
  register: any; // Le register provenant de useForm
  errors: any; // Les erreurs de validation
};

export const InputField: React.FC<InputFieldProps> = ({ name, placeholder, register, errors }) => {
  return (
    <div>
      <input {...register(name)} placeholder={placeholder} />
      {errors[name] && <span>{errors[name]?.message}</span>} {/* Affiche l'erreur si elle existe */}
    </div>
  );
};

  