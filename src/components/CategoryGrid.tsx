import { Link } from "react-router-dom";

const categories = [
  { emoji: "🚗", name: "Nəqliyyat", count: "45,230", slug: "neqliyyat" },
  { emoji: "🏠", name: "Daşınmaz Əmlak", count: "23,456", slug: "emlak" },
  { emoji: "📱", name: "Elektronika", count: "34,567", slug: "elektronika" },
  { emoji: "🏡", name: "Ev və Bağ", count: "12,345", slug: "ev-ve-bag" },
  { emoji: "💼", name: "İş Elanları", count: "8,901", slug: "is-elanlari" },
  { emoji: "🔧", name: "Xidmətlər", count: "15,678", slug: "xidmetler" },
  { emoji: "👔", name: "Geyim və Aksesuar", count: "19,234", slug: "geyim-aksesuar" },
  { emoji: "🐾", name: "Heyvanlar", count: "3,456", slug: "heyvanlar" },
  { emoji: "⚽", name: "Hobbi və Asudə", count: "5,678", slug: "hobbi-asude" },
  { emoji: "👶", name: "Uşaq Aləmi", count: "7,890", slug: "usaq-alemi" },
  { emoji: "🏗️", name: "Tikinti və Təmir", count: "4,567", slug: "tikinti-temir" },
  { emoji: "📦", name: "Digər", count: "2,345", slug: "diger" },
];

const CategoryGrid = () => (
  <section className="section-padding">
    <div className="container">
      <h2 className="text-xl font-bold text-foreground mb-6">Kateqoriyalar</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/kateqoriya/${cat.slug}`}
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-md transition-all card-lift cursor-pointer group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
            <span className="text-sm font-semibold text-center text-card-foreground">{cat.name}</span>
            <span className="text-xs text-muted-foreground">({cat.count})</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
