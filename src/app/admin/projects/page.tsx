import { prisma } from "@/lib/prisma";
import ProjectListClient from "./ProjectListClient";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" }
    ],
  });

  return <ProjectListClient initialProjects={projects} />;
}