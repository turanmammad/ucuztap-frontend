import { Link, useParams } from "react-router-dom";
import { MapPin, Star, Phone, Globe, Clock, MessageCircle, ChevronRight, ShieldCheck, Store, Calendar, Navigation } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { AdBannerSidebar } from "@/components/AdBanners";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const shopData = {
  id: "autoplus",
  name: "AutoPlus MMC",
  category: "Nəqliyyat",
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
    { id: 1, name: "Leyla Əliyeva", rating: 5, comment: "Çox yaxşı satıcıdır. Maşın tam təsvir olunduğu kimi idi. Təşəkkür edirəm!", date: "12.01.2025", avatar: "LƏ" },
    { id: 2, name: "Rəşad Hüseynov", rating: 5, comment: "Sürətli cavab verdi, əla kommunikasiya. Tövsiyə edirəm.", date: "08.01.2025", avatar: "RH" },
    { id: 3, name: "Nigar Quliyeva", rating: 4, comment: "Yaxşı idi, amma görüşə bir az gec gəldi. Məhsul keyfiyyətli idi.", date: "03.01.2025", avatar: "NQ" },
    { id: 4, name: "Kamran İsmayılov", rating: 5, comment: "Etibarlı satıcı. Təkrar alış-veriş edərdim.", date: "28.12.2024", avatar: "Kİ" },
    { id: 5, name: "Aynur Həsənova", rating: 4, comment: "Qiymət razılaşması yaxşı keçdi. Məhsul gözlədiyim kimi idi.", date: "20.12.2024", avatar: "AH" },
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

const ShopViewPage = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0 bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Cover */}
        <div className="relative h-40 md:h-56 overflow-hidden bg-muted">
          <img src={shopData.cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="container -mt-12 md:-mt-16 relative z-10">
          {/* Shop header */}
          <div className="flex items-end gap-4 mb-6">
            <img
              src={shopData.logo}
              alt={shopData.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-4 border-background object-cover shadow-lg"
            />
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold text-foreground">{shopData.name}</h1>
                {shopData.verified && (
                  <ShieldCheck size={18} className="text-accent" />
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-sm text-muted-foreground">{shopData.category}</span>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  <Star size={13} fill="currentColor" /> {shopData.rating}
                  <span className="text-muted-foreground font-normal">({shopData.reviewCount})</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={13} /> {shopData.location}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isOpenNow() ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow() ? 'bg-green-500' : 'bg-destructive'}`} />
                  {isOpenNow() ? "Açıqdır" : "Bağlıdır"}
                </span>
              </div>
            </div>
          </div>

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
                      <Link key={ad.id} to={`/elanlar/${ad.id}`} className="rounded-lg border border-border bg-card overflow-hidden card-lift group">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
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
                    {/* Rating Summary */}
                    <div className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row gap-6">
                      <div className="flex flex-col items-center justify-center gap-1 min-w-[100px]">
                        <span className="text-4xl font-extrabold text-foreground">{avgRating}</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className={s <= Math.round(Number(avgRating)) ? "text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" : "text-border"} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">{shopData.reviews.length} rəy</span>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {ratingDistribution.map((rd) => (
                          <div key={rd.star} className="flex items-center gap-2 text-xs">
                            <span className="w-3 text-muted-foreground">{rd.star}</span>
                            <Star size={10} className="text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" />
                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-[hsl(var(--vip-gold))] transition-all" style={{ width: `${rd.percent}%` }} />
                            </div>
                            <span className="w-8 text-right text-muted-foreground">{rd.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Review Cards */}
                    <div className="space-y-3">
                      {shopData.reviews.map((r) => (
                        <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                {r.avatar}
                              </div>
                              <span className="text-sm font-semibold text-foreground">{r.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{r.date}</span>
                          </div>
                          <div className="flex items-center gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={12} className={s <= r.rating ? "text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" : "text-border"} />
                            ))}
                          </div>
                          <p className="text-sm text-foreground/80 leading-relaxed">{r.comment}</p>
                        </div>
                      ))}
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
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
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
                <button className="w-full py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-hover transition-colors active:scale-[0.98] flex items-center justify-center gap-2">
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
