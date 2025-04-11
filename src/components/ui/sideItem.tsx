import { BookProps } from "@/redux/book/bookSlice"
import { Eye, Notebook } from "lucide-react"
import FavoriteButton from "./favoriteButton"
import Link from "next/link"

export const SideItem = ({ book }: { book: BookProps }) => {
    return <div className="mt-2">
        <Link href={`/books/${book.id}`} className={`hover:text-black flex items-center cursor-pointer`}>
            <Notebook size={25} className="mr-2 text-teal-800" />
            <div>
                <div className="w-full font-medium flex justify-center"><span>{book.title}</span></div>
                <div className="md:text-[12px] text-[9px]">{book.subject.name}</div>
            </div>
        </Link>
    </div>
}