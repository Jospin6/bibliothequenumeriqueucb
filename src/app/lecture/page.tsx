import { Navbar } from "@/components/navigation/navbar";
import IASection from "@/components/ui/iaSection";
import { Eye, Heart, Notebook, UserPen } from "lucide-react";

export default function Lecture() {
    return <div className="pb-6">
        <Navbar />
        <div className="w-2/4 m-auto">
            <div className="h-[auto] pb-2 pl-2 mt-4 border-b-[1px] border-gray-200">
                <div className="flex items-center text-gray-500">
                    <Notebook size={20} className="mr-2 text-teal-400" />
                    <span className="text-gray-800 font-[500]">Histoire</span>
                </div>
                <p className="font-semibold text-3xl font-verdana py-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos autem quas dolores.
                </p>
                <p className="text-gray-500 text-xl">
                    Ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
                </p>
                <div className="flex my-4 items-center">
                    <div className="h-[40px] w-[40px] flex justify-center items-center rounded-full text-green-400">
                        <UserPen  size={30}/>
                    </div>
                    <div className="text-gray-500 text-[12px] ml-2">
                        <p>Ecrit par Auteur nom</p>
                        <p>Edition et année</p>
                    </div>
                </div>
                <div className="flex justify-between items-center text-gray-500 py-2">
                    <div className="flex items-center">
                        <span className="pr-2 text-[12px] mr-4">Jan7</span>
                        <div className="flex items-center">
                            <Eye size={15} className="mr-[5px]" />
                            <span className="text-[12px]">35</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Heart size={15} className="mr-[5px]" />
                        <span className="text-[12px]">22</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-gray-800">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Eaque aperiam voluptates deleniti iusto facilis non fugiat. 
                Blanditiis repellat eum, et nostrum sunt ipsum dignissimos quo mollitia. 
                Ea accusamus facere labore!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Fugit eaque voluptates quasi cum incidunt autem modi quibusdam sit a 
                eius voluptate molestiae excepturi nostrum nulla aspernatur quaerat, 
                maiores magnam optio!
            </div>

            <div className="mt-6">
                <IASection/>
            </div>
        </div>
    </div>
}