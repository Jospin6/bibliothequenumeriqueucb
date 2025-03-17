import { useState, useEffect } from "react";

interface PdfViewerProps {
  bookId: number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ bookId }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/books/${bookId}`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer le PDF.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    // Cleanup pour libérer l'URL
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [bookId]);

  if (loading) return <p>Chargement du document...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {pdfUrl ? (
        <iframe src={pdfUrl} width="100%" height="600px" />
      ) : (
        <p>Aucun document disponible.</p>
      )}
    </div>
  );
};

export default PdfViewer;
