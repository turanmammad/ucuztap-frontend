import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Download, Smartphone, Monitor, ChevronRight, Share, MoreVertical, PlusSquare, Check, ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import logoIcon from "@/assets/logo-icon.png";

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) setPlatform("ios");
    else if (/Android/.test(ua)) setPlatform("android");
    else setPlatform("desktop");

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") setIsInstalled(true);
    setDeferredPrompt(null);
  };

  const features = [
    { icon: "⚡", title: "Sürətli yüklənmə", desc: "Ani açılış, gözləmə yoxdur" },
    { icon: "📴", title: "Oflayn rejim", desc: "İnternetsiz də işləyir" },
    { icon: "🔔", title: "Bildirişlər", desc: "Yeni elanlardan xəbərdar ol" },
    { icon: "📱", title: "Tam ekran", desc: "Brauzer paneli olmadan istifadə" },
    { icon: "💾", title: "Az yer tutur", desc: "Cəmi 2 MB-dan az" },
    { icon: "🔄", title: "Avtomatik yenilənmə", desc: "Həmişə son versiya" },
  ];

  return (
    <div className="min-h-screen bg-background pb-mobile-bar">
      <SiteHeader />
      <div className="container max-w-2xl py-8 px-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={16} /> Ana səhifə
        </Link>

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Download size={36} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">ucuztap.az Tətbiqini Quraşdır</h1>
          <p className="text-muted-foreground">Tətbiqi telefon və ya kompüterinə quraşdıraraq daha sürətli istifadə edin</p>
        </div>

        {/* Install Button (if available) */}
        {isInstalled ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 mb-8">
            <Check size={24} className="text-primary shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Artıq quraşdırılıb!</p>
              <p className="text-sm text-muted-foreground">Tətbiq cihazınıza uğurla əlavə edilib</p>
            </div>
          </div>
        ) : deferredPrompt ? (
          <button
            onClick={handleInstall}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-hover transition-colors active:scale-[0.98] mb-8 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            İndi Quraşdır
          </button>
        ) : null}

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {features.map((f) => (
            <div key={f.title} className="p-4 rounded-xl bg-muted/50 border border-border/50">
              <span className="text-2xl mb-2 block">{f.icon}</span>
              <p className="font-semibold text-sm text-foreground">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Platform Instructions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Quraşdırma Təlimatı</h2>

          {/* iOS */}
          <div className={`rounded-xl border border-border overflow-hidden ${platform === "ios" ? "ring-2 ring-primary/30" : ""}`}>
            <div className="flex items-center gap-3 p-4 bg-muted/30">
              <Smartphone size={20} className="text-muted-foreground" />
              <span className="font-semibold text-foreground">iPhone / iPad (Safari)</span>
              {platform === "ios" && <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Sizin cihaz</span>}
            </div>
            <div className="p-4 space-y-3">
              <Step num={1} icon={<Share size={16} />} text='Aşağıdakı "Paylaş" düyməsinə basın' />
              <Step num={2} icon={<PlusSquare size={16} />} text='"Ana ekrana əlavə et" seçin' />
              <Step num={3} icon={<Check size={16} />} text='"Əlavə et" düyməsinə basın' />
            </div>
          </div>

          {/* Android */}
          <div className={`rounded-xl border border-border overflow-hidden ${platform === "android" ? "ring-2 ring-primary/30" : ""}`}>
            <div className="flex items-center gap-3 p-4 bg-muted/30">
              <Smartphone size={20} className="text-muted-foreground" />
              <span className="font-semibold text-foreground">Android (Chrome)</span>
              {platform === "android" && <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Sizin cihaz</span>}
            </div>
            <div className="p-4 space-y-3">
              <Step num={1} icon={<MoreVertical size={16} />} text="Yuxarıdakı ⋮ menyusuna basın" />
              <Step num={2} icon={<Download size={16} />} text='"Tətbiqi quraşdır" seçin' />
              <Step num={3} icon={<Check size={16} />} text='"Quraşdır" düyməsinə basın' />
            </div>
          </div>

          {/* Desktop */}
          <div className={`rounded-xl border border-border overflow-hidden ${platform === "desktop" ? "ring-2 ring-primary/30" : ""}`}>
            <div className="flex items-center gap-3 p-4 bg-muted/30">
              <Monitor size={20} className="text-muted-foreground" />
              <span className="font-semibold text-foreground">Kompüter (Chrome / Edge)</span>
              {platform === "desktop" && <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Sizin cihaz</span>}
            </div>
            <div className="p-4 space-y-3">
              <Step num={1} icon={<Download size={16} />} text="Ünvan panelindəki quraşdırma ikonuna basın" />
              <Step num={2} icon={<Check size={16} />} text='"Quraşdır" düyməsinə basın' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ num, icon, text }: { num: number; icon: React.ReactNode; text: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
      {num}
    </div>
    <div className="flex items-center gap-2 text-sm text-foreground">
      <span className="text-muted-foreground">{icon}</span>
      {text}
    </div>
  </div>
);

export default InstallPage;
