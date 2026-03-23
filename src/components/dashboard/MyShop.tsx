import { useState, useRef } from "react";
import { Store, Camera, Image, Check, Package, Zap, Crown, Settings, BarChart3, Edit, ExternalLink, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  { id: "start", name: "Start", price: "0", icon: Package, color: "text-muted-foreground" },
  { id: "business", name: "Biznes", price: "29", icon: Zap, color: "text-primary" },
  { id: "premium", name: "Premium", price: "79", icon: Crown, color: "text-[hsl(var(--vip-gold))]" },
];

const MyShop = () => {
  const [hasShop, setHasShop] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "stats">("overview");

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
              <div key={p.id} className="rounded-lg border border-border p-3 text-center">
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
        <div className="h-24 bg-gradient-to-r from-primary/10 to-accent/10 relative">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=200&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-5 pb-5 -mt-8 relative">
          <div className="flex items-end gap-3">
            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop"
              alt="Logo"
              className="w-16 h-16 rounded-xl border-4 border-card object-cover shadow"
            />
            <div className="pb-0.5">
              <h2 className="text-base font-bold text-foreground">AutoPlus MMC</h2>
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
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {([
          { key: "overview", label: "Ümumi", icon: Store },
          { key: "edit", label: "Redaktə", icon: Edit },
          { key: "stats", label: "Statistika", icon: BarChart3 },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-md font-medium transition-all ${
              activeTab === tab.key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Package info */}
          <div className="rounded-xl border border-primary bg-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-primary" />
              <div>
                <p className="text-sm font-bold text-foreground">Biznes Paket</p>
                <p className="text-xs text-muted-foreground">29 ₼/ay · 50 elan limiti · Son: 15 Mar 2026</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
              Yüksəlt
            </button>
          </div>

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
    </div>
  );
};

export default MyShop;
