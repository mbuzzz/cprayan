import ProjectForm from "../../create/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AdminEditProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id },
    include: { demoLinks: true }
  });

  if (!project) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Edit Project</h1>
        <p className="text-sm text-muted">Perbarui studi kasus portfolio {project.title}.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 custom-shadow transition-colors duration-300">
        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}