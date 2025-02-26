type ButtonProps = {
    label: string;
    onClick?: () => void
    className?: string
};

export const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
    return (
        <button type="submit" onClick={onClick} className={`px-[20px] py-[5px] bg-gray-800 rounded-lg text-white ${className}`}> {label} </button>
    );
};