import { useState, useRef } from "react";
import { Store, Check, Package, Zap, Crown, BarChart3, Edit, ExternalLink, Eye, X, CreditCard, Shield, Star, TrendingUp, ChevronRight, Sparkles, Camera, Upload, Wand2 } from "lucide-react";
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
    color: "text-accent",
    bg: "bg-accent/10",
    borderColor: "border-accent",
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

const bannerDesignPackages = [
  { id: "basic", name: "Sadə", price: "15", delivery: "24 saat", features: ["1 baner", "2 reviziya", "JPG/PNG"] },
  { id: "pro", name: "Professional", price: "35", delivery: "48 saat", popular: true, features: ["3 variant", "5 reviziya", "Sosial media"] },
  { id: "premium", name: "Premium", price: "65", delivery: "72 saat", features: ["5 variant", "Limitsiz reviziya", "Animasiya"] },
];

const MyShop = () => {
  const [hasShop] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "stats" | "upgrade">("overview");
  const [currentPlan, setCurrentPlan] = useState("business");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState("premium");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [logo, setLogo] = useState<string>("https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop");
  const [cover, setCover] = useState<string>("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=200&fit=crop");
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

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
      toast.success(selectedUpgrade === "premium" ? "Premium aktivləşdirildi! 🎉" : "Paket yeniləndi!");
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setter(URL.createObjectURL(file));
      toast.success("Şəkil yükləndi");
    }
  };

  const handleBannerOrder = () => {
    if (!bannerDescription.trim()) { toast.error("Təsvir yazın"); return; }
    setBannerProcessing(true);
    setTimeout(() => {
      setBannerProcessing(false);
      setShowBannerOrder(false);
      setBannerDescription("");
      toast.success("Sifariş qəbul edildi! 🎨");
    }, 1500);
  };

  // ═══ No Shop State ═══
  if (!hasShop) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-foreground">Mağazam</h1>

        {/* Hero */}
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Store size={28} className="text-accent" />
          </div>
          <h2 className="text-xl font-extrabold text-foreground mb-1.5">Öz mağazanızı açın</h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
            Elanlarınızı bir yerdə toplayın, professional görüntü yaradın, daha çox satış edin.
          </p>
          <Link
            to="/magazalar/yarat"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.98]"
          >
            <Store size={16} /> Pulsuz mağaza yarat
          </Link>
        </div>

        {/* Benefits — compact 2-col */}
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: Store, title: "Professional görünüş", desc: "Xüsusi mağaza səhifəsi ilə fərqlənin" },
            { icon: TrendingUp, title: "Daha çox satış", desc: "Elanlarınız mağaza altında toplanır" },
            { icon: BarChart3, title: "Ətraflı statistika", desc: "Baxış, klik və müştəri analizləri" },
            { icon: Star, title: "Rəy sistemi", desc: "Müştəri rəyləri ilə etibar artırın" },
            { icon: Shield, title: "Verifikasiya", desc: "Doğrulanmış mağaza statusu" },
            { icon: Sparkles, title: "Brending", desc: "Logo, banner və xüsusi dizayn" },
          ].map((b, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-3.5 flex items-center gap-3 hover:border-accent/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <b.icon size={16} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{b.title}</p>
                <p className="text-[11px] text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Packages — minimal */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Paketlər</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {packages.map((p) => {
              const PkgIcon = p.icon;
              return (
                <div key={p.id} className={`rounded-xl border-2 p-4 text-center relative ${p.borderColor} bg-card`}>
                  {p.id === "business" && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-accent text-accent-foreground">Populyar</span>
                  )}
                  <PkgIcon size={22} className={`mx-auto ${p.color} mb-2`} />
                  <p className="text-sm font-bold text-foreground">{p.name}</p>
                  <div className="flex items-baseline justify-center gap-0.5 mt-1 mb-3">
                    <span className="text-xl font-extrabold text-foreground">{p.price}</span>
                    <span className="text-xs text-muted-foreground"> ₼ {p.period}</span>
                  </div>
                  <ul className="space-y-1 text-left">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-foreground">
                        <Check size={11} className="text-accent shrink-0" /> {f}
                      </li>
                    ))}
                    {p.features.length > 3 && (
                      <li className="text-[10px] text-muted-foreground pl-5">+{p.features.length - 3} daha</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium CTA */}
        <div className="rounded-xl border border-[hsl(var(--vip-gold))]/30 bg-[hsl(var(--vip-gold))]/[0.03] p-4 flex flex-col sm:flex-row items-center gap-4">
          <Crown size={20} className="text-[hsl(var(--vip-gold))] shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-bold text-foreground">Premium mağaza ilə fərqlənin!</p>
            <p className="text-xs text-muted-foreground">Elanlarınız ön sıralarda, premium nişan</p>
          </div>
          <Link
            to="/magazalar/yarat"
            className="shrink-0 px-5 py-2 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-sm font-bold hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            İndi başla →
          </Link>
        </div>
      </div>
    );
  }

  // ═══ Has Shop State ═══
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Mağazam</h1>
        <Link to="/magazalar/autoplus" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Eye size={13} /> Mağazaya bax
        </Link>
      </div>

      {/* Shop Card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="h-28 md:h-36 relative overflow-hidden">
          <img src={cover} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${
            currentPlan === "premium"
              ? "bg-gradient-to-t from-[hsl(30,50%,8%)]/90 via-black/40 to-transparent"
              : "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          }`} />
          {currentPlan === "premium" && (
            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Crown size={9} /> Premium
            </span>
          )}
          <div className="absolute bottom-3 left-4 flex items-end gap-3">
            <img
              src={logo}
              alt="Logo"
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shadow-lg ${
                currentPlan === "premium"
                  ? "border-2 border-[hsl(var(--vip-gold))]/50"
                  : "border-2 border-white/20"
              }`}
            />
            <div className="pb-0.5">
              <h2 className="text-base md:text-lg font-bold text-white drop-shadow-md">AutoPlus MMC</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-white/70">Nəqliyyat</span>
                <span className="inline-flex items-center gap-0.5 text-[11px] text-white/70">
                  <Star size={10} fill="currentColor" className="text-[hsl(var(--vip-gold))]" /> 4.8
                </span>
              </div>
            </div>
          </div>
        </div>
        {currentPlan === "premium" && (
          <div className="h-0.5 bg-gradient-to-r from-[hsl(var(--vip-gold))]/40 via-[hsl(var(--vip-gold))] to-[hsl(var(--vip-gold))]/40" />
        )}
        <div className="px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Elan", value: "48" },
              { label: "Reytinq", value: "4.8" },
              { label: "Baxış", value: "12.4K" },
            ].map(s => (
              <div key={s.label} className="rounded-lg bg-muted/50 py-2.5 text-center">
                <p className="text-base font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-0.5 overflow-x-auto">
        {([
          { key: "overview", label: "Ümumi", icon: Store },
          { key: "upgrade", label: "Paketlər", icon: Crown },
          { key: "edit", label: "Redaktə", icon: Edit },
          { key: "stats", label: "Statistika", icon: BarChart3 },
        ] as const).map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TabIcon size={13} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ═══ Overview Tab ═══ */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Current plan */}
          <div className={`rounded-xl border bg-card p-4 flex items-center justify-between ${
            currentPlan === "premium" ? "border-[hsl(var(--vip-gold))]/40" : "border-accent/40"
          }`}>
            <div className="flex items-center gap-3">
              {(() => { const PkgIcon = currentPkg.icon; return <PkgIcon size={18} className={currentPkg.color} />; })()}
              <div>
                <p className="text-sm font-bold text-foreground">{currentPkg.name} Paket</p>
                <p className="text-[11px] text-muted-foreground">{currentPkg.price} ₼/ay · Son: 15 Mar 2026</p>
              </div>
            </div>
            {currentPlan !== "premium" && (
              <button
                onClick={() => setActiveTab("upgrade")}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-[11px] font-bold hover:opacity-90 flex items-center gap-1"
              >
                <Crown size={11} /> Yüksəlt
              </button>
            )}
          </div>

          {/* Premium upsell */}
          {currentPlan !== "premium" && (
            <div className="rounded-xl border border-[hsl(var(--vip-gold))]/20 bg-[hsl(var(--vip-gold))]/[0.03] p-4">
              <p className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                <Crown size={15} className="text-[hsl(var(--vip-gold))]" />
                Premium-a yüksəl
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { title: "Ön sıralarda", desc: "Mağaza və elanlar yuxarıda" },
                  { title: "10 VIP elan/ay", desc: "50₼ qənaət" },
                  { title: "Premium nişan", desc: "Qızılı Crown ikonu" },
                  { title: "7/24 dəstək", desc: "Prioritet xətt" },
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-card">
                    <Check size={12} className="text-[hsl(var(--vip-gold))] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-semibold text-foreground">{b.title}</p>
                      <p className="text-[10px] text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleUpgrade("premium")}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-sm font-bold hover:opacity-90 active:scale-[0.98]"
              >
                Premium ol — 79 ₼/ay
              </button>
            </div>
          )}

          {/* Quick actions */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Link to="/elan-yerlesdir" className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 hover:border-accent/30 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <Store size={16} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">Elan yerləşdir</p>
                <p className="text-[10px] text-muted-foreground">Mağaza adı altında</p>
              </div>
            </Link>
            <Link to="/magazalar/autoplus" className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 hover:border-accent/30 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <ExternalLink size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">Mağazanı paylaş</p>
                <p className="text-[10px] text-muted-foreground">ucuztap.az/magazalar/autoplus</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* ═══ Upgrade Tab ═══ */}
      {activeTab === "upgrade" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            {packages.map((p) => {
              const isCurrent = p.id === currentPlan;
              const isDowngrade = packages.findIndex(x => x.id === p.id) < packages.findIndex(x => x.id === currentPlan);
              const PkgIcon = p.icon;
              return (
                <div
                  key={p.id}
                  className={`relative rounded-xl border-2 p-4 transition-all ${
                    isCurrent
                      ? `${p.borderColor} bg-card shadow-md`
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent">Cari</span>
                  )}
                  <PkgIcon size={20} className={`${p.color} mb-2`} />
                  <h3 className="text-sm font-bold text-foreground">{p.name}</h3>
                  <div className="flex items-baseline gap-0.5 mt-1 mb-3">
                    <span className="text-xl font-extrabold text-foreground">{p.price}</span>
                    <span className="text-xs text-muted-foreground"> ₼ {p.period}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-foreground">
                        <Check size={12} className="text-accent shrink-0" /> {f}
                      </li>
                    ))}
                    {p.missing.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground/50 line-through">
                        <X size={12} className="shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  {isCurrent ? (
                    <button disabled className="w-full py-2 rounded-lg bg-muted text-muted-foreground text-xs font-medium cursor-default">Cari paket</button>
                  ) : isDowngrade ? (
                    <button disabled className="w-full py-2 rounded-lg bg-muted text-muted-foreground text-xs font-medium cursor-default">Aşağı</button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(p.id)}
                      className={`w-full py-2 rounded-lg text-xs font-bold transition-all active:scale-[0.97] ${
                        p.id === "premium"
                          ? "bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white"
                          : "bg-accent text-accent-foreground hover:bg-accent-hover"
                      }`}
                    >
                      Yüksəlt
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ Edit Tab ═══ */}
      {activeTab === "edit" && (
        <div className="space-y-4">
          {/* Logo & Cover */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Camera size={14} className="text-muted-foreground" /> Profil və baner
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  onClick={() => logoRef.current?.click()}
                  className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center cursor-pointer hover:border-accent/40 transition-colors overflow-hidden relative group"
                >
                  {logo ? (
                    <>
                      <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera size={18} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <Camera size={20} className="text-muted-foreground" />
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">Logo 200×200</span>
                <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setLogo)} />
              </div>
              <div className="flex-1">
                <div
                  onClick={() => coverRef.current?.click()}
                  className="h-28 rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center cursor-pointer hover:border-accent/40 transition-colors overflow-hidden relative group"
                >
                  {cover ? (
                    <>
                      <img src={cover} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera size={18} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <Upload size={20} className="mx-auto text-muted-foreground mb-1" />
                      <span className="text-[10px] text-muted-foreground">Baner 1200×400</span>
                    </div>
                  )}
                </div>
                <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setCover)} />
              </div>
            </div>
          </div>

          {/* AI Banner */}
          <div className="rounded-xl border border-dashed border-accent/30 bg-accent/[0.03] p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <Wand2 size={16} className="text-accent" />
              <div>
                <h3 className="text-sm font-bold text-foreground">AI Baner Dizaynı</h3>
                <p className="text-[10px] text-muted-foreground">Peşəkar dizayner + AI ilə baner</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {bannerDesignPackages.map((bp) => (
                <button
                  key={bp.id}
                  onClick={() => { setSelectedBannerPkg(bp.id); setShowBannerOrder(true); }}
                  className={`rounded-lg border p-3 text-center transition-all hover:shadow-sm active:scale-[0.98] ${
                    bp.popular ? "border-accent bg-accent/5" : "border-border bg-card"
                  }`}
                >
                  <p className="text-xs font-bold text-foreground">{bp.name}</p>
                  <p className="text-base font-extrabold text-foreground mt-0.5">{bp.price} ₼</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">{bp.delivery}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Shop info form */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Mağaza məlumatları</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Mağaza adı</label>
                <input type="text" defaultValue="AutoPlus MMC" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Kateqoriya</label>
                <select defaultValue="Nəqliyyat" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none">
                  <option>Nəqliyyat</option><option>Elektronika</option><option>Daşınmaz Əmlak</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Təsvir</label>
                <textarea defaultValue="Bakının ən etibarlı avtomobil satış mərkəzi." rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none" />
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
              className="mt-1 px-5 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-accent-hover transition-colors active:scale-[0.98]"
            >
              Yadda saxla
            </button>
          </div>
        </div>
      )}

      {/* ═══ Stats Tab ═══ */}
      {activeTab === "stats" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Bu ay baxış", value: "3,247", trend: "+12%" },
              { label: "Mesaj sayı", value: "89", trend: "+5%" },
              { label: "Telefon kliki", value: "156", trend: "+8%" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                <p className="text-[10px] text-accent font-medium mt-1">{s.trend}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <BarChart3 size={32} className="mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">Ətraflı diaqramlar tezliklə</p>
          </div>
        </div>
      )}

      {/* ═══ Payment Modal ═══ */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => !paymentProcessing && setShowPayment(false)} />
          <div className="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] p-5 text-white">
              <button onClick={() => !paymentProcessing && setShowPayment(false)} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                <X size={14} />
              </button>
              <Crown size={24} className="mb-2" />
              <h3 className="text-lg font-bold">{packages.find(p => p.id === selectedUpgrade)?.name} Paket</h3>
              <p className="text-white/80 text-sm">{packages.find(p => p.id === selectedUpgrade)?.price} ₼ / ay</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Kart nömrəsi</label>
                  <div className="relative">
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full h-10 rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Tarix</label>
                    <input type="text" placeholder="MM/YY" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">CVV</label>
                    <input type="text" placeholder="123" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
              </div>
              <button
                onClick={processPayment}
                disabled={paymentProcessing}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {paymentProcessing ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Emal olunur...</>
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

      {/* ═══ Banner Order Modal ═══ */}
      {showBannerOrder && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => !bannerProcessing && setShowBannerOrder(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Wand2 size={16} className="text-accent" /> Baner sifarişi
                </h3>
                <button onClick={() => !bannerProcessing && setShowBannerOrder(false)} className="p-1 rounded-md hover:bg-muted"><X size={16} className="text-muted-foreground" /></button>
              </div>
              <div className="px-5 py-4 space-y-3 max-h-[60vh] overflow-y-auto">
                <div className="flex gap-2">
                  {bannerDesignPackages.map((bp) => (
                    <button
                      key={bp.id}
                      onClick={() => setSelectedBannerPkg(bp.id)}
                      className={`flex-1 py-2 px-2 rounded-lg border text-xs font-medium transition-all ${
                        selectedBannerPkg === bp.id ? "border-accent bg-accent/5 text-foreground" : "border-border text-muted-foreground"
                      }`}
                    >
                      {bp.name} — <span className="font-bold">{bp.price} ₼</span>
                    </button>
                  ))}
                </div>
                <textarea
                  value={bannerDescription}
                  onChange={(e) => setBannerDescription(e.target.value)}
                  rows={4}
                  placeholder="Baner haqqında təsvir yazın..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Sparkles size={10} className="text-accent" /> Mövcud logonuz avtomatik istifadə olunacaq
                </p>
              </div>
              <div className="px-5 py-3 border-t border-border flex gap-2">
                <button onClick={() => setShowBannerOrder(false)} className="flex-1 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted">Ləğv</button>
                <button
                  onClick={handleBannerOrder}
                  disabled={!bannerDescription.trim() || bannerProcessing}
                  className="flex-1 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-accent-hover disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {bannerProcessing ? (
                    <><div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" /> Göndərilir...</>
                  ) : (
                    <><Wand2 size={13} /> Sifariş — {bannerDesignPackages.find(b => b.id === selectedBannerPkg)?.price} ₼</>
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
