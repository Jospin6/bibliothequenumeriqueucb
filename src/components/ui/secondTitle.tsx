
export const SecondTitle = ({title, subtitle, className}: {title: string, subtitle: string, className?:string}) => {
    return <div className={className}>
        <h2 className="text-2xl font-semibold text-gray-800"> {title} </h2>
        <h5 className="text-[15px] text-gray-500"> {subtitle} </h5>
    </div>
}