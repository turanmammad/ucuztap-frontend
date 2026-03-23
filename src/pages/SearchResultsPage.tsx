import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, ChevronDown, LayoutGrid, List, SearchX } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryFilterSidebar from "@/components/CategoryFilterSidebar";

const sortOptions = ["Tarixə görə", "Ucuzdan bahaya", "Bahalıdan ucuza", "Populyarlığa görə"];

const searchResults = [
  { id: 1, title: "Toyota Camry 2.5 Hybrid, 2021", price: "35,000", location: "Bakı", date: "5 dəq əvvəl", desc: "2.5L Hybrid, Avtomat, 28,000 km, gümüşü rəng", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop", ai: true },
  { id: 2, title: "Toyota Camry 2.0, 2019", price: "24,500", location: "Bakı", date: "20 dəq əvvəl", desc: "2.0L Benzin, Avtomat, 52,000 km, qara rəng", img: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?w=400&h=300&fit=crop", ai: true },
  { id: 3, title: "Toyota Camry 3.5 V6, 2020", price: "38,000", location: "Sumqayıt", date: "1 saat əvvəl", desc: "3.5L V6 Benzin, Avtomat, 35,000 km, ağ rəng", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop", ai: false },
  { id: 4, title: "Toyota Camry 2.5, 2018", price: "21,000", location: "Bakı", date: "2 saat əvvəl", desc: "2.5L Benzin, Avtomat, 68,000 km, göy rəng", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop", ai: false },
  { id: 5, title: "Toyota Camry 2.5 XLE, 2022", price: "42,000", location: "Bakı", date: "3 saat əvvəl", desc: "2.5L Benzin, Avtomat, 15,000 km, qırmızı rəng, tam paket", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop", ai: false },
  { id: 6, title: "Toyota Camry 2.0, 2017", price: "18,500", location: "Gəncə", date: "4 saat əvvəl", desc: "2.0L Benzin, Avtomat, 85,000 km, boz rəng", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop", ai: false },
  { id: 7, title: "Toyota Camry 2.5 SE, 2020", price: "32,000", location: "Bakı", date: "5 saat əvvəl", desc: "2.5L Benzin, Avtomat, 40,000 km, qara rəng, SE paket", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", ai: false },
  { id: 8, title: "Toyota Camry 2.5 Hybrid, 2023", price: "48,000", location: "Bakı", date: "6 saat əvvəl", desc: "2.5L Hybrid, Avtomat, 8,000 km, ağ rəng, yeni model", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", ai: false },
  { id: 9, title: "Toyota Camry 2.0 GL, 2016", price: "15,800", location: "Mingəçevir", date: "7 saat əvvəl", desc: "2.0L Benzin, Avtomat, 95,000 km, gümüşü rəng", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop", ai: false },
];

const TOTAL_PAGES = 42;

const NoResults = ({ onAiSearch }: { onAiSearch: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
      <SearchX size={36} className="text-muted-foreground" />
    </div>
    <h3 className="text-lg font-bold text-foreground mb-2">Heç bir nəticə tapılmadı</h3>
    <p className="text-sm text-muted-foreground mb-6 max-w-sm">
      Axtarışınıza uyğun elan tapılmadı. Aşağıdakıları yoxlayın:
    </p>
    <ul className="text-sm text-muted-foreground space-y-1.5 mb-6">
      <li>• Axtarış sözünü dəyişin</li>
      <li>• Filterləri silin</li>
      <li>• Daha geniş axtarış edin</li>
    </ul>
    <button
      onClick={onAiSearch}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
    >
      <Sparkles size={16} /> AI ilə axtarın
    </button>
  </div>
);

const SearchResultsPage = () => {
  const [query, setQuery] = useState("toyota camry bakı");
  const [aiMode, setAiMode] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSortValue] = useState(sortOptions[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const activeFilterCount = 0;

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
        {/* Search section */}
        <section className={`border-b border-border py-8 transition-colors duration-300 ${aiMode ? "bg-gradient-to-br from-[hsl(217,91%,96%)] to-[hsl(271,81%,96%)]" : "bg-hero-bg"}`}>
          <div className="container max-w-2xl">
            {/* Search bar */}
            <div className={`flex items-center rounded-xl overflow-hidden bg-background shadow-lg border-2 transition-all duration-300 ${
              aiMode ? "border-[hsl(271,81%,56%)]/40" : "border-primary"
            }`}>
              {aiMode ? (
                <Sparkles size={18} className="ml-4 text-[hsl(271,81%,56%)] shrink-0" />
              ) : (
                <Search size={18} className="ml-4 text-muted-foreground shrink-0" />
              )}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  aiMode
                    ? "Təbii dildə yazın: 'Bakıda 5000 manatdan ucuz yaxşı vəziyyətdə telefon'"
                    : "Nə axtarırsınız?"
                }
                className="flex-1 px-3 py-4 text-sm md:text-base bg-transparent outline-none placeholder:text-muted-foreground"
              />
              <button className={`px-6 py-4 font-semibold text-sm transition-all duration-300 shrink-0 active:scale-[0.97] ${
                aiMode
                  ? "bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white hover:opacity-90"
                  : "bg-primary text-primary-foreground hover:bg-primary-hover"
              }`}>
                Axtar
              </button>
            </div>

            {/* AI toggle row */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Bu sözlər üçün axtardınız: <span className="font-medium text-foreground">{query}</span>
              </p>

              <button
                type="button"
                role="switch"
                aria-checked={aiMode}
                onClick={() => setAiMode(!aiMode)}
                className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 active:scale-[0.97] ${
                  aiMode
                    ? "bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span className={`relative w-8 h-[18px] rounded-full transition-colors duration-300 ${aiMode ? "bg-white/30" : "bg-border"}`}>
                  <span className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
                    aiMode ? "translate-x-[15px]" : "translate-x-[2px]"
                  }`} />
                </span>
                <span className="flex items-center gap-1">
                  {aiMode && <Sparkles size={12} />}
                  AI Axtarış
                </span>
              </button>
            </div>
          </div>
        </section>

        <div className="container py-6 md:py-8">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-foreground">
              "{query.split(" ")[0]}" üçün {showResults ? "1,203" : "0"} nəticə
            </h1>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block w-[260px] shrink-0">
              <CategoryFilterSidebar open={false} onClose={() => {}} activeFilters={activeFilterCount} />
            </div>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {showResults ? (
                <>
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">1,203</span> elan tapıldı
                    </p>
                    <div className="flex items-center gap-2">
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
                      <div className="flex border border-border rounded-md overflow-hidden">
                        <button onClick={() => setView("grid")} className={`p-2 transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                          <LayoutGrid size={16} />
                        </button>
                        <button onClick={() => setView("list")} className={`p-2 transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                          <List size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cards */}
                  {view === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {searchResults.map((ad) => (
                        <Link key={ad.id} to={`/elanlar/${ad.id}`} className="rounded-lg border border-border bg-card overflow-hidden card-lift group relative">
                          {aiMode && ad.ai && (
                            <span className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white text-[10px] font-bold shadow-sm">
                              <Sparkles size={10} /> AI təklif edir
                            </span>
                          )}
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
                      {searchResults.map((ad) => (
                        <Link key={ad.id} to={`/elanlar/${ad.id}`} className="flex rounded-lg border border-border bg-card overflow-hidden card-lift group relative">
                          {aiMode && ad.ai && (
                            <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white text-[10px] font-bold shadow-sm">
                              <Sparkles size={10} /> AI təklif edir
                            </span>
                          )}
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
                </>
              ) : (
                <NoResults onAiSearch={() => setAiMode(true)} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile filter FAB */}
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold text-sm shadow-xl hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          🔍 Filter ({activeFilterCount})
        </button>
        <CategoryFilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} activeFilters={activeFilterCount} />
      </main>
      <SiteFooter />
    </div>
  );
};

export default SearchResultsPage;
