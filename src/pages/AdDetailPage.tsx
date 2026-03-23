import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdImageGallery from "@/components/AdImageGallery";
import AdSidebar from "@/components/AdSidebar";
import { ChevronRight, Phone, MessageCircle } from "lucide-react";
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
  { id: 1, title: "Mercedes-Benz E200 2020", price: "32,000", img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop", location: "Bakı" },
  { id: 2, title: "BMW 320i M Sport 2019", price: "27,500", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", location: "Bakı" },
  { id: 3, title: "Audi A4 2.0 TFSI 2020", price: "29,000", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop", location: "Gəncə" },
  { id: 4, title: "Mercedes-Benz C180 2018", price: "21,000", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", location: "Sumqayıt" },
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

        {/* Main content */}
        <div className="container py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* LEFT */}
            <div className="lg:w-[60%]">
              <AdImageGallery />
            </div>
            {/* RIGHT */}
            <div className="lg:w-[40%]">
              <AdSidebar />
            </div>
          </div>

          {/* Description */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Ətraflı məlumat</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-3">
              <p>
                Mercedes-Benz C200, 2019-cu il buraxılış. Avtomobil əla vəziyyətdədir, heç bir qəzası olmayıb.
                Tam texniki baxışdan keçib, bütün dəyişikliklər vaxtında aparılıb. Salon tam dəri, oturacaqların
                isidilməsi və ventilyasiyası mövcuddur.
              </p>
              <p>
                Mühərrik 2.0 litr turbo benzin, 184 at gücü. Avtomat ötürücü qutusu 9G-Tronic. Yanacaq sərfiyyatı
                şəhərdaxili 8.5L/100km, magistral yolda 5.5L/100km. Yürüş cəmi 45,000 km-dir.
              </p>
              <p>
                Təchizat: AMG paket, panoramik lyuk, 360 dərəcə kamera, adaptiv tempomat, körpə zolaqlara nəzarət,
                COMAND naviqasiya sistemi, Burmester audio sistemi, LED intellektual fənərlər, açarsız giriş və
                mühərrik işə salma.
              </p>
              <p>
                Qiymət razılaşma yolu ilə. Barter təklif etməyin. Ciddi alıcıları gözləyirəm.
                Əlavə məlumat üçün zəng edə bilərsiniz.
              </p>
            </div>
          </section>

          {/* Details table */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Texniki xüsusiyyətlər</h2>
            <div className="border border-border rounded-lg overflow-hidden">
              {details.map((row, i) => (
                <div key={i} className={`grid grid-cols-2 md:grid-cols-4 text-sm ${i % 2 === 0 ? "bg-muted/40" : "bg-background"}`}>
                  <div className="px-4 py-3 font-medium text-muted-foreground">{row[0]}</div>
                  <div className="px-4 py-3 text-foreground font-medium">{row[1]}</div>
                  <div className="px-4 py-3 font-medium text-muted-foreground">{row[2]}</div>
                  <div className="px-4 py-3 text-foreground font-medium">{row[3]}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Map — only shown if location was provided */}
          {/* Mock: this ad has location data */}
          {(() => {
            const hasLocation = true; // In real app: check if ad.lat && ad.lng exist
            if (!hasLocation) return null;
            return (
              <section className="mt-8">
                <h2 className="text-lg font-bold text-foreground mb-4">Yerləşmə</h2>
                <div className="border border-border rounded-lg bg-muted/30 h-48 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📍 Bakı, Nəsimi</p>
                </div>
              </section>
            );
          })()}

          {/* AI price analysis */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">🤖 AI Qiymət Analizi</h2>
            <div className="border border-border rounded-lg p-5 space-y-4">
              <p className="text-sm text-muted-foreground">Bu elanın qiyməti oxşar elanlarla müqayisədə:</p>
              {/* Bar visualization */}
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

          {/* Similar ads */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Oxşar Elanlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarAds.map((ad) => (
                <a key={ad.id} href="#" className="rounded-lg border border-border bg-card overflow-hidden card-lift group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                    <p className="text-base font-bold text-foreground mt-1">{ad.price} ₼</p>
                    <span className="text-xs text-muted-foreground">📍 {ad.location}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Safety notice */}
          <section className="mt-8 mb-4">
            <div className="flex items-start gap-3 px-5 py-4 rounded-lg bg-primary/10 border border-primary/30">
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

      {/* Mobile sticky contact bar — above bottom nav */}
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

export default AdDetailPage;
