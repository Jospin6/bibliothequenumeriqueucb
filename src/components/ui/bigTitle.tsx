
export const BigTitle = ({title, className}: {title: string, className?: string}) => {
    return <>
        <h1 className={`font-semibold text-4xl text-gray-800 ${className}`}> {title} </h1>
    </>
}