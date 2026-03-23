import { Search } from "lucide-react";

const quickCategories = [
  { emoji: "🚗", label: "Avtomobil" },
  { emoji: "🏠", label: "Əmlak" },
  { emoji: "📱", label: "Telefon" },
  { emoji: "💼", label: "İş" },
  { emoji: "🔧", label: "Xidmət" },
];

const HeroSearch = () => (
  <section className="bg-hero-bg section-padding">
    <div className="container max-w-3xl text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 text-balance animate-fade-up" style={{ lineHeight: "1.15" }}>
        İstədiyiniz hər şeyi tapın
      </h1>
      <div className="flex items-center border-2 border-primary rounded-lg overflow-hidden bg-background shadow-md animate-fade-up" style={{ animationDelay: "80ms" }}>
        <Search size={20} className="ml-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Nə axtarırsınız? Məsələn: iPhone 15, mənzil kirayəsi..."
          className="flex-1 px-3 py-3.5 text-sm md:text-base bg-transparent outline-none placeholder:text-muted-foreground"
        />
        <button className="px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors shrink-0 active:scale-[0.97]">
          Axtar
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 mt-5 flex-wrap animate-fade-up" style={{ animationDelay: "160ms" }}>
        {quickCategories.map((cat) => (
          <a
            key={cat.label}
            href="#"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm bg-background border border-border hover:border-primary hover:shadow-sm transition-all active:scale-[0.96]"
          >
            <span>{cat.emoji}</span>
            <span className="font-medium">{cat.label}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSearch;
