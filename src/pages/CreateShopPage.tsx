import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Store, MapPin, Star, ChevronRight, Upload, X, Camera, Check, Crown, Zap, Rocket, Clock, BarChart3, Package, ShieldCheck, Image } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/* ═══ Packages ═══ */
const packages = [
  {
    id: "start",
    name: "Start",
    price: "0",
    period: "Pulsuz",
    icon: Package,
    color: "text-muted-foreground",
    borderColor: "border-border",
    features: ["5 elan limiti", "Standart görünüş", "Əsas statistika"],
    missing: ["VIP elan", "Logo brending", "Prioritet dəstək"],
  },
  {
    id: "business",
    name: "Biznes",
    price: "29",
    period: "/ ay",
    icon: Zap,
    color: "text-primary",
    borderColor: "border-primary",
    popular: true,
    features: ["50 elan limiti", "Mağaza səhifəsi", "Logo brending", "Ətraflı statistika", "Prioritet dəstək"],
    missing: ["VIP elanlar"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "79",
    period: "/ ay",
    icon: Crown,
    color: "text-[hsl(var(--vip-gold))]",
    borderColor: "border-[hsl(var(--vip-gold))]",
    features: ["Limitsiz elan", "Premium mağaza", "Logo brending", "Aylıq 10 VIP elan", "Ətraflı statistika", "Prioritet dəstək", "API girişi"],
    missing: [],
  },
];

const categories = [
  "Nəqliyyat", "Daşınmaz Əmlak", "Elektronika", "Ev və Bağ",
  "İş Elanları", "Xidmətlər", "Geyim və Aksesuar", "Digər",
];

const CreateShopPage = () => {
  const [selectedPackage, setSelectedPackage] = useState("business");
  const [step, setStep] = useState<"package" | "form">("package");
  const [logo, setLogo] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    phone: "",
    email: "",
    city: "Bakı",
    address: "",
    website: "",
    whatsapp: true,
  });

  const update = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setter(URL.createObjectURL(file));
    }
  };

  const pkg = packages.find((p) => p.id === selectedPackage)!;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-muted/30 border-b border-border">
          <div className="container py-8 md:py-12">
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Mağaza yarat</h1>
            <p className="text-muted-foreground max-w-lg">
              Öz mağazanızı açın, elanlarınızı bir yerdə toplayın və müştərilərinizə professional görüntü təqdim edin.
            </p>
          </div>
        </section>

        <div className="container py-8 md:py-10 max-w-4xl">
          {step === "package" ? (
            <>
              {/* Package selection */}
              <h2 className="text-lg font-bold text-foreground mb-6">Paket seçin</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {packages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPackage(p.id)}
                    className={`relative rounded-xl border-2 p-5 text-left transition-all active:scale-[0.98] ${
                      selectedPackage === p.id
                        ? `${p.borderColor} bg-card shadow-md`
                        : "border-border bg-card hover:border-muted-foreground/30"
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">
                        Populyar
                      </span>
                    )}
                    <p.icon size={24} className={`${p.color} mb-3`} />
                    <h3 className="text-base font-bold text-foreground">{p.name}</h3>
                    <div className="flex items-baseline gap-0.5 mt-1 mb-4">
                      <span className="text-2xl font-extrabold text-foreground">{p.price}</span>
                      <span className="text-sm text-muted-foreground"> ₼ {p.period}</span>
                    </div>
                    <ul className="space-y-1.5">
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
                    {selectedPackage === p.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("form")}
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.98]"
              >
                Davam et → Mağaza məlumatları
              </button>
            </>
          ) : (
            <>
              {/* Back to packages */}
              <button
                onClick={() => setStep("package")}
                className="text-sm text-primary hover:underline mb-6 inline-block"
              >
                ← Paketi dəyiş ({pkg.name} — {pkg.price} ₼{pkg.period})
              </button>

              <div className="space-y-6">
                {/* Logo & Cover */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Logo və üz qabığı</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        onClick={() => logoRef.current?.click()}
                        className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center cursor-pointer hover:border-primary/40 transition-colors overflow-hidden"
                      >
                        {logo ? (
                          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <Camera size={20} className="text-muted-foreground" />
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground">Logo</span>
                      <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setLogo)} />
                    </div>
                    {/* Cover */}
                    <div className="flex-1">
                      <div
                        onClick={() => coverRef.current?.click()}
                        className="h-28 rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center cursor-pointer hover:border-primary/40 transition-colors overflow-hidden"
                      >
                        {cover ? (
                          <img src={cover} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <Image size={20} className="mx-auto text-muted-foreground mb-1" />
                            <span className="text-[10px] text-muted-foreground">Üz qabığı şəkli (1200×400)</span>
                          </div>
                        )}
                      </div>
                      <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setCover)} />
                    </div>
                  </div>
                </div>

                {/* Basic info */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Əsas məlumatlar</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Mağaza adı *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Məs: AutoPlus MMC"
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Kateqoriya *</label>
                      <select
                        value={form.category}
                        onChange={(e) => update("category", e.target.value)}
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
                      >
                        <option value="">Seçin</option>
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Təsvir *</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                        rows={3}
                        placeholder="Mağazanız haqqında qısa məlumat..."
                        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Əlaqə</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Telefon *</label>
                      <div className="flex gap-1.5">
                        <span className="shrink-0 h-10 px-2 rounded-lg border border-input bg-muted flex items-center text-xs font-medium text-muted-foreground">+994</span>
                        <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="50 123 45 67"
                          className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">E-poçt</label>
                      <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="info@magaza.az"
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Şəhər *</label>
                      <select value={form.city} onChange={(e) => update("city", e.target.value)}
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none">
                        {["Bakı", "Sumqayıt", "Gəncə", "Mingəçevir", "Lənkəran", "Şirvan"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Ünvan</label>
                      <input type="text" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Küçə, bina..."
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Veb sayt</label>
                      <input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://..."
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className="w-full py-3 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-accent-hover transition-colors active:scale-[0.98] shadow-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    <Store size={16} /> Mağazanı yarat
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default CreateShopPage;
