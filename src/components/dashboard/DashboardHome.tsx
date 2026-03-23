import { Link } from "react-router-dom";
import { ClipboardList, Eye, Heart, Clock, Plus, BarChart3, CheckCircle, MessageCircle, TrendingDown } from "lucide-react";

const stats = [
  { label: "Aktiv elanlar", value: "15", icon: ClipboardList, color: "text-accent" },
  { label: "Gözləmədə", value: "3", icon: Clock, color: "text-[hsl(var(--vip-gold))]" },
  { label: "Baxışlar bu həftə", value: "456", icon: Eye, color: "text-primary" },
  { label: "Favoritlənmə", value: "23", icon: Heart, color: "text-destructive" },
];

const activities = [
  { icon: CheckCircle, color: "text-accent", text: "\"Toyota Camry 2021\" elanınız təsdiqləndi", time: "2 saat əvvəl" },
  { icon: MessageCircle, color: "text-primary", text: "Yeni mesaj: \"Salam, mən maraqlıyam...\"", time: "3 saat əvvəl" },
  { icon: TrendingDown, color: "text-destructive", text: "Favoritinizdə qiymət düşdü: iPhone 15 Pro", time: "5 saat əvvəl" },
  { icon: Eye, color: "text-muted-foreground", text: "\"Mercedes E-Class\" elanınız 50 dəfə baxıldı", time: "dünən" },
  { icon: CheckCircle, color: "text-accent", text: "\"BMW X5\" elanınız təsdiqləndi", time: "dünən" },
];

const DashboardHome = () => (
  <div>
    {/* Greeting */}
    <div className="mb-6">
      <h1 className="text-2xl font-extrabold text-foreground">Salam, Əli! 👋</h1>
      <p className="text-sm text-muted-foreground mt-1">Panelinizdə nə baş verir — bir baxın.</p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <s.icon size={20} className={s.color} />
          </div>
          <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Quick actions */}
    <div className="flex items-center gap-3 mb-8">
      <Link
        to="/elan-yerlesdir"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-[hsl(var(--accent-hover))] transition-colors active:scale-[0.97] shadow-sm"
      >
        <Plus size={16} /> Yeni elan
      </Link>
      <Link
        to="/panel/statistika"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors active:scale-[0.97]"
      >
        <BarChart3 size={16} /> Statistikam
      </Link>
    </div>

    {/* Recent activity */}
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-bold text-foreground">Son fəaliyyət</h2>
      </div>
      <div className="divide-y divide-border">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5">
            <a.icon size={18} className={`${a.color} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{a.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardHome;
