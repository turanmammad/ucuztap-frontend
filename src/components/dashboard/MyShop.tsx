import { useState, useRef } from "react";
import { Store, Check, Package, Zap, Crown, BarChart3, Edit, ExternalLink, Eye, X, CreditCard, Shield, Star, TrendingUp, ChevronRight, Sparkles, Camera, Upload, Wand2, Building2, Megaphone, Settings2, Globe, Headphones, Users, Layout, Palette, MonitorPlay } from "lucide-react";
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
    gradient: "",
    features: [
      { text: "5 elan limiti", included: true },
      { text: "Standart görünüş", included: true },
      { text: "Əsas statistika", included: true },
      { text: "Mağaza səhifəsi", included: false },
      { text: "Logo brending", included: false },
      { text: "Ön sırada göstərilmə", included: false },
      { text: "VIP elanlar", included: false },
      { text: "Prioritet dəstək", included: false },
      { text: "API girişi", included: false },
      { text: "Reklam baner yerləri", included: false },
    ],
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
    gradient: "",
    popular: true,
    features: [
      { text: "50 elan limiti", included: true },
      { text: "Mağaza səhifəsi", included: true },
      { text: "Logo brending", included: true },
      { text: "Ətraflı statistika", included: true },
      { text: "Prioritet dəstək", included: true },
      { text: "Ön sırada göstərilmə", included: false },
      { text: "VIP elanlar", included: false },
      { text: "API girişi", included: false },
      { text: "Reklam baner yerləri", included: false },
    ],
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
    gradient: "from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)]",
    features: [
      { text: "Limitsiz elan", included: true },
      { text: "Premium mağaza nişanı", included: true },
      { text: "Mağaza ön sıralarda", included: true },
      { text: "Məhsullar ön sıralarda", included: true },
      { text: "Aylıq 10 VIP elan", included: true },
      { text: "Logo brending", included: true },
      { text: "Ətraflı statistika", included: true },
      { text: "Prioritet dəstək", included: true },
      { text: "API girişi", included: true },
      { text: "Reklam baner yerləri", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "199",
    period: "/ ay",
    icon: Building2,
    color: "text-[hsl(260,70%,60%)]",
    bg: "bg-[hsl(260,70%,60%)]/10",
    borderColor: "border-[hsl(260,70%,60%)]",
    gradient: "from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)]",
    features: [
      { text: "Limitsiz elan", included: true },
      { text: "Enterprise nişanı", included: true },
      { text: "Mağaza ön sıralarda", included: true },
      { text: "Məhsullar ön sıralarda", included: true },
      { text: "Aylıq 30 VIP elan", included: true },
      { text: "Tam brending paketi", included: true },
      { text: "Real-time analitika", included: true },
      { text: "24/7 şəxsi menecer", included: true },
      { text: "Full API girişi", included: true },
      { text: "Reklam baner yerləri", included: true },
      { text: "Fərdi dizayn", included: true },
      { text: "Multi-user idarəetmə", included: true },
    ],
    customizable: true,
  },
];

const bannerDesignPackages = [
  { id: "basic", name: "Sadə", price: "15", delivery: "24 saat", features: ["1 baner", "2 reviziya", "JPG/PNG"] },
  { id: "pro", name: "Professional", price: "35", delivery: "48 saat", popular: true, features: ["3 variant", "5 reviziya", "Sosial media"] },
  { id: "premium", name: "Premium", price: "65", delivery: "72 saat", features: ["5 variant", "Limitsiz reviziya", "Animasiya"] },
];

const adBannerPlacements = [
  { id: "homepage_top", name: "Ana səhifə — yuxarı baner", size: "1200×200", price: "149", period: "/ ay", views: "~50K/ay", hot: true },
  { id: "homepage_side", name: "Ana səhifə — yan panel", size: "300×600", price: "99", period: "/ ay", views: "~40K/ay" },
  { id: "category_top", name: "Kateqoriya səhifəsi — yuxarı", size: "1200×200", price: "79", period: "/ ay", views: "~25K/ay" },
  { id: "search_results", name: "Axtarış nəticələri — arası", size: "728×90", price: "59", period: "/ ay", views: "~30K/ay" },
  { id: "ad_detail_side", name: "Elan detalı — yan panel", size: "300×250", price: "49", period: "/ ay", views: "~20K/ay" },
  { id: "mobile_bottom", name: "Mobil — alt baner", size: "320×100", price: "39", period: "/ ay", views: "~35K/ay" },
];

