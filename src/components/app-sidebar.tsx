"use client"
import { ActivityIcon, School, Home, Users, Book, BookOpen, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { fetchUser, selectUser } from "@/redux/user/userSlice"
import { useEffect } from "react"

export function AppSidebar() {
  const currentUser = useCurrentUser()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)

  let facUrl = `/faculte`

  if (user?.faculteId) {
    facUrl = `${facUrl}/${user.faculteId}`
  }

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchUser(currentUser.id))
    }
    
  }, [currentUser?.id, dispatch])
  

  let items = [
    {
      title: "Faculté",
      url: facUrl,
      icon: School,
    },
    {
      title: "Etudiants",
      url: `${facUrl}/students`,
      icon: Users,
    },
    {
      title: "Matières",
      url: `${facUrl}/subjects`,
      icon: BookOpen,
    },
    {
      title: "Livres",
      url: `${facUrl}/documents`,
      icon: Book,
    },
    {
      title: "Bibliotheque",
      url: "/",
      icon: LayoutDashboard,
    }
  ]

  let adminItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Role",
      url: "/admin/roles",
      icon: ActivityIcon,
    },
  ]

  if (user?.role === "SUPERADMIN") {
    items = [...adminItems, ...items]
  }

  



  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl px-0 rounded-xl text-gray-200 h-[200px] bg-white/10 mb-4 font-bold">
          <Link href={"/"} className="w-full h-full rounded-xl"><Image src={"/images/ucb_logo.jpg"} className="w-[100%] rounded-xl h-[100%]" alt={"ucb logo"} width={100} height={150} /></Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}