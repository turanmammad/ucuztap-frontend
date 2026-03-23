import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Pencil, Star, RefreshCw, BarChart3, Trash2 } from "lucide-react";

const tabs = [
  { label: "Aktiv", count: 15, status: "active" },
  { label: "Gözləmədə", count: 3, status: "pending" },
  { label: "Bitmiş", count: 27, status: "expired" },
  { label: "Rədd", count: 1, status: "rejected" },
];

const statusColors: Record<string, string> = {
  active: "bg-accent/10 text-accent",
  pending: "bg-[hsl(var(--vip-gold))]/15 text-[hsl(30,80%,40%)]",
  expired: "bg-muted text-muted-foreground",
  rejected: "bg-destructive/10 text-destructive",
};

const statusLabels: Record<string, string> = {
  active: "Aktiv",
  pending: "Gözləmədə",
  expired: "Bitmiş",
  rejected: "Rədd",
};

const ads = [
  { id: 1, title: "Toyota Camry 2.5 Hybrid, 2021", category: "Nəqliyyat", price: "35,000 ₼", views: 234, date: "12.01.2025", status: "active", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100&h=80&fit=crop" },
  { id: 2, title: "iPhone 15 Pro Max 256GB", category: "Elektronika", price: "2,200 ₼", views: 189, date: "10.01.2025", status: "active", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=80&fit=crop" },
  { id: 3, title: "Mercedes E-Class W213, 2019", category: "Nəqliyyat", price: "42,000 ₼", views: 312, date: "08.01.2025", status: "active", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=80&fit=crop" },
  { id: 4, title: "3 otaqlı mənzil, Nəsimi r.", category: "Daşınmaz Əmlak", price: "185,000 ₼", views: 45, date: "15.01.2025", status: "pending", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=80&fit=crop" },
  { id: 5, title: "Samsung Galaxy S24 Ultra", category: "Elektronika", price: "1,800 ₼", views: 0, date: "16.01.2025", status: "pending", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=80&fit=crop" },
  { id: 6, title: "BMW X5 xDrive30d, 2020", category: "Nəqliyyat", price: "55,000 ₼", views: 567, date: "01.12.2024", status: "expired", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=80&fit=crop" },
  { id: 7, title: "Oyun kompüteri RTX 4090", category: "Elektronika", price: "4,500 ₼", views: 12, date: "20.12.2024", status: "rejected", img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=100&h=80&fit=crop" },
];

const MyAds = () => {
  const [activeTab, setActiveTab] = useState("active");
  const filtered = ads.filter((a) => a.status === activeTab);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-foreground">Elanlarım</h1>
        <Link
          to="/elan-yerlesdir"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-[hsl(var(--accent-hover))] transition-colors active:scale-[0.97] shadow-sm"
        >
          <Plus size={16} /> Yeni elan
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-muted rounded-lg p-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.status}
            onClick={() => setActiveTab(t.status)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === t.status
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Ads list */}
      <div className="space-y-3">
        {filtered.map((ad) => (
          <div key={ad.id} className="bg-card rounded-xl border border-border p-3 flex gap-3">
            <img src={ad.img} alt={ad.title} className="w-20 h-16 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{ad.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{ad.category} • {ad.date}</p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColors[ad.status]}`}>
                  {statusLabels[ad.status]}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground">{ad.price}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye size={12} /> {ad.views}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[
                    { icon: Pencil, title: "Redaktə" },
                    { icon: Star, title: "VIP et" },
                    { icon: RefreshCw, title: "Yenilə" },
                    { icon: BarChart3, title: "Stat" },
                    { icon: Trash2, title: "Sil", destructive: true },
                  ].map((action) => (
                    <button
                      key={action.title}
                      title={action.title}
                      className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                        (action as any).destructive
                          ? "text-destructive/60 hover:text-destructive hover:bg-destructive/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <action.icon size={14} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAds;
