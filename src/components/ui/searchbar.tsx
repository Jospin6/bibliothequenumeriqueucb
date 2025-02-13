import { Search } from "lucide-react"

export const Searchbar = () => {
    return <div className="w-[300px] h-[40px] rounded-full flex items-center bg-gray-100 ml-2 px-2">
        <Search size={20} className="text-gray-400"/>
        <input type="text" className="ml-2 w-full bg-transparent outline-none" placeholder="Recherche..." />
    </div>
}