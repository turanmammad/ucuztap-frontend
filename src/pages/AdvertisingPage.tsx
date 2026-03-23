import { useState } from "react";
import { LayoutPanelTop, Monitor, Smartphone, BarChart3, Check, Send, Eye, MousePointerClick, Clock, Zap } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const bannerPlacements = [
  {
    id: "hero",
    name: "Ana səhifə — Hero Banner",
    location: "Ana səhifənin yuxarı hissəsi",
    size: "1200×400 px",
    devices: "Desktop + Mobil",
    views: "~50,000 / gün",
    price: "800 ₼ / ay",
    recommended: true,
  },
  {
    id: "category-top",
    name: "Kateqoriya — Üst Banner",
    location: "Kateqoriya səhifəsinin yuxarısı",
    size: "1200×280 px",
    devices: "Desktop + Mobil",
    views: "~20,000 / gün",
    price: "400 ₼ / ay",
  },
  {
    id: "sidebar",
    name: "Sidebar Banner",
    location: "Elan siyahısının yanında",
    size: "300×600 px",
    devices: "Yalnız Desktop",
    views: "~15,000 / gün",
    price: "250 ₼ / ay",
  },
  {
    id: "in-feed",
    name: "Elan Arası Reklam",
    location: "Elan siyahısının içində",
    size: "Elan kartı ölçüsü",
    devices: "Desktop + Mobil",
    views: "~30,000 / gün",
    price: "350 ₼ / ay",
  },
  {
    id: "detail-bottom",
    name: "Elan Detalı — Alt Banner",
    location: "Elan detalı səhifəsinin altı",
    size: "1200×200 px",
    devices: "Desktop + Mobil",
    views: "~25,000 / gün",
    price: "300 ₼ / ay",
  },
  {
    id: "inline-text",
    name: "İnline Mətn Reklam",
    location: "Səhifə bölmələri arasında",
    size: "Tam en, 60 px",
    devices: "Desktop + Mobil",
    views: "~40,000 / gün",
    price: "150 ₼ / ay",
  },
];

const stats = [
  { icon: Eye, value: "2M+", label: "Aylıq baxış" },
  { icon: MousePointerClick, value: "150K+", label: "Aylıq klik" },
  { icon: Clock, value: "4.5 dəq", label: "Ort. sessiya müddəti" },
  { icon: Zap, value: "85%", label: "Mobil istifadəçi" },
];

const AdvertisingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-hero-bg py-14 md:py-18">
          <div className="container max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold text-foreground mb-3" style={{ lineHeight: 1.15 }}>
              Reklam imkanları
            </h1>
            <p className="text-muted-foreground text-balance">
              Milyonlarla istifadəçiyə çatın. Brendinizi ucuztap.az-da tanıdın.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-card rounded-xl border border-border p-5 text-center">
                <s.icon size={22} className="mx-auto text-primary mb-2" />
                <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Banner Placements */}
        <section className="container pb-12">
          <h2 className="text-xl font-bold text-foreground text-center mb-2">Banner yerləri və qiymətlər</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">Saytın müxtəlif hissələrində reklam banner yerləri</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {bannerPlacements.map((p) => (
              <div
                key={p.id}
                className={`bg-card rounded-xl border-2 p-5 flex flex-col relative ${
                  p.recommended
                    ? "border-primary ring-1 ring-primary/20"
                    : "border-border"
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Ən populyar
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <LayoutPanelTop size={18} className="text-primary shrink-0" />
                  <h3 className="text-sm font-bold text-foreground">{p.name}</h3>
                </div>

                <div className="space-y-2 text-xs flex-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yer:</span>
                    <span className="text-foreground font-medium text-right">{p.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ölçü:</span>
                    <span className="text-foreground font-medium">{p.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cihaz:</span>
                    <span className="text-foreground font-medium flex items-center gap-1">
                      <Monitor size={12} />
                      {p.devices.includes("Mobil") && <Smartphone size={12} />}
                      {p.devices}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Baxış:</span>
                    <span className="text-foreground font-medium flex items-center gap-1">
                      <BarChart3 size={12} /> {p.views}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-foreground">{p.price}</span>
                  <button
                    onClick={() => setSelectedPlacement(p.name)}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97]"
                  >
                    Sifariş et
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/30 py-10">
          <div className="container max-w-3xl">
            <h2 className="text-lg font-bold text-foreground text-center mb-6">Niyə bizdə reklam verməlisiniz?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Azərbaycanın ən böyük elan platforması",
                "Hədəf auditoriyaya çatma imkanı",
                "Real-time klik və baxış statistikası",
                "Mobil-first dizayn — 85% mobil trafik",
                "A/B test dəstəyi",
                "Fərdi kampaniya planlaması",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={14} className="text-accent shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="container py-12">
          <div className="max-w-lg mx-auto bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-5">Reklam sifarişi</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad Soyad" className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <select
                value={selectedPlacement}
                onChange={(e) => setSelectedPlacement(e.target.value)}
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Banner yerini seçin</option>
                {bannerPlacements.map((p) => (
                  <option key={p.id} value={p.name}>{p.name} — {p.price}</option>
                ))}
              </select>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Əlavə qeydlər..." className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
              <button type="submit" className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97]">
                <Send size={14} className="inline mr-2" /> Göndər
              </button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AdvertisingPage;
