-- CreateTable
CREATE TABLE "users" (
    "id" varchar(40) NOT NULL,
    "name" varchar(150) NOT NULL,
    "email" varchar(150) NOT NULL,
    "password" TEXT NOT NULL,
    "type" CHAR(1) NOT NULL CHECK ("type" IN ('P', 'A')),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
