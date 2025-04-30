"use client"

import { Faculty } from "@/redux/faculty/facultySlice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import BooksPerSubjectChart from "../ui/BooksPerSubjectChart"
import { SubjectProps } from "@/redux/subject/subjectSlice";

export const FacBooks = ({faculty, subjets }: {faculty: Faculty, subjets: SubjectProps[]}) => {

    const mockData = [
        ...subjets.map(subject => ({ subject: subject.name, bookCount: subject.books!.length! }))
    ];


    return <>
        <div className="grid grid-cols-8 h-auto gap-4 mt-5">
            <div className="col-span-5 h-auto pb-3 rounded-2xl border">
                <BooksPerSubjectChart data={mockData} />
            </div>
            <div className="col-span-3 h-auto pb-3 rounded-2xl border">
                <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                    Livres
                </div>
                <div className="px-3">
                    {faculty?.books?.map(book => (
                        <div className="flex items-center mt-2" key={book.id}>
                            <Avatar className="size-[40px] mr-2">
                                <AvatarFallback className="font-medium text-gray-300">{book.title.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="">
                                <div className="text-gray-300 text-[16px]">{book.title}</div>
                                <div className="text-gray-500 text-sm">{book.subject.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}