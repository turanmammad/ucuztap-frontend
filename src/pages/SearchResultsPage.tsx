import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search, Sparkles, ChevronDown, LayoutGrid, List, SearchX,
  SlidersHorizontal, X, MapPin, Tag, ArrowUpDown, Clock, Heart,
  Eye, Check, RotateCcw, History
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryFilterSidebar, { type SidebarFilterState } from "@/components/CategoryFilterSidebar";

const sortOptions = [
  { value: "date", label: "Tarixə görə", icon: Clock },
  { value: "price-asc", label: "Ucuzdan bahaya", icon: ArrowUpDown },
  { value: "price-desc", label: "Bahalıdan ucuza", icon: ArrowUpDown },
  { value: "popular", label: "Populyarlığa görə", icon: Eye },
];

const cities = [
  "Hamısı", "Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Lənkəran", "Şəki", "Naxçıvan", "Şirvan", "Quba"
];

const priceRanges = [
  { label: "Hamısı", min: 0, max: 0 },
  { label: "0 - 500 ₼", min: 0, max: 500 },
  { label: "500 - 2,000 ₼", min: 500, max: 2000 },
  { label: "2,000 - 10,000 ₼", min: 2000, max: 10000 },
  { label: "10,000 - 50,000 ₼", min: 10000, max: 50000 },
  { label: "50,000+ ₼", min: 50000, max: 0 },
];

