import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdImageGallery from "@/components/AdImageGallery";
import AdSidebar from "@/components/AdSidebar";
import { ChevronRight, Phone, MessageCircle, Zap, TrendingUp, Star, Crown, Eye, Calendar, MapPin } from "lucide-react";
import PullToRefresh from "@/components/PullToRefresh";

const breadcrumbs = [
  { label: "Ana Səhifə", to: "/" },
  { label: "Nəqliyyat", to: "/kateqoriya/neqliyyat" },
  { label: "Avtomobil", to: "/kateqoriya/neqliyyat" },
  { label: "Mercedes-Benz", to: "/axtaris?q=Mercedes-Benz" },
];

const details = [
  ["Marka", "Mercedes-Benz", "Model", "C200"],
  ["İl", "2019", "Yürüş", "45,000 km"],
  ["Mühərrik", "2.0L Benzin", "Yanacaq", "Benzin"],
  ["Ötürmə", "Avtomat", "Rəng", "Ağ"],
  ["Ban növü", "Sedan", "Sürücülük", "Arxa"],
];

const similarAds = [
  { id: 1, title: "Mercedes-Benz E200 2020", price: "32,000", img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop", location: "Bakı", date: "Bugün" },
  { id: 2, title: "BMW 320i M Sport 2019", price: "27,500", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", location: "Bakı", date: "Dünən" },
  { id: 3, title: "Audi A4 2.0 TFSI 2020", price: "29,000", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop", location: "Gəncə", date: "2 gün əvvəl" },
  { id: 4, title: "Mercedes-Benz C180 2018", price: "21,000", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", location: "Sumqayıt", date: "3 gün əvvəl" },
];

const promotionTiers = [
  {
    key: "boost", icon: TrendingUp, label: "İrəli Çək", price: "2 ₼", duration: "3 gün",
    color: "text-[hsl(var(--boost-orange))]", bg: "bg-[hsl(var(--boost-orange)/0.08)]", border: "border-[hsl(var(--boost-orange)/0.25)]",
    desc: "Elanınız axtarış nəticələrində üstə çıxsın",
  },
  {
    key: "vip", icon: Star, label: "VIP", price: "5 ₼", duration: "7 gün",
    color: "text-[hsl(var(--vip-gold))]", bg: "bg-[hsl(var(--vip-gold)/0.08)]", border: "border-[hsl(var(--vip-gold)/0.25)]",
    desc: "Ana səhifədə VIP nişanı ilə göstərilsin",
  },
  {
    key: "premium", icon: Crown, label: "Premium", price: "10 ₼", duration: "14 gün",
    color: "text-[hsl(var(--premium-blue))]", bg: "bg-[hsl(var(--premium-blue)/0.08)]", border: "border-[hsl(var(--premium-blue)/0.25)]",
    desc: "Premium çərçivə və prioritet yerləşmə",
  },
];

const AdDetailPage = () => {
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const handleRefresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 800));
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen flex flex-col pb-[120px] md:pb-0">
      <SiteHeader />
      <PullToRefresh onRefresh={handleRefresh}>
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-3">
            <nav className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
              {breadcrumbs.map((b, i) => (
                <span key={b.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={14} className="text-muted-foreground/50" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">{b.label}</span>
                  ) : (
                    <Link to={b.to} className="hover:text-primary transition-colors">{b.label}</Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile meta bar */}
        <div className="md:hidden border-b border-border bg-card">
          <div className="container py-2.5 flex items-center gap-4 text-xs text-muted-foreground overflow-x-auto scrollbar-hide">
            <span className="inline-flex items-center gap-1 shrink-0"><MapPin size={12} /> Bakı, Nəsimi</span>
            <span className="inline-flex items-center gap-1 shrink-0"><Calendar size={12} /> 23 Mart 2026</span>
            <span className="inline-flex items-center gap-1 shrink-0"><Eye size={12} /> 1,245 baxış</span>
          </div>
        </div>

        {/* Main content */}
        <div className="container py-5 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* LEFT — gallery + details */}
            <div className="lg:flex-1 min-w-0">
              <AdImageGallery />

              {/* Mobile title + price (shown below gallery on mobile) */}
              <div className="mt-4 lg:hidden">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-[hsl(var(--vip-gold)/0.15)] text-[hsl(var(--vip-gold))]">
                    <Star size={10} fill="currentColor" /> VIP
                  </span>
                </div>
                <h1 className="text-xl font-extrabold text-foreground leading-tight">Mercedes-Benz C200, 2019</h1>
                <p className="text-2xl font-black text-primary mt-2">25,000 ₼</p>
                <p className="text-xs text-muted-foreground mt-0.5">Oxşar elanlar: 22,000 — 28,000 ₼</p>
              </div>

              {/* Description */}
              <DescriptionSection />

              {/* Details table */}
              <section className="mt-6">
                <h2 className="text-lg font-bold text-foreground mb-3">Texniki xüsusiyyətlər</h2>
                <div className="border border-border rounded-xl overflow-hidden">
                  {details.map((row, i) => (
                    <div key={i} className={`grid grid-cols-2 md:grid-cols-4 text-sm ${i % 2 === 0 ? "bg-muted/40" : "bg-card"}`}>
                      <div className="px-4 py-3 text-muted-foreground">{row[0]}</div>
                      <div className="px-4 py-3 text-foreground font-semibold">{row[1]}</div>
                      <div className="px-4 py-3 text-muted-foreground">{row[2]}</div>
                      <div className="px-4 py-3 text-foreground font-semibold">{row[3]}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Location */}
              <section className="mt-6">
                <h2 className="text-lg font-bold text-foreground mb-3">Yerləşmə</h2>
                <div className="border border-border rounded-xl bg-muted/30 h-48 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📍 Bakı, Nəsimi rayonu</p>
                </div>
              </section>

              {/* AI price analysis */}
              <section className="mt-6">
                <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">🤖 AI Qiymət Analizi</h2>
                <div className="border border-border rounded-xl p-5 bg-card space-y-4">
                  <p className="text-sm text-muted-foreground">Bu elanın qiyməti oxşar elanlarla müqayisədə:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Ucuz</span>
                      <span>Bahalı</span>
                    </div>
                    <div className="relative h-3 bg-gradient-to-r from-accent via-primary to-destructive/60 rounded-full">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-[3px] border-foreground shadow-md"
                        style={{ left: "55%" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Orta bazar qiyməti: <span className="font-bold text-foreground">24,500 ₼</span></span>
                    <span className="text-accent font-semibold">✓ Bu elan bazar qiymətinə yaxındır</span>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT — sidebar (desktop) */}
            <div className="hidden lg:block lg:w-[380px] shrink-0">
              <div className="sticky top-4">
                <AdSidebar />
              </div>
            </div>
          </div>

          {/* Similar ads */}
          <section className="mt-10">
            <h2 className="text-lg font-bold text-foreground mb-4">Oxşar Elanlar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {similarAds.map((ad) => (
                <a key={ad.id} href="#" className="rounded-xl border border-border bg-card overflow-hidden card-lift group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                    <p className="text-base font-bold text-foreground mt-1">{ad.price} ₼</p>
                    <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5"><MapPin size={11} /> {ad.location}</span>
                      <span>{ad.date}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Promotion CTA section */}
          <section className="mt-10 mb-4">
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={18} className="text-primary" />
                <h2 className="text-lg font-bold text-foreground">Elanınızı reklam edin</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-5">Elanınızı daha çox insana çatdırın — irəli çəkin, VIP edin və ya Premium paketdən yararlanın.</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {promotionTiers.map((tier) => (
                  <Link
                    key={tier.key}
                    to="/elanlar/1/ireli-cek"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${tier.border} ${tier.bg} hover:shadow-lg transition-all active:scale-[0.97] group`}
                  >
                    <tier.icon size={24} className={`${tier.color} group-hover:scale-110 transition-transform`} fill={tier.key === "vip" ? "currentColor" : "none"} />
                    <span className={`text-sm font-bold ${tier.color}`}>{tier.label}</span>
                    <span className="text-xs text-muted-foreground text-center">{tier.desc}</span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-base font-black text-foreground">{tier.price}</span>
                      <span className="text-[10px] text-muted-foreground">/ {tier.duration}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Safety notice */}
          <section className="mb-4">
            <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-primary/5 border border-primary/20">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="font-semibold text-sm text-foreground">Diqqət!</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Əvvəlcədən ödəniş etməyin. Şəxsən görüşüb məhsulu yoxladıqdan sonra ödəniş edin. Şübhəli elanları bizə bildirin.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile sticky contact bar */}
      <div className="md:hidden fixed bottom-[60px] left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPhoneRevealed(!phoneRevealed)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97]"
          >
            <Phone size={18} />
            {phoneRevealed ? "+994 50 123 45 67" : "Zəng et"}
          </button>
          <button className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-primary font-bold text-sm text-primary hover:bg-primary/5 transition-colors active:scale-[0.97]">
            <MessageCircle size={18} />
            Yaz
          </button>
        </div>
      </div>

      <SiteFooter />
      </PullToRefresh>
    </div>
  );
};

const adDescriptionHtml = `
<p>Mercedes-Benz C200, 2019-cu il buraxılış. Avtomobil <strong>əla vəziyyətdədir</strong>, heç bir qəzası olmayıb. Tam texniki baxışdan keçib, bütün dəyişikliklər vaxtında aparılıb. Salon tam dəri, oturacaqların isidilməsi və ventilyasiyası mövcuddur.</p>
<p>Mühərrik <b>2.0 litr turbo benzin</b>, 184 at gücü. Avtomat ötürücü qutusu 9G-Tronic. Yanacaq sərfiyyatı şəhərdaxili 8.5L/100km, magistral yolda 5.5L/100km. Yürüş cəmi <u>45,000 km</u>-dir.</p>
<h3>Təchizat:</h3>
<ul>
  <li>AMG paket</li>
  <li>Panoramik lyuk</li>
  <li>360 dərəcə kamera</li>
  <li>Adaptiv tempomat</li>
  <li>COMAND naviqasiya sistemi</li>
  <li>Burmester audio sistemi</li>
  <li>LED intellektual fənərlər</li>
  <li>Açarsız giriş və mühərrik işə salma</li>
</ul>
<p><em>Qiymət razılaşma yolu ilə. Barter təklif etməyin.</em> Ciddi alıcıları gözləyirəm. Əlavə məlumat üçün zəng edə bilərsiniz.</p>
`;

const DescriptionSection = () => {
  const sanitizedHtml = useMemo(
    () => DOMPurify.sanitize(adDescriptionHtml, {
      ALLOWED_TAGS: ["p", "br", "b", "strong", "i", "em", "u", "s", "ul", "ol", "li", "h2", "h3", "h4", "a", "span", "blockquote"],
      ALLOWED_ATTR: ["href", "target", "rel"],
    }),
    []
  );

  return (
    <section className="mt-6">
      <h2 className="text-lg font-bold text-foreground mb-3">Ətraflı məlumat</h2>
      <div
        className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </section>
  );
};

export default AdDetailPage;
