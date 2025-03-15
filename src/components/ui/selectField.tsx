type SelectFieldProps = {
    name: string;
    label: string;
    options: { value: any; label: string }[];
    register: any;
    errors: any; 
};

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, options, register, errors }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block">{label}</label>
            <select {...register(name)} className="border border-gray-400 rounded-lg px-2 w-full h-[35px]" id={name}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && <span>{errors[name]?.message}</span>}
        </div>
    );
};
