import { Book, Eye, Heart, Notebook } from "lucide-react"
import Link from "next/link"

interface MainItemProps {
    subject?: string
    autheur?: string
    title?: string
    createdAt?: string
    id?: number
}

export const MainItem = ({subject, autheur, title, createdAt, id}: MainItemProps) => {
    return <div className="flex h-[auto] border-b-[1px] border-gray-200 mt-2">
        <div className="w-[75%] h-[auto] pb-2 pl-2">
            <div className="flex items-center text-gray-500"> 
                <Notebook size={20} className="mr-2 text-teal-400"/> 
                <span> <span className="text-gray-800">Histoire</span> écrit par jospin ndagano</span> 
            </div>
            <p className="font-semibold text-xl font-verdana py-2">
                <Link href={`/books/${id}`}>
                    {title}
                </Link>
            </p>
            <p className="text-gray-500">Ipsum dolor sit amet consectetur adipisicing elit. Dignissimos</p>
            <div className="flex justify-between items-center text-gray-500 py-2">
                <div className="flex items-center">
                    <span className="pr-2 text-[12px]">Jan7</span>
                    <div className="flex items-center">
                        <Eye size={15} className="mr-[5px]"/> 
                        <span className="text-[12px]">35</span> 
                    </div>
                </div>
                <div className="flex items-center">
                    <Heart size={15} className="mr-[5px]"/>
                    <span className="text-[12px]">22</span>
                </div>
            </div>
        </div>
        <div className="w-[25%] h-[150px] flex justify-center items-center">
            <Book size={80} className="text-gray-400 font-[200]"/>
        </div>
    </div>
}