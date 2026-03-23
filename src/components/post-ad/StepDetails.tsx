import { useState } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  categoryPath: string[];
  formData: Record<string, string>;
  onUpdate: (data: Record<string, string>) => void;
}

const currencies = ["₼", "$", "€"];

// Category-specific field configs
const categoryFields: Record<string, { label: string; key: string; type?: string; placeholder?: string; options?: string[] }[]> = {
  "Nəqliyyat/Avtomobil": [
    { label: "Marka *", key: "brand", placeholder: "Mercedes-Benz" },
    { label: "Model", key: "model", placeholder: "E-Class" },
    { label: "İl *", key: "year", placeholder: "2021", type: "number" },
    { label: "Yürüş (km)", key: "mileage", placeholder: "50000", type: "number" },
    { label: "Mühərrik həcmi (L)", key: "engine", placeholder: "2.0" },
    { label: "Yanacaq", key: "fuel", options: ["Benzin", "Dizel", "Qaz", "Hibrid", "Elektrik"] },
    { label: "Ötürmə qutusu", key: "gear", options: ["Avtomat", "Mexaniki", "Variator", "Robot"] },
    { label: "Ban növü", key: "body", options: ["Sedan", "SUV", "Hetçbek", "Kupe", "Universal", "Minivan", "Pikap"] },
    { label: "Rəng", key: "color", options: ["Qara", "Ağ", "Gümüşü", "Boz", "Göy", "Qırmızı", "Yaşıl", "Qəhvəyi", "Sarı"] },
    { label: "Sürücülük", key: "drive", options: ["Ön", "Arxa", "Tam"] },
  ],
  "Nəqliyyat/Motosiklet": [
    { label: "Marka *", key: "brand", placeholder: "Yamaha" },
    { label: "Model", key: "model", placeholder: "MT-07" },
    { label: "İl *", key: "year", placeholder: "2022", type: "number" },
    { label: "Yürüş (km)", key: "mileage", placeholder: "10000", type: "number" },
    { label: "Mühərrik həcmi (cc)", key: "engine", placeholder: "700" },
    { label: "Rəng", key: "color", options: ["Qara", "Ağ", "Qırmızı", "Göy", "Yaşıl", "Sarı"] },
  ],
  "Nəqliyyat": [
    { label: "Marka", key: "brand", placeholder: "Marka" },
    { label: "Model", key: "model", placeholder: "Model" },
    { label: "İl", key: "year", placeholder: "2022", type: "number" },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Daşınmaz Əmlak/Mənzil": [
    { label: "Otaq sayı *", key: "rooms", options: ["1", "2", "3", "4", "5", "6+"] },
    { label: "Sahə (m²) *", key: "area", placeholder: "80", type: "number" },
    { label: "Mərtəbə", key: "floor", placeholder: "5", type: "number" },
    { label: "Mərtəbə sayı", key: "totalFloors", placeholder: "16", type: "number" },
    { label: "Təmir", key: "repair", options: ["Təmirli", "Təmirsiz", "Yarımtəmir"] },
    { label: "Sənəd", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
    { label: "Elan tipi *", key: "adType", options: ["Satılır", "Kirayə verilir", "Günlük kirayə"] },
    { label: "İpoteka", key: "mortgage", options: ["Var", "Yox"] },
  ],
  "Daşınmaz Əmlak/Ev / Villa": [
    { label: "Otaq sayı *", key: "rooms", options: ["1", "2", "3", "4", "5", "6+"] },
    { label: "Sahə (m²) *", key: "area", placeholder: "150", type: "number" },
    { label: "Torpaq sahəsi (sot)", key: "landArea", placeholder: "6", type: "number" },
    { label: "Mərtəbə sayı", key: "totalFloors", placeholder: "2", type: "number" },
    { label: "Təmir", key: "repair", options: ["Təmirli", "Təmirsiz", "Yarımtəmir"] },
    { label: "Sənəd", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
    { label: "Elan tipi *", key: "adType", options: ["Satılır", "Kirayə verilir"] },
  ],
  "Daşınmaz Əmlak/Torpaq": [
    { label: "Sahə (sot) *", key: "area", placeholder: "10", type: "number" },
    { label: "Sənəd", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
    { label: "Təyinat", key: "purpose", options: ["Yaşayış", "Kənd təsərrüfatı", "Kommersiya"] },
  ],
  "Daşınmaz Əmlak": [
    { label: "Sahə (m²)", key: "area", placeholder: "80", type: "number" },
    { label: "Elan tipi", key: "adType", options: ["Satılır", "Kirayə verilir", "Günlük kirayə"] },
    { label: "Sənəd", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
  ],
  "Elektronika/Telefon": [
    { label: "Marka *", key: "brand", options: ["iPhone", "Samsung", "Xiaomi", "Huawei", "OnePlus", "Google", "Digər"] },
    { label: "Model", key: "model", placeholder: "iPhone 15 Pro" },
    { label: "Yaddaş (GB)", key: "storage", options: ["32", "64", "128", "256", "512", "1TB"] },
    { label: "Rəng", key: "color", placeholder: "Qara" },
    { label: "Vəziyyət *", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı", "İşlənmiş - Orta"] },
  ],
  "Elektronika/Kompüter": [
    { label: "Növ *", key: "pcType", options: ["Noutbuk", "Masaüstü", "Planşet", "Aksesuar"] },
    { label: "Marka", key: "brand", options: ["Apple", "Lenovo", "HP", "Dell", "Asus", "Acer", "MSI", "Digər"] },
    { label: "Model", key: "model", placeholder: "MacBook Pro M2" },
    { label: "RAM (GB)", key: "ram", options: ["4", "8", "16", "32", "64"] },
    { label: "Yaddaş (GB)", key: "storage", options: ["128", "256", "512", "1TB", "2TB"] },
    { label: "Vəziyyət *", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı", "İşlənmiş - Orta"] },
  ],
  "Elektronika": [
    { label: "Marka", key: "brand", placeholder: "Marka" },
    { label: "Model", key: "model", placeholder: "Model" },
    { label: "Vəziyyət *", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Ev və Bağ/Mebel": [
    { label: "Növ *", key: "furnitureType", options: ["Divan", "Çarpayı", "Şkaf", "Stol", "Stul", "Mətbəx mebeli", "Digər"] },
    { label: "Material", key: "material", options: ["Ağac", "MDF", "DSP", "Metal", "Digər"] },
    { label: "Vəziyyət *", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı", "İşlənmiş - Orta"] },
    { label: "Rəng", key: "color", placeholder: "Qəhvəyi" },
  ],
  "Ev və Bağ/Məişət texnikası": [
    { label: "Növ *", key: "applianceType", options: ["Soyuducu", "Paltaryuyan", "Qabyuyan", "Kondisioner", "Sobalar", "Tozsoran", "Digər"] },
    { label: "Marka", key: "brand", placeholder: "Bosch" },
    { label: "Vəziyyət *", key: "condition", options: ["Yeni", "İşlənmiş"] },
    { label: "Zəmanət", key: "warranty", options: ["Var", "Yox"] },
  ],
  "Ev və Bağ": [
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "İş Elanları": [
    { label: "Vəzifə *", key: "position", placeholder: "Satış meneceri" },
    { label: "Şirkət", key: "company", placeholder: "Şirkət adı" },
    { label: "İş rejimi *", key: "workType", options: ["Tam", "Yarım", "Uzaqdan", "Freelance", "Staj"] },
    { label: "Təcrübə", key: "experience", options: ["Təcrübəsiz", "1-3 il", "3-5 il", "5+ il"] },
    { label: "Təhsil", key: "education", options: ["Orta", "Ali", "Magistr", "Fərqi yoxdur"] },
    { label: "Maaş tipi", key: "salaryType", options: ["Aylıq", "Saatlıq", "Razılaşma yolu ilə"] },
  ],
  "Xidmətlər": [
    { label: "Xidmət növü *", key: "serviceType", options: ["Təmir", "Təmizlik", "Nəqliyyat", "Təhsil", "Sağlamlıq", "Hüquqi", "IT", "Digər"] },
    { label: "Təcrübə", key: "experience", options: ["1 ildən az", "1-3 il", "3-5 il", "5+ il"] },
    { label: "İş vaxtı", key: "workHours", options: ["7/24", "İş günləri", "Həftə sonu", "Razılaşma ilə"] },
  ],
  "Geyim və Aksesuar": [
    { label: "Növ *", key: "clothingType", options: ["Köynək", "Şalvar", "Paltar", "Gödəkçə", "Ayaqqabı", "Çanta", "Saat", "Digər"] },
    { label: "Cins", key: "gender", options: ["Kişi", "Qadın", "Uşaq", "Unisex"] },
    { label: "Ölçü", key: "size", options: ["XS", "S", "M", "L", "XL", "XXL", "Digər"] },
    { label: "Marka", key: "brand", placeholder: "Zara" },
    { label: "Vəziyyət *", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Heyvanlar": [
    { label: "Heyvan növü *", key: "animalType", options: ["İt", "Pişik", "Quş", "Balıq", "Gəmirici", "Digər"] },
    { label: "Cins", key: "breed", placeholder: "Labrador" },
    { label: "Yaş", key: "age", placeholder: "2 ay" },
    { label: "Cinsiyyət", key: "gender", options: ["Erkək", "Dişi"] },
    { label: "Peyvənd", key: "vaccine", options: ["Var", "Yox"] },
  ],
  "Hobbi və Asudə": [
    { label: "Kateqoriya *", key: "hobbyType", options: ["İdman", "Musiqi", "Kitab", "Oyun", "Kolleksiya", "Digər"] },
    { label: "Vəziyyət *", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Uşaq Aləmi": [
    { label: "Növ *", key: "kidType", options: ["Geyim", "Oyuncaq", "Araba", "Mebel", "Digər"] },
    { label: "Yaş qrupu", key: "ageGroup", options: ["0-1", "1-3", "3-6", "6-12", "12+"] },
    { label: "Cins", key: "gender", options: ["Oğlan", "Qız", "Unisex"] },
    { label: "Vəziyyət *", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Tikinti və Təmir": [
    { label: "Növ *", key: "constructionType", options: ["Material", "Alət", "Xidmət"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Digər": [
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
};

function getFieldsForCategory(path: string[]): typeof categoryFields[string] {
  // Try most specific first: "Main/Sub"
  if (path.length >= 2) {
    const key = `${path[0]}/${path[1]}`;
    if (categoryFields[key]) return categoryFields[key];
  }
  // Fallback to main category
  if (path[0] && categoryFields[path[0]]) return categoryFields[path[0]];
  return [];
}

function getSectionTitle(path: string[]): string {
  const titles: Record<string, string> = {
    "Nəqliyyat": "Nəqliyyat məlumatları",
    "Daşınmaz Əmlak": "Əmlak məlumatları",
    "Elektronika": "Cihaz məlumatları",
    "Ev və Bağ": "Məhsul məlumatları",
    "İş Elanları": "Vakansiya məlumatları",
    "Xidmətlər": "Xidmət məlumatları",
    "Geyim və Aksesuar": "Məhsul məlumatları",
    "Heyvanlar": "Heyvan məlumatları",
    "Hobbi və Asudə": "Əlavə məlumatlar",
    "Uşaq Aləmi": "Məhsul məlumatları",
    "Tikinti və Təmir": "Əlavə məlumatlar",
    "Digər": "Əlavə məlumatlar",
  };
  return titles[path[0]] || "Əlavə məlumatlar";
}

const StepDetails = ({ categoryPath, formData, onUpdate }: Props) => {
  const [currency, setCurrency] = useState("₼");
  const [priceType, setPriceType] = useState<"fixed" | "negotiable">("fixed");

  const update = (key: string, value: string) => {
    onUpdate({ ...formData, [key]: value });
  };

  const fields = getFieldsForCategory(categoryPath);

  const handleAiTitle = () => {
    const parts = categoryPath.filter(Boolean);
    const extras = [formData.brand, formData.model, formData.year, formData.position].filter(Boolean);
    const combined = [...extras, ...parts.slice(0, 1)].filter(Boolean);
    if (combined.length > 0) {
      update("title", combined.join(" "));
    }
  };

  const handleAiDesc = () => {
    const lines: string[] = [];
    if (formData.title) lines.push(formData.title);
    fields.forEach((f) => {
      if (formData[f.key]) lines.push(`${f.label.replace(" *", "")}: ${formData[f.key]}`);
    });
    update("description", lines.length > 0 ? lines.join(". ") + ". Əla vəziyyətdə." : "");
  };

  const isJobCategory = categoryPath[0] === "İş Elanları";

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Elan məlumatları</h2>

      <div className="space-y-5 max-w-xl">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Başlıq *</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => update("title", e.target.value)}
              placeholder={isJobCategory ? "Məsələn: Satış meneceri — Bakı" : "Məsələn: Toyota Camry 2.5 Hybrid, 2021"}
              className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            <button
              type="button"
              onClick={handleAiTitle}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 h-11 rounded-lg border border-border bg-muted/50 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors active:scale-[0.97]"
            >
              <Sparkles size={14} /> AI ilə yaz
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Təsvir *</label>
          <div className="space-y-2">
            <textarea
              value={formData.description || ""}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              placeholder="Elanınız haqqında ətraflı yazın..."
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
            />
            <button
              type="button"
              onClick={handleAiDesc}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-muted/50 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors active:scale-[0.97]"
            >
              <Sparkles size={14} /> AI ilə yaz
            </button>
          </div>
        </div>

        {/* Price */}
        {!isJobCategory ? (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Qiymət *</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.price || ""}
                onChange={(e) => update("price", e.target.value)}
                placeholder="0"
                className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              <div className="flex border border-border rounded-lg overflow-hidden">
                {currencies.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={`px-3 h-11 text-sm font-medium transition-colors ${
                      currency === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={priceType === "fixed"} onChange={() => setPriceType("fixed")} className="w-4 h-4 accent-primary" />
                <span className="text-sm text-foreground">Qiymət göstər</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={priceType === "negotiable"} onChange={() => setPriceType("negotiable")} className="w-4 h-4 accent-primary" />
                <span className="text-sm text-foreground">Razılaşma yolu ilə</span>
              </label>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Maaş (₼)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.price || ""}
                onChange={(e) => update("price", e.target.value)}
                placeholder="Min"
                className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              <span className="flex items-center text-muted-foreground">—</span>
              <input
                type="number"
                value={formData.priceMax || ""}
                onChange={(e) => update("priceMax", e.target.value)}
                placeholder="Max"
                className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
          </div>
        )}

        {/* Dynamic category-specific fields */}
        {fields.length > 0 && (
          <div className="border-t border-border pt-5 mt-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">{getSectionTitle(categoryPath)}</h3>
            <div className="grid grid-cols-2 gap-4">
              {fields.map((f) =>
                f.options ? (
                  <SelectField
                    key={f.key}
                    label={f.label}
                    value={formData[f.key]}
                    onChange={(v) => update(f.key, v)}
                    options={f.options}
                  />
                ) : (
                  <Field
                    key={f.key}
                    label={f.label}
                    value={formData[f.key]}
                    onChange={(v) => update(f.key, v)}
                    placeholder={f.placeholder}
                    type={f.type}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value?: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
    />
  </div>
);

const SelectField = ({
  label, value, onChange, options,
}: {
  label: string; value?: string; onChange: (v: string) => void; options: string[];
}) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
    >
      <option value="">Seçin</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default StepDetails;
