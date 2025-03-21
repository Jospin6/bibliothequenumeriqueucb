"use client"
import { Navbar } from "@/components/navigation/navbar";
import SubNavbar from "@/components/navigation/subNavbar";
import { MainItem } from "@/components/ui/mainItem";
import { SideItem } from "@/components/ui/sideItem";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { fetchBooks, selectBooks, selectSubjectId } from "@/redux/book/bookSlice";
import { AppDispatch } from "@/redux/store";
import { fetchSubjects, selectSubject } from "@/redux/subject/subjectSlice";
import { fetchUser, selectUser } from "@/redux/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, books } = useSelector(selectBooks)
  const currentUser = useCurrentUser()
  const user = useSelector(selectUser)
  const subjects = useSelector(selectSubject)
  const subjectId = useSelector(selectSubjectId)
  console.log("user: ", user?.faculty)
  console.log("mes subjctes: ", subjects)

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchUser(currentUser.id));
    }
  }, [currentUser?.id, dispatch]);

  useEffect(() => {
    if (user?.faculty?.id) {
      dispatch(fetchBooks({ faculteId: user.faculty.id, subjectId }));
      dispatch(fetchSubjects(user.faculty.id));
    }
  }, [user?.faculty?.id, subjectId, dispatch]);

  return (
    <>
      <Navbar />
      <div className="mx-[5%] flex">
        <div className="h-auto w-[60%] border-r-[1px] border-gray-200 px-[50px]">
          <SubNavbar items={subjects} />

          {loading
            ? (<div className="text-black">Loading...</div>)
            : books.map(book => <MainItem key={book.id} book={book} />)
          }
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