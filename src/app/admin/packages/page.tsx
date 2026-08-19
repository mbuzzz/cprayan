import { prisma } from "@/lib/prisma";
import PackageListClient from "./PackageListClient";

export const revalidate = 0;

export default async function AdminPackagesPage() {
  let packages: Awaited<ReturnType<typeof prisma.developmentPackage.findMany>> = [];
  try {
    packages = await prisma.developmentPackage.findMany({
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });
  } catch (error) {
    console.error("Failed to fetch admin development packages:", error);
  }

  return <PackageListClient initialPackages={packages} />;
}
