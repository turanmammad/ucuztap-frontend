import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

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

const FilterContent = ({ slug }: { slug?: string }) => {
  const fields = categoryFilters[slug || ""] || defaultFilters;
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, string[]>>({});
  const [ranges, setRanges] = useState<Record<string, { min: string; max: string }>>({});
  const [selects, setSelects] = useState<Record<string, string>>({});
  const [dateFilter, setDateFilter] = useState("Hamısı");

  const toggleCheck = (key: string, val: string) => {
    const list = checked[key] || [];
    setChecked({ ...checked, [key]: list.includes(val) ? list.filter((v) => v !== val) : [...list, val] });
  };

  const updateRange = (key: string, side: "min" | "max", val: string) => {
    setRanges({ ...ranges, [key]: { ...(ranges[key] || { min: "", max: "" }), [side]: val } });
  };

  const handleReset = () => {
    setActiveSub(null);
    setChecked({});
    setRanges({});
    setSelects({});
    setDateFilter("Hamısı");
  };

  return (
    <div className="space-y-6">
      {fields.map((field) => {
        if (field.type === "subcategory") {
          return (
            <div key={field.key}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{field.label}</h3>
              <ul className="space-y-0.5">
                {field.options?.map((s) => (
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
                      {s.count && <span className="text-xs text-muted-foreground">({s.count})</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (field.type === "range") {
          const range = ranges[field.key] || { min: "", max: "" };
          return (
            <div key={field.key}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{field.label}</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={range.min}
                  onChange={(e) => updateRange(field.key, "min", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
                <span className="text-muted-foreground text-sm">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={range.max}
                  onChange={(e) => updateRange(field.key, "max", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.key}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{field.label}</h3>
              <div className="relative">
                <select
                  value={selects[field.key] || ""}
                  onChange={(e) => setSelects({ ...selects, [field.key]: e.target.value })}
                  className="w-full appearance-none px-3 py-2 pr-8 text-sm border border-border rounded-md bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                >
                  <option value="">Hamısı</option>
                  {field.options?.map((o) => (
                    <option key={o.name} value={o.name}>{o.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          );
        }

        if (field.type === "checkbox") {
          return (
            <div key={field.key}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{field.label}</h3>
              <div className="space-y-2">
                {field.options?.map((o) => (
                  <label key={o.name} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={(checked[field.key] || []).includes(o.name)}
                      onChange={() => toggleCheck(field.key, o.name)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 accent-primary"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{o.name}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}

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
        <button onClick={handleReset} className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Sıfırla
        </button>
      </div>
    </div>
  );
};

const CategoryFilterSidebar = ({ open, onClose, slug }: Props) => {
  return (
    <>
      <aside className="hidden lg:block w-full">
        <FilterContent slug={slug} />
      </aside>

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
            <FilterContent slug={slug} />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilterSidebar;
