import { useState } from "react";
import { Store, Check, Package, Zap, Crown, BarChart3, Edit, ExternalLink, Eye, X, CreditCard, Shield, Rocket, Star, TrendingUp, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const packages = [
  {
    id: "start",
    name: "Start",
    price: "0",
    period: "Pulsuz",
    icon: Package,
    color: "text-muted-foreground",
    bg: "bg-muted/50",
    borderColor: "border-border",
    features: ["5 elan limiti", "Standart görünüş", "Əsas statistika"],
    missing: ["Mağaza brending", "Ön sırada göstərilmə", "VIP elanlar", "Prioritet dəstək"],
  },
  {
    id: "business",
    name: "Biznes",
    price: "29",
    period: "/ ay",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
    borderColor: "border-primary",
    popular: true,
    features: ["50 elan limiti", "Mağaza səhifəsi", "Logo brending", "Ətraflı statistika", "Prioritet dəstək"],
    missing: ["Ön sırada göstərilmə", "VIP elanlar"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "79",
    period: "/ ay",
    icon: Crown,
    color: "text-[hsl(var(--vip-gold))]",
    bg: "bg-[hsl(var(--vip-gold))]/10",
    borderColor: "border-[hsl(var(--vip-gold))]",
    features: [
      "Limitsiz elan",
      "Premium mağaza nişanı",
      "Mağaza ön sıralarda",
      "Məhsullar ön sıralarda",
      "Aylıq 10 VIP elan",
      "Logo brending",
      "Ətraflı statistika",
      "Prioritet dəstək",
      "API girişi",
    ],
    missing: [],
  },
];

const premiumBenefits = [
  { icon: Crown, title: "Premium nişan", desc: "Mağazanız premium ikonla fərqlənir" },
  { icon: TrendingUp, title: "Ön sıralarda", desc: "Mağaza və elanlar həmişə yuxarıda" },
  { icon: Star, title: "10 VIP elan / ay", desc: "Hər ay 10 elan pulsuz VIP olur" },
  { icon: Shield, title: "Prioritet dəstək", desc: "7/24 xüsusi dəstək xətti" },
];

const MyShop = () => {
  const [hasShop, setHasShop] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "stats" | "upgrade">("overview");
  const [currentPlan, setCurrentPlan] = useState("business");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState("premium");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const currentPkg = packages.find(p => p.id === currentPlan)!;

  const handleUpgrade = (pkgId: string) => {
    setSelectedUpgrade(pkgId);
    setShowPayment(true);
  };

  const processPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPayment(false);
      setCurrentPlan(selectedUpgrade);
      setActiveTab("overview");
      toast.success(
        selectedUpgrade === "premium"
          ? "Premium mağaza aktivləşdirildi! 🎉"
          : "Paket yeniləndi!"
      );
    }, 2000);
  };

  if (!hasShop) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-foreground">Mağazam</h1>
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <Store size={40} className="mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-lg font-bold text-foreground mb-2">Hələ mağazanız yoxdur</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Öz mağazanızı yaradın, elanlarınızı bir yerdə toplayın və professional görüntü təqdim edin.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-6 max-w-lg mx-auto">
            {packages.map((p) => (
              <div key={p.id} className={`rounded-lg border p-3 text-center ${p.borderColor}`}>
                <p.icon size={20} className={`mx-auto ${p.color} mb-1`} />
                <p className="text-sm font-bold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.price} ₼/ay</p>
              </div>
            ))}
          </div>
          <Link
            to="/magazalar/yarat"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.98]"
          >
            <Store size={16} /> Mağaza yarat
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Mağazam</h1>
        <Link to="/magazalar/autoplus" className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
          <Eye size={13} /> Mağazaya bax
        </Link>
      </div>

      {/* Shop summary card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="h-24 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=200&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          {currentPlan === "premium" && (
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
              <Crown size={10} /> Premium
            </div>
          )}
        </div>
        <div className="px-5 pb-5 -mt-8 relative">
          <div className="flex items-end gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop"
                alt="Logo"
                className={`w-16 h-16 rounded-xl border-4 border-card object-cover shadow ${currentPlan === "premium" ? "ring-2 ring-[hsl(var(--vip-gold))]" : ""}`}
              />
              {currentPlan === "premium" && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[hsl(var(--vip-gold))] flex items-center justify-center shadow">
                  <Crown size={10} className="text-white" />
                </div>
              )}
            </div>
            <div className="pb-0.5">
              <h2 className="text-base font-bold text-foreground flex items-center gap-1.5">
                AutoPlus MMC
                {currentPlan === "premium" && <Sparkles size={14} className="text-[hsl(var(--vip-gold))]" />}
              </h2>
              <p className="text-xs text-muted-foreground">Nəqliyyat · Bakı</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-lg font-bold text-foreground">48</p>
              <p className="text-[10px] text-muted-foreground">Aktiv elan</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-lg font-bold text-foreground">4.8</p>
              <p className="text-[10px] text-muted-foreground">Reytinq</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-lg font-bold text-foreground">12.4K</p>
              <p className="text-[10px] text-muted-foreground">Baxış</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
        {([
          { key: "overview", label: "Ümumi", icon: Store },
          { key: "upgrade", label: "Paketlər", icon: Crown },
          { key: "edit", label: "Redaktə", icon: Edit },
          { key: "stats", label: "Statistika", icon: BarChart3 },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-md font-medium transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            } ${tab.key === "upgrade" && currentPlan !== "premium" ? "text-[hsl(var(--vip-gold))]" : ""}`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Current package info */}
          <div className={`rounded-xl border bg-card p-4 flex items-center justify-between ${
            currentPlan === "premium" ? "border-[hsl(var(--vip-gold))]" : "border-primary"
          }`}>
            <div className="flex items-center gap-3">
              <currentPkg.icon size={20} className={currentPkg.color} />
              <div>
                <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  {currentPkg.name} Paket
                  {currentPlan === "premium" && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[hsl(var(--vip-gold))]/10 text-[hsl(var(--vip-gold))] font-bold">AKTİV</span>}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentPkg.price} ₼/ay · {currentPlan === "start" ? "5" : currentPlan === "business" ? "50" : "Limitsiz"} elan limiti · Son: 15 Mar 2026
                </p>
              </div>
            </div>
            {currentPlan !== "premium" && (
              <button
                onClick={() => setActiveTab("upgrade")}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
              >
                <Crown size={12} /> Yüksəlt
              </button>
            )}
          </div>

          {/* Premium benefits highlight for non-premium users */}
          {currentPlan !== "premium" && (
            <div className="rounded-xl border border-[hsl(var(--vip-gold))]/30 bg-gradient-to-br from-[hsl(var(--vip-gold))]/5 to-transparent p-4">
              <div className="flex items-center gap-2 mb-3">
                <Crown size={16} className="text-[hsl(var(--vip-gold))]" />
                <p className="text-sm font-bold text-foreground">Premium-a yüksəldin, fərqi hiss et!</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {premiumBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-card/50">
                    <b.icon size={14} className="text-[hsl(var(--vip-gold))] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">{b.title}</p>
                      <p className="text-[10px] text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleUpgrade("premium")}
                className="mt-3 w-full py-2.5 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-sm font-bold hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                Premium ol — 79 ₼/ay
              </button>
            </div>
          )}

          {/* Quick actions */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Link to="/elan-yerlesdir" className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Store size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Elan yerləşdir</p>
                <p className="text-[10px] text-muted-foreground">Mağaza adı altında</p>
              </div>
            </Link>
            <Link to="/magazalar/autoplus" className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ExternalLink size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Mağazanı paylaş</p>
                <p className="text-[10px] text-muted-foreground">ucuztap.az/magazalar/autoplus</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {activeTab === "upgrade" && (
        <div className="space-y-5">
          {/* Package comparison */}
          <div className="grid md:grid-cols-3 gap-4">
            {packages.map((p) => {
              const isCurrent = p.id === currentPlan;
              const isDowngrade = packages.findIndex(x => x.id === p.id) < packages.findIndex(x => x.id === currentPlan);
              return (
                <div
                  key={p.id}
                  className={`relative rounded-xl border-2 p-5 transition-all ${
                    isCurrent
                      ? `${p.borderColor} bg-card shadow-md ring-2 ring-offset-2 ring-offset-background ${p.id === "premium" ? "ring-[hsl(var(--vip-gold))]" : "ring-primary"}`
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  {p.id === "business" && !isCurrent && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">
                      Populyar
                    </span>
                  )}
                  {p.id === "premium" && !isCurrent && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-[hsl(var(--vip-gold))] text-white">
                      Tövsiyə
                    </span>
                  )}
                  {isCurrent && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent">
                      Cari paket
                    </span>
                  )}

                  <div className={`w-10 h-10 rounded-lg ${p.bg} flex items-center justify-center mb-3`}>
                    <p.icon size={20} className={p.color} />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{p.name}</h3>
                  <div className="flex items-baseline gap-0.5 mt-1 mb-4">
                    <span className="text-2xl font-extrabold text-foreground">{p.price}</span>
                    <span className="text-sm text-muted-foreground"> ₼ {p.period}</span>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <Check size={13} className="text-accent shrink-0" /> {f}
                      </li>
                    ))}
                    {p.missing.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground/50 line-through">
                        <X size={13} className="shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <button disabled className="w-full py-2.5 rounded-lg bg-muted text-muted-foreground text-sm font-semibold cursor-default">
                      Cari paket
                    </button>
                  ) : isDowngrade ? (
                    <button disabled className="w-full py-2.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium cursor-default">
                      Aşağı paket
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(p.id)}
                      className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all active:scale-[0.97] ${
                        p.id === "premium"
                          ? "bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white hover:opacity-90"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {p.id === "premium" ? "Premium ol" : "Yüksəlt"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Premium highlight */}
          <div className="rounded-xl border border-[hsl(var(--vip-gold))]/20 bg-gradient-to-br from-[hsl(var(--vip-gold))]/5 via-transparent to-[hsl(var(--vip-gold))]/5 p-5">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
              <Crown size={16} className="text-[hsl(var(--vip-gold))]" />
              Premium mağaza üstünlükləri
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Mağaza ön sıralarda", desc: "Axtarış nəticələrində və mağazalar səhifəsində həmişə yuxarıda görünürsünüz." },
                { title: "Elanlar ön sıralarda", desc: "Bütün elanlarınız kateqoriya siyahısında digər elanlardan üstün tutulur." },
                { title: "Premium nişan", desc: "Qızılı Crown nişanı ilə etibarlılığınızı göstərin." },
                { title: "Aylıq 10 VIP elan", desc: "Hər ay 10 elanınız avtomatik VIP statusu alır — 50₼ qənaət." },
                { title: "Limitsiz elan", desc: "İstədiyiniz qədər elan yerləşdirin, heç bir limit yoxdur." },
                { title: "API girişi", desc: "Elanlarınızı proqramatik idarə edin — bulk əməliyyatlar mümkündür." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-card/60">
                  <Check size={14} className="text-[hsl(var(--vip-gold))] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "edit" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Mağaza məlumatları</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Mağaza adı</label>
                <input type="text" defaultValue="AutoPlus MMC" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Kateqoriya</label>
                <select defaultValue="Nəqliyyat" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none">
                  <option>Nəqliyyat</option>
                  <option>Elektronika</option>
                  <option>Daşınmaz Əmlak</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Təsvir</label>
                <textarea
                  defaultValue="Bakının ən etibarlı avtomobil satış mərkəzi."
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Telefon</label>
                <input type="tel" defaultValue="50 123 45 67" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Veb sayt</label>
                <input type="url" defaultValue="https://autoplus.az" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
              </div>
            </div>
            <button className="mt-2 px-6 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-accent-hover transition-colors active:scale-[0.98]">
              Yadda saxla
            </button>
          </div>
        </div>
      )}

      {activeTab === "stats" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Bu ay baxış", value: "3,247" },
              { label: "Mesaj sayı", value: "89" },
              { label: "Telefon kliki", value: "156" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground text-center py-8">
              Ətraflı statistika diaqramları tezliklə əlavə olunacaq
            </p>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => !paymentProcessing && setShowPayment(false)} />
          <div className="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] p-5 text-white">
              <button
                onClick={() => !paymentProcessing && setShowPayment(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X size={14} />
              </button>
              <Crown size={28} className="mb-2" />
              <h3 className="text-lg font-bold">
                {packages.find(p => p.id === selectedUpgrade)?.name} Paket
              </h3>
              <p className="text-white/80 text-sm">
                {packages.find(p => p.id === selectedUpgrade)?.price} ₼ / ay
              </p>
            </div>

            {/* Summary */}
            <div className="p-5 space-y-4">
              <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Paket</span>
                  <span className="font-semibold text-foreground">{packages.find(p => p.id === selectedUpgrade)?.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Müddət</span>
                  <span className="font-semibold text-foreground">1 ay</span>
                </div>
                <div className="border-t border-border pt-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">Cəmi</span>
                  <span className="text-lg font-extrabold text-foreground">{packages.find(p => p.id === selectedUpgrade)?.price} ₼</span>
                </div>
              </div>

              {/* Card form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Kart nömrəsi</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full h-10 rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Tarix</label>
                    <input type="text" placeholder="MM/YY" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">CVV</label>
                    <input type="text" placeholder="123" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                  </div>
                </div>
              </div>

              <button
                onClick={processPayment}
                disabled={paymentProcessing}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-sm font-bold hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {paymentProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Ödəniş emal olunur...
                  </>
                ) : (
                  <>
                    <Shield size={14} /> Ödəniş et — {packages.find(p => p.id === selectedUpgrade)?.price} ₼
                  </>
                )}
              </button>

              <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1">
                <Shield size={9} /> Payriff ilə təhlükəsiz ödəniş
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyShop;
