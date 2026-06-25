import ProjectForm from "./ProjectForm";

export default function AdminCreateProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Tambah Project Baru</h1>
        <p className="text-sm text-muted">Buat halaman studi kasus portfolio baru.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 custom-shadow transition-colors duration-300">
        <ProjectForm />
      </div>
    </div>
  );
}