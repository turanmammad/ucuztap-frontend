import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Pencil, Star, RefreshCw, BarChart3, Trash2, Pause, Play, AlertTriangle, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";

const tabs = [
  { label: "Aktiv", status: "active" },
  { label: "Gözləmədə", status: "pending" },
  { label: "Dayandırılmış", status: "paused" },
  { label: "Bitmiş", status: "expired" },
  { label: "Rədd", status: "rejected" },
];

const statusColors: Record<string, string> = {
  active: "bg-accent/10 text-accent",
  pending: "bg-[hsl(var(--vip-gold))]/15 text-[hsl(30,80%,40%)]",
  paused: "bg-muted text-muted-foreground",
  expired: "bg-muted text-muted-foreground",
  rejected: "bg-destructive/10 text-destructive",
};

const statusLabels: Record<string, string> = {
  active: "Aktiv",
  pending: "Gözləmədə",
  paused: "Dayandırılmış",
  expired: "Bitmiş",
  rejected: "Rədd",
};

const initialAds = [
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
  const [ads, setAds] = useState(initialAds);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const filtered = ads.filter((a) => a.status === activeTab);
  const tabCounts = tabs.map(t => ({ ...t, count: ads.filter(a => a.status === t.status).length }));

  const handlePause = (id: number) => {
    setAds(ads.map(a => a.id === id ? { ...a, status: "paused" } : a));
    toast.success("Elan dayandırıldı");
  };

  const handleResume = (id: number) => {
    setAds(ads.map(a => a.id === id ? { ...a, status: "active" } : a));
    toast.success("Elan yenidən aktivləşdirildi");
  };

  const handleDelete = (id: number) => {
    setAds(ads.filter(a => a.id !== id));
    setDeleteConfirm(null);
    toast.success("Elan silindi");
  };

  const handleRefresh = (id: number) => {
    const ad = ads.find(a => a.id === id);
    if (ad?.status === "expired") {
      setAds(ads.map(a => a.id === id ? { ...a, status: "pending", date: new Date().toLocaleDateString("az-AZ") } : a));
      toast.success("Elan yeniləndi və təsdiq gözləyir");
    } else {
      toast.success("Elan yeniləndi — siyahıda yuxarı qalxdı");
    }
  };

  const handleVip = (id: number) => {
    toast("VIP xidməti aktivləşdirmək üçün balans lazımdır", {
      action: { label: "Balans artır", onClick: () => window.location.href = "/panel/odenisler" },
    });
  };

  const startEdit = (ad: typeof initialAds[0]) => {
    setEditingId(ad.id);
    setEditPrice(ad.price.replace(/[^\d]/g, ""));
  };

  const saveEdit = (id: number) => {
    setAds(ads.map(a => a.id === id ? { ...a, price: Number(editPrice).toLocaleString() + " ₼" } : a));
    setEditingId(null);
    toast.success("Qiymət yeniləndi");
  };

  const getActions = (ad: typeof initialAds[0]) => {
    const actions = [];

    if (ad.status === "active") {
      actions.push({ icon: Pause, title: "Dayandır", onClick: () => handlePause(ad.id), color: "text-muted-foreground hover:text-foreground hover:bg-muted" });
      actions.push({ icon: Pencil, title: "Redaktə", onClick: () => startEdit(ad), color: "text-muted-foreground hover:text-foreground hover:bg-muted" });
      actions.push({ icon: Star, title: "VIP et", onClick: () => handleVip(ad.id), color: "text-[hsl(var(--vip-gold))]/60 hover:text-[hsl(var(--vip-gold))] hover:bg-[hsl(var(--vip-gold))]/10" });
      actions.push({ icon: RefreshCw, title: "Yenilə", onClick: () => handleRefresh(ad.id), color: "text-muted-foreground hover:text-foreground hover:bg-muted" });
      actions.push({ icon: BarChart3, title: "Statistika", onClick: () => window.location.href = "/panel/statistika", color: "text-muted-foreground hover:text-foreground hover:bg-muted" });
    }
    if (ad.status === "paused") {
      actions.push({ icon: Play, title: "Davam et", onClick: () => handleResume(ad.id), color: "text-accent/60 hover:text-accent hover:bg-accent/10" });
      actions.push({ icon: Pencil, title: "Redaktə", onClick: () => startEdit(ad), color: "text-muted-foreground hover:text-foreground hover:bg-muted" });
    }
    if (ad.status === "expired") {
      actions.push({ icon: RefreshCw, title: "Yenidən yerləşdir", onClick: () => handleRefresh(ad.id), color: "text-primary/60 hover:text-primary hover:bg-primary/10" });
    }
    if (ad.status === "rejected") {
      actions.push({ icon: Pencil, title: "Düzəliş et", onClick: () => startEdit(ad), color: "text-primary/60 hover:text-primary hover:bg-primary/10" });
    }

    actions.push({ icon: Trash2, title: "Sil", onClick: () => setDeleteConfirm(ad.id), color: "text-destructive/60 hover:text-destructive hover:bg-destructive/10" });

    return actions;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-foreground">Elanlarım</h1>
        <Link
          to="/elan-yerlesdir"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-hover transition-colors active:scale-[0.97] shadow-sm"
        >
          <Plus size={16} /> Yeni elan
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-muted rounded-lg p-1 overflow-x-auto">
        {tabCounts.map((t) => (
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
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={24} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Bu bölmədə elan yoxdur</p>
          <p className="text-xs text-muted-foreground">
            {activeTab === "active" && "Yeni elan əlavə edərək başlayın."}
            {activeTab === "pending" && "Gözləmədə elanınız yoxdur."}
            {activeTab === "paused" && "Dayandırılmış elanınız yoxdur."}
            {activeTab === "expired" && "Müddəti bitmiş elanınız yoxdur."}
            {activeTab === "rejected" && "Rədd edilmiş elanınız yoxdur."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ad) => (
            <div key={ad.id} className="bg-card rounded-xl border border-border p-3 flex gap-3 relative">
              {/* Delete confirmation overlay */}
              {deleteConfirm === ad.id && (
                <div className="absolute inset-0 z-10 bg-card/95 backdrop-blur-sm rounded-xl flex items-center justify-center gap-3 px-4">
                  <p className="text-sm font-medium text-foreground">Bu elanı silmək istəyirsiniz?</p>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors"
                  >
                    Bəli, sil
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Xeyr
                  </button>
                </div>
              )}

              <Link to={`/elanlar/${ad.id}`} className="shrink-0">
                <img src={ad.img} alt={ad.title} className="w-20 h-16 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link to={`/elanlar/${ad.id}`} className="text-sm font-semibold text-foreground truncate block hover:text-primary transition-colors">
                      {ad.title}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{ad.category} • {ad.date}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColors[ad.status]}`}>
                    {statusLabels[ad.status]}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    {editingId === ad.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={e => setEditPrice(e.target.value)}
                          className="w-24 h-7 rounded-md border border-input bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                          autoFocus
                        />
                        <span className="text-xs text-muted-foreground">₼</span>
                        <button onClick={() => saveEdit(ad.id)} className="w-6 h-6 rounded-md bg-accent/10 text-accent flex items-center justify-center hover:bg-accent/20">
                          <CheckCircle size={13} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="w-6 h-6 rounded-md bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80">
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-foreground">{ad.price}</span>
                    )}
                    <Link to="/panel/statistika" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Eye size={12} /> {ad.views}
                    </Link>
                  </div>
                  <div className="flex items-center gap-1">
                    {getActions(ad).map((action) => (
                      <button
                        key={action.title}
                        title={action.title}
                        onClick={action.onClick}
                        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${action.color}`}
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
      )}
    </div>
  );
};

export default MyAds;
