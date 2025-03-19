"use client";  
import { setSubject } from '@/redux/book/bookSlice';
import { AppDispatch } from '@/redux/store';
import { Subject } from '@/redux/subject/subjectSlice';
import React, { useState, useRef } from 'react';  
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';  
import { useDispatch } from 'react-redux';


interface SubNavbarProps {  
  items: Subject[];  
}  

const SubNavbar: React.FC<SubNavbarProps> = ({ items }) => {  
  const [selectedIndex, setSelectedIndex] = useState<number>(0);  
  const scrollContainerRef = useRef<HTMLDivElement>(null); 
  const dispatch = useDispatch<AppDispatch>() 

  const itemsToDisplay = [
    {id: null, name: "Tout"},
    ...items
  ]


  const handleItemClick = (index: number, subjectId: number) => {  
    setSelectedIndex(index);
    dispatch(setSubject(subjectId))
  };  

  const scrollLeft = () => {  
    if (scrollContainerRef.current) {  
      scrollContainerRef.current.scrollLeft -= 150;  
    }  
  };  

  const scrollRight = () => {  
    if (scrollContainerRef.current) {  
      scrollContainerRef.current.scrollLeft += 150;  
    }  
  };  

  return (  
    <div className="relative w-full mb-6">  
      <div className="flex items-center">  
        <button  
          onClick={scrollLeft}  
          className="absolute left-[-40px] z-10 text-gray-500 hover:text-gray-700 ml-4"  
        >  
          <IoIosArrowBack className="w-6 h-6" />  
        </button>  
        <div  
          ref={scrollContainerRef}  
          className="overflow-x-auto overflow-y-none w-full px-0 py-2"  
          style={{ scrollBehavior: 'smooth' }}  
        >  
          <div className="flex">  
            {itemsToDisplay.map((item, index) => (  
              <div  
                key={index}  
                className={`cursor-pointer whitespace-nowrap relative ${  
                  index === selectedIndex  
                    ? 'text-black'  
                    : 'text-gray-500 hover:text-black'  
                }`}  
                onClick={() => handleItemClick(index, item.id!)}  
              >  
                <span className={`block py-2 px-4 ${index === selectedIndex ? 'bg-white' : 'bg-transparent'}`}>  
                  {item.name}  
                </span>  
                {index === selectedIndex && (  
                  <div className="absolute left-0 right-0 bottom-0 border-b-2 border-black" style={{ marginLeft: '20px', marginRight: '20px' }} />  
                )}  
              </div>  
            ))}  
          </div>  
        </div>  
        <button  
          onClick={scrollRight}  
          className="absolute right-[-40px] z-10 text-gray-500 hover:text-gray-700 mr-4"  
        >  
          <IoIosArrowForward className="w-6 h-6" />  
        </button>  
      </div>  
      <style jsx global>{`  
        .overflow-x-auto::-webkit-scrollbar {  
          display: none;  
        }  

        .overflow-x-auto {  
          -ms-overflow-style: none;  
          scrollbar-width: none;     
        }  
      `}</style>  
    </div>  
  );  
};  

export default SubNavbar;