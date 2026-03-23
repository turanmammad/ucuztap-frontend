import { Link } from "react-router-dom";
import { ExternalLink, Megaphone, Zap, Star, Crown } from "lucide-react";

/* ── Banner Variants ─────────────────────────── */

/** Full-width horizontal banner for between sections */
export const AdBannerHorizontal = ({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "slim" | "large";
  className?: string;
}) => {
  const heights: Record<string, string> = {
    slim: "h-16",
    default: "h-24 md:h-28",
    large: "h-32 md:h-40",
  };

  return (
    <div className={`container ${className}`}>
      <Link
        to="/reklam"
        className={`${heights[variant]} rounded-xl border border-dashed border-border bg-muted/30 flex items-center justify-center gap-3 relative overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors block`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-accent/[0.03]" />
        <Megaphone size={18} className="text-muted-foreground/40" />
        <span className="text-sm text-muted-foreground/50 font-medium">Reklam sahəsi</span>
        <span className="absolute top-1.5 right-2 text-[9px] text-muted-foreground/30 uppercase tracking-wider font-medium">
          Ad
        </span>
      </Link>
    </div>
  );
};

/** Sidebar vertical banner */
export const AdBannerSidebar = ({ className = "" }: { className?: string }) => (
  <Link
    to="/reklam"
    className={`rounded-xl border border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-2 p-6 min-h-[200px] cursor-pointer hover:border-primary/30 transition-colors relative block ${className}`}
  >
    <Megaphone size={16} className="text-muted-foreground/40" />
    <span className="text-xs text-muted-foreground/50 font-medium">Reklam</span>
    <span className="absolute top-1.5 right-2 text-[9px] text-muted-foreground/30 uppercase tracking-wider">Ad</span>
  </Link>
);

/** In-feed ad card — rotates between ad types */
const feedAdVariants = [
  {
    type: "ad",
    to: "/reklam",
    bg: "from-primary/10 to-accent/10",
    icon: Megaphone,
    iconColor: "text-primary/40",
    badge: "REKLAM",
    badgeClass: "bg-primary/10 text-primary",
    title: "Biznesinizi tanıdın — reklam üçün əlaqə saxlayın",
    cta: "Reklam ver",
  },
  {
    type: "boost",
    to: "/elanlar/1/ireli-cek",
    bg: "from-[hsl(var(--boost-orange))]/10 to-[hsl(var(--boost-orange))]/5",
    icon: Zap,
    iconColor: "text-[hsl(var(--boost-orange))]/60",
    badge: "İRƏLİ ÇƏK",
    badgeClass: "bg-[hsl(var(--boost-orange))]/10 text-[hsl(var(--boost-orange))]",
    title: "Elanınızı irəli çəkin — daha çox baxış qazanın",
    cta: "2 ₼-dan başlayır",
  },
  {
    type: "vip",
    to: "/elanlar/1/ireli-cek",
    bg: "from-[hsl(var(--vip-gold))]/15 to-[hsl(var(--vip-gold))]/5",
    icon: Star,
    iconColor: "text-[hsl(var(--vip-gold))]/60",
    badge: "VIP",
    badgeClass: "bg-[hsl(var(--vip-gold))]/15 text-[hsl(var(--vip-gold))]",
    title: "VIP elan yerləşdirin — ana səhifədə görünsün",
    cta: "5 ₼ / 7 gün",
  },
  {
    type: "premium",
    to: "/elanlar/1/ireli-cek",
    bg: "from-[hsl(var(--premium-blue))]/10 to-[hsl(var(--premium-blue))]/5",
    icon: Crown,
    iconColor: "text-[hsl(var(--premium-blue))]/60",
    badge: "PREMİUM",
    badgeClass: "bg-[hsl(var(--premium-blue))]/10 text-[hsl(var(--premium-blue))]",
    title: "Premium elan — maksimum görünürlük və satış",
    cta: "10 ₼ / 14 gün",
  },
];

export const AdCardInFeed = () => {
  const variant = feedAdVariants[Math.floor(Math.random() * feedAdVariants.length)];
  const Icon = variant.icon;

  return (
    <Link
      to={variant.to}
      className="rounded-lg border border-primary/20 bg-card overflow-hidden relative group hover:shadow-md transition-shadow block"
    >
      <div className={`aspect-[4/3] overflow-hidden bg-gradient-to-br ${variant.bg} flex items-center justify-center`}>
        <div className="text-center px-4">
          <Icon size={28} className={`mx-auto ${variant.iconColor} mb-2`} />
          <p className="text-xs text-muted-foreground font-medium">{variant.cta}</p>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${variant.badgeClass}`}>{variant.badge}</span>
        </div>
        <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">
          {variant.title}
        </p>
        <div className="flex items-center gap-1 mt-2 text-xs text-primary font-medium">
          <ExternalLink size={11} /> Ətraflı
        </div>
      </div>
      <span className="absolute top-1.5 right-1.5 text-[8px] text-muted-foreground/40 uppercase tracking-wider">Ad</span>
    </Link>
  );
};

/** Small inline text ad */
export const AdBannerInline = ({ className = "" }: { className?: string }) => (
  <Link
    to="/reklam"
    className={`rounded-lg border border-dashed border-border bg-muted/20 px-4 py-3 flex items-center justify-between gap-3 hover:border-primary/30 transition-colors block ${className}`}
  >
    <div className="flex items-center gap-2">
      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-primary/10 text-primary">AD</span>
      <span className="text-sm text-muted-foreground">Biznesinizi burada reklam edin →</span>
    </div>
    <ExternalLink size={14} className="text-muted-foreground/40 shrink-0" />
  </Link>
);
