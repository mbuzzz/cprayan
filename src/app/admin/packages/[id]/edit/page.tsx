import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PackageForm from "@/app/admin/packages/create/PackageForm";

export const revalidate = 0;

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const pkg = await prisma.developmentPackage.findUnique({
    where: { id },
  });

  if (!pkg) notFound();

  return <PackageForm initialData={pkg} isEdit={true} />;
}
