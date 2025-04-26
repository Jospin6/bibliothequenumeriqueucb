"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Document, Page } from 'react-pdf';
import { loadPdfWorker } from "@/utils/pdfWorker";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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




  const [numPage, setNumPage] = useState<number>(1)

  const onDocumentSuccess = ({ numPage }: { numPage: number }) => {
    setNumPage(numPage)
  }

  return <div style={{ width: '600px', margin: '0 auto' }}>
    {/* <PDFWorkerConfig /> */}
    <Document
      file={pdfUrl}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page pageNumber={pageNumber} />
    </Document>
    <div>
      <button
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
      </button>
      <p>
        Page {pageNumber} sur {numPages}
      </p>
    </div>
  </div>

}
