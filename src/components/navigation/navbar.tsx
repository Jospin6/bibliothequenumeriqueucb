"use client"

import Image from "next/image"
import Link from "next/link"

import { Searchbar } from "../ui/searchbar"
import { NavbarItem } from "./navbarItem"

import {
    Book,
    Heart,
    HomeIcon,
    LayoutDashboard,
    School,
    Search,
    UserCircle
} from "lucide-react"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { fetchUser, selectUser } from "@/redux/user/userSlice"
import { ADMIN, USER } from "@/lib/constants"

export const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const currentUser = useCurrentUser()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(fetchUser(currentUser?.id))
        }
    }, [currentUser?.id])

    return (
        <div className="w-full bg-white md:px-[5%] px-2 h-[50px] border-b border-gray-200 flex items-center justify-between">
            {/* Logo + Search */}
            <div className="flex items-center h-[50px]">
                <Link href="/">
                    <Image
                        src="/images/ucb_logo.jpg"
                        alt="ucb logo"
                        width={50}
                        height={50}
                        className="md:h-[40px] md:w-[40px] w-[35px] h-[35px]"
                    />
                </Link>
                <div className="hidden md:block w-[300px]">
                    <Searchbar facId={user?.faculteId!} />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex text-gray-500">
                <NavbarItem
                    label="Accueil"
                    className="text-black"
                    href="/"
                    icon={<HomeIcon size={18} />}
                />
                <NavbarItem
                    label="Recherches"
                    className="block md:hidden"
                    href="/search"
                    icon={<Search size={18} />}
                />
                {(user?.role !== USER && user?.role !== ADMIN) && (
                    <NavbarItem
                        label="Admin"
                        href="/admin"
                        icon={<LayoutDashboard size={18} />}
                    />
                )}
                {user?.role != USER && (
                    <NavbarItem
                        label="Faculté"
                        href={`/faculte/${user?.faculteId}`}
                        icon={<School size={18} />}
                    />
                )}
                <NavbarItem
                    label="Favories"
                    href="/favories"
                    icon={<Heart size={18} />}
                />
                <NavbarItem
                    label="Mon compte"
                    href="/account"
                    icon={<UserCircle size={18} />}
                />
            </div>
        </div>
    )
}
