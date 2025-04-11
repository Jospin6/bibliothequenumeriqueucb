import { useState, useEffect, useRef } from "react";

interface PdfViewerProps {
  bookId: number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ bookId }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPdf = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/pdfDoc/${bookId}`);

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
          setError(null);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchPdf();

    return () => {
      isMounted = false;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, [bookId]);

  if (loading) return <p>Chargement du document...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {pdfUrl ? (
        <iframe src={pdfUrl} width="100%" height="100vh" className="h-screen" />
      ) : (
        <p>Aucun document disponible.</p>
      )}
    </div>
  );
};

export default PdfViewer;
