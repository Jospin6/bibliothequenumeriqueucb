import { Avatar, AvatarFallback } from "./avatar"

export const ListItem = ({title, subtitle}: {title: string, subtitle?: string}) => {
    return <div className="flex items-center mt-2">
    <Avatar className="size-[40px] mr-2">
        <AvatarFallback className="font-medium text-gray-300">{title.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="">
        <div className="text-gray-300 text-[16px]">{title}</div>
        {subtitle && (<div className="text-gray-500 text-sm">{subtitle}</div>)}
    </div>
</div>
}