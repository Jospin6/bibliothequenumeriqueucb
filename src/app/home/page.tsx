"use client";

import { Navbar } from "@/components/navigation/navbar";
import SubNavbar from "@/components/navigation/subNavbar";
import { MainItem } from "@/components/ui/mainItem";
import { MainItemSkeleton } from "@/components/ui/mainItemSkeleton";
import { SideItem } from "@/components/ui/sideItem";
import { SideItemSkeleton } from "@/components/ui/sideItemSkeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BookProps, fetchBooks, fetchForYou, selectBooks, selectForYou, selectSubjectId } from "@/redux/book/bookSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSubjects, selectSubject, SubjectProps } from "@/redux/subject/subjectSlice";
import { fetchUser, selectUser } from "@/redux/user/userSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// 🧩 Sous-composant : contenu principal
const MainContent = ({
  loading,
  books,
  subjects,
}: {
  loading: boolean;
  books: BookProps[];
  subjects: SubjectProps[];
}) => (
  <>
    <SubNavbar items={subjects} />
    {loading
      ? "ucb".split("").map(i => <MainItemSkeleton key={i} />)
      : books.map((book) => <MainItem key={book.id} book={book} />)}
  </>
);

// 🧩 Sous-composant : suggestions "Pour toi"
const SideContent = ({ getForYou }: { getForYou: BookProps[] }) => (
  <div className="h-[80px] w-[40%] hidden md:block px-[30px]">
    <h1 className="mt-6 mb-4 font-semibold text-xl font-verdana">Pour toi</h1>
    {getForYou.map((book) => (
      <SideItem book={book} key={book.id} />
    ))}
  </div>
);

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useCurrentUser();
  const { loading, books, page, hasMore } = useSelector((state: RootState) => state.book);
  const user = useSelector(selectUser);
  const subjects = useSelector(selectSubject);
  const subjectId = useSelector(selectSubjectId);
  const getForYou = useSelector(selectForYou);
  const loaderRef = useRef<HTMLDivElement>(null);

  // ⚙️ Récupérer les suggestions "Pour toi" une seule fois
  useEffect(() => {
    if (getForYou.length === 0) {
      dispatch(fetchForYou());
    }
  }, [dispatch, getForYou.length]);

  // ⚙️ Récupérer l'utilisateur si connecté
  useEffect(() => {
    if (currentUser?.id && !user?.id) {
      dispatch(fetchUser(currentUser.id));
    }
  }, [currentUser?.id, user?.id, dispatch]);

  // ⚙️ Charger livres et matières si faculté dispo
  useEffect(() => {
    if (user?.faculty?.id && subjectId) {
      dispatch(fetchBooks({
        faculteId: user.faculty.id, subjectId,
        page: 1
      }));
    }
  }, [user?.faculty?.id, subjectId, dispatch]);

  useEffect(() => {
    if (user?.faculty?.id && subjects.length === 0) {
      dispatch(fetchSubjects(user.faculty.id));
    }
  }, [user?.faculty?.id, subjects.length, dispatch]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page > 1 && user?.faculty?.id && subjectId) {
          dispatch(fetchBooks({
            faculteId: user.faculty.id, subjectId,
            page
          }));
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, hasMore, loading, page, user?.faculty?.id, subjectId, dispatch]);

  return (
    <>
      <Navbar />
      <div className="md:mx-[5%] mx-2 flex">
        <div className="h-auto md:w-[60%] w-full min-h-[calc(100vh-50px)] md:border-r-[1px] md:border-gray-200 md:px-[50px]">
          <MainContent loading={loading} books={books} subjects={subjects} />
          {loading && <p>Chargement...</p>}
          <div ref={loaderRef} />
        </div>
        <SideContent getForYou={getForYou} />
      </div>
    </>
  );
}
