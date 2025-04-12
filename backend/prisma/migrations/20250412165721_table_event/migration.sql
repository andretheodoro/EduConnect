-- CreateTable
CREATE TABLE "events" (
    "id" varchar(40) NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "description" varchar(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);
