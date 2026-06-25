import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t border-[rgba(255,255,255,0.1)] py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted">
          <p>&copy; {new Date().getFullYear()} PT. Rayan Smart Kreatif. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}