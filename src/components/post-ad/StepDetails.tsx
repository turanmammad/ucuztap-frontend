import { useState } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  categoryPath: string[];
  formData: Record<string, string>;
  onUpdate: (data: Record<string, string>) => void;
}

const currencies = ["₼", "$", "€"];
const fuelTypes = ["Benzin", "Dizel", "Qaz", "Hibrid", "Elektrik"];
const gearTypes = ["Avtomat", "Mexaniki", "Variator", "Robot"];
const bodyTypes = ["Sedan", "SUV", "Hetçbek", "Kupe", "Universal", "Minivan", "Pikap"];
const colors = ["Qara", "Ağ", "Gümüşü", "Boz", "Göy", "Qırmızı", "Yaşıl", "Qəhvəyi", "Sarı"];
const driveTypes = ["Ön", "Arxa", "Tam"];

const isVehicle = (path: string[]) => path[0] === "Nəqliyyat" && path[1] === "Avtomobil";

const StepDetails = ({ categoryPath, formData, onUpdate }: Props) => {
  const [currency, setCurrency] = useState("₼");
  const [priceType, setPriceType] = useState<"fixed" | "negotiable">("fixed");

  const update = (key: string, value: string) => {
    onUpdate({ ...formData, [key]: value });
  };

  const handleAiTitle = () => {
    const parts = [formData.brand, formData.model, formData.year, formData.engine].filter(Boolean);
    if (parts.length > 0) {
      update("title", parts.join(" ") + (formData.year ? `, ${formData.year}` : ""));
    }
  };

  const handleAiDesc = () => {
    const lines = [];
    if (formData.title) lines.push(formData.title);
    if (formData.engine) lines.push(`Mühərrik: ${formData.engine}L`);
    if (formData.fuel) lines.push(`Yanacaq: ${formData.fuel}`);
    if (formData.gear) lines.push(`Ötürmə: ${formData.gear}`);
    if (formData.mileage) lines.push(`Yürüş: ${formData.mileage} km`);
    if (formData.color) lines.push(`Rəng: ${formData.color}`);
    update("description", lines.length > 0 ? lines.join(". ") + ". Əla vəziyyətdə, baxıb almaq olar." : "");
  };

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
              placeholder="Məsələn: Toyota Camry 2.5 Hybrid, 2021"
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
          {/* Price type */}
          <div className="flex items-center gap-4 mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={priceType === "fixed"}
                onChange={() => setPriceType("fixed")}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-foreground">Qiymət göstər</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={priceType === "negotiable"}
                onChange={() => setPriceType("negotiable")}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-foreground">Razılaşma yolu ilə</span>
            </label>
          </div>
          {/* AI price suggestion */}
          {formData.price && (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
              <Sparkles size={12} className="text-primary" />
              Tövsiyə olunan qiymət: 22,000 — 26,000 ₼
            </p>
          )}
        </div>

        {/* Dynamic vehicle fields */}
        {isVehicle(categoryPath) && (
          <>
            <div className="border-t border-border pt-5 mt-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Avtomobil məlumatları</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Marka *" value={formData.brand} onChange={(v) => update("brand", v)} placeholder="Mercedes-Benz" />
                <Field label="Model" value={formData.model} onChange={(v) => update("model", v)} placeholder="E-Class" />
                <Field label="İl *" value={formData.year} onChange={(v) => update("year", v)} placeholder="2021" type="number" />
                <Field label="Yürüş (km)" value={formData.mileage} onChange={(v) => update("mileage", v)} placeholder="50000" type="number" />
                <Field label="Mühərrik həcmi (L)" value={formData.engine} onChange={(v) => update("engine", v)} placeholder="2.0" />
                <SelectField label="Yanacaq" value={formData.fuel} onChange={(v) => update("fuel", v)} options={fuelTypes} />
                <SelectField label="Ötürmə qutusu" value={formData.gear} onChange={(v) => update("gear", v)} options={gearTypes} />
                <SelectField label="Ban növü" value={formData.body} onChange={(v) => update("body", v)} options={bodyTypes} />
                <SelectField label="Rəng" value={formData.color} onChange={(v) => update("color", v)} options={colors} />
                <SelectField label="Sürücülük" value={formData.drive} onChange={(v) => update("drive", v)} options={driveTypes} />
              </div>
            </div>
          </>
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
