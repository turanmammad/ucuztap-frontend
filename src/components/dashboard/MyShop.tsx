import { useState, useRef } from "react";
import { Store, Check, Package, Zap, Crown, BarChart3, Edit, ExternalLink, Eye, X, CreditCard, Shield, Star, TrendingUp, ChevronRight, Sparkles, Camera, Image, Upload, Wand2 } from "lucide-react";
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

const bannerDesignPackages = [
  {
    id: "basic",
    name: "Sadə dizayn",
    price: "15",
    delivery: "24 saat",
    features: ["1 baner dizaynı", "2 reviziya", "JPG/PNG format"],
  },
  {
    id: "pro",
    name: "Professional",
    price: "35",
    delivery: "48 saat",
    popular: true,
    features: ["3 baner variantı", "5 reviziya", "JPG/PNG/WebP", "Sosial media uyğunlaşdırma"],
  },
  {
    id: "premium",
    name: "Premium paket",
    price: "65",
    delivery: "72 saat",
    features: ["5 baner variantı", "Limitsiz reviziya", "Bütün formatlar", "Logo + baner + sosial", "Animasiyalı variant"],
  },
];

const MyShop = () => {
  const [hasShop] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "stats" | "upgrade">("overview");
  const [currentPlan, setCurrentPlan] = useState("business");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState("premium");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Image uploads
  const [logo, setLogo] = useState<string>("https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop");
  const [cover, setCover] = useState<string>("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=200&fit=crop");
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  // Banner design order
  const [showBannerOrder, setShowBannerOrder] = useState(false);
  const [selectedBannerPkg, setSelectedBannerPkg] = useState("pro");
  const [bannerProcessing, setBannerProcessing] = useState(false);
  const [bannerDescription, setBannerDescription] = useState("");

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

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setter(URL.createObjectURL(file));
      toast.success("Şəkil yükləndi");
    }
  };

  const handleBannerOrder = () => {
    if (!bannerDescription.trim()) {
      toast.error("Baner haqqında təsvir yazın");
      return;
    }
    setBannerProcessing(true);
    setTimeout(() => {
      setBannerProcessing(false);
      setShowBannerOrder(false);
      setBannerDescription("");
      toast.success("Sifariş qəbul edildi! 🎨", {
        description: "Dizayner tezliklə sizinlə əlaqə saxlayacaq.",
      });
    }, 1500);
  };

  if (!hasShop) {
    const shopBenefits = [
      { icon: Store, title: "Professional görünüş", desc: "Xüsusi mağaza səhifəsi ilə müştərilərinizə etibarlı görüntü təqdim edin" },
      { icon: TrendingUp, title: "Daha çox satış", desc: "Elanlarınız mağaza altında toplanır, müştərilər sizi asanlıqla tapır" },
      { icon: BarChart3, title: "Ətraflı statistika", desc: "Baxış sayı, klikləmələr və müştəri analizləri ilə satışlarınızı artırın" },
      { icon: Star, title: "Rəy sistemi", desc: "Müştəri rəyləri ilə etibarınızı artırın və yeni müştərilər cəlb edin" },
      { icon: Shield, title: "Verifikasiya nişanı", desc: "Doğrulanmış mağaza statusu ilə etibarlılığınızı göstərin" },
      { icon: Sparkles, title: "Brending imkanları", desc: "Logo, banner və xüsusi dizayn ilə brendinizi yaradın" },
    ];

    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-foreground">Mağazam</h1>

        {/* Hero banner */}
        <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)] pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Store size={32} className="text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-2">Öz mağazanızı açın!</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
              Elanlarınızı bir yerdə toplayın, professional görüntü təqdim edin və satışlarınızı artırın. Minlərlə satıcı artıq mağaza sahibidir!
            </p>
            <Link
              to="/magazalar/yarat"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.98] shadow-md"
            >
              <Store size={16} /> Pulsuz mağaza yarat
            </Link>
          </div>
        </div>

        {/* Benefits grid */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Mağaza sahibi olun, nə qazanırsınız?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {shopBenefits.map((b, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-start gap-3 hover:border-primary/30 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <b.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{b.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packages preview */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Paketlərimiz</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {packages.map((p) => (
              <div key={p.id} className={`rounded-xl border-2 p-4 text-center relative ${p.borderColor} bg-card`}>
                {p.id === "business" && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">Populyar</span>
                )}
                <p.icon size={24} className={`mx-auto ${p.color} mb-2`} />
                <p className="text-sm font-bold text-foreground">{p.name}</p>
                <div className="flex items-baseline justify-center gap-0.5 mt-1 mb-3">
                  <span className="text-xl font-extrabold text-foreground">{p.price}</span>
                  <span className="text-xs text-muted-foreground"> ₼ {p.period}</span>
                </div>
                <ul className="space-y-1 text-left mb-3">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-foreground">
                      <Check size={11} className="text-accent shrink-0" /> {f}
                    </li>
                  ))}
                  {p.features.length > 3 && (
                    <li className="text-[10px] text-muted-foreground pl-5">+{p.features.length - 3} xüsusiyyət daha</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-[hsl(var(--vip-gold))]/30 bg-gradient-to-r from-[hsl(var(--vip-gold))]/5 to-transparent p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-bold text-foreground flex items-center gap-2 justify-center sm:justify-start">
              <Crown size={16} className="text-[hsl(var(--vip-gold))]" />
              Premium mağaza ilə fərqlənin!
            </p>
            <p className="text-xs text-muted-foreground mt-1">Elanlarınız ön sıralarda, mağazanız premium nişanla</p>
          </div>
          <Link
            to="/magazalar/yarat"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-sm font-bold hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            İndi başla →
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

      {/* Shop summary card — matching ShopViewPage hero style */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="h-32 md:h-40 relative overflow-hidden">
          <img src={cover} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${
            currentPlan === "premium"
              ? "bg-gradient-to-t from-[hsl(30,50%,8%)]/90 via-[hsl(30,30%,10%)]/50 to-black/10"
              : "bg-gradient-to-t from-black/80 via-black/40 to-black/10"
          }`} />
          {currentPlan === "premium" && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--vip-gold))]/[0.06] to-transparent pointer-events-none" />
          )}
          {/* Info overlay on cover */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="px-5 pb-4">
              <div className="flex items-end gap-3">
                <div className="relative shrink-0">
                  <img
                    src={logo}
                    alt="Logo"
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-2xl ${
                      currentPlan === "premium"
                        ? "border-[3px] border-[hsl(var(--vip-gold))]/60 ring-2 ring-[hsl(var(--vip-gold))]/30"
                        : "border-[3px] border-white/20 ring-2 ring-white/10"
                    }`}
                  />
                  {currentPlan === "premium" && (
                    <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(var(--vip-gold))] to-[hsl(35,80%,45%)] flex items-center justify-center shadow-lg ring-2 ring-black/20">
                      <Crown size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="pb-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg md:text-xl font-extrabold text-white drop-shadow-lg truncate">
                      AutoPlus MMC
                    </h2>
                    {currentPlan === "premium" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,80%,50%)] text-[9px] font-bold text-white uppercase tracking-wide shadow-lg shrink-0">
                        <Crown size={9} /> Premium
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-white/80 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full font-medium">
                      Nəqliyyat
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-white/80">
                      <Star size={10} fill="currentColor" className="text-[hsl(var(--vip-gold))]" /> 4.8
                    </span>
                    <span className="text-xs text-white/70">Bakı</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {currentPlan === "premium" && (
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
              <Crown size={10} /> Premium
            </div>
          )}
        </div>
        {currentPlan === "premium" && (
          <div className="h-0.5 bg-gradient-to-r from-[hsl(var(--vip-gold))]/60 via-[hsl(var(--vip-gold))] to-[hsl(var(--vip-gold))]/60" />
        )}
        <div className="px-5 py-4">
          <div className="grid grid-cols-3 gap-3">
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
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">Populyar</span>
                  )}
                  {p.id === "premium" && !isCurrent && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-[hsl(var(--vip-gold))] text-white">Tövsiyə</span>
                  )}
                  {isCurrent && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent">Cari paket</span>
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
                    <button disabled className="w-full py-2.5 rounded-lg bg-muted text-muted-foreground text-sm font-semibold cursor-default">Cari paket</button>
                  ) : isDowngrade ? (
                    <button disabled className="w-full py-2.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium cursor-default">Aşağı paket</button>
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
        <div className="space-y-5">
          {/* Logo & Cover upload */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Camera size={15} className="text-primary" /> Profil və baner şəkli
            </h3>
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Logo */}
              <div className="flex flex-col items-center gap-2">
                <div
                  onClick={() => logoRef.current?.click()}
                  className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center cursor-pointer hover:border-primary/40 transition-colors overflow-hidden relative group"
                >
                  {logo ? (
                    <>
                      <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera size={20} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <Camera size={24} className="text-muted-foreground" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-foreground">Logo</p>
                  <p className="text-[10px] text-muted-foreground">200×200 px, JPG/PNG</p>
                  <p className="text-[10px] text-muted-foreground">Maks. 2 MB</p>
                </div>
                <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setLogo)} />
              </div>
              {/* Cover */}
              <div className="flex-1">
                <div
                  onClick={() => coverRef.current?.click()}
                  className="h-32 rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center cursor-pointer hover:border-primary/40 transition-colors overflow-hidden relative group"
                >
                  {cover ? (
                    <>
                      <img src={cover} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Camera size={20} className="text-white" />
                        <span className="text-white text-xs font-medium">Dəyişdir</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <Upload size={24} className="mx-auto text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Baner şəkli yüklə</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-xs font-medium text-foreground">Baner / Üz qabığı</p>
                    <p className="text-[10px] text-muted-foreground">1200×400 px (3:1 nisbət), JPG/PNG/WebP, maks. 5 MB</p>
                  </div>
                </div>
                <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setCover)} />
              </div>
            </div>
          </div>

          {/* AI Banner Design Service */}
          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Wand2 size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  AI ilə Professional Baner Dizaynı
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">YENİ</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Peşəkar dizayner + AI texnologiyası ilə mağazanıza uyğun baner hazırlayaq
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {bannerDesignPackages.map((bp) => (
                <button
                  key={bp.id}
                  onClick={() => { setSelectedBannerPkg(bp.id); setShowBannerOrder(true); }}
                  className={`relative rounded-lg border p-4 text-left transition-all hover:shadow-md active:scale-[0.98] ${
                    bp.popular ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  {bp.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">
                      Populyar
                    </span>
                  )}
                  <p className="text-sm font-bold text-foreground">{bp.name}</p>
                  <div className="flex items-baseline gap-0.5 mt-1 mb-3">
                    <span className="text-xl font-extrabold text-foreground">{bp.price}</span>
                    <span className="text-xs text-muted-foreground"> ₼</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-2">Təslim: {bp.delivery}</p>
                  <ul className="space-y-1">
                    {bp.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-[11px] text-foreground">
                        <Check size={10} className="text-accent shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          {/* Shop info form */}
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
            <button
              onClick={() => toast.success("Məlumatlar yeniləndi")}
              className="mt-2 px-6 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-accent-hover transition-colors active:scale-[0.98]"
            >
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
            <div className="bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] p-5 text-white">
              <button
                onClick={() => !paymentProcessing && setShowPayment(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X size={14} />
              </button>
              <Crown size={28} className="mb-2" />
              <h3 className="text-lg font-bold">{packages.find(p => p.id === selectedUpgrade)?.name} Paket</h3>
              <p className="text-white/80 text-sm">{packages.find(p => p.id === selectedUpgrade)?.price} ₼ / ay</p>
            </div>
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
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Kart nömrəsi</label>
                  <div className="relative">
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full h-10 rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
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
                  <><Shield size={14} /> Ödəniş et — {packages.find(p => p.id === selectedUpgrade)?.price} ₼</>
                )}
              </button>
              <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1">
                <Shield size={9} /> Payriff ilə təhlükəsiz ödəniş
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Banner Design Order Modal */}
      {showBannerOrder && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => !bannerProcessing && setShowBannerOrder(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Wand2 size={18} className="text-primary" />
                  Baner dizaynı sifarişi
                </h3>
                <button onClick={() => !bannerProcessing && setShowBannerOrder(false)} className="p-1 rounded-md hover:bg-muted transition-colors">
                  <X size={18} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Selected package */}
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {bannerDesignPackages.find(b => b.id === selectedBannerPkg)?.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Təslim: {bannerDesignPackages.find(b => b.id === selectedBannerPkg)?.delivery}
                      </p>
                    </div>
                    <span className="text-lg font-extrabold text-foreground">
                      {bannerDesignPackages.find(b => b.id === selectedBannerPkg)?.price} ₼
                    </span>
                  </div>
                </div>

                {/* Select package */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Paket seçin</p>
                  <div className="flex gap-2">
                    {bannerDesignPackages.map((bp) => (
                      <button
                        key={bp.id}
                        onClick={() => setSelectedBannerPkg(bp.id)}
                        className={`flex-1 py-2 px-2 rounded-lg border text-xs font-medium transition-all ${
                          selectedBannerPkg === bp.id
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {bp.name}
                        <br />
                        <span className="font-bold">{bp.price} ₼</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimensions info */}
                <div className="rounded-lg bg-muted/50 p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-foreground">Baner ölçüləri:</p>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-muted-foreground">
                    <span>• Mağaza baneri: <strong className="text-foreground">1200×400 px</strong></span>
                    <span>• Sosial media: <strong className="text-foreground">1200×630 px</strong></span>
                    <span>• Mobil baner: <strong className="text-foreground">800×400 px</strong></span>
                    <span>• Instagram: <strong className="text-foreground">1080×1080 px</strong></span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Baner haqqında təsvir *
                  </label>
                  <textarea
                    value={bannerDescription}
                    onChange={(e) => setBannerDescription(e.target.value)}
                    rows={4}
                    placeholder="Məs: Avtomobil satış mağazası üçün modern görünüşlü baner. Əsas rənglər: qara, qızılı. Logo-nu banerin sol tərəfinə yerləşdirin..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>

                {/* Logo upload option */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles size={12} className="text-primary" />
                  <span>Mövcud logonuz avtomatik istifadə olunacaq</span>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-border flex gap-2">
                <button
                  onClick={() => setShowBannerOrder(false)}
                  className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  onClick={handleBannerOrder}
                  disabled={!bannerDescription.trim() || bannerProcessing}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  {bannerProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Göndərilir...
                    </>
                  ) : (
                    <>
                      <Wand2 size={14} />
                      Sifariş et — {bannerDesignPackages.find(b => b.id === selectedBannerPkg)?.price} ₼
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyShop;