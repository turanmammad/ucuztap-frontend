import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight, ChevronDown, X, Camera, Search, Check, Upload, ArrowLeft, Save, Trash2, Eye } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LocationMapPicker from "@/components/post-ad/LocationMapPicker";
import { carBrands, brandList, motoBrands, motoBrandList } from "@/data/carData";
import { toast } from "sonner";

/* ═══ Mock ad data (simulates fetching from backend) ═══ */
const mockAds: Record<string, {
  id: number;
  title: string;
  description: string;
  price: string;
  currency: string;
  priceType: "fixed" | "negotiable";
  categoryPath: string[];
  images: string[];
  formData: Record<string, string>;
  contact: { fullName: string; phone: string; city: string; district: string; whatsapp: boolean };
  contactHoursFrom: string;
  contactHoursTo: string;
}> = {
  "1": {
    id: 1,
    title: "Toyota Camry 2.5 Hybrid, 2021",
    description: "Tam texniki baxışdan keçib, heç bir problemi yoxdur. Salon təmiz, sürülməmiş kimi. Sənədləri qaydasındadır.",
    price: "35000",
    currency: "AZN",
    priceType: "fixed",
    categoryPath: ["Nəqliyyat", "Avtomobil"],
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop&sat=-100",
    ],
    formData: {
      brand: "Toyota", model: "Camry", year: "2021", mileage: "45000",
      engine: "2.5", fuel: "Hibrid", gear: "Avtomat", body: "Sedan",
      color: "Ağ", drive: "Ön", condition: "Sürülmüş",
    },
    contact: { fullName: "Əli Məmmədov", phone: "50 123 45 67", city: "Bakı", district: "Nəsimi", whatsapp: true },
    contactHoursFrom: "09:00",
    contactHoursTo: "21:00",
  },
  "2": {
    id: 2,
    title: "iPhone 15 Pro Max 256GB",
    description: "Yeni alınıb, qutusu və aksesuarları var. Heç bir cızığı yoxdur.",
    price: "2200",
    currency: "AZN",
    priceType: "fixed",
    categoryPath: ["Elektronika", "Telefon"],
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=400&fit=crop",
    ],
    formData: {
      brand: "iPhone", model: "15 Pro Max", storage: "256", condition: "Yeni",
    },
    contact: { fullName: "Əli Məmmədov", phone: "50 123 45 67", city: "Bakı", district: "Yasamal", whatsapp: true },
    contactHoursFrom: "10:00",
    contactHoursTo: "22:00",
  },
  "3": {
    id: 3,
    title: "Mercedes E-Class W213, 2019",
    description: "Rəsmi dilerdən alınıb. Tam servis tarixçəsi mövcuddur. Heç bir qəzası olmayıb.",
    price: "42000",
    currency: "AZN",
    priceType: "fixed",
    categoryPath: ["Nəqliyyat", "Avtomobil"],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    ],
    formData: {
      brand: "Mercedes-Benz", model: "E-Class", year: "2019", mileage: "67000",
      engine: "2.0", fuel: "Dizel", gear: "Avtomat", body: "Sedan",
      color: "Qara", drive: "Arxa", condition: "Sürülmüş",
    },
    contact: { fullName: "Əli Məmmədov", phone: "50 123 45 67", city: "Bakı", district: "Nəsimi", whatsapp: true },
    contactHoursFrom: "09:00",
    contactHoursTo: "20:00",
  },
  "4": {
    id: 4,
    title: "3 otaqlı mənzil, Nəsimi r.",
    description: "Təmirli, işıqlı mənzil. Bütün şərait var. Kupçası var.",
    price: "185000",
    currency: "AZN",
    priceType: "fixed",
    categoryPath: ["Daşınmaz Əmlak", "Mənzil"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    formData: {
      rooms: "3", area: "90", floor: "7", totalFloors: "16",
      repair: "Təmirli", document: "Kupça", adType: "Satılır", mortgage: "Yox",
    },
    contact: { fullName: "Əli Məmmədov", phone: "50 123 45 67", city: "Bakı", district: "Nəsimi", whatsapp: true },
    contactHoursFrom: "09:00",
    contactHoursTo: "22:00",
  },
};

