import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback } from "../ui/avatar"
import BooksPerFacultyPieChart from "../ui/BooksPerFacultyPieChart"
import { useEffect } from "react"
import { AppDispatch, RootState } from "@/redux/store"
import { fetchUsers, selectUsers } from "@/redux/user/userSlice"


export const GestFacs = () => {
    const users = useSelector(selectUsers)
    const dispatch = useDispatch<AppDispatch>()
    const { loading, faculties } = useSelector((state: RootState) => state.faculty)
    const gestionnaires = users.filter(user => user.role != "USER")
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    const MOCK_DATA = [
        ...faculties.map(faculty => ({ faculty: faculty.name, bookCount: faculty.books?.length! }))
    ];
    return <>
        <div className="col-span-5 h-auto rounded-2xl border">
            <BooksPerFacultyPieChart data={MOCK_DATA} />
        </div>
        <div className="col-span-3 h-64 overflow-x-auto rounded-2xl border">
            <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                Gestionnaires Facultés
            </div>
            <div className="px-3">
                {gestionnaires.map(gest => (
                    <div className="flex items-center mt-2" key={gest.id}>
                        <Avatar className="size-[40px] mr-2">
                            <AvatarFallback className="font-medium text-gray-300">{gest.name.charAt(0)}{gest.postnom.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="">
                            <div className="text-gray-300 text-[16px]">{`${gest.name} ${gest.postnom}`}</div>
                            <div className="text-gray-500 text-sm">{gest.faculty?.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}