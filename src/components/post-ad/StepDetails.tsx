import { useState } from "react";
import { Sparkles, Search, Wand2, RefreshCw, TrendingUp, Lightbulb, ChevronDown, Check } from "lucide-react";
import { carBrands, brandList, motoBrands, motoBrandList } from "@/data/carData";

interface Props {
  categoryPath: string[];
  formData: Record<string, string>;
  onUpdate: (data: Record<string, string>) => void;
}

const currencies = ["₼", "$", "€"];

// Category-specific field configs
const categoryFields: Record<string, { label: string; key: string; type?: string; placeholder?: string; options?: string[] }[]> = {
  "Nəqliyyat/Avtomobil": [
    { label: "İl *", key: "year", placeholder: "2021", type: "number" },
    { label: "Yürüş (km)", key: "mileage", placeholder: "50000", type: "number" },
    { label: "Mühərrik həcmi (L)", key: "engine", placeholder: "2.0" },
    { label: "Yanacaq", key: "fuel", options: ["Benzin", "Dizel", "Qaz", "Hibrid", "Elektrik"] },
    { label: "Ötürmə qutusu", key: "gear", options: ["Avtomat", "Mexaniki", "Variator", "Robot"] },
    { label: "Ban növü", key: "body", options: ["Sedan", "SUV", "Hetçbek", "Kupe", "Universal", "Minivan", "Pikap", "Kabriolet", "Liftbek", "Mikroavtobus"] },
    { label: "Rəng", key: "color", options: ["Qara", "Ağ", "Gümüşü", "Boz", "Göy", "Qırmızı", "Yaşıl", "Qəhvəyi", "Sarı", "Narıncı", "Bej", "Mavi"] },
    { label: "Sürücülük", key: "drive", options: ["Ön", "Arxa", "Tam"] },
    { label: "At gücü", key: "horsepower", placeholder: "150", type: "number" },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "Sürülmüş", "Əla", "Yaxşı", "Orta", "Ehtiyata ehtiyacı var"] },
  ],
  "Nəqliyyat/Motosiklet": [
    { label: "İl *", key: "year", placeholder: "2022", type: "number" },
    { label: "Yürüş (km)", key: "mileage", placeholder: "10000", type: "number" },
    { label: "Mühərrik həcmi (cc)", key: "engine", placeholder: "700" },
    { label: "Rəng", key: "color", options: ["Qara", "Ağ", "Qırmızı", "Göy", "Yaşıl", "Sarı", "Narıncı"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı", "İşlənmiş - Orta"] },
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
  if (path.length >= 2) {
    const key = `${path[0]}/${path[1]}`;
    if (categoryFields[key]) return categoryFields[key];
  }
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

function getTitlePlaceholder(path: string[]): string {
  const cat = path[0];
  const sub = path[1];
  const placeholders: Record<string, string> = {
    "Nəqliyyat/Avtomobil": "Məsələn: Toyota Camry 2.5 Hybrid, 2021",
    "Nəqliyyat/Motosiklet": "Məsələn: Yamaha MT-07, 2022",
    "Nəqliyyat": "Məsələn: Ford Transit, 2020",
    "Daşınmaz Əmlak/Mənzil": "Məsələn: 3 otaqlı mənzil, 28 May m.",
    "Daşınmaz Əmlak/Ev / Villa": "Məsələn: 4 otaqlı həyət evi, Mərdəkan",
    "Daşınmaz Əmlak/Torpaq": "Məsələn: 6 sot torpaq, Şüvəlan",
    "Daşınmaz Əmlak": "Məsələn: Ofis icarəyə verilir, Nəsimi",
    "Elektronika/Telefon": "Məsələn: iPhone 15 Pro Max, 256GB",
    "Elektronika/Kompüter": "Məsələn: MacBook Pro M2, 16GB RAM",
    "Elektronika": "Məsələn: Samsung TV 55 düym, 4K",
    "Ev və Bağ/Mebel": "Məsələn: Künc divan, yeni, qəhvəyi",
    "Ev və Bağ/Məişət texnikası": "Məsələn: Bosch paltaryuyan, 8 kq",
    "Ev və Bağ": "Məsələn: Bağ üçün masa dəsti",
    "İş Elanları": "Məsələn: Satış meneceri — Bakı",
    "Xidmətlər": "Məsələn: Ev təmiri xidməti, təcrübəli usta",
    "Geyim və Aksesuar": "Məsələn: Nike Air Force 1, ölçü 42",
    "Heyvanlar": "Məsələn: Labrador bala, 3 aylıq",
    "Hobbi və Asudə": "Məsələn: Akustik gitara, Yamaha",
    "Uşaq Aləmi": "Məsələn: Uşaq arabası, az işlənmiş",
    "Tikinti və Təmir": "Məsələn: Laminat döşəmə, 50 m²",
  };
  if (sub) {
    const key = `${cat}/${sub}`;
    if (placeholders[key]) return placeholders[key];
  }
  return placeholders[cat] || "Elanın başlığını daxil edin";
}

const StepDetails = ({ categoryPath, formData, onUpdate }: Props) => {
  const [currency, setCurrency] = useState("₼");
  const [priceType, setPriceType] = useState<"fixed" | "negotiable">("fixed");
  const [aiTitleLoading, setAiTitleLoading] = useState(false);
  const [aiDescLoading, setAiDescLoading] = useState(false);
  const [aiPriceLoading, setAiPriceLoading] = useState(false);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [showDescSuggestions, setShowDescSuggestions] = useState(false);
  const [showPriceHint, setShowPriceHint] = useState(false);

  // Mock AI suggestions (will be replaced with real AI calls)
  const titleSuggestions = [
    formData.brand && formData.model ? `${formData.brand} ${formData.model}${formData.year ? `, ${formData.year}` : ""}` : null,
    formData.brand && formData.model ? `${formData.brand} ${formData.model}${formData.year ? ` ${formData.year}` : ""} — əla vəziyyətdə` : null,
    formData.brand && formData.model && formData.mileage ? `${formData.brand} ${formData.model}, ${formData.mileage} km, ${formData.year || ""}` : null,
    categoryPath[0] === "Daşınmaz Əmlak" && formData.rooms ? `${formData.rooms} otaqlı mənzil, ${formData.area || ""} m²` : null,
    categoryPath[0] === "İş Elanları" && formData.position ? `${formData.position} — ${formData.company || "şirkət"}` : null,
  ].filter(Boolean) as string[];

  const descSuggestions = [
    "Tam texniki baxışdan keçib, heç bir problemi yoxdur.",
    "Sənədləri qaydasındadır. Real alıcıya endirim mümkündür.",
    "Təcili satılır, qiymətdə razılaşma var.",
  ];

  // Mock price range (will be replaced with real AI logic)
  const getPriceRange = () => {
    const cat = categoryPath.join("/");
    const ranges: Record<string, { min: number; max: number; avg: number }> = {
      "Nəqliyyat/Avtomobil": { min: 8000, max: 65000, avg: 25000 },
      "Daşınmaz Əmlak/Mənzil": { min: 45000, max: 350000, avg: 120000 },
      "Elektronika/Telefon": { min: 200, max: 3500, avg: 1200 },
      "Elektronika/Kompüter": { min: 400, max: 5000, avg: 1800 },
    };
    return ranges[cat] || { min: 50, max: 5000, avg: 500 };
  };

  const priceRange = getPriceRange();

  const update = (key: string, value: string) => {
    onUpdate({ ...formData, [key]: value });
  };

  const fields = getFieldsForCategory(categoryPath);

  const handleAiTitle = () => {
    setAiTitleLoading(true);
    // Simulate AI loading
    setTimeout(() => {
      setAiTitleLoading(false);
      setShowTitleSuggestions(true);
    }, 600);
  };

  const handleAiDesc = () => {
    setAiDescLoading(true);
    setTimeout(() => {
      setAiDescLoading(false);
      setShowDescSuggestions(true);
    }, 600);
  };

  const handleAiPrice = () => {
    setAiPriceLoading(true);
    setTimeout(() => {
      setAiPriceLoading(false);
      setShowPriceHint(true);
    }, 500);
  };

  const isJobCategory = categoryPath[0] === "İş Elanları";
  const isCarCategory = categoryPath[0] === "Nəqliyyat" && categoryPath[1] === "Avtomobil";
  const isMotoCategory = categoryPath[0] === "Nəqliyyat" && categoryPath[1] === "Motosiklet";

  // Get models based on selected brand
  const getModels = (): string[] => {
    if (isCarCategory && formData.brand) {
      return carBrands[formData.brand] || [];
    }
    if (isMotoCategory && formData.brand) {
      return motoBrands[formData.brand] || [];
    }
    return [];
  };

  const currentBrands = isCarCategory ? brandList : isMotoCategory ? motoBrandList : [];
  const currentModels = getModels();

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Elan məlumatları</h2>

      <div className="space-y-5 max-w-xl">
        {/* Brand & Model pickers for car/moto */}
        {(isCarCategory || isMotoCategory) && (
          <div className="border border-border rounded-xl p-5 bg-card space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {isCarCategory ? "Avtomobil məlumatları" : "Motosiklet məlumatları"}
            </h3>
            
            {/* Brand picker */}
            <SearchableSelect
              label="Marka *"
              value={formData.brand}
              options={currentBrands}
              placeholder="Marka axtarın..."
              onChange={(v) => {
                update("brand", v);
                // Reset model when brand changes
                if (formData.model) {
                  onUpdate({ ...formData, brand: v, model: "" });
                }
              }}
            />

            {/* Model picker - dependent on brand */}
            {formData.brand && formData.brand !== "Digər" && currentModels.length > 0 && (
              <SearchableSelect
                label="Model *"
                value={formData.model}
                options={currentModels}
                placeholder="Model axtarın..."
                onChange={(v) => update("model", v)}
              />
            )}

            {formData.brand && (formData.brand === "Digər" || currentModels.length === 0) && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Model</label>
                <input
                  type="text"
                  value={formData.model || ""}
                  onChange={(e) => update("model", e.target.value)}
                  placeholder="Modeli daxil edin"
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Başlıq *</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => { update("title", e.target.value); setShowTitleSuggestions(false); }}
              placeholder={getTitlePlaceholder(categoryPath)}
              className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            <button
              type="button"
              onClick={handleAiTitle}
              disabled={aiTitleLoading}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 h-11 rounded-lg bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white text-sm font-medium hover:opacity-90 transition-all active:scale-[0.97] disabled:opacity-60"
            >
              {aiTitleLoading ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Wand2 size={14} />
              )}
              AI
            </button>
          </div>

          {/* AI Title Suggestions */}
          {showTitleSuggestions && titleSuggestions.length > 0 && (
            <div className="mt-2 rounded-xl border border-[hsl(271,81%,56%)]/20 bg-[hsl(271,81%,96%)] dark:bg-[hsl(271,81%,15%)] p-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles size={12} className="text-[hsl(271,81%,56%)]" />
                <span className="text-[11px] font-semibold text-[hsl(271,81%,56%)] uppercase tracking-wide">AI təklifləri</span>
              </div>
              <div className="space-y-1.5">
                {titleSuggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { update("title", sug); setShowTitleSuggestions(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground bg-background/70 hover:bg-background border border-transparent hover:border-border transition-all flex items-center gap-2 group"
                  >
                    <span className="flex-1">{sug}</span>
                    <Check size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAiTitle}
                className="mt-2 inline-flex items-center gap-1 text-[11px] text-[hsl(271,81%,56%)] hover:underline"
              >
                <RefreshCw size={10} /> Yenidən yarat
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Təsvir *</label>
          <textarea
            value={formData.description || ""}
            onChange={(e) => { update("description", e.target.value); setShowDescSuggestions(false); }}
            rows={4}
            placeholder="Elanınız haqqında ətraflı yazın..."
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={handleAiDesc}
              disabled={aiDescLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white text-sm font-medium hover:opacity-90 transition-all active:scale-[0.97] disabled:opacity-60"
            >
              {aiDescLoading ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Wand2 size={14} />
              )}
              AI ilə yaz
            </button>
            <span className="text-[11px] text-muted-foreground">
              Sahələrə əsasən avtomatik təsvir yaradır
            </span>
          </div>

          {/* AI Description Suggestions */}
          {showDescSuggestions && (
            <div className="mt-2 rounded-xl border border-[hsl(271,81%,56%)]/20 bg-[hsl(271,81%,96%)] dark:bg-[hsl(271,81%,15%)] p-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex items-center gap-1.5 mb-2">
                <Lightbulb size={12} className="text-[hsl(271,81%,56%)]" />
                <span className="text-[11px] font-semibold text-[hsl(271,81%,56%)] uppercase tracking-wide">Təsvir əlavələri</span>
              </div>
              <div className="space-y-1.5">
                {descSuggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const current = formData.description || "";
                      update("description", current ? `${current} ${sug}` : sug);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground bg-background/70 hover:bg-background border border-transparent hover:border-border transition-all flex items-center gap-2 group"
                  >
                    <span className="text-muted-foreground text-xs">+</span>
                    <span className="flex-1">{sug}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAiDesc}
                className="mt-2 inline-flex items-center gap-1 text-[11px] text-[hsl(271,81%,56%)] hover:underline"
              >
                <RefreshCw size={10} /> Daha çox təklif
              </button>
            </div>
          )}
        </div>

        {/* Price */}
        {!isJobCategory ? (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Qiymət *</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.price || ""}
                onChange={(e) => { update("price", e.target.value); setShowPriceHint(false); }}
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

            {/* AI Price Suggestion */}
            <div className="mt-2">
              {!showPriceHint ? (
                <button
                  type="button"
                  onClick={handleAiPrice}
                  disabled={aiPriceLoading}
                  className="inline-flex items-center gap-1.5 text-xs text-[hsl(271,81%,56%)] hover:underline font-medium"
                >
                  {aiPriceLoading ? (
                    <RefreshCw size={11} className="animate-spin" />
                  ) : (
                    <TrendingUp size={11} />
                  )}
                  AI qiymət aralığını göstər
                </button>
              ) : (
                <div className="rounded-xl border border-[hsl(271,81%,56%)]/20 bg-[hsl(271,81%,96%)] dark:bg-[hsl(271,81%,15%)] p-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <TrendingUp size={12} className="text-[hsl(271,81%,56%)]" />
                    <span className="text-[11px] font-semibold text-[hsl(271,81%,56%)] uppercase tracking-wide">Bazar qiymət aralığı</span>
                  </div>

                  {/* Price range bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                      <span>{priceRange.min.toLocaleString()} ₼</span>
                      <span className="font-semibold text-foreground">{priceRange.avg.toLocaleString()} ₼ orta</span>
                      <span>{priceRange.max.toLocaleString()} ₼</span>
                    </div>
                    <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="absolute inset-y-0 rounded-full bg-gradient-to-r from-accent via-[hsl(var(--vip-gold))] to-[hsl(var(--destructive))]"
                        style={{ left: "0%", right: "0%" }}
                      />
                      {/* Avg marker */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background shadow-sm"
                        style={{ left: `${((priceRange.avg - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick price buttons */}
                  <div className="flex gap-2">
                    {[priceRange.min, priceRange.avg, priceRange.max].map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => update("price", String(p))}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                          formData.price === String(p)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        {i === 0 ? "Aşağı" : i === 1 ? "Orta" : "Yuxarı"}
                        <br />
                        <span className="font-bold">{p.toLocaleString()} ₼</span>
                      </button>
                    ))}
                  </div>

                  <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                    <Lightbulb size={9} /> Oxşar elanlara əsasən hesablanıb
                  </p>
                </div>
              )}
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

// Searchable select for brands & models
const SearchableSelect = ({
  label, value, options, placeholder, onChange,
}: {
  label: string; value?: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleSelect = (v: string) => {
    onChange(v);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-10 rounded-lg border bg-background px-3 text-sm text-left flex items-center justify-between transition-shadow ${
          open ? "border-ring ring-2 ring-ring" : "border-input"
        }`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || "Seçin"}
        </span>
        <svg className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setSearch(""); }} />
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
            {/* Search input */}
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={placeholder}
                  autoFocus
                  className="w-full h-9 rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            
            {/* Options list */}
            <div className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground px-3 py-4 text-center">Nəticə tapılmadı</p>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${
                      value === opt ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
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
