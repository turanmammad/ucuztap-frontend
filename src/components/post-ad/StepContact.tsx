import { useState } from "react";

const cities = ["Bakı", "Sumqayıt", "Gəncə", "Mingəçevir", "Lənkəran", "Şirvan", "Şəki", "Naxçıvan"];
const districts: Record<string, string[]> = {
  "Bakı": ["Nəsimi", "Yasamal", "Sabunçu", "Xətai", "Binəqədi", "Nizami", "Suraxanı", "Qaradağ", "Abşeron"],
  "Sumqayıt": ["Mərkəz", "1-ci mkr", "5-ci mkr"],
  "Gəncə": ["Nizami r.", "Kəpəz r."],
};

interface ContactData {
  fullName: string;
  phone: string;
  extraPhone: string;
  city: string;
  district: string;
  whatsapp: boolean;
  address: string;
}

interface Props {
  data: ContactData;
  onUpdate: (data: ContactData) => void;
}

const StepContact = ({ data, onUpdate }: Props) => {
  const update = <K extends keyof ContactData>(key: K, value: ContactData[K]) => {
    onUpdate({ ...data, [key]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Əlaqə məlumatları</h2>

      <div className="space-y-5 max-w-lg">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Ad Soyad</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Telefon *</label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 h-11 px-3 rounded-lg border border-input bg-muted flex items-center text-sm font-medium text-muted-foreground">+994</span>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="50 123 45 67"
              className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
        </div>

        {/* Extra Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Əlavə telefon <span className="text-muted-foreground font-normal">(ixtiyari)</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 h-11 px-3 rounded-lg border border-input bg-muted flex items-center text-sm font-medium text-muted-foreground">+994</span>
            <input
              type="tel"
              value={data.extraPhone}
              onChange={(e) => update("extraPhone", e.target.value)}
              placeholder="55 987 65 43"
              className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Şəhər *</label>
          <select
            value={data.city}
            onChange={(e) => { update("city", e.target.value); update("district", ""); }}
            className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
          >
            <option value="">Seçin</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* District */}
        {data.city && districts[data.city] && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Rayon</label>
            <select
              value={data.district}
              onChange={(e) => update("district", e.target.value)}
              className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
            >
              <option value="">Seçin</option>
              {districts[data.city].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        )}

        {/* WhatsApp toggle */}
        <div className="flex items-center justify-between py-3 border-t border-border">
          <div>
            <p className="text-sm font-medium text-foreground">WhatsApp ilə əlaqə</p>
            <p className="text-xs text-muted-foreground mt-0.5">Alıcılar sizinlə WhatsApp-dan yaza bilsin</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={data.whatsapp}
            onClick={() => update("whatsapp", !data.whatsapp)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${data.whatsapp ? "bg-accent" : "bg-border"}`}
          >
            <span className={`block absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-300 ${data.whatsapp ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Dəqiq ünvan <span className="text-muted-foreground font-normal">(ixtiyari)</span>
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Küçə, bina, mənzil..."
            className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default StepContact;
