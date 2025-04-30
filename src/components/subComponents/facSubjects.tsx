import { Faculty } from "@/redux/faculty/facultySlice";
import { Avatar, AvatarFallback } from "../ui/avatar"
import BooksViewsPieChart from "../ui/BooksViewsPieChart"

export const FacSubjects = ({faculty }: {faculty: Faculty}) => {

    const MOCK_DATA = [
        ...faculty?.books?.map(book => ({ bookTitle: book.title, viewCount: book.View.length! })) ?? [],
    ];

    return <div className="grid grid-cols-8 gap-4 mt-5">
        <div className="col-span-3 h-auto rounded-2xl border">
            <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                Matières
            </div>
            <div className="px-3">
                {faculty?.subjects?.map(subject => (
                    <div className="flex items-center mt-2" key={subject.id}>
                        <Avatar className="size-[40px] mr-2">
                            <AvatarFallback className="font-medium text-gray-300">{subject.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="">
                            <div className="text-gray-300 text-[16px]">{subject.name}</div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
        <div className="col-span-5 h-auto rounded-2xl border">
            <BooksViewsPieChart data={MOCK_DATA} />
        </div>
    </div>
}