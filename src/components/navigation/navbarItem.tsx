import Link from "next/link"


export const NavbarItem = ({ label, href, icon, className }: { label: string, href: string, icon: React.ReactNode, className?: string }) => {
    return <Link href={href} className={`ml-4 text-center hover:text-black cursor-pointer ${className}`}>
        <div className="w-full flex justify-center"><span>{icon}</span></div>
        <div className="md:text-[12px] text-[9px] font-medium">{label}</div>
    </Link>
}