import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Car, Home, Smartphone, Briefcase, Wrench, Tag, Gift, Heart, Star, Zap, Package, TrendingUp } from "lucide-react";

const trendSearches = [
  "iPhone 15 Pro Max",
  "Mercedes-Benz E-Class",
  "Mənzil kirayə Bakı",
  "Samsung Galaxy S24",
  "Toyota Camry 2024",
  "Laptop Lenovo",
  "2 otaqlı mənzil",
  "BMW X5",
  "Kia Sportage",
  "Kondisioner",
];

const floatingIcons = [
  { Icon: ShoppingBag, size: 32, style: { top: "6%", left: "6%", animationDuration: "18s", animationDelay: "0s" } },
  { Icon: Car, size: 28, style: { top: "18%", right: "7%", animationDuration: "22s", animationDelay: "2s" } },
  { Icon: Home, size: 30, style: { bottom: "18%", left: "12%", animationDuration: "20s", animationDelay: "4s" } },
  { Icon: Smartphone, size: 24, style: { top: "55%", right: "4%", animationDuration: "16s", animationDelay: "1s" } },
  { Icon: Tag, size: 26, style: { top: "10%", left: "22%", animationDuration: "24s", animationDelay: "3s" } },
  { Icon: Gift, size: 30, style: { bottom: "22%", right: "14%", animationDuration: "19s", animationDelay: "5s" } },
  { Icon: Briefcase, size: 22, style: { top: "38%", left: "3%", animationDuration: "21s", animationDelay: "2.5s" } },
  { Icon: Heart, size: 20, style: { top: "12%", right: "22%", animationDuration: "17s", animationDelay: "1.5s" } },
  { Icon: Star, size: 26, style: { bottom: "8%", right: "28%", animationDuration: "23s", animationDelay: "4.5s" } },
  { Icon: Wrench, size: 22, style: { bottom: "32%", left: "20%", animationDuration: "20s", animationDelay: "0.5s" } },
  { Icon: Zap, size: 20, style: { top: "42%", right: "10%", animationDuration: "15s", animationDelay: "3.5s" } },
  { Icon: Package, size: 28, style: { top: "68%", left: "7%", animationDuration: "25s", animationDelay: "6s" } },
];

const quickCategories = [
  { label: "Nəqliyyat", icon: Car },
  { label: "Daşınmaz əmlak", icon: Home },
  { label: "Elektronika", icon: Smartphone },
  { label: "İş elanları", icon: Briefcase },
  { label: "Xidmətlər", icon: Wrench },
];

const HeroSearch = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSearch = (q?: string) => {
    const term = (q || query).trim();
    if (term) {
      setFocused(false);
      navigate(`/axtaris?q=${encodeURIComponent(term)}`);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = query.trim()
    ? trendSearches.filter(t => t.toLowerCase().includes(query.toLowerCase()))
    : trendSearches;

  const showDropdown = focused && filtered.length > 0;

  return (
    <section className={`relative section-padding py-16 md:py-24 ${showDropdown ? "pb-[320px]" : ""}`} style={{ overflow: showDropdown ? undefined : "hidden" }}>
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(45,100%,51%)] via-primary to-[hsl(38,95%,42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(51,95%,70%,0.3),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,hsl(38,95%,42%,0.4),transparent)]" />
      
      {/* Geometric shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-foreground/[0.04] animate-hero-pulse" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-foreground/[0.03] animate-hero-pulse" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-foreground/[0.02] animate-hero-pulse" style={{ animationDelay: "5s" }} />
        
        {/* Diagonal lines */}
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 60px, currentColor 60px, currentColor 61px)",
          color: "hsl(var(--foreground))"
        }} />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, size, style }, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-hero-float"
          style={style as React.CSSProperties}
        >
          <Icon size={size} className="text-foreground/[0.07]" strokeWidth={1.5} />
        </div>
      ))}

      <div className="container max-w-3xl text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 animate-fade-up">
          <Zap size={13} className="text-primary-foreground" />
          <span className="text-xs font-semibold text-primary-foreground">Azərbaycanın ən böyük elan platforması</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-foreground mb-3 text-balance animate-fade-up" style={{ lineHeight: "1.1", animationDelay: "60ms" }}>
          İstədiyiniz hər şeyi
          <span className="relative inline-block ml-2">
            tapın
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0 8 Q25 0, 50 6 Q75 12, 100 4" stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="none" opacity="0.2" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="text-primary-foreground/70 text-sm md:text-base mb-8 animate-fade-up" style={{ animationDelay: "120ms" }}>
          Avtomobil, mənzil, telefon və daha minlərlə elan arasında axtarın
        </p>

        {/* Search bar */}
        <div ref={wrapperRef} className="relative animate-fade-up" style={{ animationDelay: "180ms" }}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="flex items-center rounded-2xl bg-background shadow-2xl shadow-foreground/10 p-1.5 ring-1 ring-foreground/[0.06]"
          >
            <Search size={20} className="ml-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Nə axtarırsınız? Məsələn: iPhone 15, mənzil kirayəsi..."
              className="flex-1 px-3 py-3.5 text-sm md:text-base bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary-hover transition-all shrink-0 active:scale-[0.96] shadow-md shadow-primary/30">
              Axtar
            </button>
          </form>

          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1.5 rounded-xl bg-background border border-border shadow-2xl z-50 overflow-hidden animate-fade-up">
              <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
                <TrendingUp size={14} className="text-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {query.trim() ? "Nəticələr" : "Trend axtarışlar"}
                </span>
              </div>
              <div className="max-h-[240px] overflow-y-auto">
                {filtered.map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      handleSearch(term);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-foreground hover:bg-muted/60 transition-colors"
                  >
                    <Search size={14} className="text-muted-foreground shrink-0" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick category chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-up" style={{ animationDelay: "260ms" }}>
          {quickCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(`/kateqoriya/${cat.label.toLowerCase().replace(/\s+/g, "-")}`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-foreground/10 backdrop-blur-sm text-primary-foreground text-xs font-semibold hover:bg-foreground/20 transition-all active:scale-95"
            >
              <cat.icon size={13} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mt-8 animate-fade-up" style={{ animationDelay: "340ms" }}>
          {[
            { value: "152K+", label: "Aktiv elan" },
            { value: "48K+", label: "İstifadəçi" },
            { value: "5K+", label: "Gündəlik baxış" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl md:text-2xl font-extrabold text-primary-foreground">{s.value}</p>
              <p className="text-[11px] text-primary-foreground/60 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
