import { ExternalLink, Megaphone } from "lucide-react";

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
      <div
        className={`${heights[variant]} rounded-xl border border-dashed border-border bg-muted/30 flex items-center justify-center gap-3 relative overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-accent/[0.03]" />
        <Megaphone size={18} className="text-muted-foreground/40" />
        <span className="text-sm text-muted-foreground/50 font-medium">Reklam sahəsi</span>
        <span className="absolute top-1.5 right-2 text-[9px] text-muted-foreground/30 uppercase tracking-wider font-medium">
          Ad
        </span>
      </div>
    </div>
  );
};

/** Sidebar vertical banner */
export const AdBannerSidebar = ({ className = "" }: { className?: string }) => (
  <div
    className={`rounded-xl border border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-2 p-6 min-h-[200px] cursor-pointer hover:border-primary/30 transition-colors relative ${className}`}
  >
    <Megaphone size={16} className="text-muted-foreground/40" />
    <span className="text-xs text-muted-foreground/50 font-medium">Reklam</span>
    <span className="absolute top-1.5 right-2 text-[9px] text-muted-foreground/30 uppercase tracking-wider">Ad</span>
  </div>
);

/** In-feed ad card — looks like a regular ad listing */
export const AdCardInFeed = () => (
  <div className="rounded-lg border border-primary/20 bg-card overflow-hidden relative group cursor-pointer hover:shadow-md transition-shadow">
    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
      <div className="text-center px-4">
        <Megaphone size={28} className="mx-auto text-primary/40 mb-2" />
        <p className="text-xs text-muted-foreground font-medium">Sizin reklamınız burada</p>
      </div>
    </div>
    <div className="p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-primary/10 text-primary">REKLAM</span>
      </div>
      <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">
        Biznesinizi tanıdın — reklam üçün əlaqə saxlayın
      </p>
      <div className="flex items-center gap-1 mt-2 text-xs text-primary font-medium">
        <ExternalLink size={11} /> Ətraflı
      </div>
    </div>
    <span className="absolute top-1.5 right-1.5 text-[8px] text-muted-foreground/40 uppercase tracking-wider">Ad</span>
  </div>
);

/** Small inline text ad */
export const AdBannerInline = ({ className = "" }: { className?: string }) => (
  <div
    className={`rounded-lg border border-dashed border-border bg-muted/20 px-4 py-3 flex items-center justify-between gap-3 cursor-pointer hover:border-primary/30 transition-colors ${className}`}
  >
    <div className="flex items-center gap-2">
      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-primary/10 text-primary">AD</span>
      <span className="text-sm text-muted-foreground">Biznesinizi burada reklam edin →</span>
    </div>
    <ExternalLink size={14} className="text-muted-foreground/40 shrink-0" />
  </div>
);
