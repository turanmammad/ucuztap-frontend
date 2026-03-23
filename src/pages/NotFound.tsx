import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Home } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/axtaris?q=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <p className="text-8xl font-extrabold text-primary mb-4" style={{ lineHeight: 1 }}>404</p>
          <h1 className="text-2xl font-bold text-foreground mb-2">Səhifə tapılmadı</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Axtardığınız səhifə mövcud deyil, silinmiş və ya köçürülmüş ola bilər.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex items-center rounded-xl bg-background border border-border p-1.5 mb-5 shadow-sm">
            <Search size={16} className="ml-3 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nə axtarırsınız?"
              className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none"
            />
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97]">
              Axtar
            </button>
          </form>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97] shadow-sm"
          >
            <Home size={16} /> Ana Səhifəyə qayıt
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
