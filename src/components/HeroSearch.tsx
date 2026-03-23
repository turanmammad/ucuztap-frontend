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
  { Icon: ShoppingBag, size: 28, style: { top: "8%", left: "5%", animationDuration: "18s", animationDelay: "0s" } },
  { Icon: Car, size: 24, style: { top: "20%", right: "8%", animationDuration: "22s", animationDelay: "2s" } },
  { Icon: Home, size: 26, style: { bottom: "15%", left: "10%", animationDuration: "20s", animationDelay: "4s" } },
  { Icon: Smartphone, size: 20, style: { top: "60%", right: "5%", animationDuration: "16s", animationDelay: "1s" } },
  { Icon: Tag, size: 22, style: { top: "12%", left: "20%", animationDuration: "24s", animationDelay: "3s" } },
  { Icon: Gift, size: 26, style: { bottom: "25%", right: "15%", animationDuration: "19s", animationDelay: "5s" } },
  { Icon: Briefcase, size: 20, style: { top: "35%", left: "3%", animationDuration: "21s", animationDelay: "2.5s" } },
  { Icon: Heart, size: 18, style: { top: "15%", right: "20%", animationDuration: "17s", animationDelay: "1.5s" } },
  { Icon: Star, size: 22, style: { bottom: "10%", right: "25%", animationDuration: "23s", animationDelay: "4.5s" } },
  { Icon: Wrench, size: 20, style: { bottom: "30%", left: "18%", animationDuration: "20s", animationDelay: "0.5s" } },
  { Icon: Zap, size: 18, style: { top: "45%", right: "12%", animationDuration: "15s", animationDelay: "3.5s" } },
  { Icon: Package, size: 24, style: { top: "70%", left: "8%", animationDuration: "25s", animationDelay: "6s" } },
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
    <section className={`relative bg-primary section-padding ${showDropdown ? "pb-[320px]" : ""}`} style={{ overflow: showDropdown ? undefined : "hidden" }}>
      {floatingIcons.map(({ Icon, size, style }, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-hero-float"
          style={style as React.CSSProperties}
        >
          <Icon size={size} className="text-primary-foreground/[0.08]" strokeWidth={1.5} />
        </div>
      ))}

      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/[0.06] animate-hero-pulse" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/[0.04] animate-hero-pulse" style={{ animationDelay: "3s" }} />

      <div className="container max-w-3xl text-center relative z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6 text-balance animate-fade-up" style={{ lineHeight: "1.15" }}>
          İstədiyiniz hər şeyi tapın
        </h1>

        <div ref={wrapperRef} className="relative animate-fade-up" style={{ animationDelay: "80ms" }}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="flex items-center rounded-xl bg-background shadow-xl p-1.5"
          >
            <Search size={20} className="ml-3 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Nə axtarırsınız? Məsələn: iPhone 15, mənzil kirayəsi..."
              className="flex-1 px-3 py-3 text-sm md:text-base bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="px-7 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors shrink-0 active:scale-[0.96] shadow-sm">
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
      </div>
    </section>
  );
};

export default HeroSearch;
