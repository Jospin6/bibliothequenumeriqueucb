import { Book, Eye, Heart, Notebook } from "lucide-react"
import Link from "next/link"
import FavoriteButton from "./favoriteButton"
import { BookProps } from "@/redux/book/bookSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addView } from "@/redux/view/viewSlice"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatDate } from "@/lib/functions"

interface MainItemProps {
    book: BookProps,
}

export const MainItem = ({ book }: MainItemProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useCurrentUser()

    const handleView = () => dispatch(addView({ bookId: book.id!.toString(), userId: user!.id!.toString() }))

    return <div className="flex h-[auto]">
        <div className="w-[75%] border-b-[1px] border-gray-200 pb-3 mt-2 h-[auto] pl-2">
            <div className="flex items-center text-gray-500">
                <Notebook size={15} className="mr-2 text-teal-800" />
                <span> <span className="text-gray-800 text-[12px]">{book.subject.name}</span></span>
            </div>
            <p className="font-semibold text-xl font-verdana py-2">
                <Link href={`/books/${book.id}`} onClick={handleView}>
                    {book.title}
                </Link>
            </p>
            {/* <p className="text-gray-500">Ipsum dolor sit amet consectetur adipisicing elit. Dignissimos</p> */}
            <div className="flex justify-between items-center text-gray-500">
                <div className="flex items-center">
                    <span className="pr-2 text-[12px]">{formatDate(book.createdAt!)}</span>
                    <div className="flex items-center">
                        <Eye size={15} className="mr-[5px]" />
                        <span className="text-[12px]">{book.View.length}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <FavoriteButton bookId={book.id!} favorite={book.FavoriteBook} />
                    <span className="text-[12px]">{book.FavoriteBook.length}</span>
                </div>
            </div>
        </div>
        <div className="w-[25%] h-[90px] flex justify-center items-center">
            <Link href={`/books/${book.id}`} onClick={handleView}>
                <Book size={40} className="text-gray-400 font-[200]" />
            </Link>
        </div>
    </div>
}