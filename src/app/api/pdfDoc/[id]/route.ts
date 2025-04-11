import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const document = await prisma.book.findUnique({
    where: { id: +params.id },
  });

  return new NextResponse(document?.file, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${document?.title}"`,
    },
  });
}
