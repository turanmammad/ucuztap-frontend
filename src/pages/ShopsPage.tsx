import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Store, MapPin, Star, Search, ChevronRight, Shield, Clock, Filter, X, BadgeCheck, LayoutGrid, List, Crown, Users, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const allShops = [
  { id: 1, name: "AutoPlus MMC", slug: "autoplus-mmc", category: "Nəqliyyat", location: "Bakı", rating: 4.8, reviews: 312, adsCount: 127, verified: true, premium: true, since: "2019", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=300&fit=crop", description: "Rəsmi avtomobil satış və servis mərkəzi" },
  { id: 2, name: "TechZone", slug: "techzone", category: "Elektronika", location: "Bakı", rating: 4.6, reviews: 189, adsCount: 89, verified: true, premium: true, since: "2020", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=300&fit=crop", description: "Elektronika və gadget mağazası" },
  { id: 3, name: "Əmlak Premium", slug: "emlak-premium", category: "Daşınmaz Əmlak", location: "Bakı", rating: 4.9, reviews: 456, adsCount: 243, verified: true, premium: true, since: "2018", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=300&fit=crop", description: "Premium əmlak agentliyi" },
  { id: 4, name: "MebelCity", slug: "mebelcity", category: "Ev və Bağ", location: "Sumqayıt", rating: 4.5, reviews: 98, adsCount: 64, verified: true, premium: false, since: "2021", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=300&fit=crop", description: "Keyfiyyətli mebel və ev dekorasiyası" },
  { id: 5, name: "KidLand", slug: "kidland", category: "Uşaq Aləmi", location: "Bakı", rating: 4.7, reviews: 134, adsCount: 52, verified: true, premium: false, since: "2022", img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=300&fit=crop", description: "Uşaq geyimləri və oyuncaqlar" },
  { id: 6, name: "SportMax", slug: "sportmax", category: "Hobbi və Asudə", location: "Gəncə", rating: 4.4, reviews: 67, adsCount: 38, verified: false, premium: false, since: "2023", img: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=300&fit=crop", description: "İdman avadanlıqları və geyimləri" },
  { id: 7, name: "ModaEvi", slug: "modaevi", category: "Geyim və Aksesuar", location: "Bakı", rating: 4.3, reviews: 201, adsCount: 175, verified: true, premium: false, since: "2020", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=300&fit=crop", description: "Kişi və qadın geyimləri" },
  { id: 8, name: "PetWorld", slug: "petworld", category: "Heyvanlar", location: "Bakı", rating: 4.6, reviews: 88, adsCount: 41, verified: true, premium: false, since: "2021", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=300&fit=crop", description: "Ev heyvanları və aksesuarlar" },
  { id: 9, name: "BuildPro", slug: "buildpro", category: "Tikinti və Təmir", location: "Sumqayıt", rating: 4.2, reviews: 54, adsCount: 93, verified: false, premium: false, since: "2022", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop", cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=300&fit=crop", description: "Tikinti materialları və alətlər" },
];

const CATEGORIES = ["Hamısı", "Nəqliyyat", "Daşınmaz Əmlak", "Elektronika", "Ev və Bağ", "Geyim və Aksesuar", "Uşaq Aləmi", "Heyvanlar", "Hobbi və Asudə", "Tikinti və Təmir"];
const LOCATIONS = ["Hamısı", "Bakı", "Sumqayıt", "Gəncə", "Mingəçevir", "Lənkəran", "Şəki"];
const SORT_OPTIONS = [
  { value: "popular", label: "Ən populyar" },
  { value: "rating", label: "Ən yüksək reytinq" },
  { value: "newest", label: "Ən yeni" },
  { value: "ads", label: "Ən çox elan" },
];

const ShopsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");
  const [selectedLocation, setSelectedLocation] = useState("Hamısı");
  const [sortBy, setSortBy] = useState("popular");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = [...allShops];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    if (selectedCategory !== "Hamısı") result = result.filter(s => s.category === selectedCategory);
    if (selectedLocation !== "Hamısı") result = result.filter(s => s.location === selectedLocation);
    if (onlyVerified) result = result.filter(s => s.verified);

    switch (sortBy) {
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => Number(b.since) - Number(a.since)); break;
      case "ads": result.sort((a, b) => b.adsCount - a.adsCount); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    result.sort((a, b) => (b.premium ? 1 : 0) - (a.premium ? 1 : 0));
    return result;
  }, [searchQuery, selectedCategory, selectedLocation, sortBy, onlyVerified]);

  const totalAds = allShops.reduce((s, sh) => s + sh.adsCount, 0);
  const activeFilterCount = [selectedCategory !== "Hamısı", selectedLocation !== "Hamısı", onlyVerified].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory("Hamısı");
    setSelectedLocation("Hamısı");
    setOnlyVerified(false);
    setSortBy("popular");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0 bg-background">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero — Clean & Bold */}
        <section className="bg-gradient-to-b from-muted/60 to-background border-b border-border">
          <div className="container py-8 md:py-14">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
                Mağazaları kəşf edin
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mb-6">
                Yoxlanılmış satıcılardan təhlükəsiz alış-veriş. <span className="font-semibold text-foreground">{allShops.length}</span> mağaza, <span className="font-semibold text-foreground">{totalAds.toLocaleString()}</span> aktiv elan.
              </p>

              {/* Search */}
              <div className="flex items-center bg-card rounded-xl border border-border shadow-sm p-1.5 max-w-lg">
                <Search size={18} className="ml-3 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Mağaza axtar..."
                  className="flex-1 px-3 py-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="p-2 text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 mt-6">
              {[
                { icon: Store, label: "Mağaza", value: allShops.length },
                { icon: Shield, label: "Yoxlanılmış", value: allShops.filter(s => s.verified).length },
                { icon: Users, label: "Orta reytinq", value: (allShops.reduce((s, sh) => s + sh.rating, 0) / allShops.length).toFixed(1) },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <stat.icon size={14} className="text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container py-6">
          {/* Desktop filters */}
          <div className="hidden md:flex items-center gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap flex-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc === "Hamısı" ? "Bütün şəhərlər" : loc}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                onlyVerified
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <BadgeCheck size={13} />
              Yoxlanılmış
            </button>

            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="text-xs text-destructive hover:underline">
                Sıfırla
              </button>
            )}
          </div>

          {/* Mobile filter button */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">{filtered.length} mağaza</p>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground active:scale-[0.97]"
            >
              <Filter size={14} />
              Filtr
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Results bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> nəticə
            </p>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
              {([
                { key: "grid" as const, icon: LayoutGrid },
                { key: "list" as const, icon: List },
              ]).map((v) => (
                <button
                  key={v.key}
                  onClick={() => setViewMode(v.key)}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === v.key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <v.icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Shop Grid */}
          {filtered.length > 0 ? (
            <div className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "flex flex-col gap-3"
            }>
              {filtered.map(shop => (
                <Link key={shop.id} to={`/magazalar/${shop.slug}`} className="group">
                  {viewMode === "grid" && (
                    <div className={`bg-card rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                      shop.premium ? "border-[hsl(var(--vip-gold))]/40 ring-1 ring-[hsl(var(--vip-gold))]/10" : "border-border"
                    }`}>
                      {/* Cover */}
                      <div className="relative h-28 overflow-hidden">
                        <img src={shop.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {shop.premium && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Crown size={9} /> Premium
                          </span>
                        )}
                        {/* Logo */}
                        <div className="absolute -bottom-5 left-4">
                          <img src={shop.img} alt={shop.name} className={`w-12 h-12 rounded-xl object-cover shadow-md ${
                            shop.premium ? "border-2 border-[hsl(var(--vip-gold))]/50" : "border-2 border-card"
                          }`} loading="lazy" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="pt-7 px-4 pb-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h2 className="text-sm font-bold text-foreground truncate">{shop.name}</h2>
                          {shop.verified && <BadgeCheck size={13} className="text-accent shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mb-3">{shop.description}</p>
                        
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Star size={11} fill="currentColor" className="text-[hsl(var(--vip-gold))]" />
                            <span className="font-semibold text-foreground">{shop.rating}</span>
                            <span>({shop.reviews})</span>
                          </span>
                          <span className="inline-flex items-center gap-1"><MapPin size={10} /> {shop.location}</span>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <span className="text-xs text-muted-foreground">{shop.adsCount} elan</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{shop.category}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {viewMode === "list" && (
                    <div className={`bg-card rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md flex items-center gap-4 p-4 ${
                      shop.premium ? "border-[hsl(var(--vip-gold))]/40" : "border-border"
                    }`}>
                      <img src={shop.img} alt={shop.name} className={`w-14 h-14 rounded-xl object-cover shrink-0 ${
                        shop.premium ? "ring-2 ring-[hsl(var(--vip-gold))]/30" : ""
                      }`} loading="lazy" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h2 className="text-sm font-bold text-foreground truncate">{shop.name}</h2>
                          {shop.verified && <BadgeCheck size={13} className="text-accent shrink-0" />}
                          {shop.premium && (
                            <span className="px-1.5 py-0.5 rounded bg-[hsl(var(--vip-gold))]/10 text-[hsl(var(--vip-gold))] text-[9px] font-bold uppercase">Premium</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{shop.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Star size={10} fill="currentColor" className="text-[hsl(var(--vip-gold))]" /> {shop.rating}
                          </span>
                          <span className="inline-flex items-center gap-1"><MapPin size={10} /> {shop.location}</span>
                          <span>{shop.adsCount} elan</span>
                          <span className="inline-flex items-center gap-1"><Clock size={10} /> {shop.since}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Store size={40} className="mx-auto text-muted-foreground/30 mb-3" />
              <h3 className="text-base font-bold text-foreground mb-1">Mağaza tapılmadı</h3>
              <p className="text-sm text-muted-foreground mb-4">Axtarış kriteriyalarınızı dəyişdirin</p>
              <button onClick={resetFilters} className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
                Filtrləri sıfırla
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
              <Store size={28} className="text-accent" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-lg font-bold text-foreground mb-1">Öz mağazanızı açın</h2>
              <p className="text-sm text-muted-foreground">
                Brendinizi yaradın, elanlarınızı idarə edin və daha çox müştəriyə çatın.
              </p>
            </div>
            <Link
              to="/magazalar/yarat"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97] shrink-0"
            >
              Mağaza yarat <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </main>

      {/* Mobile Filter Sheet */}
      {mobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl max-h-[80vh] overflow-y-auto p-5 pb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground">Filtrlər</h2>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 hover:bg-muted rounded-md">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2.5">Kateqoriya</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2.5">Şəhər</h3>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedLocation === loc
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {loc === "Hamısı" ? "Bütün şəhərlər" : loc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2.5">Sıralama</h3>
                <div className="space-y-1">
                  {SORT_OPTIONS.map(o => (
                    <button
                      key={o.value}
                      onClick={() => setSortBy(o.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        sortBy === o.value
                          ? "bg-foreground/5 text-foreground font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={onlyVerified} onChange={() => setOnlyVerified(!onlyVerified)} className="w-4 h-4 rounded accent-accent" />
                <span className="text-sm text-foreground">Yalnız yoxlanılmış</span>
              </label>

              <div className="space-y-2 pt-2 border-t border-border">
                <button onClick={() => setMobileFilterOpen(false)} className="w-full py-2.5 rounded-lg bg-foreground text-background font-semibold text-sm active:scale-[0.97]">
                  {filtered.length} nəticəni göstər
                </button>
                <button onClick={() => { resetFilters(); setMobileFilterOpen(false); }} className="w-full py-2 text-sm text-muted-foreground hover:text-foreground">
                  Sıfırla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
};

export default ShopsPage;
