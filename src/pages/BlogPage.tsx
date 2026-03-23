import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const posts = [
  { id: 1, title: "Avtomobil alarkən diqqət etməli olduğunuz 10 şey", excerpt: "İkinci əl avtomobil alarkən mütləq yoxlanılmalı olan mühüm məqamlar və ekspert tövsiyələri.", date: "12 Yanvar 2025", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop" },
  { id: 2, title: "Mənzil kirayə verərkən bilməli olduğunuz hüquqi məqamlar", excerpt: "Kirayə müqaviləsi, depozit qaydaları və kirayəçi hüquqları haqqında bilməli olduğunuz hər şey.", date: "8 Yanvar 2025", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop" },
  { id: 3, title: "Onlayn alış-verişdə fırıldaqdan necə qorunmalı?", excerpt: "İnternetdə təhlükəsiz alış-veriş etmək üçün praktiki məsləhətlər və xəbərdarlıq əlamətləri.", date: "3 Yanvar 2025", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop" },
  { id: 4, title: "2025-ci ildə ən çox satılan telefon modelləri", excerpt: "Bu il ən populyar olan smartfon modelləri və qiymət-keyfiyyət nisbətinə görə ən yaxşı seçimlər.", date: "28 Dekabr 2024", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop" },
  { id: 5, title: "Elanınızı daha çox baxış almaq üçün necə optimallaşdırmalı?", excerpt: "Elan başlığı, şəkil keyfiyyəti və təsvir yazma texnikaları ilə elanınızın görünürlüyünü artırın.", date: "20 Dekabr 2024", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
  { id: 6, title: "Bakıda daşınmaz əmlak bazarının 2025 proqnozu", excerpt: "Ekspertlərin fikrincə, bu il mənzil qiymətlərində hansı dəyişikliklər gözlənilir?", date: "15 Dekabr 2024", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" },
];

const BlogPage = () => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1 container py-10 md:py-14">
      <h1 className="text-2xl font-extrabold text-foreground mb-8">Blog</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link key={post.id} to="#" className="bg-card rounded-xl border border-border overflow-hidden group card-lift">
            <div className="aspect-[3/2] overflow-hidden">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="p-4">
              <p className="text-[10px] text-muted-foreground mb-2">{post.date}</p>
              <h2 className="text-sm font-bold text-foreground line-clamp-2 leading-snug mb-2">{post.title}</h2>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Oxu <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default BlogPage;
