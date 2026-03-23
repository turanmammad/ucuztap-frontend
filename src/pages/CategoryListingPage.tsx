import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryFilterSidebar from "@/components/CategoryFilterSidebar";

const sortOptions = ["Tarixə görə", "Ucuzdan bahaya", "Bahalıdan ucuza", "Populyarlığa görə"];

const ads = [
  { id: 1, title: "Mercedes-Benz C200, 2019", price: "25,000", location: "Bakı", date: "5 dəq əvvəl", desc: "2.0L Benzin, Avtomat, 45,000 km, ağ rəng, tam təchizat", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop" },
  { id: 2, title: "BMW 320i M Sport, 2020", price: "32,500", location: "Bakı", date: "12 dəq əvvəl", desc: "2.0L Benzin, Avtomat, 35,000 km, qara rəng, M paket", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop" },
  { id: 3, title: "Toyota Camry 2.5 Hybrid", price: "35,000", location: "Sumqayıt", date: "20 dəq əvvəl", desc: "2.5L Hybrid, Avtomat, 28,000 km, gümüşü rəng", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop" },
  { id: 4, title: "Hyundai Tucson 2.0 GDI", price: "22,000", location: "Bakı", date: "35 dəq əvvəl", desc: "2.0L Benzin, Avtomat, 52,000 km, göy rəng", img: "https://images.unsplash.com/photo-1633695427587-dfa6a56f6572?w=400&h=300&fit=crop" },
  { id: 5, title: "Kia Sportage 1.6 T-GDI", price: "31,500", location: "Gəncə", date: "1 saat əvvəl", desc: "1.6L Turbo, Avtomat, 40,000 km, qırmızı rəng", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop" },
  { id: 6, title: "Nissan Qashqai 2.0", price: "24,000", location: "Bakı", date: "1 saat əvvəl", desc: "2.0L Benzin, CVT, 48,000 km, ağ rəng", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop" },
  { id: 7, title: "Chevrolet Malibu 1.5T", price: "16,500", location: "Bakı", date: "2 saat əvvəl", desc: "1.5L Turbo, Avtomat, 65,000 km, qara rəng", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
  { id: 8, title: "Lexus RX 350 F-Sport", price: "55,000", location: "Bakı", date: "2 saat əvvəl", desc: "3.5L Benzin, Avtomat, 30,000 km, ağ rəng, F-Sport", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop" },
  { id: 9, title: "Toyota Corolla 1.6 CVT", price: "19,800", location: "Sumqayıt", date: "3 saat əvvəl", desc: "1.6L Benzin, CVT, 55,000 km, boz rəng", img: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?w=400&h=300&fit=crop" },
  { id: 10, title: "Mercedes-Benz E200, 2020", price: "38,000", location: "Bakı", date: "3 saat əvvəl", desc: "2.0L Benzin, Avtomat, 25,000 km, qara rəng, AMG", img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop" },
  { id: 11, title: "Audi A4 2.0 TFSI, 2019", price: "29,000", location: "Bakı", date: "4 saat əvvəl", desc: "2.0L Turbo, Avtomat, 42,000 km, göy rəng, S-Line", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop" },
  { id: 12, title: "Volkswagen Passat 1.4 TSI", price: "18,500", location: "Bakı", date: "5 saat əvvəl", desc: "1.4L Turbo, Avtomat, 70,000 km, gümüşü rəng", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop" },
];

const TOTAL_PAGES = 117;

const CategoryListingPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSortValue] = useState(sortOptions[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const activeFilterCount = 3;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (TOTAL_PAGES <= 7) {
      for (let i = 1; i <= TOTAL_PAGES; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(TOTAL_PAGES - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < TOTAL_PAGES - 2) pages.push("...");
      pages.push(TOTAL_PAGES);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-3">
            <nav className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
              <ChevronRight size={14} className="text-muted-foreground/50" />
              <span className="text-foreground font-medium">Nəqliyyat</span>
            </nav>
          </div>
        </div>

        <div className="container py-6 md:py-8">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-foreground">Nəqliyyat</h1>
            <p className="text-sm text-muted-foreground mt-1">45,230 elan</p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block w-[260px] shrink-0">
              <CategoryFilterSidebar open={false} onClose={() => {}} activeFilters={activeFilterCount} />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">45,230</span> elan tapıldı
                </p>

                <div className="flex items-center gap-2">
                  {/* Sort dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setSortOpen(!sortOpen)}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-md hover:border-primary/50 transition-colors"
                    >
                      <span className="text-muted-foreground">Sırala:</span>
                      <span className="font-medium">{sort}</span>
                      <ChevronDown size={14} className="text-muted-foreground" />
                    </button>
                    {sortOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                        <div className="absolute right-0 top-full mt-1 w-52 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-fade-in">
                          {sortOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => { setSortValue(opt); setSortOpen(false); }}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                sort === opt ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* View toggle */}
                  <div className="flex border border-border rounded-md overflow-hidden">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-2 transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`p-2 transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ad cards */}
              {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {ads.map((ad) => (
                    <Link key={ad.id} to={`/elanlar/${ad.id}`} className="rounded-lg border border-border bg-card overflow-hidden card-lift group">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                        <p className="text-base font-bold text-foreground mt-1">{ad.price} ₼</p>
                        <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
                          <span>📍 {ad.location}</span>
                          <span>{ad.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {ads.map((ad) => (
                    <Link key={ad.id} to={`/elanlar/${ad.id}`} className="flex rounded-lg border border-border bg-card overflow-hidden card-lift group">
                      <div className="w-36 h-28 sm:w-44 sm:h-32 shrink-0 overflow-hidden">
                        <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                      <div className="flex-1 p-3 min-w-0">
                        <p className="text-sm font-medium text-card-foreground line-clamp-1">{ad.title}</p>
                        <p className="text-base font-bold text-foreground mt-0.5">{ad.price} ₼</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ad.desc}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>📍 {ad.location}</span>
                          <span>{ad.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <nav className="flex items-center justify-center gap-1 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm rounded-md border border-border hover:border-primary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  « Əvvəl
                </button>
                {getPageNumbers().map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="px-2 py-2 text-sm text-muted-foreground">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p as number)}
                      className={`w-9 h-9 text-sm rounded-md font-medium transition-all ${
                        currentPage === p
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage(Math.min(TOTAL_PAGES, currentPage + 1))}
                  disabled={currentPage === TOTAL_PAGES}
                  className="px-3 py-2 text-sm rounded-md border border-border hover:border-primary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Növbəti »
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile filter FAB */}
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold text-sm shadow-xl hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          <SlidersHorizontal size={16} />
          Filter ({activeFilterCount})
        </button>

        {/* Mobile filter sheet */}
        <CategoryFilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} activeFilters={activeFilterCount} />
      </main>
      <SiteFooter />
    </div>
  );
};

export default CategoryListingPage;
