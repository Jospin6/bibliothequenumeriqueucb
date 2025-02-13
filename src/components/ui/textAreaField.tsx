type TextAreaFieldProps = {
    name: string;
    placeholder: string;
    label: string;
    register: any;
    errors: any;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ name, placeholder, label, register, errors }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block">{label}</label>
            <textarea {...register(name)} placeholder={placeholder} 
                className="w-full h-16 p-2 border border-gray-300 
                rounded-lg shadow-sm focus:outline-none resize-none 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " />
            {errors[name] && <span className="text-red-600">{errors[name]?.message}</span>}
            
        </div>
    );
};
