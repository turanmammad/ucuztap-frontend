import { useState, useRef } from "react";
import { ChevronRight, ChevronDown, X, Camera, Search, RotateCcw, Check, Upload } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SuccessModal from "@/components/post-ad/SuccessModal";
import { carBrands, brandList, motoBrands, motoBrandList } from "@/data/carData";

/* ═══ Category data ═══ */
const categories = [
  { emoji: "🚗", name: "Nəqliyyat" },
  { emoji: "🏠", name: "Daşınmaz Əmlak" },
  { emoji: "📱", name: "Elektronika" },
  { emoji: "🏡", name: "Ev və Bağ" },
  { emoji: "💼", name: "İş Elanları" },
  { emoji: "🔧", name: "Xidmətlər" },
  { emoji: "👔", name: "Geyim və Aksesuar" },
  { emoji: "🐾", name: "Heyvanlar" },
  { emoji: "⚽", name: "Hobbi və Asudə" },
  { emoji: "👶", name: "Uşaq Aləmi" },
  { emoji: "🏗️", name: "Tikinti və Təmir" },
  { emoji: "📦", name: "Digər" },
];

const subCategories: Record<string, string[]> = {
  "Nəqliyyat": ["Avtomobil", "Motosiklet", "Ehtiyat hissələri", "Su nəqliyyatı", "Digər"],
  "Daşınmaz Əmlak": ["Mənzil", "Ev / Villa", "Torpaq", "Qaraj", "Obyekt"],
  "Elektronika": ["Telefon", "Kompüter", "TV və Audio", "Foto / Video", "Digər"],
  "Ev və Bağ": ["Mebel", "Məişət texnikası", "Bağ ləvazimatları", "Digər"],
  "İş Elanları": ["Tam iş", "Yarım iş", "Freelance", "Staj"],
  "Xidmətlər": ["Təmir", "Təmizlik", "Nəqliyyat", "Təhsil", "Digər"],
  "Geyim və Aksesuar": ["Kişi", "Qadın", "Uşaq", "Aksesuar"],
  "Heyvanlar": ["İt", "Pişik", "Quş", "Digər"],
  "Hobbi və Asudə": ["İdman", "Musiqi", "Kitab", "Oyun", "Digər"],
  "Uşaq Aləmi": ["Geyim", "Oyuncaq", "Araba", "Digər"],
  "Tikinti və Təmir": ["Material", "Alət", "Xidmət"],
  "Digər": ["Digər"],
};

const deepCategories: Record<string, string[]> = {
  "Avtomobil": ["Mercedes-Benz", "BMW", "Toyota", "Hyundai", "Kia", "Lexus", "Audi", "Volkswagen", "Chevrolet", "Nissan"],
  "Telefon": ["iPhone", "Samsung", "Xiaomi", "Huawei", "OnePlus", "Digər"],
  "Mənzil": ["Kirayə", "Satılır", "Günlük"],
};

