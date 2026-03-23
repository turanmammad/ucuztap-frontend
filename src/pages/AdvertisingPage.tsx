import { useState } from "react";
import { LayoutPanelTop, Star, Store, Check, Send } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const packages = [
  {
    icon: LayoutPanelTop, name: "Banner Reklam", price: "500 ₼ / ay-dan",
    features: ["Ana səhifədə banner", "Kateqoriya səhifələrində", "Desktop + Mobil", "Klik statistikası"],
  },
  {
    icon: Star, name: "VIP Paket", price: "200 ₼ / ay-dan", recommended: true,
    features: ["50 VIP elan hüququ", "Prioritet dəstək", "Ətraflı statistika", "Brendinq imkanı"],
  },
  {
    icon: Store, name: "Mağaza Hesabı", price: "300 ₼ / ay-dan",
    features: ["Brend səhifəsi", "Limitsiz elan", "Logo və banner", "API inteqrasiya"],
  },
];

const AdvertisingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-hero-bg py-14 md:py-18">
          <div className="container max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold text-foreground mb-3" style={{ lineHeight: 1.15 }}>Reklam imkanları</h1>
            <p className="text-muted-foreground text-balance">
              Milyonlarla istifadəçiyə çatın. Brendinizi ucuztap.az-da tanıdın.
            </p>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {packages.map((p) => (
              <div key={p.name} className={`bg-card rounded-xl border-2 p-6 flex flex-col ${p.recommended ? "border-[hsl(var(--vip-gold))] ring-1 ring-[hsl(var(--vip-gold))]/30 relative" : "border-border"}`}>
                {p.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[hsl(var(--vip-gold))] text-foreground text-xs font-bold">Tövsiyə</span>
                )}
                <p.icon size={28} className="text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-1">{p.name}</h3>
                <p className="text-xl font-extrabold text-foreground mb-4">{p.price}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check size={14} className="text-accent shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors active:scale-[0.97]">
                  Əlaqə
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="container pb-16">
          <div className="max-w-lg mx-auto bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-5">Bizimlə əlaqə</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad Soyad" className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Mesajınız..." className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
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
