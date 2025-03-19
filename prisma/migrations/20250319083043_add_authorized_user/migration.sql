-- CreateTable
CREATE TABLE "AuthorisedUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "faculteId" INTEGER NOT NULL,

    CONSTRAINT "AuthorisedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorisedUser_email_key" ON "AuthorisedUser"("email");

-- AddForeignKey
ALTER TABLE "AuthorisedUser" ADD CONSTRAINT "AuthorisedUser_faculteId_fkey" FOREIGN KEY ("faculteId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
