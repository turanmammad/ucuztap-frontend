import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const categories = ["Hamısı", "Nəqliyyat", "Əmlak", "Elektronika", "Təhlükəsizlik", "Məsləhətlər"];

const posts = [
  {
    id: 1,
    title: "Avtomobil alarkən diqqət etməli olduğunuz 10 şey",
    excerpt: "İkinci əl avtomobil alarkən mütləq yoxlanılmalı olan mühüm məqamlar və ekspert tövsiyələri. Bu yazıda hər bir alıcının bilməli olduğu praktiki addımları paylaşırıq.",
    date: "12 Yanvar 2025",
    readTime: "5 dəq",
    category: "Nəqliyyat",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Mənzil kirayə verərkən bilməli olduğunuz hüquqi məqamlar",
    excerpt: "Kirayə müqaviləsi, depozit qaydaları və kirayəçi hüquqları haqqında bilməli olduğunuz hər şey.",
    date: "8 Yanvar 2025",
    readTime: "7 dəq",
    category: "Əmlak",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Onlayn alış-verişdə fırıldaqdan necə qorunmalı?",
    excerpt: "İnternetdə təhlükəsiz alış-veriş etmək üçün praktiki məsləhətlər və xəbərdarlıq əlamətləri.",
    date: "3 Yanvar 2025",
    readTime: "4 dəq",
    category: "Təhlükəsizlik",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "2025-ci ildə ən çox satılan telefon modelləri",
    excerpt: "Bu il ən populyar olan smartfon modelləri və qiymət-keyfiyyət nisbətinə görə ən yaxşı seçimlər.",
    date: "28 Dekabr 2024",
    readTime: "6 dəq",
    category: "Elektronika",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Elanınızı daha çox baxış almaq üçün necə optimallaşdırmalı?",
    excerpt: "Elan başlığı, şəkil keyfiyyəti və təsvir yazma texnikaları ilə elanınızın görünürlüyünü artırın.",
    date: "20 Dekabr 2024",
    readTime: "3 dəq",
    category: "Məsləhətlər",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Bakıda daşınmaz əmlak bazarının 2025 proqnozu",
    excerpt: "Ekspertlərin fikrincə, bu il mənzil qiymətlərində hansı dəyişikliklər gözlənilir?",
    date: "15 Dekabr 2024",
    readTime: "8 dəq",
    category: "Əmlak",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Uşaq üçün təhlükəsiz oyuncaq necə seçilməli?",
    excerpt: "Yaş qrupuna uyğun oyuncaq seçimi və diqqət etməli olduğunuz təhlükəsizlik standartları.",
    date: "10 Dekabr 2024",
    readTime: "4 dəq",
    category: "Məsləhətlər",
    img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Elektrik avtomobilləri: Azərbaycanda gələcək perspektivləri",
    excerpt: "Ölkəmizdə elektromobillərin inkişafı, şarj infrastrukturu və alıcılar üçün üstünlüklər.",
    date: "5 Dekabr 2024",
    readTime: "6 dəq",
    category: "Nəqliyyat",
    img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop",
  },
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("Hamısı");

  const featured = posts.find((p) => p.featured);
  const filtered = activeCategory === "Hamısı"
    ? posts.filter((p) => !p.featured)
    : posts.filter((p) => p.category === activeCategory && !p.featured);

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0 bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 border-b border-border">
          <div className="container py-10 md:py-14">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 text-balance">Blog</h1>
            <p className="text-muted-foreground max-w-lg">Alış-veriş məsləhətləri, bazar araşdırmaları və platformamız haqqında yeniliklər.</p>
          </div>
        </section>

        <div className="container py-8 md:py-10">
          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors active:scale-[0.97] ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && activeCategory === "Hamısı" && (
            <Link to="#" className="block mb-8 group">
              <article className="grid md:grid-cols-2 gap-5 bg-card rounded-xl border border-border overflow-hidden card-lift">
                <div className="aspect-[3/2] md:aspect-auto overflow-hidden">
                  <img
                    src={featured.img}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="eager"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      <Tag size={11} /> {featured.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={11} /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight text-balance">{featured.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{featured.date}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Oxu <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <Link key={post.id} to="#" className="group">
                <article className="bg-card rounded-xl border border-border overflow-hidden card-lift h-full flex flex-col">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                        <Tag size={10} /> {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-foreground line-clamp-2 leading-snug mb-2">{post.title}</h2>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] text-muted-foreground">{post.date}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-1.5 transition-all">
                        Oxu <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Bu kateqoriyada hələ yazı yoxdur.</p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BlogPage;
