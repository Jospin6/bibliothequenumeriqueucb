import { Navbar } from "@/components/navigation/navbar";
import { BigTitle } from "@/components/ui/bigTitle";
import { Card } from "@/components/ui/card";
import { SecondTitle } from "@/components/ui/secondTitle";


export default function Account() {
    return <div className="">
        <Navbar />
        <div className="m-auto w-2/3 py-6">
            <div className="mb-4 flex justify-between items-center">
                <BigTitle title={"Vos stats"} />
                <span className="text-blue-700 text-[15px]">Modifier vos informations</span>
            </div>
            <div className="mb-4">
                <SecondTitle title={"Le mois courant"} subtitle={"vos activite de ce mois"} />
            </div>
            <div className="grid grid-cols-6">
                <div className="grid grid-cols-4 col-span-3 gap-4">
                    <SecondTitle className="col-span-2 mt-2 text-center" title={"10"} subtitle={"Livres lus"} />
                    <SecondTitle className="col-span-2 mt-2 text-center" title={"10"} subtitle={"Livres lus"} />
                    <SecondTitle className="col-span-2 mt-2 text-center" title={"10"} subtitle={"Livres lus"} />
                    <SecondTitle className="col-span-2 mt-2 text-center" title={"10"} subtitle={"Livres lus"} />
                </div>
                <div className="col-span-3">

                </div>
            </div>
            <div className="my-6">
                <button className="px-10 py-[3px] rounded-lg bg-red-700 text-red-200">Supprimer ce compte</button>
            </div>
        </div>
    </div>
}