const searchResults = [
  { id: 1, title: "Toyota Camry 2.5 Hybrid, 2021", price: "35,000", location: "Bakı", date: "5 dəq əvvəl", desc: "2.5L Hybrid, Avtomat, 28,000 km, gümüşü rəng", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop", ai: true, views: 234, isFav: false },
  { id: 2, title: "Toyota Camry 2.0, 2019", price: "24,500", location: "Bakı", date: "20 dəq əvvəl", desc: "2.0L Benzin, Avtomat, 52,000 km, qara rəng", img: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?w=400&h=300&fit=crop", ai: true, views: 156, isFav: false },
  { id: 3, title: "Toyota Camry 3.5 V6, 2020", price: "38,000", location: "Sumqayıt", date: "1 saat əvvəl", desc: "3.5L V6 Benzin, Avtomat, 35,000 km, ağ rəng", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop", ai: false, views: 89, isFav: false },
  { id: 4, title: "Toyota Camry 2.5, 2018", price: "21,000", location: "Bakı", date: "2 saat əvvəl", desc: "2.5L Benzin, Avtomat, 68,000 km, göy rəng", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop", ai: false, views: 312, isFav: false },
  { id: 5, title: "Toyota Camry 2.5 XLE, 2022", price: "42,000", location: "Bakı", date: "3 saat əvvəl", desc: "2.5L Benzin, Avtomat, 15,000 km, qırmızı rəng, tam paket", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop", ai: false, views: 78, isFav: false },
  { id: 6, title: "Toyota Camry 2.0, 2017", price: "18,500", location: "Gəncə", date: "4 saat əvvəl", desc: "2.0L Benzin, Avtomat, 85,000 km, boz rəng", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop", ai: false, views: 45, isFav: false },
  { id: 7, title: "Toyota Camry 2.5 SE, 2020", price: "32,000", location: "Bakı", date: "5 saat əvvəl", desc: "2.5L Benzin, Avtomat, 40,000 km, qara rəng, SE paket", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", ai: false, views: 198, isFav: false },
  { id: 8, title: "Toyota Camry 2.5 Hybrid, 2023", price: "48,000", location: "Bakı", date: "6 saat əvvəl", desc: "2.5L Hybrid, Avtomat, 8,000 km, ağ rəng, yeni model", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", ai: false, views: 567, isFav: false },
  { id: 9, title: "Toyota Camry 2.0 GL, 2016", price: "15,800", location: "Mingəçevir", date: "7 saat əvvəl", desc: "2.0L Benzin, Avtomat, 95,000 km, gümüşü rəng", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop", ai: false, views: 34, isFav: false },
];

const TOTAL_PAGES = 42;

/* ── Dropdown wrapper ── */
const FilterDropdown = ({
  trigger,
  open,
  onToggle,
  onClose,
  children,
}: {
  trigger: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <div onClick={onToggle}>{trigger}</div>
      {open && (
        <div className="absolute left-0 top-full mt-1.5 min-w-[220px] bg-popover border border-border rounded-xl shadow-xl z-50 py-1.5 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

/* ── No results ── */
const NoResults = ({ onAiSearch }: { onAiSearch: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
      <SearchX size={36} className="text-muted-foreground" />
    </div>
    <h3 className="text-lg font-bold text-foreground mb-2">Heç bir nəticə tapılmadı</h3>
    <p className="text-sm text-muted-foreground mb-6 max-w-sm">
      Axtarışınıza uyğun elan tapılmadı. Filterləri dəyişin və ya AI ilə axtarın.
    </p>
    <button
      onClick={onAiSearch}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
    >
      <Sparkles size={16} /> AI ilə axtarın
    </button>
  </div>
);

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "toyota camry bakı";
  const [query, setQuery] = useState(initialQuery);
  const [aiMode, setAiMode] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showResults] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Quick filter states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("Hamısı");
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sidebarFilters, setSidebarFilters] = useState<SidebarFilterState | null>(null);

  const handleSidebarFilterChange = useCallback((state: SidebarFilterState) => {
    setSidebarFilters(state);
  }, []);

  const activeFilterCount =
    (selectedCity !== "Hamısı" ? 1 : 0) +
    (selectedPrice.label !== "Hamısı" ? 1 : 0) +
    (priceMin || priceMax ? 1 : 0) +
    (sidebarFilters?.activeCount || 0);

  // Filter and sort results reactively
  const filteredResults = useMemo(() => {
    let results = [...searchResults];

    // City filter (quick filter or sidebar)
    const cityFilter = selectedCity !== "Hamısı" ? selectedCity : (sidebarFilters?.city && sidebarFilters.city !== "Bütün şəhərlər" ? sidebarFilters.city : null);
    if (cityFilter) {
      results = results.filter(ad => ad.location === cityFilter);
    }

    // Price filter (from preset)
    if (selectedPrice.label !== "Hamısı") {
      results = results.filter(ad => {
        const p = parseInt(ad.price.replace(/,/g, ""));
        const aboveMin = p >= selectedPrice.min;
        const belowMax = selectedPrice.max === 0 || p <= selectedPrice.max;
        return aboveMin && belowMax;
      });
    }

    // Price filter (custom range from quick filter)
    if (priceMin || priceMax) {
      results = results.filter(ad => {
        const p = parseInt(ad.price.replace(/,/g, ""));
        if (priceMin && p < parseInt(priceMin)) return false;
        if (priceMax && p > parseInt(priceMax)) return false;
        return true;
      });
    }

    // Price filter from sidebar
    const sidebarPrice = sidebarFilters?.ranges?.price;
    if (sidebarPrice && (sidebarPrice.min || sidebarPrice.max) && !priceMin && !priceMax && selectedPrice.label === "Hamısı") {
      results = results.filter(ad => {
        const p = parseInt(ad.price.replace(/,/g, ""));
        if (sidebarPrice.min && p < parseInt(sidebarPrice.min)) return false;
        if (sidebarPrice.max && p > parseInt(sidebarPrice.max)) return false;
        return true;
      });
    }

    // Sort
    if (sort.value === "price-asc") {
      results.sort((a, b) => parseInt(a.price.replace(/,/g, "")) - parseInt(b.price.replace(/,/g, "")));
    } else if (sort.value === "price-desc") {
      results.sort((a, b) => parseInt(b.price.replace(/,/g, "")) - parseInt(a.price.replace(/,/g, "")));
    } else if (sort.value === "popular") {
      results.sort((a, b) => b.views - a.views);
    }

    return results;
  }, [selectedCity, selectedPrice, priceMin, priceMax, sort, sidebarFilters]);

  const toggleDropdown = useCallback((key: string) => {
    setOpenDropdown(prev => prev === key ? null : key);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  const toggleFav = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const resetFilters = () => {
    setSelectedCity("Hamısı");
    setSelectedPrice(priceRanges[0]);
    setPriceMin("");
    setPriceMax("");
  };

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
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
      <SiteHeader />
      <main className="flex-1">
        {/* Search header */}
        <section className={`border-b border-border py-6 md:py-8 transition-colors duration-300 ${aiMode ? "bg-gradient-to-br from-[hsl(217,91%,96%)] to-[hsl(271,81%,96%)]" : "bg-muted/30"}`}>
          <div className="container max-w-5xl">
            {/* Search bar */}
            <div className={`flex items-center rounded-xl bg-background shadow-lg p-1.5 transition-all duration-300 ${
              aiMode ? "ring-2 ring-[hsl(271,81%,56%)]/30" : "ring-1 ring-border"
            }`}>
              {aiMode ? (
                <Sparkles size={18} className="ml-3 text-[hsl(271,81%,56%)] shrink-0" />
              ) : (
                <Search size={18} className="ml-3 text-muted-foreground shrink-0" />
              )}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={aiMode ? "Təbii dildə yazın: 'Bakıda 5000 manatdan ucuz yaxşı telefon'" : "Nə axtarırsınız?"}
                className="flex-1 px-3 py-3 text-sm md:text-base bg-transparent outline-none placeholder:text-muted-foreground"
              />
              <button className={`px-7 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shrink-0 active:scale-[0.96] shadow-sm ${
                aiMode
                  ? "bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white hover:opacity-90"
                  : "bg-primary text-primary-foreground hover:bg-primary-hover"
              }`}>
                Axtar
              </button>
            </div>

            {/* Info + AI toggle row */}
            <div className="flex items-center justify-between mt-3 gap-4">
              <p className="text-sm text-muted-foreground truncate">
                <span className="font-semibold text-foreground">"{ query }"</span> üçün axtardınız
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={aiMode}
                onClick={() => setAiMode(prev => !prev)}
                className={`shrink-0 relative inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer select-none transition-all duration-300 active:scale-[0.96] ${
                  aiMode
                    ? "bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white shadow-md"
                    : "border border-border bg-background text-muted-foreground hover:border-primary/30"
                }`}
              >
                <span aria-hidden className={`pointer-events-none relative w-8 h-4 rounded-full transition-colors duration-300 ${aiMode ? "bg-white/25" : "bg-muted"}`}>
                  <span className={`block absolute top-[2px] left-[2px] h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-300 ${aiMode ? "translate-x-[14px]" : ""}`} />
                </span>
                <Sparkles size={11} />
                AI
              </button>
            </div>

            {/* Quick filters bar */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
              {/* City filter */}
              <FilterDropdown
                open={openDropdown === "city"}
                onToggle={() => toggleDropdown("city")}
                onClose={closeDropdown}
                trigger={
                  <button className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all border ${
                    selectedCity !== "Hamısı"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/40"
                  }`}>
                    <MapPin size={13} />
                    {selectedCity === "Hamısı" ? "Şəhər" : selectedCity}
                    <ChevronDown size={11} />
                  </button>
                }
              >
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setOpenDropdown(null); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      selectedCity === city ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <Check size={14} className="text-primary" />}
                  </button>
                ))}
              </FilterDropdown>

              {/* Price filter */}
              <FilterDropdown
                open={openDropdown === "price"}
                onToggle={() => toggleDropdown("price")}
                onClose={closeDropdown}
                trigger={
                  <button className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all border ${
                    selectedPrice.label !== "Hamısı" || priceMin || priceMax
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/40"
                  }`}>
                    <Tag size={13} />
                    {selectedPrice.label !== "Hamısı" ? selectedPrice.label : (priceMin || priceMax) ? `${priceMin || "0"} - ${priceMax || "∞"} ₼` : "Qiymət"}
                    <ChevronDown size={11} />
                  </button>
                }
              >
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Xüsusi aralıq</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceMin}
                      onChange={e => setPriceMin(e.target.value)}
                      className="w-full px-2.5 py-2 text-sm border border-border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <span className="text-muted-foreground text-xs">—</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceMax}
                      onChange={e => setPriceMax(e.target.value)}
                      className="w-full px-2.5 py-2 text-sm border border-border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                {priceRanges.map(pr => (
                  <button
                    key={pr.label}
                    onClick={() => { setSelectedPrice(pr); setPriceMin(""); setPriceMax(""); setOpenDropdown(null); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      selectedPrice.label === pr.label ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{pr.label}</span>
                    {selectedPrice.label === pr.label && <Check size={14} className="text-primary" />}
                  </button>
                ))}
              </FilterDropdown>

              {/* Sort filter */}
              <FilterDropdown
                open={openDropdown === "sort"}
                onToggle={() => toggleDropdown("sort")}
                onClose={closeDropdown}
                trigger={
                  <button className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all border bg-background text-foreground border-border hover:border-primary/40">
                    <ArrowUpDown size={13} />
                    {sort.label}
                    <ChevronDown size={11} />
                  </button>
                }
              >
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt); setOpenDropdown(null); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      sort.value === opt.value ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <opt.icon size={14} />
                      {opt.label}
                    </span>
                    {sort.value === opt.value && <Check size={14} className="text-primary" />}
                  </button>
                ))}
              </FilterDropdown>

              {/* All filters button (mobile) */}
              <button
                onClick={() => setFilterOpen(true)}
                className="shrink-0 lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all border border-border bg-background text-foreground hover:border-primary/40"
              >
                <SlidersHorizontal size={13} />
                Filterlər
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{activeFilterCount}</span>
                )}
              </button>

              {/* Reset */}
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <RotateCcw size={12} />
                  Sıfırla
                </button>
              )}
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {selectedCity !== "Hamısı" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-foreground text-xs font-medium">
                    <MapPin size={11} /> {selectedCity}
                    <button onClick={() => setSelectedCity("Hamısı")} className="ml-0.5 hover:text-destructive"><X size={12} /></button>
                  </span>
                )}
                {selectedPrice.label !== "Hamısı" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-foreground text-xs font-medium">
                    <Tag size={11} /> {selectedPrice.label}
                    <button onClick={() => setSelectedPrice(priceRanges[0])} className="ml-0.5 hover:text-destructive"><X size={12} /></button>
                  </span>
                )}
                {(priceMin || priceMax) && selectedPrice.label === "Hamısı" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-foreground text-xs font-medium">
                    <Tag size={11} /> {priceMin || "0"} — {priceMax || "∞"} ₼
                    <button onClick={() => { setPriceMin(""); setPriceMax(""); }} className="ml-0.5 hover:text-destructive"><X size={12} /></button>
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="container py-6 md:py-8">
          <div className="flex gap-8">
            {/* Desktop sidebar - rendered by CategoryFilterSidebar below */}
            <div className="hidden lg:block w-[280px] shrink-0">
              <CategoryFilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} activeFilters={activeFilterCount} onFilterChange={handleSidebarFilterChange} />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {filteredResults.length > 0 ? (
                <>
                  {/* Top results bar */}
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <div>
                      <h1 className="text-lg md:text-xl font-bold text-foreground">
                        "{query.split(" ")[0]}" üçün <span className="text-primary">{filteredResults.length}</span> nəticə
                      </h1>
                      <p className="text-xs text-muted-foreground mt-0.5">Səhifə {currentPage} / {TOTAL_PAGES}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* View toggle */}
                      <div className="flex border border-border rounded-lg overflow-hidden">
                        <button onClick={() => setView("grid")} className={`p-2 transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                          <LayoutGrid size={16} />
                        </button>
                        <button onClick={() => setView("list")} className={`p-2 transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                          <List size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Grid view */}
                  {view === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredResults.map((ad) => (
                        <div key={ad.id} className="rounded-xl border border-border bg-card overflow-hidden group relative hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                          {aiMode && ad.ai && (
                            <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white text-[10px] font-bold shadow-sm">
                              <Sparkles size={10} /> AI təklif
                            </span>
                          )}
                          <button
                            onClick={() => toggleFav(ad.id)}
                            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              favorites.includes(ad.id) ? "bg-destructive text-white" : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-destructive"
                            }`}
                          >
                            <Heart size={15} fill={favorites.includes(ad.id) ? "currentColor" : "none"} />
                          </button>
                          <Link to={`/elanlar/${ad.id}`}>
                            <div className="aspect-[4/3] overflow-hidden">
                              <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                            </div>
                          </Link>
                          <div className="p-3.5">
                            <Link to={`/elanlar/${ad.id}`}>
                              <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug hover:text-primary transition-colors">{ad.title}</p>
                            </Link>
                            <p className="text-base font-bold text-foreground mt-1.5">{ad.price} ₼</p>
                            <div className="flex items-center justify-between mt-2 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1"><MapPin size={11} /> {ad.location}</span>
                              <span className="flex items-center gap-1"><Eye size={11} /> {ad.views}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock size={11} /> {ad.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* List view */
                    <div className="space-y-3">
                      {filteredResults.map((ad) => (
                        <div key={ad.id} className="flex rounded-xl border border-border bg-card overflow-hidden group relative hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                          {aiMode && ad.ai && (
                            <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white text-[10px] font-bold shadow-sm">
                              <Sparkles size={10} /> AI təklif
                            </span>
                          )}
                          <Link to={`/elanlar/${ad.id}`} className="w-40 h-32 sm:w-48 sm:h-36 shrink-0 overflow-hidden">
                            <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                          </Link>
                          <div className="flex-1 p-3.5 min-w-0 flex flex-col justify-between">
                            <div>
                              <Link to={`/elanlar/${ad.id}`}>
                                <p className="text-sm font-medium text-card-foreground line-clamp-1 hover:text-primary transition-colors">{ad.title}</p>
                              </Link>
                              <p className="text-base font-bold text-foreground mt-0.5">{ad.price} ₼</p>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ad.desc}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1"><MapPin size={11} /> {ad.location}</span>
                                <span className="flex items-center gap-1"><Clock size={11} /> {ad.date}</span>
                                <span className="flex items-center gap-1"><Eye size={11} /> {ad.views}</span>
                              </div>
                              <button
                                onClick={() => toggleFav(ad.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                  favorites.includes(ad.id) ? "text-destructive" : "text-muted-foreground hover:text-destructive"
                                }`}
                              >
                                <Heart size={16} fill={favorites.includes(ad.id) ? "currentColor" : "none"} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  <nav className="flex items-center justify-center gap-1 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm rounded-lg border border-border hover:border-primary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                          className={`w-9 h-9 text-sm rounded-lg font-medium transition-all ${
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
                      className="px-3 py-2 text-sm rounded-lg border border-border hover:border-primary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Növbəti »
                    </button>
                  </nav>

                  {/* Son baxdıqlarınız */}
                  <div className="mt-10 pt-8 border-t border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <History size={18} className="text-muted-foreground" />
                      <h3 className="text-base font-bold text-foreground">Son baxdıqlarınız</h3>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {searchResults.slice(0, 5).map((ad) => (
                        <Link
                          key={`recent-${ad.id}`}
                          to={`/elanlar/${ad.id}`}
                          className="shrink-0 w-[160px] rounded-xl border border-border bg-card overflow-hidden hover:shadow-md hover:border-primary/20 transition-all group"
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                          </div>
                          <div className="p-2.5">
                            <p className="text-xs font-medium text-card-foreground line-clamp-1">{ad.title}</p>
                            <p className="text-sm font-bold text-foreground mt-0.5">{ad.price} ₼</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><MapPin size={9} />{ad.location}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <NoResults onAiSearch={() => setAiMode(true)} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile filter sheet handled by the sidebar component above */}
      </main>
      <SiteFooter />
    </div>
  );
};

export default SearchResultsPage;
