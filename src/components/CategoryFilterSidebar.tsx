import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, X, Search, RotateCcw, SlidersHorizontal } from "lucide-react";

const dateOptions = ["Son 24 saat", "Son 3 gün", "Son həftə", "Son ay", "Hamısı"];

type FilterField = {
  key: string;
  label: string;
  type: "select" | "checkbox" | "range" | "subcategory";
  options?: { name: string; count?: string }[];
};

const categoryFilters: Record<string, FilterField[]> = {
  neqliyyat: [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Avtomobil", count: "25,000" }, { name: "Motosiklet", count: "500" },
      { name: "Ehtiyat hissələri", count: "3,000" }, { name: "Velosiped", count: "800" },
      { name: "Su nəqliyyatı", count: "200" }, { name: "Digər", count: "15,730" },
    ]},
    { key: "brand", label: "Marka", type: "select", options: [
      { name: "Mercedes-Benz" }, { name: "BMW" }, { name: "Toyota" }, { name: "Hyundai" },
      { name: "Kia" }, { name: "Lexus" }, { name: "Nissan" }, { name: "Chevrolet" },
    ]},
    { key: "fuel", label: "Yanacaq növü", type: "checkbox", options: [
      { name: "Benzin" }, { name: "Dizel" }, { name: "Qaz" }, { name: "Hibrid" }, { name: "Elektrik" },
    ]},
    { key: "gear", label: "Ötürmə qutusu", type: "checkbox", options: [
      { name: "Avtomat" }, { name: "Mexaniki" }, { name: "Variator" }, { name: "Robot" },
    ]},
    { key: "year", label: "Buraxılış ili", type: "range" },
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "mileage", label: "Yürüş (km)", type: "range" },
    { key: "color", label: "Rəng", type: "checkbox", options: [
      { name: "Qara" }, { name: "Ağ" }, { name: "Gümüşü" }, { name: "Boz" }, { name: "Göy" }, { name: "Qırmızı" },
    ]},
  ],
  emlak: [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Mənzil", count: "15,000" }, { name: "Ev / Villa", count: "3,200" },
      { name: "Torpaq", count: "2,100" }, { name: "Qaraj", count: "800" }, { name: "Obyekt", count: "2,356" },
    ]},
    { key: "adType", label: "Elan tipi", type: "checkbox", options: [
      { name: "Satılır" }, { name: "Kirayə verilir" }, { name: "Günlük kirayə" },
    ]},
    { key: "rooms", label: "Otaq sayı", type: "checkbox", options: [
      { name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5+" },
    ]},
    { key: "area", label: "Sahə (m²)", type: "range" },
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "repair", label: "Təmir", type: "checkbox", options: [
      { name: "Təmirli" }, { name: "Təmirsiz" }, { name: "Yarımtəmir" },
    ]},
    { key: "document", label: "Sənəd", type: "checkbox", options: [
      { name: "Kupça" }, { name: "Çıxarış" }, { name: "Müqavilə" },
    ]},
    { key: "floor", label: "Mərtəbə", type: "range" },
  ],
  elektronika: [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Telefon", count: "18,000" }, { name: "Kompüter", count: "6,500" },
      { name: "TV və Audio", count: "4,200" }, { name: "Foto / Video", count: "2,800" }, { name: "Digər", count: "3,067" },
    ]},
    { key: "brand", label: "Marka", type: "select", options: [
      { name: "Apple" }, { name: "Samsung" }, { name: "Xiaomi" }, { name: "Huawei" }, { name: "Sony" }, { name: "Digər" },
    ]},
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "condition", label: "Vəziyyət", type: "checkbox", options: [
      { name: "Yeni" }, { name: "İşlənmiş" },
    ]},
  ],
  "ev-ve-bag": [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Mebel", count: "5,200" }, { name: "Məişət texnikası", count: "4,100" },
      { name: "Bağ ləvazimatları", count: "1,800" }, { name: "Digər", count: "1,245" },
    ]},
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "condition", label: "Vəziyyət", type: "checkbox", options: [
      { name: "Yeni" }, { name: "İşlənmiş" },
    ]},
  ],
  "is-elanlari": [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Tam iş", count: "4,500" }, { name: "Yarım iş", count: "1,200" },
      { name: "Freelance", count: "800" }, { name: "Staj", count: "2,401" },
    ]},
    { key: "workType", label: "İş rejimi", type: "checkbox", options: [
      { name: "Ofisdə" }, { name: "Uzaqdan" }, { name: "Hibrid" },
    ]},
    { key: "experience", label: "Təcrübə", type: "checkbox", options: [
      { name: "Təcrübəsiz" }, { name: "1-3 il" }, { name: "3-5 il" }, { name: "5+ il" },
    ]},
    { key: "salary", label: "Maaş (₼)", type: "range" },
    { key: "education", label: "Təhsil", type: "checkbox", options: [
      { name: "Orta" }, { name: "Ali" }, { name: "Magistr" },
    ]},
  ],
  xidmetler: [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Təmir", count: "4,200" }, { name: "Təmizlik", count: "2,300" },
      { name: "Nəqliyyat", count: "3,100" }, { name: "Təhsil", count: "2,800" }, { name: "Digər", count: "3,278" },
    ]},
    { key: "price", label: "Qiymət (₼)", type: "range" },
  ],
  "geyim-aksesuar": [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Kişi", count: "6,400" }, { name: "Qadın", count: "8,200" },
      { name: "Uşaq", count: "2,100" }, { name: "Aksesuar", count: "2,534" },
    ]},
    { key: "size", label: "Ölçü", type: "checkbox", options: [
      { name: "XS" }, { name: "S" }, { name: "M" }, { name: "L" }, { name: "XL" }, { name: "XXL" },
    ]},
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "condition", label: "Vəziyyət", type: "checkbox", options: [
      { name: "Yeni" }, { name: "İşlənmiş" },
    ]},
    { key: "brand", label: "Marka", type: "select", options: [
      { name: "Nike" }, { name: "Adidas" }, { name: "Zara" }, { name: "H&M" }, { name: "Digər" },
    ]},
  ],
  heyvanlar: [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "İt", count: "1,200" }, { name: "Pişik", count: "800" },
      { name: "Quş", count: "500" }, { name: "Digər", count: "956" },
    ]},
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "gender", label: "Cinsiyyət", type: "checkbox", options: [
      { name: "Erkək" }, { name: "Dişi" },
    ]},
  ],
  "hobbi-asude": [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "İdman", count: "1,800" }, { name: "Musiqi", count: "900" },
      { name: "Kitab", count: "1,200" }, { name: "Oyun", count: "1,000" }, { name: "Digər", count: "778" },
    ]},
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "condition", label: "Vəziyyət", type: "checkbox", options: [
      { name: "Yeni" }, { name: "İşlənmiş" },
    ]},
  ],
  "usaq-alemi": [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Geyim", count: "2,800" }, { name: "Oyuncaq", count: "2,100" },
      { name: "Araba", count: "1,200" }, { name: "Digər", count: "1,790" },
    ]},
    { key: "ageGroup", label: "Yaş qrupu", type: "checkbox", options: [
      { name: "0-1" }, { name: "1-3" }, { name: "3-6" }, { name: "6-12" }, { name: "12+" },
    ]},
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "condition", label: "Vəziyyət", type: "checkbox", options: [
      { name: "Yeni" }, { name: "İşlənmiş" },
    ]},
  ],
  "tikinti-temir": [
    { key: "sub", label: "Alt Kateqoriyalar", type: "subcategory", options: [
      { name: "Material", count: "2,100" }, { name: "Alət", count: "1,200" }, { name: "Xidmət", count: "1,267" },
    ]},
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "condition", label: "Vəziyyət", type: "checkbox", options: [
      { name: "Yeni" }, { name: "İşlənmiş" },
    ]},
  ],
  diger: [
    { key: "price", label: "Qiymət (₼)", type: "range" },
    { key: "condition", label: "Vəziyyət", type: "checkbox", options: [
      { name: "Yeni" }, { name: "İşlənmiş" },
    ]},
  ],
};

