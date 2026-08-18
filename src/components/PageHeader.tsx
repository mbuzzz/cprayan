export default function PageHeader({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle?: string 
}) {
  return (
    <div className="bg-surface border-b border-border py-12 sm:py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold golden-text tracking-tight font-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}