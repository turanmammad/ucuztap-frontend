import { Users, FileText, Eye, Calendar } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const stats = [
  { label: "Elan", value: "7.5M+", icon: FileText },
  { label: "İstifadəçi", value: "176K+", icon: Users },
  { label: "Gündəlik baxış", value: "2M+", icon: Eye },
  { label: "Fəaliyyətdə", value: "2015-dən", icon: Calendar },
];

const team = [
  { name: "Tural Əliyev", role: "CEO & Qurucu", initials: "TƏ" },
  { name: "Aynur Həsənova", role: "CTO", initials: "AH" },
  { name: "Rəşad Məmmədov", role: "Dizayn rəhbəri", initials: "RM" },
  { name: "Leyla Quliyeva", role: "Marketinq", initials: "LQ" },
];

const AboutPage = () => (
  <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
    <SiteHeader />
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-hero-bg py-16 md:py-20">
        <div className="container max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4" style={{ lineHeight: 1.15 }}>
            Azərbaycanın ən böyük elan platforması
          </h1>
          <p className="text-muted-foreground text-balance">
            2015-ci ildən bəri milyonlarla insanı bir-birinə bağlayırıq. Sadə, sürətli və etibarlı alış-veriş təcrübəsi yaratmaq bizim missiyamızdır.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-5 text-center">
              <s.icon size={24} className="mx-auto text-primary mb-2" />
              <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container pb-12">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-3">🎯 Missiyamız</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Azərbaycan bazarında alıcı və satıcıları ən sürətli və təhlükəsiz şəkildə bir araya gətirmək. Hər kəsin asanlıqla elan yerləşdirə və axtardığını tapa biləcəyi bir platforma yaratmaq.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-3">🔭 Vizyonumuz</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Regionun ən innovativ elan platformasına çevrilmək. Süni intellekt texnologiyaları ilə istifadəçi təcrübəsini yeni səviyyəyə qaldırmaq və e-ticarətin gələcəyini formalaşdırmaq.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container pb-16">
        <h2 className="text-xl font-bold text-foreground text-center mb-8">Komandamız</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {team.map((t) => (
            <div key={t.name} className="bg-card rounded-xl border border-border p-5 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary font-bold">
                {t.initials}
              </div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
);

export default AboutPage;
