"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search } from "lucide-react"
import { AppDispatch, RootState } from "@/redux/store"
import { fetchBooks } from "@/redux/book/bookSlice"
import Link from "next/link"

export const Searchbar = ({ facId }: { facId: number }) => {
    const dispatch = useDispatch<AppDispatch>()
    const books = useSelector((state: RootState) => state.book.books)
    const loading = useSelector((state: RootState) => state.book.loading)
    const [query, setQuery] = useState("")
    const [filteredBooks, setFilteredBooks] = useState<typeof books>([])
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        dispatch(fetchBooks({ faculteId: facId }))
    }, [dispatch])

    useEffect(() => {
        if (query.trim().length > 0) {
            const filtered = books.filter(book =>
                book.title.toLowerCase().includes(query.toLowerCase())
            )
            setFilteredBooks(filtered)
            setShowDropdown(true)
        } else {
            setShowDropdown(false)
        }
    }, [query, books])

    const handleSelect = (bookTitle: string) => {
        setQuery(bookTitle)
        setShowDropdown(false)
    }

    return (
        <div className="relative w-[300px]">
            <div className="h-[40px] rounded-full flex items-center bg-gray-100 px-3">
                <Search size={20} className="text-gray-400" />
                <input
                    type="text"
                    className="ml-2 w-full bg-transparent outline-none"
                    placeholder="Recherche un livre..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>

            {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <div
                                key={book.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelect(book.title)}
                            >
                                <Link href={`/books/${book.id}`}>
                                    <div className="font-medium">{book.title}</div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                            Aucun résultat
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
