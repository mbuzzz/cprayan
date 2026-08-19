-- Create the development service package table required by the public
-- services page and the admin package management pages.
CREATE TABLE IF NOT EXISTS "DevelopmentPackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Web Development',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "originalPrice" DOUBLE PRECISION,
    "deliveryTime" TEXT NOT NULL DEFAULT '3-7 Hari Kerja',
    "revisionCount" TEXT NOT NULL DEFAULT '3x Revisi',
    "description" TEXT NOT NULL,
    "features" TEXT NOT NULL DEFAULT '[]',
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DevelopmentPackage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "DevelopmentPackage_slug_key"
    ON "DevelopmentPackage"("slug");
