import PageHeader from "@/components/PageHeader";

export default function TeamPage() {
  const team = [
    { name: "Ahmad Rayan", role: "Chief Executive Officer", desc: "Berpengalaman 10+ tahun dalam industri teknologi dan manajemen bisnis." },
    { name: "Sarah Wijaya", role: "Chief Technology Officer", desc: "Expert dalam software architecture dan pengembangan solusi enterprise." },
    { name: "Budi Santoso", role: "Lead UI/UX Designer", desc: "Menciptakan pengalaman digital yang elegan dan user-centric." },
    { name: "Dina Larasati", role: "Digital Marketing Manager", desc: "Spesialis dalam data-driven marketing dan strategi digital." },
  ];

  return (
    <div>
      <PageHeader 
        title="TIM KAMI" 
        subtitle="Orang-orang hebat di balik solusi digital cerdas kami" 
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group">
              <div className="bg-card rounded-lg border border-card-border overflow-hidden card-hover">
                <div className="h-64 bg-[#0a0b0c] relative">
                  {/* Photo Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted">
                    <div className="w-24 h-24 rounded-full bg-[#121415] border-2 border-primary/20 flex items-center justify-center">
                       Photo
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center border-t border-[rgba(255,255,255,0.05)]">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <div className="text-sm font-medium golden-text mb-3">{member.role}</div>
                  <p className="text-sm text-muted">{member.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
