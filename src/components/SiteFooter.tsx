import { Link } from "react-router-dom";

const categoryLinks = [
  { label: "Nəqliyyat", to: "/neqliyyat" },
  { label: "Daşınmaz Əmlak", to: "/neqliyyat" },
  { label: "Elektronika", to: "/neqliyyat" },
  { label: "İş Elanları", to: "/neqliyyat" },
  { label: "Xidmətlər", to: "/neqliyyat" },
];

const infoLinks = [
  { label: "Haqqımızda", to: "/haqqimizda" },
  { label: "Qaydalar", to: "/qaydalar" },
  { label: "Məxfilik Siyasəti", to: "/mexfilik" },
  { label: "Reklam", to: "/reklam" },
  { label: "Əlaqə", to: "/elaqe" },
  { label: "Blog", to: "/blog" },
];

const SiteFooter = () => (
  <footer className="bg-footer-bg text-footer-foreground pt-12 pb-6">
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Col 1 - Logo */}
        <div>
          <Link to="/" className="inline-block mb-3">
            <span className="text-xl font-extrabold text-footer-foreground">ucuz</span>
            <span className="text-xl font-extrabold text-primary">tap</span>
            <span className="text-xl font-extrabold text-footer-muted">.az</span>
          </Link>
          <p className="text-sm text-footer-muted leading-relaxed">
            Azərbaycanın ən böyük pulsuz elan platforması
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Populyar Kateqoriyalar</h4>
          <ul className="space-y-2 text-sm text-footer-muted">
            {categoryLinks.map((l) => (
              <li key={l.label}><Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Məlumat</h4>
          <ul className="space-y-2 text-sm text-footer-muted">
            {infoLinks.map((l) => (
              <li key={l.label}><Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Əlaqə</h4>
          <ul className="space-y-2 text-sm text-footer-muted">
            <li>info@ucuztap.az</li>
            <li>+994 12 345 67 89</li>
          </ul>
          <div className="flex gap-3 mt-4">
            {["FB", "IG", "TT", "YT"].map((s) => (
              <a key={s} href="#" className="w-8 h-8 rounded-full bg-footer-muted/20 flex items-center justify-center text-xs font-bold text-footer-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-footer-muted/20" />
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-xs text-footer-muted gap-2">
        <span>© 2026 ucuztap.az</span>
        <span>Made with ❤️ by Ucuztap</span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
