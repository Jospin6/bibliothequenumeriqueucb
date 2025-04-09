"use client"
import { Calendar, Home, Users, Book, BookOpen, LayoutDashboard } from "lucide-react"
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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Etudiants",
    url: "/admin",
    icon: Users,
  },
  {
    title: "Matières",
    url: "/admin",
    icon: BookOpen,
  },
  {
    title: "Livres",
    url: "/admin",
    icon: Book,
  },
  {
    title: "Bibliotheque",
    url: "/",
    icon: LayoutDashboard,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl text-gray-200 font-bold">
            <div className="flex h-[50px] items-center mb-4">
              <Link href={"/"}><Image src={"/images/ucb_logo.jpg"} className="md:h-[40px] md:w-[40px] w-[35px] h-[35px]" alt={"ucb logo"} width={50} height={50} /></Link>
              <div className="text-2xl font-bold">UCB</div>
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