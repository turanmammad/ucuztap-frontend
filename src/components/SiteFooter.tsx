import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";

const categoryLinks = [
  { label: "Nəqliyyat", to: "/kateqoriya/neqliyyat" },
  { label: "Daşınmaz Əmlak", to: "/kateqoriya/emlak" },
  { label: "Elektronika", to: "/kateqoriya/elektronika" },
  { label: "İş Elanları", to: "/kateqoriya/is-elanlari" },
  { label: "Xidmətlər", to: "/kateqoriya/xidmetler" },
  { label: "Ev və Bağ", to: "/kateqoriya/ev-ve-bag" },
  { label: "Geyim", to: "/kateqoriya/geyim-aksesuar" },
];

const infoLinks = [
  { label: "Haqqımızda", to: "/haqqimizda" },
  { label: "Qaydalar", to: "/qaydalar" },
  { label: "Məxfilik Siyasəti", to: "/mexfilik" },
  { label: "Reklam", to: "/reklam" },
  { label: "Əlaqə", to: "/elaqe" },
  { label: "Blog", to: "/blog" },
  { label: "Mağazalar", to: "/magazalar" },
];

const socials = [
  { icon: Facebook, href: "https://facebook.com/ucuztap", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/ucuztap", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@ucuztap", label: "YouTube" },
  { icon: Send, href: "https://t.me/ucuztap", label: "Telegram" },
];

const SiteFooter = () => (
  <footer className="bg-footer-bg text-footer-foreground pt-10 pb-6" role="contentinfo">
    <div className="container">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        {/* Col 1 - Brand + Social */}
        <div className="col-span-2 sm:col-span-1">
          <Link to="/" className="inline-block mb-4" aria-label="Ana səhifə">
            <span className="text-xl font-extrabold text-footer-foreground">ucuz</span>
            <span className="text-xl font-extrabold text-primary">tap</span>
            <span className="text-xl font-extrabold text-footer-muted">.az</span>
          </Link>
          <nav className="flex gap-2" aria-label="Sosial şəbəkələr">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-footer-muted/15 flex items-center justify-center text-footer-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <s.icon size={16} />
              </a>
            ))}
          </nav>
        </div>

        {/* Col 2 - Categories */}
        <nav aria-label="Populyar kateqoriyalar">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-footer-muted mb-3">Kateqoriyalar</h4>
          <ul className="space-y-1.5">
            {categoryLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-footer-muted hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3 - Info */}
        <nav aria-label="Məlumat linklər">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-footer-muted mb-3">Məlumat</h4>
          <ul className="space-y-1.5">
            {infoLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-footer-muted hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 4 - Contact */}
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider text-footer-muted mb-3">Əlaqə</h4>
          <ul className="space-y-1.5 text-sm text-footer-muted">
            <li><a href="mailto:info@ucuztap.az" className="hover:text-primary transition-colors">info@ucuztap.az</a></li>
            <li><a href="tel:+994123456789" className="hover:text-primary transition-colors">+994 12 345 67 89</a></li>
          </ul>
        </div>
      </div>

      <hr className="border-footer-muted/15" />
      <div className="flex items-center justify-between mt-4 text-[11px] text-footer-muted">
        <span>© {new Date().getFullYear()} ucuztap.az — Bütün hüquqlar qorunur</span>
        <div className="flex gap-3">
          <Link to="/qaydalar" className="hover:text-primary transition-colors">Qaydalar</Link>
          <Link to="/mexfilik" className="hover:text-primary transition-colors">Məxfilik</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
