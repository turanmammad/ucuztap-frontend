import { useState, useRef } from "react";
import { ChevronRight, ChevronDown, Upload, X, ImagePlus, Camera, AlertCircle, Sparkles, Search, RotateCcw, Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SuccessModal from "@/components/post-ad/SuccessModal";
import { carBrands, brandList, motoBrands, motoBrandList } from "@/data/carData";

/* ───────── Category data ───────── */
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

/* ───────── Category-specific fields ───────── */
const categoryFields: Record<string, { label: string; key: string; type?: string; placeholder?: string; options?: string[] }[]> = {
  "Nəqliyyat/Avtomobil": [
    { label: "İl", key: "year", placeholder: "2021", type: "number" },
    { label: "Yürüş (km)", key: "mileage", placeholder: "50000", type: "number" },
    { label: "Mühərrik (L)", key: "engine", placeholder: "2.0" },
    { label: "Yanacaq", key: "fuel", options: ["Benzin", "Dizel", "Qaz", "Hibrid", "Elektrik"] },
    { label: "Ötürmə qutusu", key: "gear", options: ["Avtomat", "Mexaniki", "Variator", "Robot"] },
    { label: "Ban növü", key: "body", options: ["Sedan", "SUV", "Hetçbek", "Kupe", "Universal", "Minivan", "Pikap", "Kabriolet"] },
    { label: "Rəng", key: "color", options: ["Qara", "Ağ", "Gümüşü", "Boz", "Göy", "Qırmızı", "Yaşıl", "Qəhvəyi", "Sarı", "Bej"] },
    { label: "Sürücülük", key: "drive", options: ["Ön", "Arxa", "Tam"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "Sürülmüş", "Əla", "Yaxşı", "Orta"] },
  ],
  "Nəqliyyat/Motosiklet": [
    { label: "İl", key: "year", placeholder: "2022", type: "number" },
    { label: "Yürüş (km)", key: "mileage", placeholder: "10000", type: "number" },
    { label: "Mühərrik (cc)", key: "engine", placeholder: "700" },
    { label: "Rəng", key: "color", options: ["Qara", "Ağ", "Qırmızı", "Göy", "Yaşıl"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı"] },
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
    { label: "Sənəd", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
    { label: "İpoteka", key: "mortgage", options: ["Var", "Yox"] },
  ],
  "Daşınmaz Əmlak/Ev / Villa": [
    { label: "Otaq sayı", key: "rooms", options: ["1", "2", "3", "4", "5", "6+"] },
    { label: "Sahə (m²)", key: "area", placeholder: "150", type: "number" },
    { label: "Torpaq (sot)", key: "landArea", placeholder: "6", type: "number" },
    { label: "Təmir", key: "repair", options: ["Təmirli", "Təmirsiz", "Yarımtəmir"] },
    { label: "Sənəd", key: "document", options: ["Kupça", "Çıxarış", "Müqavilə"] },
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
    { label: "Yaddaş (GB)", key: "storage", options: ["128", "256", "512", "1TB", "2TB"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı"] },
  ],
  "Elektronika": [
    { label: "Marka", key: "brand", placeholder: "Marka" },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Ev və Bağ/Mebel": [
    { label: "Növ", key: "furnitureType", options: ["Divan", "Çarpayı", "Şkaf", "Stol", "Stul", "Mətbəx mebeli", "Digər"] },
    { label: "Material", key: "material", options: ["Ağac", "MDF", "DSP", "Metal", "Digər"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş - Əla", "İşlənmiş - Yaxşı", "İşlənmiş - Orta"] },
  ],
  "Ev və Bağ": [
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "İş Elanları": [
    { label: "Vəzifə", key: "position", placeholder: "Satış meneceri" },
    { label: "Şirkət", key: "company", placeholder: "Şirkət adı" },
    { label: "İş rejimi", key: "workType", options: ["Tam", "Yarım", "Uzaqdan", "Freelance", "Staj"] },
    { label: "Təcrübə", key: "experience", options: ["Təcrübəsiz", "1-3 il", "3-5 il", "5+ il"] },
    { label: "Təhsil", key: "education", options: ["Orta", "Ali", "Magistr", "Fərqi yoxdur"] },
    { label: "Maaş tipi", key: "salaryType", options: ["Aylıq", "Saatlıq", "Razılaşma yolu ilə"] },
  ],
  "Xidmətlər": [
    { label: "Xidmət növü", key: "serviceType", options: ["Təmir", "Təmizlik", "Nəqliyyat", "Təhsil", "Sağlamlıq", "IT", "Digər"] },
    { label: "Təcrübə", key: "experience", options: ["1 ildən az", "1-3 il", "3-5 il", "5+ il"] },
  ],
  "Geyim və Aksesuar": [
    { label: "Növ", key: "clothingType", options: ["Köynək", "Şalvar", "Paltar", "Gödəkçə", "Ayaqqabı", "Çanta", "Saat", "Digər"] },
    { label: "Cins", key: "gender", options: ["Kişi", "Qadın", "Uşaq", "Unisex"] },
    { label: "Ölçü", key: "size", options: ["XS", "S", "M", "L", "XL", "XXL"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Heyvanlar": [
    { label: "Heyvan növü", key: "animalType", options: ["İt", "Pişik", "Quş", "Balıq", "Gəmirici", "Digər"] },
    { label: "Cins", key: "breed", placeholder: "Labrador" },
    { label: "Yaş", key: "age", placeholder: "2 ay" },
    { label: "Cinsiyyət", key: "gender", options: ["Erkək", "Dişi"] },
  ],
  "Hobbi və Asudə": [
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Uşaq Aləmi": [
    { label: "Növ", key: "kidType", options: ["Geyim", "Oyuncaq", "Araba", "Mebel", "Digər"] },
    { label: "Yaş qrupu", key: "ageGroup", options: ["0-1", "1-3", "3-6", "6-12", "12+"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Tikinti və Təmir": [
    { label: "Növ", key: "constructionType", options: ["Material", "Alət", "Xidmət"] },
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
  "Digər": [
    { label: "Vəziyyət", key: "condition", options: ["Yeni", "İşlənmiş"] },
  ],
};

function getFieldsForCategory(path: string[]) {
  if (path.length >= 2) {
    const key = `${path[0]}/${path[1]}`;
    if (categoryFields[key]) return categoryFields[key];
  }
  if (path[0] && categoryFields[path[0]]) return categoryFields[path[0]];
  return [];
}

/* ───────── Contact data ───────── */
const cities = ["Bakı", "Sumqayıt", "Gəncə", "Mingəçevir", "Lənkəran", "Şirvan", "Şəki", "Naxçıvan"];
const districtMap: Record<string, string[]> = {
  "Bakı": ["Nəsimi", "Yasamal", "Sabunçu", "Xətai", "Binəqədi", "Nizami", "Suraxanı", "Qaradağ", "Abşeron"],
  "Sumqayıt": ["Mərkəz", "1-ci mkr", "5-ci mkr"],
  "Gəncə": ["Nizami r.", "Kəpəz r."],
};

const currencies = ["₼", "$", "€"];
const MAX_IMAGES = 10;

/* ═══════════════════════════════════════════ */
/*            MAIN COMPONENT                   */
/* ═══════════════════════════════════════════ */
const PostAdPage = () => {
  // Category
  const [categoryPath, setCategoryPath] = useState<string[]>([]);
  const categoryComplete = categoryPath.length >= 2 &&
    (!deepCategories[categoryPath[1]] || categoryPath.length >= 3);

  // Form
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currency, setCurrency] = useState("₼");
  const [priceType, setPriceType] = useState<"fixed" | "negotiable">("fixed");

  // Images
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  // Contact
  const [contact, setContact] = useState({
    fullName: "",
    phone: "",
    extraPhone: "",
    city: "Bakı",
    district: "",
    whatsapp: true,
    address: "",
  });

  // Submit
  const [accepted, setAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Image handlers
  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages = [...images];
    Array.from(files).forEach(f => {
      if (newImages.length < MAX_IMAGES && f.type.startsWith("image/")) {
        newImages.push(URL.createObjectURL(f));
      }
    });
    setImages(newImages);
  };

  const canPublish = categoryComplete && formData.title && formData.description &&
    (isJobCategory || formData.price || priceType === "negotiable") &&
    images.length >= 1 && contact.phone && contact.city && accepted;

  const handlePublish = () => {
    if (canPublish) setShowSuccess(true);
  };

  const handleReset = () => {
    setCategoryPath([]);
    setFormData({});
    setImages([]);
    setAccepted(false);
    setShowSuccess(false);
    setContact({ fullName: "", phone: "", extraPhone: "", city: "Bakı", district: "", whatsapp: true, address: "" });
  };

  /* ─── Category picker (inline) ─── */
  const mainCat = categoryPath[0];
  const subCat = categoryPath[1];

  const selectMain = (name: string) => setCategoryPath([name]);
  const selectSub = (name: string) => setCategoryPath([mainCat, name]);
  const selectDeep = (name: string) => setCategoryPath([mainCat, subCat, name]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SiteHeader />

      <main className="flex-1 container py-6 md:py-10">
        <div className="max-w-2xl mx-auto space-y-6">

          <h1 className="text-2xl font-bold text-foreground">Yeni elan</h1>

          {/* ═══ SECTION 1: Category ═══ */}
          <Section num={1} title="Kateqoriya">
            {categoryComplete ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm flex-wrap">
                  {categoryPath.map((p, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      {i > 0 && <ChevronRight size={12} className="text-muted-foreground" />}
                      <span className={i === categoryPath.length - 1 ? "font-semibold text-primary" : "text-muted-foreground"}>{p}</span>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCategoryPath([])}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw size={12} /> Dəyiş
                </button>
              </div>
            ) : (
              <>
                {/* Main categories */}
                {!mainCat && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => selectMain(cat.name)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-border bg-card text-left hover:border-primary/50 hover:bg-muted/50 transition-all active:scale-[0.98]"
                      >
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="text-sm font-medium text-card-foreground">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Breadcrumb for partial selection */}
                {mainCat && (
                  <div className="flex items-center gap-1.5 mb-3 text-sm">
                    <button onClick={() => setCategoryPath([])} className="text-muted-foreground hover:text-foreground transition-colors">Kateqoriyalar</button>
                    <ChevronRight size={12} className="text-muted-foreground" />
                    {subCat ? (
                      <>
                        <button onClick={() => setCategoryPath([mainCat])} className="text-muted-foreground hover:text-foreground transition-colors">{mainCat}</button>
                        <ChevronRight size={12} className="text-muted-foreground" />
                        <span className="font-medium text-foreground">{subCat}</span>
                      </>
                    ) : (
                      <span className="font-medium text-foreground">{mainCat}</span>
                    )}
                  </div>
                )}

                {/* Sub categories */}
                {mainCat && !subCat && (
                  <div className="space-y-1">
                    {(subCategories[mainCat] || []).map(sub => (
                      <button
                        key={sub}
                        onClick={() => selectSub(sub)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all text-left"
                      >
                        <span className="text-sm font-medium text-card-foreground">{sub}</span>
                        <ChevronRight size={14} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Deep categories */}
                {mainCat && subCat && !categoryPath[2] && deepCategories[subCat] && (
                  <div className="space-y-1">
                    {deepCategories[subCat].map(deep => (
                      <button
                        key={deep}
                        onClick={() => selectDeep(deep)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all text-left"
                      >
                        <span className="text-sm font-medium text-card-foreground">{deep}</span>
                        <ChevronRight size={14} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </Section>

          {/* Show remaining sections only after category is selected */}
          {categoryComplete && (
            <>
              {/* ═══ SECTION 2: Details ═══ */}
              <Section num={2} title="Elan məlumatları">
                <div className="space-y-4">

                  {/* Brand/Model for car/moto */}
                  {(isCarCategory || isMotoCategory) && (
                    <div className="grid grid-cols-2 gap-3">
                      <SearchableSelect
                        label="Marka *"
                        value={formData.brand}
                        options={currentBrands}
                        placeholder="Marka axtarın..."
                        onChange={(v) => {
                          if (formData.model) {
                            setFormData(d => ({ ...d, brand: v, model: "" }));
                          } else {
                            update("brand", v);
                          }
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

                  {/* Category-specific fields */}
                  {fields.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {fields.map(f =>
                        f.options ? (
                          <div key={f.key}>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label>
                            <select
                              value={formData[f.key] || ""}
                              onChange={e => update(f.key, e.target.value)}
                              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
                            >
                              <option value="">Seçin</option>
                              {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </div>
                        ) : (
                          <div key={f.key}>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label>
                            <input
                              type={f.type || "text"}
                              value={formData[f.key] || ""}
                              onChange={e => update(f.key, e.target.value)}
                              placeholder={f.placeholder}
                              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Başlıq *</label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={e => update("title", e.target.value)}
                      placeholder={isJobCategory ? "Məs: Satış meneceri — Bakı" : "Məs: Toyota Camry 2.5, 2021"}
                      className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Təsvir *</label>
                    <textarea
                      value={formData.description || ""}
                      onChange={e => update("description", e.target.value)}
                      rows={4}
                      placeholder="Elanınız haqqında ətraflı yazın..."
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                    />
                  </div>

                  {/* Price */}
                  {!isJobCategory ? (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Qiymət *</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={formData.price || ""}
                          onChange={e => update("price", e.target.value)}
                          placeholder="0"
                          disabled={priceType === "negotiable"}
                          className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow disabled:opacity-50"
                        />
                        <div className="flex border border-border rounded-lg overflow-hidden">
                          {currencies.map(c => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setCurrency(c)}
                              className={`px-3 h-11 text-sm font-medium transition-colors ${currency === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={priceType === "negotiable"}
                          onChange={e => setPriceType(e.target.checked ? "negotiable" : "fixed")}
                          className="w-4 h-4 accent-primary rounded"
                        />
                        <span className="text-sm text-muted-foreground">Razılaşma yolu ilə</span>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Maaş (₼)</label>
                      <div className="flex gap-2">
                        <input type="number" value={formData.price || ""} onChange={e => update("price", e.target.value)} placeholder="Min" className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                        <span className="flex items-center text-muted-foreground">—</span>
                        <input type="number" value={formData.priceMax || ""} onChange={e => update("priceMax", e.target.value)} placeholder="Max" className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* ═══ SECTION 3: Images ═══ */}
              <Section num={3} title="Şəkillər">
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {images.map((src, i) => (
                    <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-card">
                      <img src={src} alt={`Şəkil ${i + 1}`} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary text-primary-foreground">Əsas</span>
                      )}
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                      {i > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const arr = [...images];
                            const [moved] = arr.splice(i, 1);
                            arr.unshift(moved);
                            setImages(arr);
                          }}
                          className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-semibold bg-white/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Əsas et
                        </button>
                      )}
                    </div>
                  ))}

                  {images.length < MAX_IMAGES && (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                      className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-[0.97] ${
                        dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30"
                      }`}
                    >
                      <Camera size={18} className="text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">Əlavə et</span>
                    </button>
                  )}
                </div>

                <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => addFiles(e.target.files)} className="hidden" />
                <p className="text-xs text-muted-foreground mt-2">{images.length}/{MAX_IMAGES} şəkil · Minimum 1 şəkil tələb olunur</p>
              </Section>

              {/* ═══ SECTION 4: Contact ═══ */}
              <Section num={4} title="Əlaqə">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      value={contact.fullName}
                      onChange={e => updateContact("fullName", e.target.value)}
                      placeholder="Adınız"
                      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Telefon *</label>
                    <div className="flex items-center gap-1.5">
                      <span className="shrink-0 h-10 px-2.5 rounded-lg border border-input bg-muted flex items-center text-xs font-medium text-muted-foreground">+994</span>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={e => updateContact("phone", e.target.value)}
                        placeholder="50 123 45 67"
                        className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Şəhər *</label>
                    <select
                      value={contact.city}
                      onChange={e => { updateContact("city", e.target.value); updateContact("district", ""); }}
                      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
                    >
                      <option value="">Seçin</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {contact.city && districtMap[contact.city] && (
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Rayon</label>
                      <select
                        value={contact.district}
                        onChange={e => updateContact("district", e.target.value)}
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
                      >
                        <option value="">Seçin</option>
                        {districtMap[contact.city].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 py-3 border-t border-border">
                  <span className="text-sm text-foreground">WhatsApp ilə əlaqə</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={contact.whatsapp}
                    onClick={() => updateContact("whatsapp", !contact.whatsapp)}
                    className={`relative w-10 h-5.5 rounded-full transition-colors ${contact.whatsapp ? "bg-accent" : "bg-border"}`}
                    style={{ width: 40, height: 22 }}
                  >
                    <span className={`block absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white shadow transition-transform ${contact.whatsapp ? "translate-x-[18px]" : "translate-x-0"}`} />
                  </button>
                </div>
              </Section>

              {/* ═══ Submit ═══ */}
              <div className="rounded-xl border border-border bg-card p-5">
                <label className="flex items-start gap-3 cursor-pointer mb-5">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={e => setAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-accent rounded"
                  />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    <a href="/qaydalar" className="text-primary hover:underline">Qaydaları</a> oxudum və qəbul edirəm. Elanımın saytda yerləşdirilməsinə razıyam.
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={!canPublish}
                  className="w-full py-3 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-[hsl(var(--accent-hover))] transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    <Check size={16} strokeWidth={3} /> Elanı dərc et
                  </span>
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

/* ───────── Section wrapper ───────── */
const Section = ({ num, title, children }: { num: number; title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{num}</span>
      <h2 className="text-sm font-bold text-foreground">{title}</h2>
    </div>
    {children}
  </div>
);

/* ───────── Searchable Select ───────── */
const SearchableSelect = ({
  label, value, options, placeholder, onChange,
}: {
  label: string; value?: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = search
    ? options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-10 rounded-lg border bg-background px-3 text-sm text-left flex items-center justify-between transition-shadow ${open ? "border-ring ring-2 ring-ring" : "border-input"}`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>{value || "Seçin"}</span>
        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setSearch(""); }} />
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={placeholder}
                  autoFocus
                  className="w-full h-8 rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <div className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground px-3 py-3 text-center">Tapılmadı</p>
              ) : filtered.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${value === opt ? "bg-primary/10 text-primary font-medium" : "text-foreground"}`}
                >
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
