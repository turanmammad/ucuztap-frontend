import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, MapPin, Clock, Star, Phone, MessageCircle, Heart, Share2,
  Flag, Check, Shield, Calendar, Users, Award, X, ChevronLeft,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const serviceData = {
  id: 501,
  title: "Peşəkar Ev Təmiri və Yenidənqurma Xidməti",
  category: "Xidmətlər",
  subcategory: "Tikinti və Təmir",
  location: "Bakı, Yasamal r.",
  date: "23 Mart 2026",
  views: 3412,
  rating: 4.9,
  reviewCount: 87,
  completedJobs: 214,
  experience: "8 il",
  responseTime: "30 dəq ərzində",
  description: `Peşəkar tikinti və təmir xidmətləri təklif edirik. 8 illik təcrübəmiz ərzində 200-dən çox layihəni uğurla başa vurmuşuq. Xidmətlərimizə tam mənzil təmiri, mətbəx və hamam yenilənməsi, elektrik və santexnika işləri, boya və suvaq işləri daxildir. Keyfiyyətli materiallardan istifadə edir, işimizə 2 il zəmanət veririk.`,
  highlights: [
    "2 il zəmanət",
    "Pulsuz qiymət təklifi",
    "Keyfiyyətli materiallar",
    "Vaxtında təhvil",
    "Peşəkar komanda",
    "24/7 dəstək",
  ],
  seller: {
    name: "ProBuild MMC",
    avatar: "PB",
    rating: 4.9,
    reviews: 87,
    memberSince: "2018",
    verified: true,
    phone: "+994 55 234 56 78",
    totalAds: 12,
  },
  pricing: [
    { service: "Tam mənzil təmiri (əsaslı)", unit: "m²", price: "120 – 180", popular: true },
    { service: "Kosmetik təmir", unit: "m²", price: "60 – 90", popular: false },
    { service: "Mətbəx yenilənməsi", unit: "layihə", price: "2,500 – 5,000", popular: true },
    { service: "Hamam təmiri", unit: "layihə", price: "1,500 – 3,500", popular: false },
    { service: "Elektrik işləri", unit: "nöqtə", price: "15 – 25", popular: false },
    { service: "Santexnika işləri", unit: "nöqtə", price: "20 – 35", popular: false },
    { service: "Boya və suvaq", unit: "m²", price: "8 – 15", popular: false },
    { service: "Laminat / parket döşəmə", unit: "m²", price: "12 – 20", popular: false },
    { service: "Asma tavan quraşdırılması", unit: "m²", price: "18 – 30", popular: false },
  ],
  portfolio: [
    { id: 1, title: "Mənzil təmiri, Yasamal", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop", tag: "Tam təmir" },
    { id: 2, title: "Mətbəx yenilənməsi", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop", tag: "Mətbəx" },
    { id: 3, title: "Hamam dizaynı", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop", tag: "Hamam" },
    { id: 4, title: "Ofis təmiri, Nəsimi", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", tag: "Ofis" },
    { id: 5, title: "Villa interyeri", img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=400&fit=crop", tag: "Villa" },
    { id: 6, title: "Salon yenilənməsi", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop", tag: "Salon" },
    { id: 7, title: "Balkon abadlaşdırma", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", tag: "Balkon" },
    { id: 8, title: "Uşaq otağı", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop", tag: "Uşaq otağı" },
  ],
  reviews: [
    { id: 1, name: "Kamran Həsənov", rating: 5, comment: "Əla iş gördülər! Mənzilim tam dəyişdi. Vaxtında bitirdilər və keyfiyyətdən çox razıyam.", date: "15.03.2026", service: "Tam mənzil təmiri" },
    { id: 2, name: "Günel Əliyeva", rating: 5, comment: "Mətbəximi tamamilə yenilədilər. Professional yanaşma, təmiz iş. Tövsiyə edirəm.", date: "02.03.2026", service: "Mətbəx yenilənməsi" },
    { id: 3, name: "Orxan Babayev", rating: 4, comment: "İşin keyfiyyəti yaxşıdır, amma bir neçə gün gecikdilər. Ümumi nəticədən razıyam.", date: "18.02.2026", service: "Hamam təmiri" },
    { id: 4, name: "Aygün Məmmədova", rating: 5, comment: "Çox peşəkar komandadır. Hər şeyi ətraflı izah etdilər. Qiymət də münasibdir.", date: "05.02.2026", service: "Kosmetik təmir" },
    { id: 5, name: "Rəşad İsmayılov", rating: 5, comment: "Mükəmməl! Ofisimizin təmiri çox keyfiyyətli aparıldı.", date: "20.01.2026", service: "Ofis təmiri" },
  ],
  similarServices: [
    { id: 502, title: "Fotoqraf xidməti — Toy, portfolio", price: "150 ₼-dən", img: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop", rating: 4.7, location: "Bakı" },
    { id: 503, title: "Santexnik — 24/7 təcili xidmət", price: "Razılaşma", img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop", rating: 4.6, location: "Bakı" },
    { id: 504, title: "Veb sayt hazırlanması", price: "500 ₼-dən", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", rating: 4.8, location: "Bakı" },
    { id: 505, title: "Daşınma və yükdaşıma", price: "Razılaşma", img: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=400&h=300&fit=crop", rating: 4.5, location: "Bakı" },
  ],
};

const avgRating = (serviceData.reviews.reduce((s, r) => s + r.rating, 0) / serviceData.reviews.length).toFixed(1);

const ServiceDetailPage = () => {
  const [fav, setFav] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0 bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-3">
            <nav className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
              {[
                { label: "Ana Səhifə", to: "/" },
                { label: "Xidmətlər", to: "/kateqoriya/xidmetler" },
                { label: serviceData.subcategory, to: "/kateqoriya/xidmetler" },
              ].map((b, i, arr) => (
                <span key={b.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={14} className="text-muted-foreground/50" />}
                  {i === arr.length - 1 ? (
                    <span className="text-foreground font-medium">{b.label}</span>
                  ) : (
                    <Link to={b.to} className="hover:text-primary transition-colors">{b.label}</Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="container py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* LEFT — Main Content */}
            <div className="lg:w-[62%] space-y-6">
              {/* Title + Meta */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary uppercase tracking-wide">Xidmət</span>
                  {serviceData.seller.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                      <Shield size={10} /> Təsdiqlənmiş
                    </span>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight">{serviceData.title}</h1>
                <div className="flex items-center gap-4 mt-3 flex-wrap text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin size={13} /> {serviceData.location}</span>
                  <span className="inline-flex items-center gap-1"><Calendar size={13} /> {serviceData.date}</span>
                  <span className="inline-flex items-center gap-1">👁️ {serviceData.views.toLocaleString()} baxış</span>
                  <span className="inline-flex items-center gap-1 text-primary font-medium">
                    <Star size={13} fill="currentColor" /> {serviceData.rating} ({serviceData.reviewCount})
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Award, label: "Təcrübə", value: serviceData.experience },
                  { icon: Users, label: "Tamamlanan iş", value: `${serviceData.completedJobs}+` },
                  { icon: Clock, label: "Cavab müddəti", value: serviceData.responseTime },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-card p-3.5 text-center">
                    <s.icon size={18} className="mx-auto text-primary mb-1.5" />
                    <p className="text-base font-extrabold text-foreground">{s.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {serviceData.highlights.map((h) => (
                  <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-foreground">
                    <Check size={12} className="text-primary" /> {h}
                  </span>
                ))}
              </div>

              {/* Tabs */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start bg-muted/50 rounded-lg h-auto p-1">
                  <TabsTrigger value="about" className="text-xs sm:text-sm">Haqqında</TabsTrigger>
                  <TabsTrigger value="pricing" className="text-xs sm:text-sm">Qiymətlər</TabsTrigger>
                  <TabsTrigger value="portfolio" className="text-xs sm:text-sm">Portfolio ({serviceData.portfolio.length})</TabsTrigger>
                  <TabsTrigger value="reviews" className="text-xs sm:text-sm">Rəylər ({serviceData.reviews.length})</TabsTrigger>
                </TabsList>

                {/* About */}
                <TabsContent value="about">
                  <div className="mt-4 rounded-xl border border-border bg-card p-5">
                    <h2 className="text-sm font-semibold text-foreground mb-3">Xidmət haqqında</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{serviceData.description}</p>
                  </div>
                </TabsContent>

                {/* Pricing */}
                <TabsContent value="pricing">
                  <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden">
                    <div className="p-4 pb-2 border-b border-border">
                      <h2 className="text-sm font-semibold text-foreground">Qiymət cədvəli</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Qiymətlər işin həcminə görə dəyişə bilər</p>
                    </div>
                    <div className="divide-y divide-border">
                      {serviceData.pricing.map((p, i) => (
                        <div key={i} className={`flex items-center justify-between px-4 py-3.5 text-sm ${p.popular ? 'bg-primary/[0.03]' : ''}`}>
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-foreground font-medium">{p.service}</span>
                            {p.popular && (
                              <span className="shrink-0 px-1.5 py-0.5 text-[9px] font-bold rounded bg-primary/10 text-primary uppercase">Populyar</span>
                            )}
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <span className="font-bold text-foreground">{p.price} ₼</span>
                            <span className="text-[11px] text-muted-foreground ml-1">/ {p.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-muted/30 border-t border-border">
                      <p className="text-xs text-muted-foreground">💡 Dəqiq qiymət üçün pulsuz qiymət təklifi alın — aşağıdakı "Mesaj yaz" düyməsini istifadə edin.</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Portfolio */}
                <TabsContent value="portfolio">
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {serviceData.portfolio.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setLightbox(idx)}
                        className="group relative rounded-xl overflow-hidden aspect-[3/2] bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white">{p.tag}</span>
                          <p className="text-xs font-medium text-white mt-1 line-clamp-1">{p.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                {/* Reviews */}
                <TabsContent value="reviews">
                  <div className="mt-4 space-y-4">
                    {/* Summary */}
                    <div className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row gap-6">
                      <div className="flex flex-col items-center justify-center gap-1 min-w-[90px]">
                        <span className="text-4xl font-extrabold text-foreground">{avgRating}</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={13} className={s <= Math.round(Number(avgRating)) ? "text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" : "text-border"} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{serviceData.reviews.length} rəy</span>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = serviceData.reviews.filter(r => r.rating === star).length;
                          const pct = Math.round((count / serviceData.reviews.length) * 100);
                          return (
                            <div key={star} className="flex items-center gap-2 text-xs">
                              <span className="w-3 text-muted-foreground">{star}</span>
                              <Star size={10} className="text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" />
                              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full bg-[hsl(var(--vip-gold))] transition-all" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="w-6 text-right text-muted-foreground">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Review Cards */}
                    {serviceData.reviews.map((r) => (
                      <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                              {r.name.split(" ").map(w => w[0]).join("")}
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-foreground">{r.name}</span>
                              <span className="block text-[10px] text-muted-foreground">{r.service}</span>
                            </div>
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
                </TabsContent>
              </Tabs>

              {/* Similar Services */}
              <section>
                <h2 className="text-base font-bold text-foreground mb-4">Oxşar Xidmətlər</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceData.similarServices.map((s) => (
                    <Link key={s.id} to={`/xidmetler/${s.id}`} className="rounded-xl border border-border bg-card overflow-hidden card-lift group">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                      <div className="p-3.5">
                        <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{s.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-foreground">{s.price}</span>
                          <span className="inline-flex items-center gap-0.5 text-xs text-primary font-medium">
                            <Star size={10} fill="currentColor" /> {s.rating}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1"><MapPin size={10} /> {s.location}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT — Sidebar */}
            <div className="lg:w-[38%] space-y-4">
              {/* Price Card */}
              <div className="rounded-xl bg-primary p-5">
                <p className="text-xs text-primary-foreground/70 font-medium mb-1">Xidmət qiyməti</p>
                <p className="text-2xl font-extrabold text-primary-foreground">Razılaşma ilə</p>
                <p className="text-xs text-primary-foreground/60 mt-1">Pulsuz qiymət təklifi alın</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFav(!fav)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-sm font-medium transition-all active:scale-[0.97] ${
                    fav ? "border-destructive text-destructive bg-destructive/5" : "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                  }`}
                >
                  <Heart size={15} fill={fav ? "currentColor" : "none"} />
                  {fav ? "Əlavə edildi" : "Favorit"}
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground transition-all active:scale-[0.97]">
                  <Share2 size={15} /> Paylaş
                </button>
                <button className="flex items-center justify-center py-2.5 px-3 rounded-lg border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-all active:scale-[0.97]">
                  <Flag size={15} />
                </button>
              </div>

              {/* Seller Card */}
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg flex items-center justify-center shrink-0">
                    {serviceData.seller.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-foreground">{serviceData.seller.name}</p>
                      {serviceData.seller.verified && <Shield size={14} className="text-green-500" />}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star size={13} className="text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" />
                      <span className="font-medium text-foreground">{serviceData.seller.rating}</span>
                      <span>({serviceData.seller.reviews} rəy)</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{serviceData.seller.memberSince}-dən üzv</span>
                  <span className="flex items-center gap-1"><Check size={12} className="text-accent" /> Telefon təsdiqlənib</span>
                </div>
                <Link to="/axtaris?q=ProBuild" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  Bütün elanları ({serviceData.seller.totalAds}) <ChevronRight size={14} />
                </Link>
                <div className="space-y-2">
                  <button
                    onClick={() => setPhoneRevealed(true)}
                    className="w-full py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    {phoneRevealed ? serviceData.seller.phone : "Nömrəni göstər"}
                  </button>
                  <button className="w-full py-2.5 rounded-lg border-2 border-border font-semibold text-sm text-foreground hover:border-primary transition-colors active:scale-[0.97] flex items-center justify-center gap-2">
                    <MessageCircle size={16} /> Mesaj yaz
                  </button>
                  <button className="w-full py-2.5 rounded-lg border-2 border-accent text-accent font-semibold text-sm hover:bg-accent/5 transition-colors active:scale-[0.97] flex items-center justify-center gap-2">
                    📱 WhatsApp
                  </button>
                </div>
              </div>

              {/* Safety */}
              <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-base">⚠️</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Əvvəlcədən ödəniş etməyin. Xidmət tamamlandıqdan sonra ödəniş edin. Şübhəli elanları bizə bildirin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10">
            <X size={28} />
          </button>
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
          )}
          {lightbox < serviceData.portfolio.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          )}
          <div className="max-w-4xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={serviceData.portfolio[lightbox].img}
              alt={serviceData.portfolio[lightbox].title}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="text-center text-white text-sm mt-3 font-medium">{serviceData.portfolio[lightbox].title}</p>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
};

export default ServiceDetailPage;
