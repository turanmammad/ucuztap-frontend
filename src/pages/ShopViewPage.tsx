import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Star, Phone, Globe, Clock, MessageCircle, ChevronRight, ShieldCheck, Store, Calendar, Navigation, ThumbsUp, ThumbsDown, ChevronDown, Pencil, X, Flag, ArrowUpDown, Crown, Sparkles, Share2, Link2, Copy, Check as CheckIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { AdBannerSidebar } from "@/components/AdBanners";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const shopData = {
  id: "autoplus",
  name: "AutoPlus MMC",
  category: "Nəqliyyat",
  premium: true,
  description: "Bakının ən etibarlı avtomobil satış mərkəzi. 2015-ci ildən fəaliyyət göstəririk. Yeni və ikinci əl avtomobillər, lizinq imkanları, texniki xidmət.",
  location: "Bakı, Nəsimi r.",
  address: "Təbriz küç. 42, Nəsimi rayonu, Bakı, AZ1007",
  rating: 4.8,
  reviewCount: 127,
  adsCount: 48,
  memberSince: "2015",
  phone: "+994 50 123 45 67",
  website: "https://autoplus.az",
  verified: true,
  logo: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop",
  cover: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop",
  workingHours: [
    { day: "Bazar ertəsi", hours: "09:00 – 19:00", open: true },
    { day: "Çərşənbə axşamı", hours: "09:00 – 19:00", open: true },
    { day: "Çərşənbə", hours: "09:00 – 19:00", open: true },
    { day: "Cümə axşamı", hours: "09:00 – 19:00", open: true },
    { day: "Cümə", hours: "09:00 – 18:00", open: true },
    { day: "Şənbə", hours: "10:00 – 16:00", open: true },
    { day: "Bazar", hours: "Bağlı", open: false },
  ],
  reviews: [
    { id: 1, name: "Leyla Əliyeva", rating: 5, comment: "Çox yaxşı satıcıdır. Maşın tam təsvir olunduğu kimi idi. Təşəkkür edirəm!", date: "12.01.2025", avatar: "LƏ", helpful: 12, notHelpful: 1 },
    { id: 2, name: "Rəşad Hüseynov", rating: 5, comment: "Sürətli cavab verdi, əla kommunikasiya. Tövsiyə edirəm.", date: "08.01.2025", avatar: "RH", helpful: 8, notHelpful: 0 },
    { id: 3, name: "Nigar Quliyeva", rating: 4, comment: "Yaxşı idi, amma görüşə bir az gec gəldi. Məhsul keyfiyyətli idi.", date: "03.01.2025", avatar: "NQ", helpful: 5, notHelpful: 2, reply: { text: "Hörmətli Nigar xanım, gecikməyə görə üzr istəyirik. Bundan sonra daha diqqətli olacağıq.", date: "04.01.2025" } },
    { id: 4, name: "Kamran İsmayılov", rating: 5, comment: "Etibarlı satıcı. Təkrar alış-veriş edərdim.", date: "28.12.2024", avatar: "Kİ", helpful: 15, notHelpful: 0 },
    { id: 5, name: "Aynur Həsənova", rating: 4, comment: "Qiymət razılaşması yaxşı keçdi. Məhsul gözlədiyim kimi idi.", date: "20.12.2024", avatar: "AH", helpful: 3, notHelpful: 1 },
    { id: 6, name: "Tural Məmmədov", rating: 3, comment: "Orta səviyyədə xidmət. Məhsulun vəziyyəti elana tam uyğun deyildi.", date: "15.12.2024", avatar: "TM", helpful: 7, notHelpful: 3 },
    { id: 7, name: "Günay Həsənli", rating: 5, comment: "Mükəmməl təcrübə! Hər şey çox peşəkar idi. Mütləq tövsiyə edirəm.", date: "10.12.2024", avatar: "GH", helpful: 20, notHelpful: 0 },
  ],
  ads: [
    { id: 1, title: "Mercedes-Benz C200, 2019", price: "25,000", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", date: "Bugün" },
    { id: 2, title: "BMW X5 3.0d M Sport", price: "42,000", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", date: "Dünən" },
    { id: 3, title: "Toyota Camry 2.5 Hybrid", price: "35,000", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop", date: "2 gün əvvəl" },
    { id: 4, title: "Hyundai Tucson 2.0 GDI", price: "22,000", img: "https://images.unsplash.com/photo-1633695427587-dfa6a56f6572?w=400&h=300&fit=crop", date: "3 gün əvvəl" },
    { id: 5, title: "Kia Sportage 1.6 T-GDI", price: "31,500", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop", date: "3 gün əvvəl" },
    { id: 6, title: "Lexus RX 350 F-Sport", price: "55,000", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop", date: "4 gün əvvəl" },
  ],
};

const avgRating = (shopData.reviews.reduce((sum, r) => sum + r.rating, 0) / shopData.reviews.length).toFixed(1);
const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
  star,
  count: shopData.reviews.filter(r => r.rating === star).length,
  percent: Math.round((shopData.reviews.filter(r => r.rating === star).length / shopData.reviews.length) * 100),
}));

const isOpenNow = () => {
  const now = new Date();
  const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
  return shopData.workingHours[dayIndex]?.open ?? false;
};

const REVIEW_SORT_OPTIONS = [
  { value: "newest", label: "Ən yeni" },
  { value: "oldest", label: "Ən köhnə" },
  { value: "highest", label: "Ən yüksək reytinq" },
  { value: "lowest", label: "Ən aşağı reytinq" },
  { value: "helpful", label: "Ən faydalı" },
];

const ShopViewPage = () => {
  const { slug } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSort, setReviewSort] = useState("newest");
  const [reviewFilterStar, setReviewFilterStar] = useState<number | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSortOpen, setReviewSortOpen] = useState(false);

  return (
     <div className={`min-h-screen flex flex-col pb-mobile-bar md:pb-0 ${shopData.premium ? 'bg-[hsl(var(--vip-gold))]/[0.02]' : 'bg-background'}`}>
      <SiteHeader />
      <main className="flex-1">
        {/* Cover + Hero Header */}
        <div className={`relative h-52 md:h-72 overflow-hidden bg-muted ${shopData.premium ? 'ring-b-4 ring-[hsl(var(--vip-gold))]' : ''}`}>
          <img src={shopData.cover} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${shopData.premium ? 'bg-gradient-to-t from-[hsl(30,50%,8%)]/90 via-[hsl(30,30%,10%)]/50 to-black/10' : 'bg-gradient-to-t from-black/80 via-black/40 to-black/10'}`} />

          {/* Premium shimmer overlay */}
          {shopData.premium && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--vip-gold))]/[0.06] to-transparent pointer-events-none" />
          )}

          {/* Shop info overlay on cover */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="container pb-5 md:pb-7">
              <div className="flex items-end gap-4">
                <div className="relative shrink-0">
                  <img
                    src={shopData.logo}
                    alt={shopData.name}
                    className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl object-cover shadow-2xl ${
                      shopData.premium
                        ? 'border-[3px] border-[hsl(var(--vip-gold))]/60 ring-2 ring-[hsl(var(--vip-gold))]/30'
                        : 'border-[3px] border-white/20 ring-2 ring-white/10'
                    }`}
                  />
                  {shopData.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full bg-accent flex items-center justify-center shadow-lg ring-2 ring-black/20">
                      <ShieldCheck size={14} className="text-accent-foreground" />
                    </div>
                  )}
                  {shopData.premium && (
                    <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--vip-gold))] to-[hsl(35,80%,45%)] flex items-center justify-center shadow-lg ring-2 ring-black/20">
                      <Crown size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="pb-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-3xl font-extrabold text-white drop-shadow-lg truncate">
                      {shopData.name}
                    </h1>
                    {shopData.premium && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,80%,50%)] text-[10px] font-bold text-white uppercase tracking-wide shadow-lg shrink-0">
                        <Crown size={10} /> Premium
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-sm text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">
                      <Store size={12} /> {shopData.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">
                      <Star size={12} fill="currentColor" className="text-[hsl(var(--vip-gold))]" /> {shopData.rating}
                      <span className="text-white/60">({shopData.reviewCount})</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-white/80">
                      <MapPin size={12} /> {shopData.location}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm ${isOpenNow() ? 'bg-green-500/25 text-green-300' : 'bg-red-500/25 text-red-300'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOpenNow() ? 'bg-green-400' : 'bg-red-400'}`} />
                      {isOpenNow() ? "Açıqdır" : "Bağlıdır"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium accent bar */}
        {shopData.premium && (
          <div className="h-1 bg-gradient-to-r from-[hsl(var(--vip-gold))]/60 via-[hsl(var(--vip-gold))] to-[hsl(var(--vip-gold))]/60" />
        )}

        <div className="container mt-5 relative z-10">

          <div className="grid lg:grid-cols-[1fr_280px] gap-6 pb-10">
            {/* Main content */}
            <div className="space-y-6">
              <Tabs defaultValue="ads" className="w-full">
                <TabsList className="w-full justify-start bg-muted/50 rounded-lg h-auto p-1 flex-wrap">
                  <TabsTrigger value="ads" className="text-xs sm:text-sm">Elanlar ({shopData.ads.length})</TabsTrigger>
                  <TabsTrigger value="reviews" className="text-xs sm:text-sm">Rəylər ({shopData.reviews.length})</TabsTrigger>
                  <TabsTrigger value="about" className="text-xs sm:text-sm">Haqqında</TabsTrigger>
                </TabsList>

                {/* Ads Tab */}
                <TabsContent value="ads">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {shopData.ads.map((ad) => (
                      <Link key={ad.id} to={`/elanlar/${ad.id}`} className={`rounded-lg border overflow-hidden card-lift group ${
                        shopData.premium
                          ? 'border-[hsl(var(--vip-gold))]/30 bg-card shadow-sm hover:shadow-[0_4px_20px_hsl(var(--vip-gold)/0.1)]'
                          : 'border-border bg-card'
                      }`}>
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                          {shopData.premium && (
                            <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,80%,50%)] text-[9px] font-bold text-white uppercase shadow">
                              <Crown size={8} /> Premium
                            </span>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                          <p className="text-base font-bold text-foreground mt-1">{ad.price} ₼</p>
                          <span className="text-xs text-muted-foreground">{ad.date}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <div className="mt-4 space-y-5">
                    {/* Rating Summary + Write Review */}
                    <div className="rounded-xl border border-border bg-card p-5">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex flex-col items-center justify-center gap-1 min-w-[120px]">
                          <span className="text-5xl font-extrabold text-foreground">{avgRating}</span>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={16} className={s <= Math.round(Number(avgRating)) ? "text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" : "text-border"} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">{shopData.reviews.length} rəy əsasında</span>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          {ratingDistribution.map((rd) => (
                            <button
                              key={rd.star}
                              onClick={() => setReviewFilterStar(reviewFilterStar === rd.star ? null : rd.star)}
                              className={`w-full flex items-center gap-2 text-xs px-2 py-1 rounded-md transition-colors ${
                                reviewFilterStar === rd.star ? "bg-primary/10" : "hover:bg-muted"
                              }`}
                            >
                              <span className="w-3 text-muted-foreground font-medium">{rd.star}</span>
                              <Star size={10} className="text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" />
                              <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full bg-[hsl(var(--vip-gold))] transition-all" style={{ width: `${rd.percent}%` }} />
                              </div>
                              <span className="w-8 text-right text-muted-foreground tabular-nums">{rd.count}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Write review button */}
                      <div className="mt-5 pt-4 border-t border-border">
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97]"
                        >
                          <Pencil size={15} /> Rəy yaz
                        </button>
                      </div>
                    </div>

                    {/* Write Review Form */}
                    {showReviewForm && (
                      <div className="rounded-xl border-2 border-primary/20 bg-card p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-bold text-foreground">Rəyinizi yazın</h3>
                          <button onClick={() => setShowReviewForm(false)} className="p-1 hover:bg-muted rounded-md transition-colors">
                            <X size={16} className="text-muted-foreground" />
                          </button>
                        </div>

                        {/* Star rating input */}
                        <div className="mb-4">
                          <label className="text-xs font-medium text-muted-foreground mb-2 block">Qiymətləndirmə</label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setNewRating(s)}
                                className="p-0.5 transition-transform hover:scale-110"
                              >
                                <Star
                                  size={28}
                                  className={`transition-colors ${
                                    s <= (hoverRating || newRating)
                                      ? "text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]"
                                      : "text-border hover:text-[hsl(var(--vip-gold))]/40"
                                  }`}
                                />
                              </button>
                            ))}
                            {newRating > 0 && (
                              <span className="ml-2 text-sm font-medium text-foreground">
                                {newRating === 1 ? "Pis" : newRating === 2 ? "Zəif" : newRating === 3 ? "Orta" : newRating === 4 ? "Yaxşı" : "Əla"}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Review text */}
                        <div className="mb-4">
                          <label className="text-xs font-medium text-muted-foreground mb-2 block">Rəyiniz</label>
                          <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Təcrübənizi paylaşın... Məhsulun keyfiyyəti, xidmətin səviyyəsi, çatdırılma və s."
                            rows={4}
                            className="w-full px-4 py-3 text-sm border border-border rounded-xl bg-background outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none placeholder:text-muted-foreground/60"
                          />
                          <div className="flex items-center justify-between mt-1.5">
                            <span className="text-[11px] text-muted-foreground">Minimum 10 simvol</span>
                            <span className={`text-[11px] ${reviewText.length >= 10 ? "text-accent" : "text-muted-foreground"}`}>
                              {reviewText.length}/500
                            </span>
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="flex items-center gap-3">
                          <button
                            disabled={newRating === 0 || reviewText.length < 10}
                            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Göndər
                          </button>
                          <button
                            onClick={() => { setShowReviewForm(false); setNewRating(0); setReviewText(""); }}
                            className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Ləğv et
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Sort & Filter bar */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Star filter chips */}
                        {reviewFilterStar && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-foreground text-xs font-medium">
                            {reviewFilterStar} <Star size={10} className="fill-[hsl(var(--vip-gold))] text-[hsl(var(--vip-gold))]" />
                            <button onClick={() => setReviewFilterStar(null)} className="ml-0.5 hover:text-destructive">
                              <X size={12} />
                            </button>
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {reviewFilterStar
                            ? `${shopData.reviews.filter(r => r.rating === reviewFilterStar).length} rəy`
                            : `${shopData.reviews.length} rəy`
                          }
                        </span>
                      </div>

                      {/* Sort dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setReviewSortOpen(!reviewSortOpen)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                        >
                          <ArrowUpDown size={12} />
                          {REVIEW_SORT_OPTIONS.find(o => o.value === reviewSort)?.label}
                          <ChevronDown size={12} />
                        </button>
                        {reviewSortOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setReviewSortOpen(false)} />
                            <div className="absolute right-0 top-full mt-1 w-44 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-fade-in">
                              {REVIEW_SORT_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => { setReviewSort(opt.value); setReviewSortOpen(false); }}
                                  className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                                    reviewSort === opt.value ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Review Cards */}
                    <div className="space-y-3">
                      {shopData.reviews
                        .filter(r => reviewFilterStar ? r.rating === reviewFilterStar : true)
                        .sort((a, b) => {
                          if (reviewSort === "highest") return b.rating - a.rating;
                          if (reviewSort === "lowest") return a.rating - b.rating;
                          if (reviewSort === "helpful") return b.helpful - a.helpful;
                          if (reviewSort === "oldest") return a.id - b.id;
                          return b.id - a.id; // newest
                        })
                        .map((r) => (
                        <div key={r.id} className="rounded-xl border border-border bg-card p-4 hover:border-border/80 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary">
                                {r.avatar}
                              </div>
                              <div>
                                <span className="text-sm font-semibold text-foreground block leading-tight">{r.name}</span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                      <Star key={s} size={11} className={s <= r.rating ? "text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" : "text-border"} />
                                    ))}
                                  </div>
                                  <span className="text-[11px] text-muted-foreground">{r.date}</span>
                                </div>
                              </div>
                            </div>
                            <button className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground" title="Şikayət et">
                              <Flag size={13} />
                            </button>
                          </div>

                          <p className="text-sm text-foreground/80 leading-relaxed mt-2">{r.comment}</p>

                          {/* Shop reply */}
                          {r.reply && (
                            <div className="mt-3 ml-4 pl-4 border-l-2 border-primary/20 bg-muted/30 rounded-r-lg p-3">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Store size={12} className="text-primary" />
                                <span className="text-xs font-semibold text-primary">Mağaza cavabı</span>
                                <span className="text-[10px] text-muted-foreground">· {r.reply.date}</span>
                              </div>
                              <p className="text-xs text-foreground/70 leading-relaxed">{r.reply.text}</p>
                            </div>
                          )}

                          {/* Helpful buttons */}
                          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
                            <span className="text-[11px] text-muted-foreground mr-1">Faydalıdır?</span>
                            <button className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-accent transition-colors">
                              <ThumbsUp size={12} /> {r.helpful}
                            </button>
                            <button className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive transition-colors">
                              <ThumbsDown size={12} /> {r.notHelpful}
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Empty state for filtered */}
                      {reviewFilterStar && shopData.reviews.filter(r => r.rating === reviewFilterStar).length === 0 && (
                        <div className="text-center py-8">
                          <Star size={32} className="mx-auto text-muted-foreground/20 mb-2" />
                          <p className="text-sm text-muted-foreground">Bu reytinqdə rəy tapılmadı</p>
                          <button onClick={() => setReviewFilterStar(null)} className="text-xs text-primary hover:underline mt-1">
                            Bütün rəylərə bax
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Load more */}
                    <div className="text-center">
                      <button className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                        Daha çox rəy göstər
                      </button>
                    </div>
                  </div>
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about">
                  <div className="mt-4 space-y-5">
                    {/* Description */}
                    <div className="rounded-xl border border-border bg-card p-5">
                      <h2 className="text-sm font-semibold text-foreground mb-2">Haqqında</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{shopData.description}</p>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Calendar size={12} /> {shopData.memberSince}-dən üzv</span>
                        <span>{shopData.adsCount} aktiv elan</span>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="rounded-xl border border-border bg-card p-5">
                      <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Clock size={14} className="text-muted-foreground" /> İş saatları
                      </h2>
                      <div className="space-y-2">
                        {shopData.workingHours.map((wh, i) => {
                          const now = new Date();
                          const todayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
                          const isToday = i === todayIndex;
                          return (
                            <div key={wh.day} className={`flex items-center justify-between text-sm py-1.5 px-2.5 rounded-lg ${isToday ? 'bg-primary/5 font-medium' : ''}`}>
                              <span className={`${isToday ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {wh.day}
                                {isToday && <span className="ml-1.5 text-[10px] font-semibold text-primary">Bu gün</span>}
                              </span>
                              <span className={`${wh.open ? (isToday ? 'text-foreground' : 'text-muted-foreground') : 'text-destructive'}`}>
                                {wh.hours}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Map */}
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                      <div className="p-4 pb-2">
                        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Navigation size={14} className="text-muted-foreground" /> Ünvan
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">{shopData.address}</p>
                      </div>
                      <div className="aspect-[16/7] bg-muted">
                        <iframe
                          title="Mağaza xəritəsi"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4!2d49.867!3d40.4093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzMzLjUiTiA0OcKwNTInMDEuMiJF!5e0!3m2!1sen!2saz!4v1700000000000"
                          className="w-full h-full border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Contact card */}
              <div className={`rounded-xl border p-4 space-y-3 ${
                shopData.premium
                  ? 'border-[hsl(var(--vip-gold))]/40 bg-gradient-to-b from-[hsl(var(--vip-gold))]/[0.04] to-card shadow-[0_2px_12px_hsl(var(--vip-gold)/0.08)]'
                  : 'border-border bg-card'
              }`}>
                {shopData.premium && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))]/15 to-[hsl(var(--vip-gold))]/5 mb-1">
                    <Crown size={13} className="text-[hsl(var(--vip-gold))]" />
                    <span className="text-[10px] font-bold text-[hsl(var(--vip-gold))] uppercase tracking-wide">Premium Mağaza</span>
                  </div>
                )}
                <h3 className="text-sm font-semibold text-foreground">Əlaqə</h3>
                <a href={`tel:${shopData.phone}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                  <Phone size={14} className="text-muted-foreground" /> {shopData.phone}
                </a>
                {shopData.website && (
                  <a href={shopData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Globe size={14} /> Veb sayt
                  </a>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} /> <span className="text-xs leading-tight">{shopData.address}</span>
                </div>
                <button className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors active:scale-[0.98] flex items-center justify-center gap-2 ${
                  shopData.premium
                    ? 'bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,80%,50%)] text-white hover:opacity-90 shadow-sm'
                    : 'bg-accent text-accent-foreground hover:bg-accent-hover'
                }`}>
                  <MessageCircle size={15} /> Mesaj yaz
                </button>
              </div>

              {/* Quick hours */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Clock size={13} className="text-muted-foreground" /> İş saatları
                </h3>
                {(() => {
                  const now = new Date();
                  const todayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
                  const today = shopData.workingHours[todayIndex];
                  return (
                    <div className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Bu gün</span>
                        <span className={today?.open ? "text-foreground font-medium" : "text-destructive font-medium"}>{today?.hours}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <AdBannerSidebar />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ShopViewPage;
