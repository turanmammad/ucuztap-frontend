import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Car, Home, Smartphone, Briefcase, Wrench, Tag, Gift, Heart, Star, Zap, Package } from "lucide-react";

const quickCategories = [
  { emoji: "🚗", label: "Avtomobil", to: "/kateqoriya/neqliyyat" },
  { emoji: "🏠", label: "Əmlak", to: "/kateqoriya/emlak" },
  { emoji: "📱", label: "Telefon", to: "/kateqoriya/elektronika" },
  { emoji: "💼", label: "İş", to: "/kateqoriya/is-elanlari" },
  { emoji: "🔧", label: "Xidmət", to: "/kateqoriya/xidmetler" },
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
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/axtaris?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative bg-primary overflow-hidden section-padding">
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
        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="flex items-center rounded-xl bg-background shadow-xl animate-fade-up p-1.5"
          style={{ animationDelay: "80ms" }}
        >
          <Search size={20} className="ml-3 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nə axtarırsınız? Məsələn: iPhone 15, mənzil kirayəsi..."
            className="flex-1 px-3 py-3 text-sm md:text-base bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="px-7 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors shrink-0 active:scale-[0.96] shadow-sm">
            Axtar
          </button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-5 flex-wrap animate-fade-up" style={{ animationDelay: "160ms" }}>
          {quickCategories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm bg-white/90 backdrop-blur-sm border border-white/50 text-foreground hover:bg-white hover:shadow-md transition-all active:scale-[0.96]"
            >
              <span>{cat.emoji}</span>
              <span className="font-medium">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
