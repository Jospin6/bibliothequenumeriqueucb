import Image from "next/image"
export const Navbar = () => {
    return <div className="w-full px-[5%] h-[50px] border-b-[1px] border-gray-200 flex items-center justify-between">
        <div>
            <div>
                <Image src={"/images/ucb_logo.jpg"} alt={"ucb logo"} width={50} height={50}/>
            </div>
        </div>
        <div>menu</div>
    </div>
}