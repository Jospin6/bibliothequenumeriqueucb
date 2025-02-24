import { Navbar } from "@/components/navigation/navbar";
import SubNavbar from "@/components/navigation/subNavbar";
import { MainItem } from "@/components/ui/mainItem";
import { SideItem } from "@/components/ui/sideItem";

export default function Home() {

  return (
    <>
      <Navbar />
      <div className="mx-[5%] flex">
        <div className="h-auto w-[60%] border-r-[1px] border-gray-200 px-[50px]">
          <SubNavbar items={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']} />
          <MainItem />
          <MainItem />
          <MainItem />
        </div>
        <div className="h-[80px] w-[40%] px-[30px]">
          <h1 className="mt-6 mb-4 font-semibold text-xl font-verdana">Pour toi</h1>
          <SideItem />
          <SideItem />
        </div>

      </div>
    </>
  );
}