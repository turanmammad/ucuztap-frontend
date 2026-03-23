import { useState } from "react";
import { Camera, Moon, Sun, Trash2 } from "lucide-react";

const languages = ["Azərbaycan", "Русский", "English"];

const SettingsPage = () => {
  const [name, setName] = useState("Əli Həsənov");
  const [email, setEmail] = useState("ali@email.az");
  const [phone, setPhone] = useState("50 123 45 67");
  const [lang, setLang] = useState("Azərbaycan");

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const [publicProfile, setPublicProfile] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <h1 className="text-xl font-extrabold text-foreground mb-6">Tənzimləmələr</h1>

      <div className="space-y-6 max-w-xl">
        {/* Personal info */}
        <Section title="Şəxsi məlumatlar">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">ƏH</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Camera size={12} />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground">Şəkli dəyişmək üçün klikləyin</p>
            </div>
          </div>
          <div className="space-y-4">
            <InputField label="Ad Soyad" value={name} onChange={setName} />
            <InputField label="Email" value={email} onChange={setEmail} type="email" />
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
              <div className="flex items-center gap-2">
                <span className="shrink-0 h-10 px-3 rounded-lg border border-input bg-muted flex items-center text-sm font-medium text-muted-foreground">+994</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow" />
              </div>
            </div>
          </div>
          <button className="mt-4 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97]">
            Yadda saxla
          </button>
        </Section>

        {/* Change password */}
        <Section title="Şifrə dəyiş">
          <div className="space-y-4">
            <InputField label="Cari şifrə" value="" onChange={() => {}} type="password" placeholder="••••••••" />
            <InputField label="Yeni şifrə" value="" onChange={() => {}} type="password" placeholder="••••••••" />
            <InputField label="Yeni şifrə (təkrar)" value="" onChange={() => {}} type="password" placeholder="••••••••" />
          </div>
          <button className="mt-4 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97]">
            Şifrəni dəyiş
          </button>
        </Section>

        {/* Notifications */}
        <Section title="Bildirişlər">
          <div className="space-y-3">
            <Toggle label="Email bildirişlər" desc="Yeni mesaj və elan yenilikləri" checked={emailNotif} onChange={setEmailNotif} />
            <Toggle label="Push bildirişlər" desc="Brauzer bildirişləri" checked={pushNotif} onChange={setPushNotif} />
            <Toggle label="SMS bildirişlər" desc="Telefona SMS göndərilsin" checked={smsNotif} onChange={setSmsNotif} />
          </div>
        </Section>

        {/* Privacy */}
        <Section title="Məxfilik">
          <div className="space-y-3">
            <Toggle label="Profil açıq" desc="Digər istifadəçilər profilinizi görə bilsin" checked={publicProfile} onChange={setPublicProfile} />
            <Toggle label="Telefon görünsün" desc="Elanlarda telefon nömrəniz göstərilsin" checked={showPhone} onChange={setShowPhone} />
          </div>
        </Section>

        {/* Language */}
        <Section title="Dil">
          <div className="flex gap-2">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  lang === l ? "bg-primary text-primary-foreground shadow-sm" : "border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </Section>

        {/* Dark mode */}
        <Section title="Görünüş">
          <Toggle
            label="Qaranlıq rejim"
            desc="Gözlərinizi qoruyun"
            checked={darkMode}
            onChange={setDarkMode}
            icon={darkMode ? <Moon size={16} /> : <Sun size={16} />}
          />
        </Section>

        {/* Danger zone */}
        <div className="border border-destructive/30 rounded-xl p-5 bg-destructive/[0.02]">
          <h3 className="text-sm font-bold text-destructive mb-2">Təhlükəli zona</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Hesabınızı siləndə bütün elanlarınız, mesajlarınız və məlumatlarınız qalıcı olaraq silinəcək.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive hover:text-destructive-foreground transition-colors active:scale-[0.97]">
            <Trash2 size={14} /> Hesabı sil
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-xl border border-border p-5">
    <h2 className="text-sm font-bold text-foreground mb-4">{title}</h2>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
    />
  </div>
);

const Toggle = ({ label, desc, checked, onChange, icon }: {
  label: string; desc: string; checked: boolean; onChange: (v: boolean) => void; icon?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${checked ? "bg-accent" : "bg-border"}`}
    >
      <span className={`block absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  </div>
);

export default SettingsPage;
