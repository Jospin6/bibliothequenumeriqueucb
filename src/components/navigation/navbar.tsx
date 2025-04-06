import Image from "next/image"
import { Searchbar } from "../ui/searchbar"
import { Book, CircleDashedIcon, Heart, HomeIcon, LayoutDashboard, School, UserCircle } from "lucide-react"
import Link from "next/link"
export const Navbar = () => {
    return <div className="w-full px-[5%] h-[50px] border-b-[1px] bg-white border-gray-200 flex items-center justify-between">
        <div>
            <div className="flex h-[50px] items-center">
                <Image src={"/images/ucb_logo.jpg"} alt={"ucb logo"} width={50} height={50} />
                <Searchbar />
            </div>
        </div>
        <div className="flex text-gray-400">
            <Link href={"/"}>
                <HomeIcon className="ml-4 text-black hover:text-black cursor-pointer" />
            </Link>
            <Link href={"/dashboard"}>
                <LayoutDashboard className="ml-4 hover:text-black cursor-pointer" />
            </Link>
            <Link href={"/faculte"}>
                <School className="ml-4 hover:text-black cursor-pointer"/>
            </Link>
            <Link href={"/favories"}>
                <Heart className="ml-4 hover:text-black cursor-pointer" />
            </Link>
            <Link href={"/account"} className="ml-4">
                <UserCircle className="hover:text-black cursor-pointer" />
            </Link>

        </div>
    </div>
}