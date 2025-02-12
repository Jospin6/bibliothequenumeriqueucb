type SelectFieldProps = {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    register: any;
    errors: any; 
};

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, options, register, errors }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <select {...register(name)}>
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