/* ═══ Category-specific fields (same as PostAdPage) ═══ */
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
    { label: "Elan tipi", key: "adType", options: ["Satılır", "Kirayə verilir", "Günlük kirayə"] },
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
    { label: "Növ", key: "kidType", options: ["Geyim", "Oyuncaq", "Araba", "Digər"] },
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
const EditAdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adData = id ? mockAds[id] : null;

  const [categoryPath, setCategoryPath] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currency, setCurrency] = useState("AZN");
  const [priceType, setPriceType] = useState<"fixed" | "negotiable">("fixed");
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [contact, setContact] = useState({
    fullName: "", phone: "", city: "Bakı", district: "", whatsapp: true,
  });
  const [contactHoursFrom, setContactHoursFrom] = useState("09:00");
  const [contactHoursTo, setContactHoursTo] = useState("22:00");
  const [mapLat, setMapLat] = useState<number | null>(null);
  const [mapLng, setMapLng] = useState<number | null>(null);
  const [mapAddress, setMapAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tried, setTried] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load ad data
  useEffect(() => {
    if (adData) {
      setCategoryPath(adData.categoryPath);
      setFormData({ ...adData.formData, title: adData.title, description: adData.description, price: adData.price });
      setCurrency(adData.currency);
      setPriceType(adData.priceType);
      setImages(adData.images);
      setContact(adData.contact);
      setContactHoursFrom(adData.contactHoursFrom);
      setContactHoursTo(adData.contactHoursTo);
    }
  }, [id]);

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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.title?.trim()) e.title = "Başlıq daxil edin";
    if (!formData.description?.trim()) e.description = "Elan mətni daxil edin";
    if (!isJobCategory && priceType !== "negotiable" && !formData.price) e.price = "Qiymət daxil edin";
    if (images.length < 1) e.images = "Minimum 1 şəkil yükləyin";
    if (!contact.phone?.trim()) e.phone = "Telefon nömrəsi daxil edin";
    if (!contact.city) e.city = "Şəhər seçin";
    if ((isCarCategory || isMotoCategory) && !formData.brand) e.brand = "Marka seçin";
    return e;
  };

  const handleSave = () => {
    setTried(true);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      toast.success("Dəyişikliklər yadda saxlanıldı", {
        description: "Elanınız yeniləndi",
      });
      navigate("/panel/elanlarim");
    }, 800);
  };

  const handleDelete = () => {
    toast.success("Elan silindi");
    navigate("/panel/elanlarim");
  };

  if (!adData) {
    return (
      <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0 bg-muted/30">
        <SiteHeader />
        <main className="flex-1 container py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-muted-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Elan tapılmadı</h1>
          <p className="text-sm text-muted-foreground mb-6">Bu ID ilə elan mövcud deyil və ya silinib.</p>
          <Link to="/panel/elanlarim" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <ArrowLeft size={16} /> Elanlarıma qayıt
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0 bg-muted/30">
      <SiteHeader />

      <main className="flex-1 container py-6 md:py-8">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors">
                <ArrowLeft size={16} className="text-foreground" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Elanı redaktə et</h1>
                <p className="text-xs text-muted-foreground mt-0.5">ID: #{id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/elanlar/${id}`} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Eye size={13} /> Baxış
              </Link>
              <button onClick={() => setShowDeleteConfirm(true)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-destructive/30 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
                <Trash2 size={13} /> Sil
              </button>
            </div>
          </div>

          {/* Delete confirmation */}
          {showDeleteConfirm && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-foreground">Bu elanı silmək istədiyinizə əminsiniz?</p>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 transition-colors">
                  Bəli, sil
                </button>
                <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                  Xeyr
                </button>
              </div>
            </div>
          )}

          {/* Category (read-only display) */}
          <FieldSection title="Kateqoriya">
            <div className="flex items-center gap-1.5 text-sm">
              <Check size={15} className="text-accent shrink-0" />
              {categoryPath.map((p, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={11} className="text-muted-foreground/50" />}
                  <span className={i === categoryPath.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"}>{p}</span>
                </span>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Kateqoriyanı dəyişmək üçün yeni elan yaradın</p>
          </FieldSection>

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
              {tried && errors.brand && <p className="text-xs text-destructive mt-2">{errors.brand}</p>}
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
                  placeholder="Elanın başlığını daxil edin"
                  maxLength={100}
                  className={`w-full h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow ${tried && errors.title ? "border-destructive" : "border-input"}`}
                />
                <div className="flex items-center justify-between mt-1">
                  {tried && errors.title ? <p className="text-xs text-destructive">{errors.title}</p> : <span />}
                  <span className="text-[10px] text-muted-foreground">{(formData.title || "").length}/100</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Mətn *</label>
                <textarea
                  value={formData.description || ""}
                  onChange={e => update("description", e.target.value)}
                  rows={5}
                  placeholder="Elanınız haqqında ətraflı yazın..."
                  className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none ${tried && errors.description ? "border-destructive" : "border-input"}`}
                />
                {tried && errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
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
                    className={`flex-1 h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow disabled:opacity-40 ${tried && errors.price ? "border-destructive" : "border-input"}`}
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
                {tried && errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
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
                    <button type="button" onClick={() => { const a = [...images]; const [m] = a.splice(i, 1); a.unshift(m); setImages(a); }}
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
            <p className={`text-[10px] mt-2 ${tried && errors.images ? "text-destructive font-medium" : "text-muted-foreground"}`}>
              {tried && errors.images ? errors.images : "Minimum 1 şəkil. İlk şəkil elanın üz qabığıdır."}
            </p>
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
                    className={`flex-1 h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow ${tried && errors.phone ? "border-destructive" : "border-input"}`} />
                </div>
                {tried && errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
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

            {/* Contact hours */}
            <div className="mt-3 pt-3 border-t border-border">
              <label className="block text-xs font-medium text-muted-foreground mb-2">🕐 Əlaqə saatları</label>
              <div className="flex items-center gap-2">
                <select value={contactHoursFrom} onChange={e => setContactHoursFrom(e.target.value)}
                  className="h-9 rounded-lg border border-input bg-background px-2 text-xs outline-none focus:ring-2 focus:ring-ring">
                  {Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="text-xs text-muted-foreground">—</span>
                <select value={contactHoursTo} onChange={e => setContactHoursTo(e.target.value)}
                  className="h-9 rounded-lg border border-input bg-background px-2 text-xs outline-none focus:ring-2 focus:ring-ring">
                  {Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Map for real estate */}
            {categoryPath[0] === "Daşınmaz Əmlak" && (
              <div className="mt-4 pt-4 border-t border-border">
                <LocationMapPicker
                  lat={mapLat}
                  lng={mapLng}
                  onSelect={(lat, lng, addr) => {
                    setMapLat(lat || null);
                    setMapLng(lng || null);
                    if (addr !== undefined) setMapAddress(addr);
                  }}
                />
              </div>
            )}
          </FieldSection>

          {/* Save button */}
          <div className="rounded-xl border border-border bg-card p-5">
            {tried && Object.keys(errors).length > 0 && (
              <p className="text-xs text-destructive text-center mb-3">Zəhmət olmasa bütün məcburi sahələri doldurun</p>
            )}
            <div className="flex gap-3">
              <button type="button" onClick={() => navigate(-1)}
                className="flex-1 py-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors active:scale-[0.98]">
                Ləğv et
              </button>
              <button type="button" onClick={handleSave} disabled={saving}
                className="flex-[2] py-3 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-[hsl(var(--accent-hover))] transition-colors active:scale-[0.98] shadow-sm disabled:opacity-60">
                <span className="inline-flex items-center gap-2">
                  {saving ? (
                    <><span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" /> Saxlanılır...</>
                  ) : (
                    <><Save size={16} strokeWidth={2.5} /> Dəyişiklikləri yadda saxla</>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

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

export default EditAdPage;
