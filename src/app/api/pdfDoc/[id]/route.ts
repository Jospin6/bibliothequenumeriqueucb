import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import mammoth from "mammoth";

const prisma = new PrismaClient();

export async function GET( req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;
  try {
    const document = await prisma.book.findUnique({
      where: { id: +id },
    });

    if (!document || !document.file) {
      return new NextResponse("Document non trouvé ou fichier manquant.", {
        status: 404,
      });
    }

    const extension = document.fileType?.toLowerCase();

    if (extension === 'docx' || extension === 'doc') {
      // convertir en HTML
      const result = await mammoth.convertToHtml({ buffer: Buffer.from(document.file) });
      const html = result.value; // HTML brut
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    if (extension === 'pdf' || extension === 'ppt' || extension === 'pptx') {
      // Ton ancienne logique pour PDF, PPT...
      let contentType: string;
      let contentDisposition: string;

      switch (extension) {
        case 'pdf':
          contentType = 'application/pdf';
          contentDisposition = `inline; filename="${document.title}.pdf"`;
          break;
        case 'ppt':
        case 'pptx':
          contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
          contentDisposition = `attachment; filename="${document.title}.${extension}"`;
          break;
        default:
          return new NextResponse("Type de fichier non pris en charge.", {
            status: 400,
          });
      }

      return new NextResponse(new Blob([document.file]), {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': contentDisposition,
        },
      });
    }

    return new NextResponse("Type de fichier non pris en charge.", {
      status: 400,
    });

  } catch (error) {
    console.error('Erreur API document:', error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
