type TextAreaFieldProps = {
    name: string;
    placeholder: string;
    label: string;
    register: any; // Le register provenant de useForm
    errors: any; // Les erreurs de validation
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ name, placeholder, label, register, errors }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <textarea {...register(name)} placeholder={placeholder} />
            {errors[name] && <span>{errors[name]?.message}</span>} {/* Affiche l'erreur si elle existe */}
        </div>
    );
};
