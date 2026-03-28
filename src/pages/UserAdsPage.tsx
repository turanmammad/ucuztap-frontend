import { useState, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PullToRefresh from "@/components/PullToRefresh";
import {
  ChevronRight, ChevronLeft, Star, Check, Clock, MapPin, Eye, Heart,
  Grid3X3, List, SlidersHorizontal, Phone, MessageCircle,
  Calendar, Package, ChevronDown, X
} from "lucide-react";

const sellerInfo = {
  name: "Əli Məmmədov",
  initials: "ƏM",
  rating: 4.8,
  reviewCount: 23,
  memberSince: "2020",
  phoneVerified: true,
  totalAds: 23,
  activeAds: 18,
  avatar: null as string | null,
};

const userAds = [
  { id: 1, title: "Mercedes-Benz C200, 2019", price: "25,000", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", location: "Bakı, Nəsimi", date: "Bugün", views: 1245, category: "Avtomobil", badge: "vip" as const },
  { id: 2, title: "BMW X5 xDrive40i, 2022", price: "65,000", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", location: "Bakı, Yasamal", date: "Dünən", views: 890, category: "Avtomobil", badge: "premium" as const },
  { id: 3, title: "iPhone 15 Pro Max 256GB", price: "2,100", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop", location: "Bakı, Xətai", date: "2 gün əvvəl", views: 567, category: "Elektronika", badge: null },
  { id: 4, title: "Toyota Camry 2.5 Hybrid, 2021", price: "28,500", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop", location: "Bakı, Nəsimi", date: "3 gün əvvəl", views: 432, category: "Avtomobil", badge: "boost" as const },
  { id: 5, title: "Samsung Galaxy S24 Ultra", price: "1,850", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop", location: "Bakı, Binəqədi", date: "4 gün əvvəl", views: 321, category: "Elektronika", badge: null },
  { id: 6, title: "Audi A4 2.0 TFSI, 2020", price: "29,000", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop", location: "Bakı, Nərimanov", date: "5 gün əvvəl", views: 276, category: "Avtomobil", badge: "vip" as const },
  { id: 7, title: "MacBook Pro 14\" M3 Pro", price: "3,200", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop", location: "Bakı, Nəsimi", date: "1 həftə əvvəl", views: 198, category: "Elektronika", badge: null },
  { id: 8, title: "Hyundai Tucson 2023", price: "38,000", img: "https://images.unsplash.com/photo-1633695632954-8a1f7e8a3108?w=400&h=300&fit=crop", location: "Sumqayıt", date: "1 həftə əvvəl", views: 165, category: "Avtomobil", badge: null },
  { id: 9, title: "PlayStation 5 + 2 oyun", price: "850", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop", location: "Bakı, Yasamal", date: "2 həftə əvvəl", views: 143, category: "Elektronika", badge: null },
  { id: 10, title: "Lexus RX 350, 2019", price: "48,000", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop", location: "Bakı, Xətai", date: "2 həftə əvvəl", views: 112, category: "Avtomobil", badge: "boost" as const },
];

const categories = ["Hamısı", "Avtomobil", "Elektronika"];
const sortOptions = ["Yenilər əvvəl", "Köhnələr əvvəl", "Ucuzdan bahaya", "Bahadan ucuza", "Baxış sayına görə"];

const badgeConfig = {
  vip: { label: "VIP", icon: Star, cls: "bg-[hsl(var(--vip-gold)/0.15)] text-[hsl(var(--vip-gold))]" },
  premium: { label: "Premium", icon: Star, cls: "bg-[hsl(var(--premium-blue)/0.15)] text-[hsl(var(--premium-blue))]" },
  boost: { label: "İrəli", icon: Star, cls: "bg-[hsl(var(--boost-orange)/0.15)] text-[hsl(var(--boost-orange))]" },
};

const UserAdsPage = () => {
  const { userId } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Yenilər əvvəl");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 6;

  const handleRefresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 800));
    window.location.reload();
  }, []);

  const toggleFav = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredAds = selectedCategory === "Hamısı" ? userAds : userAds.filter((a) => a.category === selectedCategory);
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const paginatedAds = useMemo(() => filteredAds.slice((currentPage - 1) * adsPerPage, currentPage * adsPerPage), [filteredAds, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
      <SiteHeader />
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="border-b border-border bg-muted/30">
            <div className="container py-3">
              <nav className="flex items-center gap-1 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                <ChevronRight size={14} className="text-muted-foreground/50" />
                <span className="text-foreground font-medium">{sellerInfo.name} — Elanları</span>
              </nav>
            </div>
          </div>

          <div className="container py-6 md:py-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Seller info card — sidebar on desktop, top on mobile */}
              <div className="lg:w-[320px] shrink-0">
                <div className="lg:sticky lg:top-4 space-y-4">
                  <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center shrink-0">
                        {sellerInfo.initials}
                      </div>
                      <div className="min-w-0">
                        <h1 className="text-lg font-extrabold text-foreground">{sellerInfo.name}</h1>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Star size={14} className="text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" />
                          <span className="text-sm font-bold text-foreground">{sellerInfo.rating}</span>
                          <span className="text-sm text-muted-foreground">({sellerInfo.reviewCount} rəy)</span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-muted text-muted-foreground">
                        <Clock size={11} /> {sellerInfo.memberSince}-ci ildən üzv
                      </span>
                      {sellerInfo.phoneVerified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-accent/10 text-accent">
                          <Check size={11} /> Təsdiqlənib
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-muted/50 p-3 text-center">
                        <p className="text-xl font-extrabold text-foreground">{sellerInfo.activeAds}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Aktiv elan</p>
                      </div>
                      <div className="rounded-xl bg-muted/50 p-3 text-center">
                        <p className="text-xl font-extrabold text-foreground">{sellerInfo.totalAds}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Ümumi elan</p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setPhoneRevealed(true)}
                        className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97] flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Phone size={17} />
                        {phoneRevealed ? "+994 50 123 45 67" : "Nömrəni göstər"}
                      </button>
                      <button className="w-full py-3 rounded-xl border-2 border-primary font-bold text-sm text-primary hover:bg-primary/5 transition-colors active:scale-[0.97] flex items-center justify-center gap-2">
                        <MessageCircle size={17} /> Mesaj yaz
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ads section */}
              <div className="flex-1 min-w-0">
                {/* Filters bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                        {cat !== "Hamısı" && (
                          <span className="ml-1.5 text-xs opacity-70">
                            ({userAds.filter((a) => a.category === cat).length})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Sort */}
                    <div className="relative">
                      <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:border-primary/30 transition-colors"
                      >
                        <SlidersHorizontal size={14} />
                        <span className="hidden sm:inline">{selectedSort}</span>
                        <ChevronDown size={14} />
                      </button>
                      {sortOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                          <div className="absolute right-0 top-full mt-1 w-52 bg-popover border border-border rounded-xl shadow-xl z-50 py-1.5 animate-fade-in">
                            {sortOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => { setSelectedSort(opt); setSortOpen(false); }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                  selectedSort === opt ? "text-primary font-semibold bg-primary/5" : "text-foreground hover:bg-muted"
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
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <Grid3X3 size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-semibold text-foreground">{filteredAds.length}</span> elan tapıldı
                </p>

                {/* Ads grid/list */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {paginatedAds.map((ad) => (
                      <Link
                        key={ad.id}
                        to={`/elanlar/${ad.id}`}
                        className="rounded-xl border border-border bg-card overflow-hidden card-lift group relative"
                      >
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                          {ad.badge && (() => {
                            const BadgeIcon = badgeConfig[ad.badge].icon;
                            return (
                              <span className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${badgeConfig[ad.badge].cls}`}>
                                <BadgeIcon size={9} fill="currentColor" /> {badgeConfig[ad.badge].label}
                              </span>
                            );
                          })()}
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(ad.id); }}
                            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              favorites.has(ad.id) ? "bg-destructive/90 text-white" : "bg-black/30 text-white/80 hover:bg-black/50"
                            }`}
                          >
                            <Heart size={14} fill={favorites.has(ad.id) ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                          <p className="text-base font-bold text-foreground mt-1">{ad.price} ₼</p>
                          <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
                            <span className="flex items-center gap-0.5 truncate"><MapPin size={11} /> {ad.location}</span>
                            <span className="shrink-0">{ad.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-0.5"><Eye size={10} /> {ad.views}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {paginatedAds.map((ad) => (
                      <Link
                        key={ad.id}
                        to={`/elanlar/${ad.id}`}
                        className="flex gap-4 rounded-xl border border-border bg-card p-3 hover:border-primary/30 hover:shadow-md transition-all group relative"
                      >
                        <div className="w-36 sm:w-44 h-28 rounded-lg overflow-hidden shrink-0 relative">
                          <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                          {ad.badge && (() => {
                            const BadgeIcon = badgeConfig[ad.badge].icon;
                            return (
                              <span className={`absolute top-1.5 left-1.5 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${badgeConfig[ad.badge].cls}`}>
                                <BadgeIcon size={9} fill="currentColor" /> {badgeConfig[ad.badge].label}
                              </span>
                            );
                          })()}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{ad.title}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-0.5"><MapPin size={11} /> {ad.location}</span>
                              <span className="flex items-center gap-0.5"><Calendar size={11} /> {ad.date}</span>
                              <span className="flex items-center gap-0.5"><Eye size={11} /> {ad.views}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-lg font-bold text-foreground">{ad.price} ₼</p>
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(ad.id); }}
                              className={`p-2 rounded-lg transition-colors ${
                                favorites.has(ad.id) ? "text-destructive" : "text-muted-foreground hover:text-destructive"
                              }`}
                            >
                              <Heart size={16} fill={favorites.has(ad.id) ? "currentColor" : "none"} />
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-8">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <ChevronLeft size={16} /> Əvvəlki
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Sonrakı <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </PullToRefresh>
    </div>
  );
};

export default UserAdsPage;
