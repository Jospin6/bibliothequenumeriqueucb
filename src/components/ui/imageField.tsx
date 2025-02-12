type ImageFieldProps = {
    name: string;
    accept: string;
    register: any; // La fonction register de useForm
    setValue: any; // La fonction setValue de useForm
    errors: any; // Les erreurs de validation
};

export const ImageField: React.FC<ImageFieldProps> = ({ name, accept, register, setValue, errors }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setValue(name, file);
    };

    return (
        <div>
            <input
                type="file"
                accept={accept}
                {...register(name)}
                onChange={handleFileChange}
            />
            {errors[name] && <span>{errors[name]?.message}</span>}
        </div>
    );
};