const defaultFilters = categoryFilters.neqliyyat;

interface Props {
  open: boolean;
  onClose: () => void;
  activeFilters: number;
  slug?: string;
}

/* ── Collapsible Section ── */
const FilterSection = ({
  title,
  defaultOpen = true,
  children,
  badge,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: number;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors"
      >
        <span className="flex items-center gap-2">
          {title}
          {badge && badge > 0 ? (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              {badge}
            </span>
          ) : null}
        </span>
        {open ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
};

const FilterContent = ({ slug, onActiveCount }: { slug?: string; onActiveCount?: (n: number) => void }) => {
  const fields = categoryFilters[slug || ""] || defaultFilters;
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, string[]>>({});
  const [ranges, setRanges] = useState<Record<string, { min: string; max: string }>>({});
  const [selects, setSelects] = useState<Record<string, string>>({});
  const [dateFilter, setDateFilter] = useState("Hamısı");
  const [filterSearch, setFilterSearch] = useState("");

  const toggleCheck = (key: string, val: string) => {
    const list = checked[key] || [];
    setChecked({ ...checked, [key]: list.includes(val) ? list.filter((v) => v !== val) : [...list, val] });
  };

  const updateRange = (key: string, side: "min" | "max", val: string) => {
    setRanges({ ...ranges, [key]: { ...(ranges[key] || { min: "", max: "" }), [side]: val } });
  };

  // Count active filters
  const activeCount = useMemo(() => {
    let count = 0;
    if (activeSub) count++;
    Object.values(checked).forEach(arr => { count += arr.length; });
    Object.values(ranges).forEach(r => { if (r.min || r.max) count++; });
    Object.values(selects).forEach(v => { if (v) count++; });
    if (dateFilter !== "Hamısı") count++;
    onActiveCount?.(count);
    return count;
  }, [activeSub, checked, ranges, selects, dateFilter, onActiveCount]);

  const handleReset = () => {
    setActiveSub(null);
    setChecked({});
    setRanges({});
    setSelects({});
    setDateFilter("Hamısı");
    setFilterSearch("");
  };

  // Collect active filter chips
  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (activeSub) activeChips.push({ label: activeSub, onRemove: () => setActiveSub(null) });
  Object.entries(checked).forEach(([key, vals]) => {
    const field = fields.find(f => f.key === key);
    vals.forEach(v => activeChips.push({
      label: `${field?.label ? field.label + ': ' : ''}${v}`,
      onRemove: () => toggleCheck(key, v),
    }));
  });
  Object.entries(selects).forEach(([key, val]) => {
    if (val) {
      const field = fields.find(f => f.key === key);
      activeChips.push({ label: `${field?.label}: ${val}`, onRemove: () => setSelects({ ...selects, [key]: "" }) });
    }
  });
  Object.entries(ranges).forEach(([key, r]) => {
    if (r.min || r.max) {
      const field = fields.find(f => f.key === key);
      activeChips.push({
        label: `${field?.label}: ${r.min || '0'} — ${r.max || '∞'}`,
        onRemove: () => setRanges({ ...ranges, [key]: { min: "", max: "" } }),
      });
    }
  });
  if (dateFilter !== "Hamısı") activeChips.push({ label: dateFilter, onRemove: () => setDateFilter("Hamısı") });

  return (
    <div className="space-y-0">
      {/* Search in filters */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
          placeholder="Filterlərdə axtar..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-shadow placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="mb-4 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Aktiv filterlər ({activeCount})
            </span>
            <button onClick={handleReset} className="text-xs text-destructive hover:underline flex items-center gap-1">
              <RotateCcw size={10} /> Hamısını sil
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeChips.map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-foreground text-xs font-medium group"
              >
                {chip.label}
                <button onClick={chip.onRemove} className="ml-0.5 hover:text-destructive transition-colors">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {fields.map((field) => {
        // Filter search: hide sections that don't match
        if (filterSearch.trim()) {
          const q = filterSearch.toLowerCase();
          const labelMatch = field.label.toLowerCase().includes(q);
          const optionMatch = field.options?.some(o => o.name.toLowerCase().includes(q));
          if (!labelMatch && !optionMatch) return null;
        }

        if (field.type === "subcategory") {
          return (
            <FilterSection key={field.key} title={field.label} badge={activeSub ? 1 : 0}>
              <ul className="space-y-0.5">
                {field.options?.map((s) => (
                  <li key={s.name}>
                    <button
                      onClick={() => setActiveSub(activeSub === s.name ? null : s.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        activeSub === s.name
                          ? "bg-primary/10 text-foreground font-semibold border-l-[3px] border-primary pl-2.5"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{s.name}</span>
                      {s.count && (
                        <span className="text-[11px] text-muted-foreground/70 tabular-nums">{s.count}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </FilterSection>
          );
        }

        if (field.type === "range") {
          const range = ranges[field.key] || { min: "", max: "" };
          const hasBadge = range.min || range.max;
          return (
            <FilterSection key={field.key} title={field.label} defaultOpen={false} badge={hasBadge ? 1 : 0}>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={range.min}
                  onChange={(e) => updateRange(field.key, "min", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <span className="text-muted-foreground text-sm font-medium">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={range.max}
                  onChange={(e) => updateRange(field.key, "max", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
            </FilterSection>
          );
        }

        if (field.type === "select") {
          const hasVal = !!selects[field.key];
          return (
            <FilterSection key={field.key} title={field.label} defaultOpen={false} badge={hasVal ? 1 : 0}>
              <div className="relative">
                <select
                  value={selects[field.key] || ""}
                  onChange={(e) => setSelects({ ...selects, [field.key]: e.target.value })}
                  className="w-full appearance-none px-3 py-2.5 pr-8 text-sm border border-border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                >
                  <option value="">Hamısı</option>
                  {field.options?.map((o) => (
                    <option key={o.name} value={o.name}>{o.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </FilterSection>
          );
        }

        if (field.type === "checkbox") {
          const checkedVals = checked[field.key] || [];
          return (
            <FilterSection key={field.key} title={field.label} defaultOpen={field.options && field.options.length <= 4} badge={checkedVals.length || undefined}>
              <div className="space-y-1">
                {field.options?.map((o) => {
                  const isChecked = checkedVals.includes(o.name);
                  return (
                    <label
                      key={o.name}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-all ${
                        isChecked ? "bg-primary/8 border border-primary/20" : "hover:bg-muted border border-transparent"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                        isChecked ? "bg-primary border-primary" : "border-border"
                      }`}>
                        {isChecked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm transition-colors ${isChecked ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {o.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </FilterSection>
          );
        }

        return null;
      })}

      {/* City */}
      <FilterSection title="Şəhər" defaultOpen={false}>
        <div className="relative">
          <select className="w-full appearance-none px-3 py-2.5 pr-8 text-sm border border-border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all">
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
      </FilterSection>

      {/* Date */}
      <FilterSection title="Tarix" defaultOpen={false} badge={dateFilter !== "Hamısı" ? 1 : undefined}>
        <div className="grid grid-cols-2 gap-1.5">
          {dateOptions.map((d) => (
            <button
              key={d}
              onClick={() => setDateFilter(d)}
              className={`px-3 py-2 rounded-lg text-xs font-medium text-center transition-all ${
                dateFilter === d
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Actions */}
      <div className="space-y-2 pt-4">
        <button className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97] shadow-sm">
          <span className="flex items-center justify-center gap-2">
            <Search size={15} /> Nəticələri göstər
          </span>
        </button>
        {activeCount > 0 && (
          <button onClick={handleReset} className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
            <RotateCcw size={13} /> Filterləri sıfırla
          </button>
        )}
      </div>
    </div>
  );
};

const CategoryFilterSidebar = ({ open, onClose, slug }: Props) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-full rounded-xl border border-border bg-card p-4 shadow-sm">
        <FilterContent slug={slug} />
      </aside>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl max-h-[90vh] overflow-y-auto animate-fade-up">
            {/* Handle */}
            <div className="sticky top-0 z-10 bg-background pt-3 pb-2 px-5 border-b border-border rounded-t-2xl">
              <div className="w-10 h-1 rounded-full bg-border mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <SlidersHorizontal size={18} /> Filterlər
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-5 pb-8">
              <FilterContent slug={slug} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilterSidebar;
