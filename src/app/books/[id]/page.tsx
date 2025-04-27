"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Document, Page } from 'react-pdf';
import { loadPdfWorker } from "@/utils/pdfWorker";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Navbar } from "@/components/navigation/navbar";

loadPdfWorker()

export default function BookPage() {
  const params = useParams();
  const id = params?.id

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchPdf = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/pdfDoc/${id}`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer le PDF.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        if (isMounted) {
          if (urlRef.current) {
            URL.revokeObjectURL(urlRef.current);
          }

          urlRef.current = url;
          setPdfUrl(url);
        }
      } catch (err: any) {
        if (isMounted) {
        }
      }
    };

    fetchPdf();

    return () => {
      isMounted = false;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, [id]);

  // const getPageWidth = () => {
  //   if (window.innerWidth >= 640) return 595; // tablette ou plus → A4
  //   return window.innerWidth * 0.9;            // mobile → 90% de l'écran
  // };

  return <div className="w-full relative h-auto bg-black/85">
    <div className="sticky top-0 left-0 w-full z-50">
      <Navbar />
      <div className="bg-white flex justify-center text-xs h-[30px] items-center border-b border-gray-700">
        <p>
          Page {pageNumber} sur {numPages}
        </p>
      </div>
    </div>

    <div className="w-[850px] m-auto">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {
          Array.from({ length: numPages || 0 }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <Page
                key={`page_${pageNum}`}
                pageNumber={pageNum}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={850}
                className={"mt-2"}
              />
            );
          })
        }
      </Document>
      <div>
        {/* <button
          onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
          disabled={pageNumber <= 1}
        >
          Précédent
        </button>
        <button
          onClick={() => setPageNumber((prev) => (numPages ? Math.min(numPages, prev + 1) : prev))}
          disabled={numPages ? pageNumber >= numPages : true}
        >
          Suivant
        </button> */}

      </div>
    </div>

  </div>

}
