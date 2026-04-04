import logoFull from "@/assets/logo-full.png";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Search, Plus, Heart, ChevronRight } from "lucide-react";

const colors = [
  { name: "Hazırkı (Aktiv)", hex: "#f2ce04", hsl: "51 95% 48%", desc: "İndiki primary — parlaq sarı", active: true },
  { name: "Tünd sarı", hex: "#d4a800", hsl: "46 100% 41%", desc: "Premium, ciddi, göz yormur", active: false },
  { name: "Qızılı sarı", hex: "#c89600", hsl: "43 100% 39%", desc: "Lüks, peşəkar, klassik", active: false },
  { name: "Orta tünd", hex: "#e0b500", hsl: "48 100% 44%", desc: "Hazırkından bir az tünd, hələ də parlaq", active: false },
];

const ColorCompare = () => (
  <div className="min-h-screen bg-background pb-20">
    {/* Current logo display */}
    <div className="bg-card border-b border-border py-6 text-center">
      <img src={logoFull} alt="Logo" className="h-14 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground">
        Hazırkı primary: <span className="font-mono font-bold" style={{ color: "#f2ce04" }}>#f2ce04</span>{" "}
        <span className="inline-block w-4 h-4 rounded align-middle ml-1" style={{ background: "#f2ce04" }} />
      </p>
    </div>

    <div className="container max-w-5xl py-8">
      <h1 className="text-xl font-extrabold text-foreground text-center mb-2">Rəng müqayisəsi</h1>
      <p className="text-sm text-muted-foreground text-center mb-8">Hər üç variantı yanyana müqayisə edin</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {colors.map((c) => (
          <div key={c.hex} className={`rounded-2xl border bg-card overflow-hidden shadow-sm ${c.active ? "border-accent ring-2 ring-accent/30" : "border-border"}`}>
            {c.active && <div className="bg-accent text-accent-foreground text-xs font-bold text-center py-1">✓ HAZIRKİ</div>}
          <div key={c.hex} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Color swatch */}
            <div className="h-20 flex items-center justify-center" style={{ background: c.hex }}>
              <span className="text-lg font-extrabold" style={{ color: "#1a1d23" }}>ucuztap.az</span>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-bold text-foreground text-base">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
                <p className="text-xs font-mono mt-1" style={{ color: c.hex }}>{c.hex}</p>
              </div>

              {/* Buttons preview */}
              <div className="space-y-2">
                <button className="w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2" style={{ background: c.hex, color: "#1a1d23" }}>
                  <Plus size={15} /> Elan yerləşdir
                </button>
                <button className="w-full py-2.5 rounded-lg font-semibold text-sm border-2 flex items-center justify-center gap-2" style={{ borderColor: c.hex, color: c.hex, background: "transparent" }}>
                  <Search size={15} /> Axtar
                </button>
                <button className="w-full py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-2" style={{ background: c.hex + "18", color: c.hex }}>
                  <Heart size={14} /> Seçilmişlərə əlavə et
                </button>
              </div>

              {/* Badge preview */}
              <div className="flex gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: c.hex, color: "#1a1d23" }}>VIP</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold border" style={{ borderColor: c.hex, color: c.hex }}>Premium</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: c.hex + "20", color: c.hex }}>Yeni</span>
              </div>

              {/* Card preview */}
              <div className="rounded-xl border border-border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-muted" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Mercedes E-Class</p>
                    <p className="text-xs" style={{ color: c.hex, fontWeight: 700 }}>25,000 ₼</p>
                  </div>
                  <Star size={16} style={{ color: c.hex }} fill={c.hex} />
                </div>
              </div>

              {/* Nav bar preview */}
              <div className="rounded-xl border border-border bg-muted/30 px-3 py-2.5 flex items-center justify-around">
                {[Search, ShoppingBag, Plus, Heart, Star].map((Icon, i) => (
                  <Icon key={i} size={18} style={i === 2 ? { color: c.hex } : {}} className={i !== 2 ? "text-muted-foreground" : ""} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
          Ana səhifəyə qayıt <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  </div>
);

export default ColorCompare;
