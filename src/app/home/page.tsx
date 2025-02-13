import { Navbar } from "@/components/navigation/navbar";
import SubNavbar from "@/components/navigation/subNavbar";

export default function Home() {
  
    return (
      <>
        <Navbar/>
        <div className="mx-[5%] h-[100px] flex">
            <div className="h-[80px] w-[60%] border-r-[1px] border-gray-200 px-[50px]">
                <SubNavbar items={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']}/>
            </div>
            <div className="h-[80px] w-[40%]"></div>
            
        </div>
      </>
    );
  }