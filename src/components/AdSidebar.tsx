import { useState } from "react";
import { Heart, Share2, Flag, Phone, MessageCircle, Star, ChevronRight, Check, Link2, Zap, Crown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

type PromotionTier = "boost" | "vip" | "premium";

const promotionTiers: { key: PromotionTier; icon: typeof Zap; label: string; price: string; duration: string; color: string; bg: string; border: string; features: string[] }[] = [
  {
    key: "boost", icon: TrendingUp, label: "İrəli Çək", price: "2 ₼", duration: "3 gün",
    color: "text-[hsl(var(--boost-orange))]", bg: "bg-[hsl(var(--boost-orange)/0.1)]", border: "border-[hsl(var(--boost-orange)/0.3)]",
    features: ["Axtarışda üstə çıxır", "3 gün müddətinə"],
  },
  {
    key: "vip", icon: Star, label: "VIP", price: "5 ₼", duration: "7 gün",
    color: "text-[hsl(var(--vip-gold))]", bg: "bg-[hsl(var(--vip-gold)/0.1)]", border: "border-[hsl(var(--vip-gold)/0.3)]",
    features: ["Ana səhifədə görünür", "VIP nişanı", "7 gün müddətinə"],
  },
  {
    key: "premium", icon: Crown, label: "Premium", price: "10 ₼", duration: "14 gün",
    color: "text-[hsl(var(--premium-blue))]", bg: "bg-[hsl(var(--premium-blue)/0.1)]", border: "border-[hsl(var(--premium-blue)/0.3)]",
    features: ["Prioritet yerləşmə", "Premium nişanı", "Xüsusi çərçivə", "14 gün müddətinə"],
  },
];

const AdSidebar = () => {
  const [fav, setFav] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* VIP Badge + Title + Price */}
      <div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded bg-[hsl(var(--vip-gold)/0.15)] text-[hsl(var(--vip-gold))] mb-3">
          <Star size={12} fill="currentColor" /> VIP
        </span>
        <h1 className="text-2xl font-extrabold text-foreground leading-tight">Mercedes-Benz C200, 2019</h1>
      </div>

      {/* Price */}
      <div className="rounded-lg bg-primary px-5 py-4">
        <p className="text-2xl font-extrabold text-primary-foreground">25,000 ₼</p>
      </div>

      {/* Price comparison */}
      <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-muted text-sm">
        <span>📊</span>
        <p className="text-muted-foreground">Oxşar elanlar: <span className="font-semibold text-foreground">22,000 — 28,000 ₼</span></p>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {[
          { icon: "📍", text: "Bakı, Nəsimi" },
          { icon: "📅", text: "23 Mart 2026" },
          { icon: "👁️", text: "1,245 baxış" },
          { icon: "🔖", text: "№12345" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-muted">
            <span className="text-sm">{item.icon}</span>
            <span className="text-muted-foreground">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Promotion buttons */}
      <div className="border border-border rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
          <Zap size={15} className="text-primary" /> Elanı irəli çək
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {promotionTiers.map((tier) => (
            <Link
              key={tier.key}
              to="/elanlar/1/ireli-cek"
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border ${tier.border} ${tier.bg} hover:shadow-md transition-all active:scale-[0.97] group`}
            >
              <tier.icon size={20} className={`${tier.color} group-hover:scale-110 transition-transform`} fill={tier.key === "vip" ? "currentColor" : "none"} />
              <span className={`text-xs font-bold ${tier.color}`}>{tier.label}</span>
              <span className="text-[10px] font-semibold text-foreground">{tier.price}</span>
              <span className="text-[9px] text-muted-foreground">{tier.duration}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setFav(!fav)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md border text-sm font-medium transition-all active:scale-[0.97] ${
            fav ? "border-destructive text-destructive bg-destructive/5" : "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
          }`}
        >
          <Heart size={16} fill={fav ? "currentColor" : "none"} />
          {fav ? "Əlavə edildi" : "Favorit"}
        </button>

        <div className="relative flex-1">
          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground transition-all active:scale-[0.97]"
          >
            <Share2 size={16} /> Paylaş
          </button>
          {shareOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShareOpen(false)} />
              <div className="absolute left-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-fade-in">
                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">💬 WhatsApp</a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">✈️ Telegram</a>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); setShareOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left">
                  <Link2 size={14} /> Link kopyala
                </button>
              </div>
            </>
          )}
        </div>

        <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md border border-border text-sm font-medium text-muted-foreground hover:border-destructive hover:text-destructive transition-all active:scale-[0.97]">
          <Flag size={16} />
        </button>
      </div>

      {/* Seller card */}
      <div className="border border-border rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg flex items-center justify-center shrink-0">ƏM</div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground">Əli Məmmədov</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star size={14} className="text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" />
              <span className="font-medium text-foreground">4.8</span>
              <span>(23 rəy)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>2020-ci ildən üzv</span>
          <span className="flex items-center gap-1"><Check size={12} className="text-accent" /> Telefon təsdiqlənib</span>
        </div>

        <a href="#" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          Bütün elanları (23) <ChevronRight size={14} />
        </a>

        <div className="space-y-2">
          <button
            onClick={() => setPhoneRevealed(true)}
            className="w-full py-2.5 rounded-md bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <Phone size={16} />
            {phoneRevealed ? "+994 50 123 45 67" : "Nömrəni göstər"}
          </button>
          <button className="w-full py-2.5 rounded-md border-2 border-border font-semibold text-sm text-foreground hover:border-primary transition-colors active:scale-[0.97] flex items-center justify-center gap-2">
            <MessageCircle size={16} /> Mesaj yaz
          </button>
          <button className="w-full py-2.5 rounded-md border-2 border-accent text-accent font-semibold text-sm hover:bg-accent/5 transition-colors active:scale-[0.97] flex items-center justify-center gap-2">
            📱 WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdSidebar;
