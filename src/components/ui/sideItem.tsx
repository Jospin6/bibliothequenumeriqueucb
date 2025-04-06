import { BookProps } from "@/redux/book/bookSlice"
import { Eye, Notebook } from "lucide-react"
import FavoriteButton from "./favoriteButton"

export const SideItem = ({ book }: { book: BookProps }) => {
    return <div className="mt-2 border-gray-200 border-b-[1px]">
        <div className="flex items-center text-gray-500">
            <Notebook size={20} className="mr-2 text-teal-400" />
            <span className="text-gray-800">{book.subject.name}</span>
        </div>
        <p className="font-semibold text-[16px] text-black font-verdana py-2">
            {book.title}
        </p>
        <div className="flex items-center text-gray-500 py-2">
            <div className="flex items-center mr-4">
                <FavoriteButton bookId={book.id!} favorite={book.FavoriteBook} />
                <span className="text-[12px]">{book.FavoriteBook.length}</span>
            </div>
            <div className="flex items-center">
                <Eye size={15} className="mr-[5px]" />
                <span className="text-[12px]">{book.View.length}</span>
            </div>
        </div>
    </div>
}