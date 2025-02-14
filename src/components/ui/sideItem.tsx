import { Eye, Heart, Notebook } from "lucide-react"

export const SideItem = () => {
    return <div className="mt-2">
        <div className="flex items-center text-gray-500">
            <Notebook size={20} className="mr-2 text-teal-400" />
            <span> <span className="text-gray-800">Histoire</span> écrit par jospin ndagano</span>
        </div>
        <p className="font-semibold text-[16px] text-black font-verdana py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex items-center text-gray-500 py-2">
            <div className="flex items-center mr-4">
                <Heart size={15} className="mr-[5px]" />
                <span className="text-[12px]">22</span>
            </div>
            <div className="flex items-center">
                <Eye size={15} className="mr-[5px]" />
                <span className="text-[12px]">35</span>
            </div>
        </div>
    </div>
}