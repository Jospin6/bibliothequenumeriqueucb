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
          <SidebarGroupLabel className="text-2xl text-gray-200 h-[150px] bg-white/10 mb-4 font-bold">
            <div className="flex h-[50px] items-center mb-4">
              <Link href={"/"}><Image src={"/images/ucb_logo.jpg"} className="md:h-[70px] md:w-[70px] w-[35px] h-[35px]" alt={"ucb logo"} width={50} height={50} /></Link>
              <div className="text-4xl font-bold">UCB</div>
            </div>
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