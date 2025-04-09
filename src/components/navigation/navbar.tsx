"use client"
import Image from "next/image"
import { Searchbar } from "../ui/searchbar"
import { Book, CircleDashedIcon, Heart, HomeIcon, LayoutDashboard, School, Search, UserCircle } from "lucide-react"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { fetchUser, selectUser } from "@/redux/user/userSlice"
import { useEffect } from "react"
import { NavbarItem } from "./navbarItem"
export const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const currentUser = useCurrentUser()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser.id!))
        }
    }, [dispatch, currentUser])

    return <div className="w-full md:px-[5%] px-2 h-[50px] border-b-[1px]  border-gray-200 flex items-center justify-between">
        <div>
            <div className="flex h-[50px] items-center">
                <Link href={"/"}><Image src={"/images/ucb_logo.jpg"} className="md:h-[40px] md:w-[40px] w-[35px] h-[35px]" alt={"ucb logo"} width={50} height={50} /></Link>
                <div className="hidden md:block w-[300px]"><Searchbar facId={user?.faculteId!} /></div>
            </div>
        </div>
        <div className="flex text-gray-500">
            <NavbarItem 
                label={"Accueil"} 
                className="text-black"
                href={"/"} 
                icon={<HomeIcon size={18} />}
            />
            <NavbarItem 
                label={"Recherches"} 
                className="block md:hidden"
                href={"/search"} 
                icon={<Search size={18} />}
            />
            <NavbarItem 
                label={"Pour toi"} 
                href={"/books"} 
                icon={<Book size={18} />}
            />
             <NavbarItem 
                label={"Admin"} 
                href={"/admin"} 
                icon={<LayoutDashboard size={18} />}
            />
            <NavbarItem 
                label={"Faculté"} 
                href={"/faculte"} 
                icon={<School size={18} />}
            />
            <NavbarItem 
                label={"Favories"} 
                href={"/favories"} 
                icon={<Heart size={18} />}
            />
            <NavbarItem 
                label={"Mon compte"} 
                href={"/account"} 
                icon={<UserCircle size={18} />}
            />
        </div>
    </div>
}