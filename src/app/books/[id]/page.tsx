"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Document, Page } from 'react-pdf';
import { loadPdfWorker } from "@/utils/pdfWorker";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Navbar } from "@/components/navigation/navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getBook, selectBook } from "@/redux/book/bookSlice";
import { PowerPointViewer } from "@/components/ui/powerPointViewer";

loadPdfWorker()

export default function BookPage() {
  const params = useParams();
  const id = params?.id
  const dispatch = useDispatch<AppDispatch>()
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);
  const book = useSelector(selectBook)

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  useEffect(() => {
    dispatch(getBook(+id!))
  }, [])

  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchPdf = async () => {
  //     try {
  //       const response = await fetch(`/api/pdfDoc/${id}`);

  //       if (!response.ok) {
  //         throw new Error("Impossible de récupérer le PDF.");
  //       }

  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);

  //       if (isMounted) {
  //         if (urlRef.current) {
  //           URL.revokeObjectURL(urlRef.current);
  //         }

  //         urlRef.current = url;
  //         setPdfUrl(url);
  //       }
  //     } catch (err: any) {
  //       if (isMounted) {
  //       }
  //     }
  //   };

  //   fetchPdf();

  //   return () => {
  //     isMounted = false;
  //     if (urlRef.current) {
  //       URL.revokeObjectURL(urlRef.current);
  //       urlRef.current = null;
  //     }
  //   };
  // }, [id]);

  // const getPageWidth = () => {
  //   if (window.innerWidth >= 640) return 595; // tablette ou plus → A4
  //   return window.innerWidth * 0.9;            // mobile → 90% de l'écran
  // };

  useEffect(() => {
    let isMounted = true;

    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/pdfDoc/${id}`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer le document.");
        }

        const contentType = response.headers.get("Content-Type");

        if (!contentType) {
          throw new Error("Type de contenu inconnu.");
        }

        if (contentType.includes("application/pdf") || contentType.includes("application/vnd.openxmlformats")) {
          // Traitement des PDF, DOCX, PPTX (en Blob)
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);

          if (isMounted) {
            if (urlRef.current) {
              URL.revokeObjectURL(urlRef.current);
            }

            urlRef.current = url;
            setPdfUrl(url);
            setHtmlContent(null); // Reset l'autre au cas où
          }
        } else if (contentType.includes("text/html")) {
          // Traitement du HTML (ex: DOCX converti)
          const html = await response.text();

          if (isMounted) {
            if (urlRef.current) {
              URL.revokeObjectURL(urlRef.current);
              urlRef.current = null;
            }

            setHtmlContent(html);
            setPdfUrl(null); // Reset l'autre au cas où
          }
        } else {
          throw new Error("Type de fichier non pris en charge.");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          // Tu peux ajouter un state pour afficher une erreur au besoin
        }
      }
    };

    fetchDocument();

    return () => {
      isMounted = false;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
      }
    };
  }, [id]);


  return <div className="w-full relative min-h-[100vh] h-auto bg-black/85">
    <div className="sticky top-0 left-0 w-full z-50">
      <Navbar />
      <div className="bg-white flex justify-center text-xs h-[30px] items-center border-b border-gray-700">
        <p>
          Page {pageNumber} sur {numPages}
        </p>
      </div>
    </div>

    <div className="w-[850px] m-auto">
      {book?.fileType === "pdf" ? (
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
      ) : (
        <div>
          {/* <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            config={{
              header: {
                disableHeader: true,
              },
            }}
          /> */}
          {htmlContent ? (
            <div
              className="w-full h-auto bg-white p-3"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ): (<div>
            <PowerPointViewer fileUrl={pdfUrl!}/>
          </div>)}
        </div>
      )}
    </div>
  </div>
}
