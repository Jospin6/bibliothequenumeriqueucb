"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PdfViewer from "@/components/ui/pdfViewer";

export default function BookPage() {
  // const [book, setBook] = useState<any>(null);
  // const [currentPage, setCurrentPage] = useState(0);
  // const pageSize = 1000;
  const params = useParams();
  const id = params?.id

  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/books/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setBook(data));
  // }, [params.id]);

  // if (!book) return <p>Loading...</p>;

  // const text = atob(book.file).toString();
  // const pages = text.match(/.{1,1000}/g) || [];

  return <PdfViewer bookId={+id!}/>
  // (
  //   <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-lg shadow">
  //     <h2 className="text-2xl font-bold mb-5">{book.title}</h2>
  //     <p className="text-gray-600 mb-3">Page {currentPage + 1} of {pages.length}</p>
  //     <p className="border p-3 rounded h-64 overflow-auto">{pages[currentPage]}</p>
  //     <div className="flex justify-between mt-4">
  //       <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0} className="p-2 bg-gray-300 rounded">
  //         Previous
  //       </button>
  //       <button onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))} disabled={currentPage === pages.length - 1} className="p-2 bg-gray-300 rounded">
  //         Next
  //       </button>
  //     </div>
  //   </div>
  // );
}
