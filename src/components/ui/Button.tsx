type ButtonProps = {
    label: string;// Les erreurs de validation
};

export const Button: React.FC<ButtonProps> = ({ label }) => {
    return (
        <button type="submit" className="px-[20px] py-[5px] rounded-lg bg-gray-800 text-white"> {label} </button>
    );
};