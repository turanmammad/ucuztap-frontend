import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Send, MapPin, Mail, Phone, Smartphone, Apple, Play } from "lucide-react";

const categoryLinks = [
  { label: "Nəqliyyat", to: "/kateqoriya/neqliyyat" },
  { label: "Daşınmaz Əmlak", to: "/kateqoriya/emlak" },
  { label: "Elektronika", to: "/kateqoriya/elektronika" },
  { label: "İş Elanları", to: "/kateqoriya/is-elanlari" },
  { label: "Xidmətlər", to: "/kateqoriya/xidmetler" },
  { label: "Ev və Bağ", to: "/kateqoriya/ev-ve-bag" },
  { label: "Geyim və Aksesuar", to: "/kateqoriya/geyim-aksesuar" },
  { label: "Heyvanlar", to: "/kateqoriya/heyvanlar" },
  { label: "Hobbi və Asudə", to: "/kateqoriya/hobbi-asude" },
  { label: "Uşaq Aləmi", to: "/kateqoriya/usaq-alemi" },
  { label: "Tikinti və Təmir", to: "/kateqoriya/tikinti-temir" },
];

const infoLinks = [
  { label: "Haqqımızda", to: "/haqqimizda" },
  { label: "Qaydalar", to: "/qaydalar" },
  { label: "Məxfilik Siyasəti", to: "/mexfilik" },
  { label: "Reklam yerləşdirmə", to: "/reklam" },
  { label: "Əlaqə", to: "/elaqe" },
  { label: "Blog", to: "/blog" },
  { label: "Mağazalar", to: "/magazalar" },
];

const userLinks = [
  { label: "Elan yerləşdir", to: "/elan-yerlesdir" },
  { label: "Mağaza yarat", to: "/magazalar/yarat" },
  { label: "Daxil ol", to: "/daxil-ol" },
  { label: "Qeydiyyat", to: "/qeydiyyat" },
  { label: "İstifadəçi paneli", to: "/panel" },
  { label: "Favoritlərim", to: "/panel/favoritler" },
];

const cityLinks = [
  { label: "Bakı", to: "/axtaris?q=&city=baki" },
  { label: "Sumqayıt", to: "/axtaris?q=&city=sumqayit" },
  { label: "Gəncə", to: "/axtaris?q=&city=gence" },
  { label: "Mingəçevir", to: "/axtaris?q=&city=mingecevir" },
  { label: "Lənkəran", to: "/axtaris?q=&city=lenkeran" },
  { label: "Şəki", to: "/axtaris?q=&city=seki" },
  { label: "Şirvan", to: "/axtaris?q=&city=sirvan" },
  { label: "Naxçıvan", to: "/axtaris?q=&city=naxcivan" },
  { label: "Abşeron", to: "/axtaris?q=&city=abseron" },
  { label: "Quba", to: "/axtaris?q=&city=quba" },
];

const socials = [
  { icon: Facebook, href: "https://facebook.com/ucuztap", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/ucuztap", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@ucuztap", label: "YouTube" },
  { icon: Send, href: "https://t.me/ucuztap", label: "Telegram" },
];

const seoTags = [
  "pulsuz elan", "ikinci əl", "avtomobil satışı", "mənzil kirayəsi",
  "iş elanları Bakı", "telefon satışı", "ev əşyaları", "xidmətlər",
  "ucuz alış-veriş", "elan saytı", "Azərbaycan elanları", "onlayn bazar",
];

