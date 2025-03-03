import Image from "next/image"
import { Searchbar } from "../ui/searchbar"
import { Bell, Book, HomeIcon, LucideNewspaper, UserCircle } from "lucide-react"
export const Navbar = () => {
    return <div className="w-full px-[5%] h-[50px] border-b-[1px] border-gray-200 flex items-center justify-between">
        <div>
            <div className="flex h-[50px] items-center">
                <Image src={"/images/ucb_logo.jpg"} alt={"ucb logo"} width={50} height={50}/>
                <Searchbar/>
            </div>
        </div>
        <div className="flex text-gray-400">
            <HomeIcon className="ml-4 text-black hover:text-black cursor-pointer"/>
            <Book className="ml-4 hover:text-black cursor-pointer"/>
            <LucideNewspaper className="ml-4 hover:text-black cursor-pointer"/>
            <Bell className="ml-4 hover:text-black cursor-pointer"/>
            <UserCircle className="ml-4 hover:text-black cursor-pointer"/>
        </div>
    </div>
}