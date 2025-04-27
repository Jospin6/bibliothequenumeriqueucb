// components/PowerPointViewer.tsx
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

interface PowerPointViewerProps {
  fileUrl: string;
}

export const PowerPointViewer: React.FC<PowerPointViewerProps> = ({ fileUrl }) => {
  const docs = [
    {
      uri: fileUrl,
      fileType: "pptx",
      fileName: "Présentation",
    },
  ];

  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      className="h-full"
    />
  );
};
