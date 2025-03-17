"use client"
import { Navbar } from "@/components/navigation/navbar";
import IASection from "@/components/ui/iaSection";
import { Eye, Heart, Notebook, UserPen } from "lucide-react";
import { useEffect, useState } from "react";

export default function Lecture() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    let faculteId = 1

    useEffect(() => {
        const fetchBooks = async () => {
            const url = "http://localhost:3000/api/books";
            const res = await fetch(url);
            const data = await res.json();
            setBooks(data);
            setLoading(false);
        };

        fetchBooks();
    }, [faculteId]);

    if (loading) return <p>Loading books...</p>;
    return <div className="pb-6">
        <Navbar />
        <div className="w-2/4 m-auto">

            <div className="max-w-2xl mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-5">Books {faculteId ? `of Faculty ${faculteId}` : ""}</h2>
                {books.length === 0 ? (
                    <p>No books found.</p>
                ) : (
                    <ul className="space-y-4">
                        {books.map((book) => (
                            <li key={book.id} className="p-4 bg-white rounded shadow">
                                <h3 className="text-lg font-semibold">{book.title}</h3>
                                <p className="text-gray-500">Author: {book.auteur.name}</p>
                                {book.faculty && <p className="text-gray-500">Faculty: {book.faculty.name}</p>}
                                <p className="text-sm text-gray-400">Added on: {new Date(book.createdAt).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* <div className="h-[auto] pb-2 pl-2 mt-4 border-b-[1px] border-gray-200">
                <div className="flex items-center text-gray-500">
                    <Notebook size={20} className="mr-2 text-teal-400" />
                    <span className="text-gray-800 font-[500]">Histoire</span>
                </div>
                <p className="font-semibold text-3xl font-verdana py-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos autem quas dolores.
                </p>
                <p className="text-gray-500 text-xl">
                    Ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
                </p>
                <div className="flex my-4 items-center">
                    <div className="h-[40px] w-[40px] flex justify-center items-center rounded-full text-green-400">
                        <UserPen  size={30}/>
                    </div>
                    <div className="text-gray-500 text-[12px] ml-2">
                        <p>Ecrit par Auteur nom</p>
                        <p>Edition et année</p>
                    </div>
                </div>
                <div className="flex justify-between items-center text-gray-500 py-2">
                    <div className="flex items-center">
                        <span className="pr-2 text-[12px] mr-4">Jan7</span>
                        <div className="flex items-center">
                            <Eye size={15} className="mr-[5px]" />
                            <span className="text-[12px]">35</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Heart size={15} className="mr-[5px]" />
                        <span className="text-[12px]">22</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-gray-800">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Eaque aperiam voluptates deleniti iusto facilis non fugiat. 
                Blanditiis repellat eum, et nostrum sunt ipsum dignissimos quo mollitia. 
                Ea accusamus facere labore!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Fugit eaque voluptates quasi cum incidunt autem modi quibusdam sit a 
                eius voluptate molestiae excepturi nostrum nulla aspernatur quaerat, 
                maiores magnam optio!
            </div>

            <div className="mt-6">
                <IASection/>
            </div> */}
        </div>
    </div>
}