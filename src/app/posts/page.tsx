"use client"
import { BookForm } from "@/components/forms/bookForm";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/Button";
import Popup from "@/components/ui/popup";
import { useState } from "react";

export default function Posts() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleAddDocPopup = () => setIsOpen(!isOpen)
    return <div>
        <Navbar />
        <div className="mx-[5%] flex">
            <div className="h-auto w-[60%] border-r-[1px] border-gray-200 px-[50px]">
                <h1 className="mt-6 mb-4 font-semibold text-xl font-verdana">Posts</h1>
            </div>
            <div className="w-[40%] py-6 px-[30px]">
                <div className="flex justify-end">
                    <Button onClick={handleAddDocPopup}>Ajouter un document</Button>
                </div>

            </div>

        </div>
        {
            isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                <h1 className="my-4 font-semibold text-xl font-verdana">Nouveau document</h1>
                <BookForm />
            </Popup>)
        }
    </div>
}