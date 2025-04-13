-- CreateTable
CREATE TABLE "messagesUser" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(150) NOT NULL,

    CONSTRAINT "messagesUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "readBy" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_messageRecipients" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_messageRecipients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "messagesUser_email_key" ON "messagesUser"("email");

-- CreateIndex
CREATE INDEX "_messageRecipients_B_index" ON "_messageRecipients"("B");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "messagesUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messageRecipients" ADD CONSTRAINT "_messageRecipients_A_fkey" FOREIGN KEY ("A") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messageRecipients" ADD CONSTRAINT "_messageRecipients_B_fkey" FOREIGN KEY ("B") REFERENCES "messagesUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