const enterpriseAddons = [
  { id: "custom_domain", name: "Xüsusi domen", desc: "sizinmarka.ucuztap.az", price: "29", icon: Globe },
  { id: "dedicated_support", name: "Şəxsi menecer", desc: "24/7 prioritet dəstək", price: "49", icon: Headphones },
  { id: "team_access", name: "Komanda girişi", desc: "5 istifadəçi əlavə", price: "39", icon: Users },
  { id: "custom_design", name: "Fərdi mağaza dizaynı", desc: "Unikal şablon və rənglər", price: "79", icon: Palette },
  { id: "analytics_pro", name: "Pro analitika", desc: "Real-time data, eksport", price: "29", icon: BarChart3 },
  { id: "api_unlimited", name: "Limitsiz API", desc: "Tam inteqrasiya imkanı", price: "49", icon: Settings2 },
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

  // Enterprise customization
  const [showEnterpriseCustomizer, setShowEnterpriseCustomizer] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedBannerPlacements, setSelectedBannerPlacements] = useState<string[]>([]);

  const currentPkg = packages.find(p => p.id === currentPlan)!;

  const handleUpgrade = (pkgId: string) => {
    if (pkgId === "enterprise") {
      setShowEnterpriseCustomizer(true);
      return;
    }
    setSelectedUpgrade(pkgId);
    setShowPayment(true);
  };

  const processPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPayment(false);
      setShowEnterpriseCustomizer(false);
      setCurrentPlan(selectedUpgrade);
      setActiveTab("overview");
      toast.success(selectedUpgrade === "enterprise" ? "Enterprise aktivləşdirildi! 🚀" : selectedUpgrade === "premium" ? "Premium aktivləşdirildi! 🎉" : "Paket yeniləndi!");
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

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleBannerPlacement = (id: string) => {
    setSelectedBannerPlacements(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const enterpriseTotal = () => {
    const base = 199;
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = enterpriseAddons.find(a => a.id === id);
      return sum + (addon ? parseInt(addon.price) : 0);
    }, 0);
    const bannersTotal = selectedBannerPlacements.reduce((sum, id) => {
      const placement = adBannerPlacements.find(p => p.id === id);
      return sum + (placement ? parseInt(placement.price) : 0);
    }, 0);
    return base + addonsTotal + bannersTotal;
  };

  // ═══ Package Card Component ═══
  const PackageCard = ({ p, isCurrent, isDowngrade, compact = false }: { p: typeof packages[0]; isCurrent: boolean; isDowngrade: boolean; compact?: boolean }) => {
    const PkgIcon = p.icon;
    const isEnterprise = p.id === "enterprise";
    const isPremium = p.id === "premium";

    return (
      <div
        className={`relative rounded-2xl border-2 transition-all overflow-hidden ${
          isCurrent
            ? `${p.borderColor} bg-card shadow-lg ring-1 ring-${p.borderColor}`
            : isEnterprise
            ? "border-[hsl(260,70%,60%)]/50 bg-gradient-to-b from-[hsl(260,70%,60%)]/[0.03] to-card hover:border-[hsl(260,70%,60%)]"
            : isPremium
            ? "border-[hsl(var(--vip-gold))]/30 bg-gradient-to-b from-[hsl(var(--vip-gold))]/[0.03] to-card hover:border-[hsl(var(--vip-gold))]"
            : "border-border bg-card hover:border-muted-foreground/30"
        }`}
      >
        {/* Top accent bar */}
        {(isEnterprise || isPremium) && (
          <div className={`h-1 bg-gradient-to-r ${p.gradient}`} />
        )}

        {/* Badges */}
        {p.id === "business" && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent text-accent-foreground">
            Populyar
          </span>
        )}
        {isCurrent && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent">
            ✓ Cari
          </span>
        )}
        {isEnterprise && !isCurrent && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[hsl(260,70%,60%)]/10 text-[hsl(260,70%,60%)]">
            Fərdiləşdir
          </span>
        )}

        <div className="p-5">
          {/* Icon & Name */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
            isEnterprise ? "bg-[hsl(260,70%,60%)]/10" : isPremium ? "bg-[hsl(var(--vip-gold))]/10" : p.bg
          }`}>
            <PkgIcon size={20} className={p.color} />
          </div>
          <h3 className="text-base font-bold text-foreground">{p.name}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 mb-3">
            {p.id === "start" && "Başlanğıc üçün ideal"}
            {p.id === "business" && "Kiçik biznes üçün"}
            {p.id === "premium" && "Professional satıcılar üçün"}
            {p.id === "enterprise" && "Böyük şirkətlər üçün"}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-4">
            <span className={`text-3xl font-extrabold ${
              isEnterprise ? "text-[hsl(260,70%,60%)]" : isPremium ? "text-[hsl(var(--vip-gold))]" : "text-foreground"
            }`}>{p.price}</span>
            <span className="text-sm text-muted-foreground">₼ {p.period}</span>
          </div>

          {/* Features */}
          <ul className={`space-y-1.5 mb-5 ${compact ? "max-h-48 overflow-y-auto" : ""}`}>
            {p.features.map((f) => (
              <li key={f.text} className={`flex items-center gap-2 text-xs ${f.included ? "text-foreground" : "text-muted-foreground/40"}`}>
                {f.included ? (
                  <Check size={13} className={`shrink-0 ${isEnterprise ? "text-[hsl(260,70%,60%)]" : isPremium ? "text-[hsl(var(--vip-gold))]" : "text-accent"}`} />
                ) : (
                  <X size={13} className="shrink-0" />
                )}
                <span className={!f.included ? "line-through" : ""}>{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Button */}
          {isCurrent ? (
            <button disabled className="w-full py-2.5 rounded-xl bg-muted text-muted-foreground text-xs font-medium cursor-default">
              Cari paket
            </button>
          ) : isDowngrade ? (
            <button disabled className="w-full py-2.5 rounded-xl bg-muted text-muted-foreground text-xs font-medium cursor-default">
              Aşağı paket
            </button>
          ) : (
            <button
              onClick={() => handleUpgrade(p.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.97] ${
                isEnterprise
                  ? "bg-gradient-to-r from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)] text-white hover:opacity-90"
                  : isPremium
                  ? "bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white hover:opacity-90"
                  : "bg-accent text-accent-foreground hover:bg-accent-hover"
              }`}
            >
              {isEnterprise ? "Fərdiləşdir və al" : "Yüksəlt"}
            </button>
          )}
        </div>
      </div>
    );
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

        {/* Benefits */}
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

        {/* Packages */}
        <div>
          <h3 className="text-base font-bold text-foreground mb-4">Paketlər</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {packages.map((p) => (
              <PackageCard
                key={p.id}
                p={p}
                isCurrent={false}
                isDowngrade={false}
                compact
              />
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="rounded-2xl border border-[hsl(260,70%,60%)]/30 bg-gradient-to-r from-[hsl(260,70%,60%)]/[0.05] to-[hsl(280,60%,50%)]/[0.05] p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[hsl(260,70%,60%)]/10 flex items-center justify-center shrink-0">
            <Building2 size={22} className="text-[hsl(260,70%,60%)]" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-bold text-foreground">Enterprise ilə tam gücə çatın!</p>
            <p className="text-xs text-muted-foreground">Reklam baner yerləri, fərdi dizayn, şəxsi menecer və daha çox</p>
          </div>
          <Link
            to="/magazalar/yarat"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)] text-white text-sm font-bold hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Fərdiləşdir →
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
            currentPlan === "enterprise"
              ? "bg-gradient-to-t from-[hsl(260,20%,8%)]/90 via-black/40 to-transparent"
              : currentPlan === "premium"
              ? "bg-gradient-to-t from-[hsl(30,50%,8%)]/90 via-black/40 to-transparent"
              : "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          }`} />
          {currentPlan === "enterprise" && (
            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)] text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Building2 size={9} /> Enterprise
            </span>
          )}
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
                currentPlan === "enterprise"
                  ? "border-2 border-[hsl(260,70%,60%)]/50"
                  : currentPlan === "premium"
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
        {currentPlan === "enterprise" && (
          <div className="h-0.5 bg-gradient-to-r from-[hsl(260,70%,60%)]/40 via-[hsl(260,70%,60%)] to-[hsl(260,70%,60%)]/40" />
        )}
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
            currentPlan === "enterprise" ? "border-[hsl(260,70%,60%)]/40" : currentPlan === "premium" ? "border-[hsl(var(--vip-gold))]/40" : "border-accent/40"
          }`}>
            <div className="flex items-center gap-3">
              {(() => { const PkgIcon = currentPkg.icon; return <PkgIcon size={18} className={currentPkg.color} />; })()}
              <div>
                <p className="text-sm font-bold text-foreground">{currentPkg.name} Paket</p>
                <p className="text-[11px] text-muted-foreground">{currentPkg.price} ₼/ay · Son: 15 Mar 2026</p>
              </div>
            </div>
            {currentPlan !== "enterprise" && (
              <button
                onClick={() => setActiveTab("upgrade")}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold hover:opacity-90 flex items-center gap-1 ${
                  currentPlan === "premium"
                    ? "bg-gradient-to-r from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)] text-white"
                    : "bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white"
                }`}
              >
                {currentPlan === "premium" ? <Building2 size={11} /> : <Crown size={11} />} Yüksəlt
              </button>
            )}
          </div>

          {/* Upsell */}
          {currentPlan !== "enterprise" && (
            <div className={`rounded-xl border p-4 ${
              currentPlan === "premium"
                ? "border-[hsl(260,70%,60%)]/20 bg-[hsl(260,70%,60%)]/[0.03]"
                : "border-[hsl(var(--vip-gold))]/20 bg-[hsl(var(--vip-gold))]/[0.03]"
            }`}>
              <p className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                {currentPlan === "premium" ? (
                  <><Building2 size={15} className="text-[hsl(260,70%,60%)]" /> Enterprise-ə yüksəl</>
                ) : (
                  <><Crown size={15} className="text-[hsl(var(--vip-gold))]" /> Premium-a yüksəl</>
                )}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(currentPlan === "premium" ? [
                  { title: "Reklam baner yerləri", desc: "Ana səhifə, kateqoriya..." },
                  { title: "30 VIP elan/ay", desc: "3x daha çox VIP" },
                  { title: "Fərdi dizayn", desc: "Unikal mağaza görünüşü" },
                  { title: "24/7 şəxsi menecer", desc: "Prioritet dəstək xətti" },
                ] : [
                  { title: "Ön sıralarda", desc: "Mağaza və elanlar yuxarıda" },
                  { title: "10 VIP elan/ay", desc: "50₼ qənaət" },
                  { title: "Premium nişan", desc: "Qızılı Crown ikonu" },
                  { title: "7/24 dəstək", desc: "Prioritet xətt" },
                ]).map((b, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-card">
                    <Check size={12} className={`shrink-0 mt-0.5 ${
                      currentPlan === "premium" ? "text-[hsl(260,70%,60%)]" : "text-[hsl(var(--vip-gold))]"
                    }`} />
                    <div>
                      <p className="text-[11px] font-semibold text-foreground">{b.title}</p>
                      <p className="text-[10px] text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleUpgrade(currentPlan === "premium" ? "enterprise" : "premium")}
                className={`w-full py-2.5 rounded-lg text-sm font-bold hover:opacity-90 active:scale-[0.98] ${
                  currentPlan === "premium"
                    ? "bg-gradient-to-r from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)] text-white"
                    : "bg-gradient-to-r from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)] text-white"
                }`}
              >
                {currentPlan === "premium" ? "Enterprise ol — 199 ₼/ay" : "Premium ol — 79 ₼/ay"}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {packages.map((p) => {
              const isCurrent = p.id === currentPlan;
              const isDowngrade = packages.findIndex(x => x.id === p.id) < packages.findIndex(x => x.id === currentPlan);
              return (
                <PackageCard key={p.id} p={p} isCurrent={isCurrent} isDowngrade={isDowngrade} />
              );
            })}
          </div>

          {/* Feature comparison table */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">Paket müqayisəsi</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium">Xüsusiyyət</th>
                    {packages.map(p => (
                      <th key={p.id} className={`p-3 text-center font-bold ${p.id === currentPlan ? "text-accent" : "text-foreground"}`}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Elan limiti", values: ["5", "50", "Limitsiz", "Limitsiz"] },
                    { label: "Mağaza səhifəsi", values: [false, true, true, true] },
                    { label: "Logo brending", values: [false, true, true, true] },
                    { label: "Statistika", values: ["Əsas", "Ətraflı", "Ətraflı", "Real-time"] },
                    { label: "Prioritet dəstək", values: [false, true, true, "24/7 menecer"] },
                    { label: "Ön sırada göstərilmə", values: [false, false, true, true] },
                    { label: "VIP elanlar/ay", values: ["—", "—", "10", "30"] },
                    { label: "API girişi", values: [false, false, true, "Full"] },
                    { label: "Reklam baner yerləri", values: [false, false, false, true] },
                    { label: "Fərdi dizayn", values: [false, false, false, true] },
                    { label: "Multi-user", values: [false, false, false, true] },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="p-3 text-muted-foreground">{row.label}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="p-3 text-center">
                          {typeof v === "boolean" ? (
                            v ? <Check size={14} className="mx-auto text-accent" /> : <X size={14} className="mx-auto text-muted-foreground/30" />
                          ) : (
                            <span className="text-foreground font-medium">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

      {/* ═══ Enterprise Customizer Modal ═══ */}
      {showEnterpriseCustomizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowEnterpriseCustomizer(false)} />
          <div className="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)] p-5 text-white">
              <button onClick={() => setShowEnterpriseCustomizer(false)} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                <X size={14} />
              </button>
              <Building2 size={24} className="mb-2" />
              <h3 className="text-lg font-bold">Enterprise Paketini Fərdiləşdir</h3>
              <p className="text-white/80 text-sm">Ehtiyaclarınıza uyğun konfiqurasiya edin</p>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-200px)] p-5 space-y-5">
              {/* Base package */}
              <div className="rounded-xl border border-[hsl(260,70%,60%)]/20 bg-[hsl(260,70%,60%)]/[0.03] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Building2 size={14} className="text-[hsl(260,70%,60%)]" /> Əsas Enterprise Paket
                  </h4>
                  <span className="text-sm font-extrabold text-[hsl(260,70%,60%)]">199 ₼/ay</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {["Limitsiz elan", "Enterprise nişanı", "Ön sırada göstərilmə", "30 VIP elan/ay", "Tam brending", "Full API girişi"].map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-foreground">
                      <Check size={11} className="text-[hsl(260,70%,60%)] shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Settings2 size={14} className="text-muted-foreground" /> Əlavə xidmətlər
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {enterpriseAddons.map(addon => {
                    const AddonIcon = addon.icon;
                    const selected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          selected
                            ? "border-[hsl(260,70%,60%)] bg-[hsl(260,70%,60%)]/5 shadow-sm"
                            : "border-border bg-card hover:border-[hsl(260,70%,60%)]/30"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            selected ? "bg-[hsl(260,70%,60%)]/10" : "bg-muted/50"
                          }`}>
                            <AddonIcon size={14} className={selected ? "text-[hsl(260,70%,60%)]" : "text-muted-foreground"} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-foreground">{addon.name}</p>
                              <span className="text-xs font-extrabold text-[hsl(260,70%,60%)]">+{addon.price} ₼</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{addon.desc}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            selected ? "border-[hsl(260,70%,60%)] bg-[hsl(260,70%,60%)]" : "border-border"
                          }`}>
                            {selected && <Check size={12} className="text-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ad Banner Placements */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                  <MonitorPlay size={14} className="text-muted-foreground" /> Reklam baner yerləri
                </h4>
                <p className="text-[11px] text-muted-foreground mb-3">Saytda reklam banerlərinizi yerləşdirin, daha çox müştəriyə çatın</p>
                <div className="space-y-2">
                  {adBannerPlacements.map(placement => {
                    const selected = selectedBannerPlacements.includes(placement.id);
                    return (
                      <button
                        key={placement.id}
                        onClick={() => toggleBannerPlacement(placement.id)}
                        className={`w-full rounded-xl border p-3 text-left transition-all ${
                          selected
                            ? "border-[hsl(260,70%,60%)] bg-[hsl(260,70%,60%)]/5 shadow-sm"
                            : "border-border bg-card hover:border-[hsl(260,70%,60%)]/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            selected ? "bg-[hsl(260,70%,60%)]/10" : "bg-muted/50"
                          }`}>
                            <Layout size={16} className={selected ? "text-[hsl(260,70%,60%)]" : "text-muted-foreground"} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-foreground">{placement.name}</p>
                              {placement.hot && (
                                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-destructive/10 text-destructive">🔥 TOP</span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-[10px] text-muted-foreground">{placement.size}</span>
                              <span className="text-[10px] text-muted-foreground">·</span>
                              <span className="text-[10px] text-muted-foreground">{placement.views} baxış</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-extrabold text-[hsl(260,70%,60%)]">+{placement.price} ₼</p>
                            <p className="text-[9px] text-muted-foreground">{placement.period}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                            selected ? "border-[hsl(260,70%,60%)] bg-[hsl(260,70%,60%)]" : "border-border"
                          }`}>
                            {selected && <Check size={12} className="text-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with total */}
            <div className="border-t border-border px-5 py-4 bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Aylıq toplam</p>
                  <p className="text-2xl font-extrabold text-foreground">{enterpriseTotal()} ₼<span className="text-sm font-normal text-muted-foreground"> / ay</span></p>
                </div>
                <div className="text-right text-[10px] text-muted-foreground">
                  <p>Əsas: 199 ₼</p>
                  {selectedAddons.length > 0 && <p>Əlavələr: +{selectedAddons.reduce((s, id) => s + parseInt(enterpriseAddons.find(a => a.id === id)?.price || "0"), 0)} ₼</p>}
                  {selectedBannerPlacements.length > 0 && <p>Banerlər: +{selectedBannerPlacements.reduce((s, id) => s + parseInt(adBannerPlacements.find(p => p.id === id)?.price || "0"), 0)} ₼</p>}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedUpgrade("enterprise");
                  setShowEnterpriseCustomizer(false);
                  setShowPayment(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)] text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Shield size={14} /> Enterprise-ə keç — {enterpriseTotal()} ₼/ay
              </button>
              <p className="text-[10px] text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
                <Shield size={9} /> İstənilən vaxt ləğv edə bilərsiniz
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Payment Modal ═══ */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => !paymentProcessing && setShowPayment(false)} />
          <div className="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className={`p-5 text-white bg-gradient-to-r ${
              selectedUpgrade === "enterprise"
                ? "from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)]"
                : "from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)]"
            }`}>
              <button onClick={() => !paymentProcessing && setShowPayment(false)} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                <X size={14} />
              </button>
              {selectedUpgrade === "enterprise" ? <Building2 size={24} className="mb-2" /> : <Crown size={24} className="mb-2" />}
              <h3 className="text-lg font-bold">{packages.find(p => p.id === selectedUpgrade)?.name} Paket</h3>
              <p className="text-white/80 text-sm">
                {selectedUpgrade === "enterprise" ? `${enterpriseTotal()} ₼ / ay` : `${packages.find(p => p.id === selectedUpgrade)?.price} ₼ / ay`}
              </p>
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
                className={`w-full py-3 rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 text-white bg-gradient-to-r ${
                  selectedUpgrade === "enterprise"
                    ? "from-[hsl(260,70%,60%)] to-[hsl(280,60%,50%)]"
                    : "from-[hsl(var(--vip-gold))] to-[hsl(35,90%,50%)]"
                }`}
              >
                {paymentProcessing ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Emal olunur...</>
                ) : (
                  <><Shield size={14} /> Ödəniş et — {selectedUpgrade === "enterprise" ? enterpriseTotal() : packages.find(p => p.id === selectedUpgrade)?.price} ₼</>
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
