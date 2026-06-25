export default function PageHeader({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle?: string 
}) {
  return (
    <div className="bg-[#0a0b0c] border-b border-[rgba(255,255,255,0.05)] py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 golden-text">{title}</h1>
        {subtitle && (
          <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
}