import { Link } from "react-router-dom";
import {
  ClipboardList, Eye, Heart, Clock, Plus, BarChart3, CheckCircle,
  MessageCircle, TrendingDown, ArrowUpRight, Bell, CreditCard,
  Store, Star, Zap, TrendingUp, ChevronRight, Shield, Package
} from "lucide-react";

const stats = [
  { label: "Aktiv elanlar", value: "15", icon: ClipboardList, color: "text-accent", bg: "bg-accent/10", link: "/panel/elanlarim", change: "+2", up: true },
  { label: "Gözləmədə", value: "3", icon: Clock, color: "text-[hsl(var(--vip-gold))]", bg: "bg-[hsl(var(--vip-gold))]/10", link: "/panel/elanlarim", change: null, up: false },
  { label: "Bu həftə baxış", value: "1,247", icon: Eye, color: "text-primary", bg: "bg-primary/10", link: "/panel/statistika", change: "+18%", up: true },
  { label: "Favoritlənmə", value: "23", icon: Heart, color: "text-destructive", bg: "bg-destructive/10", link: "/panel/favoritler", change: "+5", up: true },
  { label: "Mesajlar", value: "8", icon: MessageCircle, color: "text-primary", bg: "bg-primary/10", link: "/panel/mesajlar", change: "3 yeni", up: true },
  { label: "Bildirişlər", value: "5", icon: Bell, color: "text-[hsl(var(--vip-gold))]", bg: "bg-[hsl(var(--vip-gold))]/10", link: "/panel/bildirisler", change: null, up: false },
];

const quickActions = [
  { label: "Yeni elan", icon: Plus, link: "/elan-yerlesdir", accent: true },
  { label: "Statistikam", icon: BarChart3, link: "/panel/statistika", accent: false },
  { label: "Elanları irəli çək", icon: Zap, link: "/panel/odenisler", accent: false },
  { label: "Mağazam", icon: Store, link: "/panel/magazam", accent: false },
];

const activities = [
  { icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", text: "\"Toyota Camry 2021\" elanınız təsdiqləndi", time: "2 saat əvvəl", link: "/panel/elanlarim" },
  { icon: MessageCircle, color: "text-primary", bg: "bg-primary/10", text: "Yeni mesaj: \"Salam, mən maraqlıyam...\"", time: "3 saat əvvəl", link: "/panel/mesajlar" },
  { icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10", text: "Favoritinizdə qiymət düşdü: iPhone 15 Pro", time: "5 saat əvvəl", link: "/panel/favoritler" },
  { icon: Eye, color: "text-muted-foreground", bg: "bg-muted", text: "\"Mercedes E-Class\" elanınız 50 dəfə baxıldı", time: "dünən", link: "/panel/statistika" },
  { icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", text: "\"BMW X5\" elanınız təsdiqləndi", time: "dünən", link: "/panel/elanlarim" },
];

const topAds = [
  { title: "Toyota Camry 2021", views: 312, price: "28,500 ₼", trend: "+24%" },
  { title: "Mercedes E-Class 2020", views: 198, price: "42,000 ₼", trend: "+12%" },
  { title: "BMW X5 2022", views: 156, price: "65,000 ₼", trend: "+8%" },
];

const DashboardHome = () => (
  <div className="space-y-6">
    {/* Greeting + summary banner */}
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 md:p-6 text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-foreground/[0.06]" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary-foreground/[0.04]" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold">Salam, Əli! 👋</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">Panelinizdə nə baş verir — bir baxın.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-primary-foreground/10 rounded-xl px-3 py-2">
            <Shield size={14} className="text-primary-foreground/70" />
            <div>
              <p className="text-[10px] text-primary-foreground/60 leading-tight">Hesab tipi</p>
              <p className="text-xs font-bold leading-tight">Biznes</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Package size={14} className="text-primary-foreground/60" />
            <span className="text-sm text-primary-foreground/80"><strong className="text-primary-foreground">18</strong> elan</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-primary-foreground/60" />
            <span className="text-sm text-primary-foreground/80"><strong className="text-primary-foreground">4.8</strong> reytinq</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-primary-foreground/60" />
            <span className="text-sm text-primary-foreground/80"><strong className="text-primary-foreground">+18%</strong> bu həftə</span>
          </div>
        </div>
      </div>
    </div>

    {/* Stats Grid — clickable */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((s) => (
        <Link
          key={s.label}
          to={s.link}
          className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
              <s.icon size={18} className={s.color} />
            </div>
            <ArrowUpRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-2xl font-extrabold text-foreground leading-none">{s.value}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{s.label}</p>
          {s.change && (
            <span className={`inline-flex items-center gap-0.5 mt-1.5 text-[10px] font-semibold ${s.up ? "text-accent" : "text-destructive"}`}>
              {s.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
              {s.change}
            </span>
          )}
        </Link>
      ))}
    </div>

    {/* Quick actions */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {quickActions.map((a) => (
        <Link
          key={a.label}
          to={a.link}
          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all active:scale-[0.97] group ${
            a.accent
              ? "bg-accent text-accent-foreground border-accent hover:bg-accent-hover shadow-sm"
              : "bg-card text-foreground border-border hover:border-primary/30 hover:shadow-sm"
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            a.accent ? "bg-accent-foreground/10" : "bg-muted"
          }`}>
            <a.icon size={18} />
          </div>
          <span className="text-sm font-semibold">{a.label}</span>
        </Link>
      ))}
    </div>

    <div className="grid lg:grid-cols-5 gap-4">
      {/* Recent activity — wider */}
      <div className="lg:col-span-3 bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Son fəaliyyət</h2>
          <Link to="/panel/bildirisler" className="text-[11px] text-primary hover:underline font-medium flex items-center gap-0.5">
            Hamısı <ChevronRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {activities.map((a, i) => (
            <Link key={i} to={a.link} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors group">
              <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <a.icon size={15} className={a.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">{a.text}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Top performing ads */}
      <div className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Ən çox baxılan</h2>
          <Link to="/panel/statistika" className="text-[11px] text-primary hover:underline font-medium flex items-center gap-0.5">
            Ətraflı <ChevronRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {topAds.map((ad, i) => (
            <Link key={i} to="/panel/statistika" className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors group">
              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{ad.title}</p>
                <p className="text-[11px] text-muted-foreground">{ad.views} baxış · {ad.price}</p>
              </div>
              <span className="text-[11px] font-semibold text-accent flex items-center gap-0.5 shrink-0">
                <TrendingUp size={10} /> {ad.trend}
              </span>
            </Link>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-border">
          <Link to="/elan-yerlesdir" className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/15 transition-colors">
            <Zap size={12} /> Elanları irəli çək
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHome;
