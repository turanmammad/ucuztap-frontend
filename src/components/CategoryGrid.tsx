import { Link } from "react-router-dom";
import { Car, Home, Smartphone, Sofa, Briefcase, Wrench, Shirt, PawPrint, Trophy, Baby, HardHat, Package, ArrowRight } from "lucide-react";

const categories = [
  { icon: Car, name: "Nəqliyyat", count: "45,230", slug: "neqliyyat", color: "hsl(217, 91%, 60%)", subs: ["Avtomobil", "Motosiklet", "Ehtiyat hissələri"] },
  { icon: Home, name: "Daşınmaz Əmlak", count: "23,456", slug: "emlak", color: "hsl(142, 71%, 45%)", subs: ["Mənzil", "Ev / Villa", "Torpaq"] },
  { icon: Smartphone, name: "Elektronika", count: "34,567", slug: "elektronika", color: "hsl(271, 81%, 56%)", subs: ["Telefon", "Kompüter", "TV"] },
  { icon: Sofa, name: "Ev və Bağ", count: "12,345", slug: "ev-ve-bag", color: "hsl(25, 95%, 53%)", subs: ["Mebel", "Məişət texnikası"] },
  { icon: Briefcase, name: "İş Elanları", count: "8,901", slug: "is-elanlari", color: "hsl(199, 89%, 48%)", subs: ["Tam iş", "Freelance", "Staj"] },
  { icon: Wrench, name: "Xidmətlər", count: "15,678", slug: "xidmetler", color: "hsl(340, 82%, 52%)", subs: ["Təmir", "Təmizlik", "Təhsil"] },
  { icon: Shirt, name: "Geyim və Aksesuar", count: "19,234", slug: "geyim-aksesuar", color: "hsl(262, 83%, 58%)", subs: ["Kişi", "Qadın", "Aksesuar"] },
  { icon: PawPrint, name: "Heyvanlar", count: "3,456", slug: "heyvanlar", color: "hsl(32, 95%, 44%)", subs: ["İt", "Pişik", "Quş"] },
  { icon: Trophy, name: "Hobbi və Asudə", count: "5,678", slug: "hobbi-asude", color: "hsl(158, 64%, 52%)", subs: ["İdman", "Musiqi", "Oyun"] },
  { icon: Baby, name: "Uşaq Aləmi", count: "7,890", slug: "usaq-alemi", color: "hsl(350, 89%, 60%)", subs: ["Geyim", "Oyuncaq", "Araba"] },
  { icon: HardHat, name: "Tikinti və Təmir", count: "4,567", slug: "tikinti-temir", color: "hsl(45, 93%, 47%)", subs: ["Material", "Alət", "Xidmət"] },
  { icon: Package, name: "Digər", count: "2,345", slug: "diger", color: "hsl(220, 14%, 46%)", subs: [] },
];

const CategoryGrid = () => (
  <section className="section-padding py-10 md:py-14">
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-foreground">Kateqoriyalar</h2>
          <p className="text-sm text-muted-foreground mt-1">İstədiyiniz kateqoriyanı seçin</p>
        </div>
        <Link to="/kateqoriyalar" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          Hamısı <ArrowRight size={14} />
        </Link>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/kateqoriya/${cat.slug}`}
            className="group flex flex-col items-center gap-2 p-3.5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all shrink-0 w-[88px] snap-start"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${cat.color}15` }}
            >
              <cat.icon size={22} style={{ color: cat.color }} strokeWidth={1.8} />
            </div>
            <span className="text-[11px] font-semibold text-center text-card-foreground leading-tight line-clamp-2">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/kateqoriya/${cat.slug}`}
            className="group relative flex flex-col items-center gap-3 p-5 pb-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            {/* Hover gradient */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(135deg, ${cat.color}08, ${cat.color}03)` }}
            />

            {/* Icon */}
            <div
              className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:shadow-md"
              style={{
                backgroundColor: `${cat.color}12`,
                boxShadow: `0 0 0 0 ${cat.color}00`,
              }}
            >
              <cat.icon size={26} style={{ color: cat.color }} strokeWidth={1.7} />
            </div>

            {/* Name */}
            <span className="relative z-10 text-sm font-semibold text-center text-card-foreground leading-tight group-hover:text-foreground transition-colors">
              {cat.name}
            </span>

            {/* Count */}
            <span className="relative z-10 text-[11px] text-muted-foreground tabular-nums font-medium">
              {cat.count} elan
            </span>

            {/* Subcategories */}
            {cat.subs.length > 0 && (
              <div className="relative z-10 w-full pt-2.5 mt-0.5 border-t border-border/50">
                <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed line-clamp-1">
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
