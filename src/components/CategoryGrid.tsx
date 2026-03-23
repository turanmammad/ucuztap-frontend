import { Link } from "react-router-dom";

const categories = [
  { emoji: "🚗", name: "Nəqliyyat", count: "45,230", slug: "neqliyyat", subs: ["Avtomobil", "Motosiklet", "Ehtiyat hissələri"] },
  { emoji: "🏠", name: "Daşınmaz Əmlak", count: "23,456", slug: "emlak", subs: ["Mənzil", "Ev / Villa", "Torpaq"] },
  { emoji: "📱", name: "Elektronika", count: "34,567", slug: "elektronika", subs: ["Telefon", "Kompüter", "TV"] },
  { emoji: "🏡", name: "Ev və Bağ", count: "12,345", slug: "ev-ve-bag", subs: ["Mebel", "Məişət texnikası"] },
  { emoji: "💼", name: "İş Elanları", count: "8,901", slug: "is-elanlari", subs: ["Tam iş", "Freelance", "Staj"] },
  { emoji: "🔧", name: "Xidmətlər", count: "15,678", slug: "xidmetler", subs: ["Təmir", "Təmizlik", "Təhsil"] },
  { emoji: "👔", name: "Geyim və Aksesuar", count: "19,234", slug: "geyim-aksesuar", subs: ["Kişi", "Qadın", "Aksesuar"] },
  { emoji: "🐾", name: "Heyvanlar", count: "3,456", slug: "heyvanlar", subs: ["İt", "Pişik", "Quş"] },
  { emoji: "⚽", name: "Hobbi və Asudə", count: "5,678", slug: "hobbi-asude", subs: ["İdman", "Musiqi", "Oyun"] },
  { emoji: "👶", name: "Uşaq Aləmi", count: "7,890", slug: "usaq-alemi", subs: ["Geyim", "Oyuncaq", "Araba"] },
  { emoji: "🏗️", name: "Tikinti və Təmir", count: "4,567", slug: "tikinti-temir", subs: ["Material", "Alət", "Xidmət"] },
  { emoji: "📦", name: "Digər", count: "2,345", slug: "diger", subs: [] },
];

const CategoryGrid = () => (
  <section className="section-padding">
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Kateqoriyalar</h2>
        <span className="text-xs text-muted-foreground">
          {categories.length} kateqoriya
        </span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/kateqoriya/${cat.slug}`}
            className="group relative flex flex-col items-center gap-2.5 p-4 pb-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
          >
            {/* Subtle gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="text-3xl group-hover:scale-110 transition-transform duration-200 relative z-10">{cat.emoji}</span>
            <span className="text-sm font-semibold text-center text-card-foreground relative z-10 leading-tight">{cat.name}</span>
            <span className="text-[11px] text-muted-foreground relative z-10 tabular-nums">{cat.count} elan</span>

            {/* Sub-categories preview */}
            {cat.subs.length > 0 && (
              <div className="w-full pt-2 mt-1 border-t border-border/60 relative z-10">
                <p className="text-[10px] text-muted-foreground/70 text-center leading-relaxed line-clamp-1">
                  {cat.subs.join(" · ")}
                </p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