const SiteFooter = () => (
  <footer className="hidden md:block bg-footer-bg text-footer-foreground" role="contentinfo">
    {/* Main grid */}
    <div className="container pt-12 pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
        {/* Col 1 — Brand */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <Link to="/" className="inline-block mb-3" aria-label="Ana səhifə">
            <span className="text-2xl font-extrabold text-footer-foreground">ucuz</span>
            <span className="text-2xl font-extrabold text-primary">tap</span>
            <span className="text-2xl font-extrabold text-footer-muted">.az</span>
          </Link>
          <p className="text-sm text-footer-muted leading-relaxed max-w-xs mb-5">
            Azərbaycanın ən böyük pulsuz elan platforması. Avtomobil, əmlak, elektronika, iş elanları və daha çoxunu tapın və ya yerləşdirin.
          </p>

          {/* Contact */}
          <div className="space-y-2 mb-5">
            <a href="mailto:info@ucuztap.az" className="flex items-center gap-2 text-sm text-footer-muted hover:text-primary transition-colors">
              <Mail size={14} className="shrink-0" /> info@ucuztap.az
            </a>
            <a href="tel:+994123456789" className="flex items-center gap-2 text-sm text-footer-muted hover:text-primary transition-colors">
              <Phone size={14} className="shrink-0" /> +994 12 345 67 89
            </a>
            <span className="flex items-center gap-2 text-sm text-footer-muted">
              <MapPin size={14} className="shrink-0" /> Bakı, Azərbaycan
            </span>
          </div>

          {/* App download */}
          <p className="text-xs uppercase tracking-wider font-semibold text-footer-muted mb-2">Tətbiqi yüklə</p>
          <div className="flex gap-2">
            <a href="#" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-footer-muted/10 border border-footer-muted/15 hover:bg-footer-muted/20 transition-colors">
              <Apple size={18} className="text-footer-foreground" />
              <div className="leading-none">
                <span className="text-[9px] text-footer-muted block">Yüklə</span>
                <span className="text-xs font-semibold text-footer-foreground">App Store</span>
              </div>
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-footer-muted/10 border border-footer-muted/15 hover:bg-footer-muted/20 transition-colors">
              <Play size={18} className="text-footer-foreground" />
              <div className="leading-none">
                <span className="text-[9px] text-footer-muted block">Yüklə</span>
                <span className="text-xs font-semibold text-footer-foreground">Google Play</span>
              </div>
            </a>
          </div>

          {/* Social */}
          <nav className="flex gap-2 mt-4" aria-label="Sosial şəbəkələr">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-footer-muted/10 border border-footer-muted/10 flex items-center justify-center text-footer-muted hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <s.icon size={16} />
              </a>
            ))}
          </nav>
        </div>

        {/* Col 2 — Categories */}
        <nav aria-label="Populyar kateqoriyalar">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-footer-foreground mb-3">Kateqoriyalar</h4>
          <ul className="space-y-1.5">
            {categoryLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-[13px] text-footer-muted hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3 — Info */}
        <nav aria-label="Məlumat">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-footer-foreground mb-3">Şirkət</h4>
          <ul className="space-y-1.5">
            {infoLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-[13px] text-footer-muted hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 4 — User */}
        <nav aria-label="İstifadəçi">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-footer-foreground mb-3">İstifadəçilər</h4>
          <ul className="space-y-1.5">
            {userLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-[13px] text-footer-muted hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 5 — Cities */}
        <nav aria-label="Şəhərlər">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-footer-foreground mb-3">Şəhərlər</h4>
          <ul className="space-y-1.5">
            {cityLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-[13px] text-footer-muted hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>

    {/* SEO Tags */}
    <div className="border-t border-footer-muted/10">
      <div className="container py-5">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-footer-muted mb-3">Populyar axtarışlar</h4>
        <div className="flex flex-wrap gap-1.5">
          {seoTags.map((tag) => (
            <Link
              key={tag}
              to={`/axtaris?q=${encodeURIComponent(tag)}`}
              className="inline-block px-2.5 py-1 rounded-md bg-footer-muted/8 border border-footer-muted/10 text-[11px] text-footer-muted hover:text-primary hover:border-primary/30 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-footer-muted/10">
      <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[11px] text-footer-muted">
          © {new Date().getFullYear()} ucuztap.az — Azərbaycanın pulsuz elan platforması. Bütün hüquqlar qorunur.
        </span>
        <div className="flex items-center gap-4 text-[11px] text-footer-muted">
          <Link to="/qaydalar" className="hover:text-primary transition-colors">İstifadə şərtləri</Link>
          <Link to="/mexfilik" className="hover:text-primary transition-colors">Məxfilik siyasəti</Link>
          <Link to="/elaqe" className="hover:text-primary transition-colors">Əlaqə</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
