import { prisma } from "@/lib/prisma";
import PackageListClient from "./PackageListClient";

export const revalidate = 0;

export default async function AdminPackagesPage() {
  const packages = await prisma.developmentPackage.findMany({
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" },
    ],
  });

  return <PackageListClient initialPackages={packages} />;
}
