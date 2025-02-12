type ButtonProps = {
    label: string;// Les erreurs de validation
};

export const Button: React.FC<ButtonProps> = ({ label }) => {
    return (
        <button type="submit"> {label} </button>
    );
};