/* ═══ Category-specific fields ═══ */
const categoryFields: Record<string, { label: string; key: string; type?: string; placeholder?: string; options?: string[] }[]> = {
  "Nəqliyyat/Avtomobil": [
    { label: "Buraxılış ili", key: "year", placeholder: "2021", type: "number" },
    { label: "Yürüş (km)", key: "mileage", placeholder: "50000", type: "number" },
    { label: "Mühərrik (L)", key: "engine", placeholder: "2.0" },
    { label: "Yanacaq növü", key: "fuel", options: ["Benzin", "Dizel", "Qaz", "Hibrid", "Elektrik"] },
    { label: "Sürətlər qutusu", key: "gear", options: ["Avtomat", "Mexaniki", "Variator", "Robot"] },
    { label: "Ban növü", key: "body", options: ["Sedan", "SUV / Offroad", "Hetçbek", "Kupe", "Universal", "Minivan", "Pikap", "Kabriolet"] },
    { label: "Rəng", key: "color", options: ["Qara", "Ağ", "Gümüşü", "Boz", "Göy", "Qırmızı", "Yaşıl", "Qəhvəyi", "Sarı", "Bej", "Narıncı"] },
    { label: "Ötürücü", key: "drive", options: ["Ön", "Arxa", "Tam"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "Sürülmüş"] },
  ],
  "Nəqliyyat/Motosiklet": [
    { label: "Buraxılış ili", key: "year", placeholder: "2022", type: "number" },
    { label: "Yürüş (km)", key: "mileage", placeholder: "10000", type: "number" },
    { label: "Mühərrik (cc)", key: "engine", placeholder: "700" },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Nəqliyyat": [
    { label: "İl", key: "year", placeholder: "2022", type: "number" },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Daşınmaz Əmlak/Mənzil": [
    { label: "Otaq sayı", key: "rooms", options: ["1", "2", "3", "4", "5", "6+"] },
    { label: "Sahə (m²)", key: "area", placeholder: "80", type: "number" },
    { label: "Mərtəbə", key: "floor", placeholder: "5", type: "number" },
    { label: "Mərtəbə sayı", key: "totalFloors", placeholder: "16", type: "number" },
    { label: "Təmir", key: "repair", options: ["Təmirli", "Təmirsiz", "Yarımtəmir"] },
    { label: "Sənəd növü", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
    { label: "İpoteka", key: "mortgage", options: ["Var", "Yox"] },
  ],
  "Daşınmaz Əmlak/Ev / Villa": [
    { label: "Otaq sayı", key: "rooms", options: ["1", "2", "3", "4", "5", "6+"] },
    { label: "Sahə (m²)", key: "area", placeholder: "150", type: "number" },
    { label: "Torpaq (sot)", key: "landArea", placeholder: "6", type: "number" },
    { label: "Təmir", key: "repair", options: ["Təmirli", "Təmirsiz", "Yarımtəmir"] },
    { label: "Sənəd növü", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
  ],
  "Daşınmaz Əmlak/Torpaq": [
    { label: "Sahə (sot)", key: "area", placeholder: "10", type: "number" },
    { label: "Sənəd", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
    { label: "Təyinat", key: "purpose", options: ["Yaşayış", "Kənd təsərrüfatı", "Kommersiya"] },
  ],
  "Daşınmaz Əmlak": [
    { label: "Sahə (m²)", key: "area", placeholder: "80", type: "number" },
    { label: "Sənəd", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
  ],
  "Elektronika/Telefon": [
    { label: "Marka", key: "brand", options: ["iPhone", "Samsung", "Xiaomi", "Huawei", "OnePlus", "Google", "Digər"] },
    { label: "Model", key: "model", placeholder: "iPhone 15 Pro" },
    { label: "Yaddaş (GB)", key: "storage", options: ["32", "64", "128", "256", "512", "1TB"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı", "İşlənmiş - Orta"] },
  ],
  "Elektronika/Kompüter": [
    { label: "Növ", key: "pcType", options: ["Noutbuk", "Masaüstü", "Planşet", "Aksesuar"] },
    { label: "Marka", key: "brand", options: ["Apple", "Lenovo", "HP", "Dell", "Asus", "Acer", "MSI", "Digər"] },
    { label: "Model", key: "model", placeholder: "MacBook Pro M2" },
    { label: "RAM (GB)", key: "ram", options: ["4", "8", "16", "32", "64"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı"] },
  ],
  "Elektronika": [
    { label: "Marka", key: "brand", placeholder: "Marka" },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Ev və Bağ/Mebel": [
    { label: "Növ", key: "furnitureType", options: ["Divan", "Çarpayı", "Şkaf", "Stol", "Stul", "Mətbəx", "Digər"] },
    { label: "Material", key: "material", options: ["Ağac", "MDF", "DSP", "Metal", "Digər"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Ev və Bağ": [{ label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] }],
  "İş Elanları": [
    { label: "Vəzifə", key: "position", placeholder: "Satış meneceri" },
    { label: "Şirkət", key: "company", placeholder: "Şirkət adı" },
    { label: "İş rejimi", key: "workType", options: ["Tam", "Yarım", "Uzaqdan", "Freelance", "Staj"] },
    { label: "Təcrübə", key: "experience", options: ["Təcrübəsiz", "1-3 il", "3-5 il", "5+ il"] },
    { label: "Təhsil", key: "education", options: ["Orta", "Ali", "Magistr", "Fərqi yoxdur"] },
  ],
  "Xidmətlər": [
    { label: "Xidmət növü", key: "serviceType", options: ["Təmir", "Təmizlik", "Nəqliyyat", "Təhsil", "IT", "Digər"] },
    { label: "Təcrübə", key: "experience", options: ["1 ildən az", "1-3 il", "3-5 il", "5+ il"] },
  ],
  "Geyim və Aksesuar": [
    { label: "Növ", key: "clothingType", options: ["Köynək", "Şalvar", "Paltar", "Gödəkçə", "Ayaqqabı", "Çanta", "Saat", "Digər"] },
    { label: "Cins", key: "gender", options: ["Kişi", "Qadın", "Uşaq", "Unisex"] },
    { label: "Ölçü", key: "size", options: ["XS", "S", "M", "L", "XL", "XXL"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Heyvanlar": [
    { label: "Heyvan növü", key: "animalType", options: ["İt", "Pişik", "Quş", "Balıq", "Digər"] },
    { label: "Cins", key: "breed", placeholder: "Labrador" },
    { label: "Yaş", key: "age", placeholder: "2 ay" },
    { label: "Cinsiyyət", key: "gender", options: ["Erkək", "Dişi"] },
  ],
  "Hobbi və Asudə": [{ label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] }],
  "Uşaq Aləmi": [
    { label: "Növ", key: "kidType", options: ["Geyim", "Oyuncaq", "Araba", "Mebel", "Digər"] },
    { label: "Yaş qrupu", key: "ageGroup", options: ["0-1", "1-3", "3-6", "6-12", "12+"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Tikinti və Təmir": [
    { label: "Növ", key: "constructionType", options: ["Material", "Alət", "Xidmət"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Digər": [{ label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] }],
};

function getFieldsForCategory(path: string[]) {
  if (path.length >= 2) {
    const key = `${path[0]}/${path[1]}`;
    if (categoryFields[key]) return categoryFields[key];
  }
  if (path[0] && categoryFields[path[0]]) return categoryFields[path[0]];
  return [];
}

const cities = ["Bakı", "Sumqayıt", "Gəncə", "Mingəçevir", "Lənkəran", "Şirvan", "Şəki", "Naxçıvan", "Şamaxı", "Quba", "Xırdalan"];
const districtMap: Record<string, string[]> = {
  "Bakı": ["Nəsimi", "Yasamal", "Sabunçu", "Xətai", "Binəqədi", "Nizami", "Suraxanı", "Qaradağ", "Abşeron", "Nərimanov", "Səbail"],
  "Sumqayıt": ["Mərkəz", "1-ci mkr", "5-ci mkr"],
  "Gəncə": ["Nizami r.", "Kəpəz r."],
};
const currencies = ["AZN", "USD", "EUR"];
const MAX_IMAGES = 8;

/* ═══════════════════════ */
/*     MAIN COMPONENT      */
/* ═══════════════════════ */
const PostAdPage = () => {
  const [categoryPath, setCategoryPath] = useState<string[]>([]);
  const [hoveredMain, setHoveredMain] = useState<string | null>(null);
  const categoryComplete = categoryPath.length >= 2 &&
    (!deepCategories[categoryPath[1]] || categoryPath.length >= 3);

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currency, setCurrency] = useState("AZN");
  const [priceType, setPriceType] = useState<"fixed" | "negotiable">("fixed");

  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const [contact, setContact] = useState({
    fullName: "", phone: "", city: "Bakı", district: "", whatsapp: true,
  });

  const [accepted, setAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tried, setTried] = useState(false);

  const update = (key: string, val: string) => setFormData(d => ({ ...d, [key]: val }));
  const updateContact = <K extends keyof typeof contact>(key: K, val: typeof contact[K]) =>
    setContact(c => ({ ...c, [key]: val }));

  const isCarCategory = categoryPath[0] === "Nəqliyyat" && categoryPath[1] === "Avtomobil";
  const isMotoCategory = categoryPath[0] === "Nəqliyyat" && categoryPath[1] === "Motosiklet";
  const isJobCategory = categoryPath[0] === "İş Elanları";
  const fields = getFieldsForCategory(categoryPath);
  const currentBrands = isCarCategory ? brandList : isMotoCategory ? motoBrandList : [];
  const currentModels = isCarCategory && formData.brand ? (carBrands[formData.brand] || [])
    : isMotoCategory && formData.brand ? (motoBrands[formData.brand] || []) : [];

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = [...images];
    Array.from(files).forEach(f => {
      if (arr.length < MAX_IMAGES && f.type.startsWith("image/")) arr.push(URL.createObjectURL(f));
    });
    setImages(arr);
  };

  const mainCat = categoryPath[0];
  const subCat = categoryPath[1];
  // For side-by-side: which main cat to show subs for
  const activeSide = hoveredMain || mainCat;
  const activeSubs = activeSide ? (subCategories[activeSide] || []) : [];

  const canPublish = categoryComplete && formData.title && formData.description &&
    (isJobCategory || formData.price || priceType === "negotiable") &&
    images.length >= 1 && contact.phone && contact.city && accepted;

  const handleReset = () => {
    setCategoryPath([]);
    setFormData({});
    setImages([]);
    setAccepted(false);
    setShowSuccess(false);
    setContact({ fullName: "", phone: "", city: "Bakı", district: "", whatsapp: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SiteHeader />

      <main className="flex-1 container py-6 md:py-8">
        <div className="max-w-3xl mx-auto space-y-6">

          <h1 className="text-2xl font-bold text-foreground">Yeni elan yerləşdir</h1>

          {/* ═══ CATEGORY PICKER ═══ */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Kateqoriya</h2>
              {categoryComplete && (
                <button onClick={() => setCategoryPath([])} className="text-xs text-primary hover:underline flex items-center gap-1">
                  <RotateCcw size={11} /> Dəyiş
                </button>
              )}
            </div>

            {categoryComplete ? (
              /* Selected category summary */
              <div className="px-4 py-3 flex items-center gap-1.5 text-sm">
                <Check size={15} className="text-accent shrink-0" />
                {categoryPath.map((p, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight size={11} className="text-muted-foreground/50" />}
                    <span className={i === categoryPath.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"}>{p}</span>
                  </span>
                ))}
              </div>
            ) : !mainCat || (mainCat && !subCat) ? (
              /* Side-by-side category picker */
              <div className="flex min-h-[280px]">
                {/* Left: main categories */}
                <div className="w-1/2 border-r border-border overflow-y-auto">
                  {categories.map(cat => {
                    const isActive = activeSide === cat.name;
                    return (
                      <button
                        key={cat.name}
                        onMouseEnter={() => setHoveredMain(cat.name)}
                        onClick={() => {
                          setCategoryPath([cat.name]);
                          setHoveredMain(null);
                          // If no sub categories or only "Digər", auto-complete
                          const subs = subCategories[cat.name];
                          if (subs && subs.length === 1 && subs[0] === "Digər") {
                            setCategoryPath([cat.name, "Digər"]);
                          }
                        }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                          isActive ? "bg-primary/5 text-primary font-medium border-r-2 border-primary" : "text-card-foreground hover:bg-muted/50"
                        }`}
                      >
                        <span className="text-base">{cat.emoji}</span>
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right: sub categories */}
                <div className="w-1/2 overflow-y-auto">
                  {activeSubs.map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        setCategoryPath([activeSide!, sub]);
                        setHoveredMain(null);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm text-card-foreground hover:bg-muted/50 hover:text-primary transition-colors"
                    >
                      <span>{sub}</span>
                      {deepCategories[sub] && <ChevronRight size={13} className="text-muted-foreground" />}
                    </button>
                  ))}
                  {!activeSide && (
                    <p className="px-4 py-8 text-sm text-muted-foreground text-center">Kateqoriya seçin →</p>
                  )}
                </div>
              </div>
            ) : mainCat && subCat && !categoryPath[2] && deepCategories[subCat] ? (
              /* Deep category selection */
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-3 text-sm">
                  <button onClick={() => setCategoryPath([])} className="text-primary hover:underline">Kateqoriyalar</button>
                  <ChevronRight size={11} className="text-muted-foreground" />
                  <button onClick={() => setCategoryPath([mainCat])} className="text-primary hover:underline">{mainCat}</button>
                  <ChevronRight size={11} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">{subCat}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {deepCategories[subCat].map(deep => (
                    <button
                      key={deep}
                      onClick={() => setCategoryPath([mainCat, subCat, deep])}
                      className="px-3 py-2 rounded-lg border border-border text-sm text-card-foreground hover:border-primary/40 hover:bg-muted/30 transition-all text-left active:scale-[0.98]"
                    >
                      {deep}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* ═══ FORM — only when category selected ═══ */}
          {categoryComplete && (
            <>
              {/* Brand/Model for vehicles */}
              {(isCarCategory || isMotoCategory) && (
                <FieldSection title={isCarCategory ? "Avtomobil" : "Motosiklet"}>
                  <div className="grid grid-cols-2 gap-3">
                    <SearchableSelect
                      label="Marka *"
                      value={formData.brand}
                      options={currentBrands}
                      placeholder="Marka axtarın..."
                      onChange={(v) => {
                        if (formData.model) setFormData(d => ({ ...d, brand: v, model: "" }));
                        else update("brand", v);
                      }}
                    />
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
                      <InputField label="Model" value={formData.model} onChange={v => update("model", v)} placeholder="Modeli daxil edin" />
                    )}
                  </div>
                </FieldSection>
              )}

              {/* Category-specific fields */}
              {fields.length > 0 && (
                <FieldSection title="Xüsusiyyətlər">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {fields.map(f =>
                      f.options ? (
                        <SelectField key={f.key} label={f.label} value={formData[f.key]} onChange={v => update(f.key, v)} options={f.options} />
                      ) : (
                        <InputField key={f.key} label={f.label} value={formData[f.key]} onChange={v => update(f.key, v)} placeholder={f.placeholder} type={f.type} />
                      )
                    )}
                  </div>
                </FieldSection>
              )}

              {/* Title & Description */}
              <FieldSection title="Elan mətni">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Başlıq *</label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={e => update("title", e.target.value)}
                      placeholder={isJobCategory ? "Məs: Satış meneceri — Bakı" : "Məs: Toyota Camry 2.5, 2021"}
                      maxLength={100}
                      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Mətn *</label>
                    <textarea
                      value={formData.description || ""}
                      onChange={e => update("description", e.target.value)}
                      rows={4}
                      placeholder="Elanınız haqqında ətraflı yazın..."
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                    />
                  </div>
                </div>
              </FieldSection>

              {/* Price */}
              <FieldSection title="Qiymət">
                {!isJobCategory ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.price || ""}
                        onChange={e => update("price", e.target.value)}
                        placeholder="Qiymət"
                        disabled={priceType === "negotiable"}
                        className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow disabled:opacity-40"
                      />
                      <div className="flex border border-border rounded-lg overflow-hidden">
                        {currencies.map(c => (
                          <button key={c} type="button" onClick={() => setCurrency(c)}
                            className={`px-3 h-10 text-xs font-medium transition-colors ${currency === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={priceType === "negotiable"} onChange={e => setPriceType(e.target.checked ? "negotiable" : "fixed")} className="w-3.5 h-3.5 accent-primary rounded" />
                      <span className="text-xs text-muted-foreground">Razılaşma yolu ilə</span>
                    </label>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <input type="number" value={formData.price || ""} onChange={e => update("price", e.target.value)} placeholder="Min" className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                    <span className="text-muted-foreground text-sm">—</span>
                    <input type="number" value={formData.priceMax || ""} onChange={e => update("priceMax", e.target.value)} placeholder="Max" className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                    <span className="text-xs text-muted-foreground">AZN</span>
                  </div>
                )}
              </FieldSection>

              {/* Images */}
              <FieldSection title={`Şəkillər (${images.length}/${MAX_IMAGES})`}>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {images.map((src, i) => (
                    <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      {i === 0 && <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary text-primary-foreground">Əsas</span>}
                      <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-90">
                        <X size={10} />
                      </button>
                      {i > 0 && (
                        <button type="button" onClick={() => { const a=[...images]; const[m]=a.splice(i,1); a.unshift(m); setImages(a); }}
                          className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-semibold bg-white/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity active:scale-95">
                          Əsas et
                        </button>
                      )}
                    </div>
                  ))}
                  {images.length < MAX_IMAGES && (
                    <button type="button" onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                      className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-[0.97] ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30"}`}>
                      {images.length === 0 ? (
                        <><Upload size={20} className="text-muted-foreground" /><span className="text-[10px] text-muted-foreground font-medium">Şəkil yüklə</span></>
                      ) : (
                        <Camera size={18} className="text-muted-foreground" />
                      )}
                    </button>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => addFiles(e.target.files)} className="hidden" />
                <p className="text-[10px] text-muted-foreground mt-2">Minimum 1 şəkil. İlk şəkil elanın üz qabığıdır.</p>
              </FieldSection>

              {/* Contact */}
              <FieldSection title="Əlaqə məlumatları">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField label="Ad Soyad" value={contact.fullName} onChange={v => updateContact("fullName", v)} placeholder="Adınız" />
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Telefon *</label>
                    <div className="flex gap-1.5">
                      <span className="shrink-0 h-10 px-2 rounded-lg border border-input bg-muted flex items-center text-xs font-medium text-muted-foreground">+994</span>
                      <input type="tel" value={contact.phone} onChange={e => updateContact("phone", e.target.value)} placeholder="50 123 45 67"
                        className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                    </div>
                  </div>
                  <SelectField label="Şəhər *" value={contact.city} onChange={v => { updateContact("city", v); updateContact("district", ""); }} options={cities} />
                  {contact.city && districtMap[contact.city] && (
                    <SelectField label="Rayon" value={contact.district} onChange={v => updateContact("district", v)} options={districtMap[contact.city]} />
                  )}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-foreground">WhatsApp ilə əlaqə</span>
                  <button type="button" role="switch" aria-checked={contact.whatsapp} onClick={() => updateContact("whatsapp", !contact.whatsapp)}
                    className={`relative rounded-full transition-colors ${contact.whatsapp ? "bg-accent" : "bg-border"}`} style={{ width: 36, height: 20 }}>
                    <span className={`block absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-white shadow transition-transform ${contact.whatsapp ? "translate-x-4" : ""}`} />
                  </button>
                </div>
              </FieldSection>

              {/* Submit */}
              <div className="rounded-xl border border-border bg-card p-5">
                <label className="flex items-start gap-3 cursor-pointer mb-4">
                  <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-0.5 w-4 h-4 accent-accent rounded" />
                  <span className="text-sm text-muted-foreground">
                    <a href="/qaydalar" className="text-primary hover:underline">Qaydaları</a> oxudum və qəbul edirəm.
                  </span>
                </label>
                <button type="button" onClick={() => canPublish && setShowSuccess(true)} disabled={!canPublish}
                  className="w-full py-3 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-[hsl(var(--accent-hover))] transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-sm">
                  <span className="inline-flex items-center gap-2"><Check size={16} strokeWidth={3} /> Elanı dərc et</span>
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <SuccessModal open={showSuccess} onClose={handleReset} />
      <SiteFooter />
    </div>
  );
};

/* ═══ Helpers ═══ */
const FieldSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value?: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <input type={type} value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
  </div>
);

const SelectField = ({ label, value, onChange, options }: {
  label: string; value?: string; onChange: (v: string) => void; options: string[];
}) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <select value={value || ""} onChange={e => onChange(e.target.value)}
      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none">
      <option value="">Seçin</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const SearchableSelect = ({ label, value, options, placeholder, onChange }: {
  label: string; value?: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = search ? options.filter(o => o.toLowerCase().includes(search.toLowerCase())) : options;

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full h-10 rounded-lg border bg-background px-3 text-sm text-left flex items-center justify-between transition-shadow ${open ? "border-ring ring-2 ring-ring" : "border-input"}`}>
        <span className={value ? "text-foreground" : "text-muted-foreground"}>{value || "Seçin"}</span>
        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setSearch(""); }} />
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={placeholder} autoFocus
                  className="w-full h-8 rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-ring" />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground px-3 py-3 text-center">Tapılmadı</p>
              ) : filtered.map(opt => (
                <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${value === opt ? "bg-primary/10 text-primary font-medium" : "text-foreground"}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostAdPage;
