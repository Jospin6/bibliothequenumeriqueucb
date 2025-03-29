import { useState } from "react";
import { Book, ChevronDown, ChevronUp, User } from "lucide-react";
import { Faculty } from "@/redux/faculty/facultySlice";
import { IoMdPaper } from "react-icons/io";

interface ExpansionComponentProps {
    faculty: Faculty;
}

export default function Expansion({ faculty }: ExpansionComponentProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full border rounded-2xl shadow-sm mb-2 overflow-hidden">
            <button
                className="w-full flex justify-between items-center p-4 font-semibold text-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {faculty.name}
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
                <div className="p-4 bg-white border-t">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-2 flex items-center p-3 rounded-xl shadow-md">
                            <Book size={30} className="text-green-500" />
                            <div className="ml-4">
                                <div className="font-semibold">{faculty?.books?.length}</div>
                                <div className="text-md">Nombre de livres</div>
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center p-3 rounded-xl shadow-md">
                            <IoMdPaper size={30} className="text-blue-500" />
                            <div className="ml-4">
                                <div className="font-semibold">{faculty?.subjects?.length}</div>
                                <div className="text-md">Nombre de Matières</div>
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center p-3 rounded-xl shadow-md">
                            <User size={30} className="text-yellow-500" />
                            <div className="ml-4">
                                <div className="font-semibold">{faculty?.users?.length}</div>
                                <div className="text-md">Nombre d'Etudiants</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-3">
                        <div className="col-span-2 mb-3 p-2 rounded-xl border">
                            <h1>Les livres les plus consultés</h1>
                        </div>
                        <div className="col-span-2 mb-3 p-2 rounded-xl border">
                            <h1>Responsables de la bibliotheque</h1>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
