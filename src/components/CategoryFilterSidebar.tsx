import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const subcategories = [
  { name: "Avtomobil", count: "25,000", active: false },
  { name: "Motosiklet", count: "500", active: false },
  { name: "Ehtiyat hissələri", count: "3,000", active: false },
  { name: "Velosiped", count: "800", active: false },
  { name: "Su nəqliyyatı", count: "200", active: false },
  { name: "Digər", count: "15,730", active: false },
];

const dateOptions = ["Son 24 saat", "Son 3 gün", "Son həftə", "Son ay", "Hamısı"];

interface Props {
  open: boolean;
  onClose: () => void;
  activeFilters: number;
}

const FilterContent = () => {
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [condition, setCondition] = useState<string[]>([]);
  const [adType, setAdType] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState("Hamısı");

  const toggleCheck = (list: string[], val: string, setter: (v: string[]) => void) => {
    setter(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);
  };

  return (
    <div className="space-y-6">
      {/* Subcategories */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Alt Kateqoriyalar</h3>
        <ul className="space-y-0.5">
          {subcategories.map((s) => (
            <li key={s.name}>
              <button
                onClick={() => setActiveSub(activeSub === s.name ? null : s.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSub === s.name
                    ? "bg-primary/10 text-foreground font-medium border-l-[3px] border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>{s.name}</span>
                <span className="text-xs text-muted-foreground">({s.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Qiymət (₼)</h3>
        <div className="flex gap-2 items-center">
          <input type="number" placeholder="Min" className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
          <span className="text-muted-foreground text-sm">—</span>
          <input type="number" placeholder="Max" className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
        </div>
        <button className="mt-2 w-full py-1.5 text-xs font-medium rounded-md border border-border hover:border-primary text-muted-foreground hover:text-foreground transition-all">
          Tətbiq et
        </button>
      </div>

      {/* City */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Şəhər</h3>
        <div className="relative">
          <select className="w-full appearance-none px-3 py-2 pr-8 text-sm border border-border rounded-md bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-shadow">
            <option>Bütün şəhərlər</option>
            <option>Bakı</option>
            <option>Gəncə</option>
            <option>Sumqayıt</option>
            <option>Mingəçevir</option>
            <option>Lənkəran</option>
            <option>Şəki</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Vəziyyət</h3>
        <div className="space-y-2">
          {["Yeni", "İşlənmiş"].map((v) => (
            <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={condition.includes(v)}
                onChange={() => toggleCheck(condition, v, setCondition)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{v}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ad type */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Elan tipi</h3>
        <div className="space-y-2">
          {["Adi", "VIP", "Premium"].map((v) => (
            <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={adType.includes(v)}
                onChange={() => toggleCheck(adType, v, setAdType)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{v}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Tarix</h3>
        <div className="space-y-1">
          {dateOptions.map((d) => (
            <button
              key={d}
              onClick={() => setDateFilter(d)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                dateFilter === d ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-2 border-t border-border">
        <button className="w-full py-2.5 rounded-md bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97]">
          Axtar
        </button>
        <button className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Sıfırla
        </button>
      </div>
    </div>
  );
};

const CategoryFilterSidebar = ({ open, onClose }: Props) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-full">
        <FilterContent />
      </aside>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl max-h-[85vh] overflow-y-auto p-5 pb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground">Filterlər</h2>
              <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors">
                <X size={20} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilterSidebar;
