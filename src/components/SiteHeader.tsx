import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, MessageCircle, Menu, X, ChevronDown, MapPin, Store, Home, Heart, PlusCircle, User, Check } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logoImg from "@/assets/logo.png";

const CITIES = [
  "Bütün Azərbaycan",
  "Bakı",
  "Sumqayıt",
  "Gəncə",
  "Mingəçevir",
  "Lənkəran",
  "Şirvan",
  "Naxçıvan",
  "Şəki",
  "Yevlax",
  "Xaçmaz",
  "Quba",
  "Qusar",
  "İsmayıllı",
  "Qəbələ",
  "Balakən",
  "Zaqatala",
  "Şamaxı",
  "Göyçay",
  "Bərdə",
  "Ağdam",
  "Füzuli",
  "Şuşa",
  "Ağdaş",
  "Biləsuvar",
  "Salyan",
  "Kürdəmir",
  "Sabirabad",
  "Hacıqabul",
  "Masallı",
  "Cəlilabad",
  "Astara",
  "Lerik",
  "Yardımlı",
  "Tovuz",
  "Qazax",
  "Ağstafa",
  "Samux",
  "Göygöl",
  "Daşkəsən",
  "Gədəbəy",
  "Oğuz",
  "İmişli",
  "Beyləqan",
  "Zəngilan",
  "Cəbrayıl",
  "Kəlbəcər",
  "Laçın",
  "Xocalı",
  "Xankəndi",
];

const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isLoggedIn = true;
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/axtaris?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60 safe-top">
        {/* Desktop */}
        <div className="container hidden md:flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <img src={logoImg} alt="ucuztap.az" className="h-8" />
          </Link>

          <div className="flex items-center flex-1 max-w-xl gap-2">
            <div className="flex items-center gap-1 px-3 py-2 text-sm border border-border rounded-lg bg-background cursor-pointer hover:border-primary/50 transition-colors">
              <MapPin size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground whitespace-nowrap">Bütün Azərbaycan</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex flex-1 items-center rounded-lg overflow-hidden bg-muted/50 focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Elan axtar..."
                className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="h-full px-4 py-2.5 mr-1 my-0.5 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition-colors active:scale-[0.96]">
                <Search size={16} />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/magazalar" className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
              <Store size={16} />
              <span className="hidden lg:inline">Mağazalar</span>
            </Link>
            <ThemeToggle />
            <Link to="/elan-yerlesdir" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md bg-accent text-accent-foreground hover:bg-accent-hover transition-colors active:scale-[0.97]">
              ＋ Elan yerləşdir
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/panel/bildirisler" className="relative p-2 rounded-md hover:bg-muted transition-colors">
                  <Bell size={20} className="text-muted-foreground" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">3</span>
                </Link>
                <Link to="/panel/mesajlar" className="p-2 rounded-md hover:bg-muted transition-colors">
                  <MessageCircle size={20} className="text-muted-foreground" />
                </Link>
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center hover:opacity-90 transition-opacity">R</button>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-fade-in">
                        <Link to="/panel" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Profilim</Link>
                        <Link to="/panel/elanlarim" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Elanlarım</Link>
                        <Link to="/panel/favoritler" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Favoritlərim</Link>
                        <Link to="/panel/tenzimlemer" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Tənzimləmələr</Link>
                        <hr className="my-1 border-border" />
                        <button className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">Çıxış</button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <Link to="/daxil-ol" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Daxil ol</Link>
            )}
          </div>
        </div>

        {/* Mobile compact header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 h-12">
            <Link to="/" className="flex items-center shrink-0">
              <img src={logoImg} alt="ucuztap.az" className="h-7" />
            </Link>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              {isLoggedIn && (
                <Link to="/panel/bildirisler" className="relative p-2 rounded-md">
                  <Bell size={20} className="text-muted-foreground" />
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 text-[9px] font-bold bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">3</span>
                </Link>
              )}
              <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="px-3 pb-2.5">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex items-center rounded-xl bg-muted/60 border border-border/50">
              <Search size={16} className="ml-3 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nə axtarırsınız?"
                className="flex-1 px-2.5 py-2.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="p-1.5 mr-1">
                  <X size={14} className="text-muted-foreground" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Mobile slide menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-1 animate-fade-in max-h-[60vh] overflow-y-auto">
            <Link to="/magazalar" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg hover:bg-muted transition-colors">
              <Store size={18} className="text-muted-foreground" /> Mağazalar
            </Link>
            <Link to="/panel" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg hover:bg-muted transition-colors">
              <User size={18} className="text-muted-foreground" /> Profilim
            </Link>
            <Link to="/panel/elanlarim" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg hover:bg-muted transition-colors">
              <MessageCircle size={18} className="text-muted-foreground" /> Elanlarım
            </Link>
            <Link to="/panel/mesajlar" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg hover:bg-muted transition-colors">
              <MessageCircle size={18} className="text-muted-foreground" /> Mesajlar
            </Link>
            <Link to="/panel/tenzimlemer" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg hover:bg-muted transition-colors">
              <MapPin size={18} className="text-muted-foreground" /> Tənzimləmələr
            </Link>
            <hr className="border-border my-2" />
            <button className="flex items-center gap-3 py-2.5 px-3 text-sm text-destructive rounded-lg w-full">
              <X size={18} /> Çıxış
            </button>
          </div>
        )}
      </header>

      {/* Mobile Bottom Tab Bar */}
      <MobileBottomBar />
    </>
  );
};

const MobileBottomBar = () => {
  const location = useLocation();
  const path = location.pathname;

  const tabs = [
    { icon: Home, label: "Ana səhifə", to: "/" },
    { icon: Search, label: "Axtar", to: "/axtaris" },
    { icon: PlusCircle, label: "Elan ver", to: "/elan-yerlesdir", accent: true },
    { icon: Heart, label: "Favoritlər", to: "/panel/favoritler" },
    { icon: User, label: "Profil", to: "/panel" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/60 safe-bottom">
      <div className="flex items-end justify-around px-2 pt-1.5 pb-1">
        {tabs.map((tab) => {
          const isActive = tab.to === "/" ? path === "/" : path.startsWith(tab.to);
          const Icon = tab.icon;

          if (tab.accent) {
            return (
              <Link key={tab.to} to={tab.to} className="flex flex-col items-center -mt-3">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-medium text-accent mt-0.5">{tab.label}</span>
              </Link>
            );
          }

          return (
            <Link key={tab.to} to={tab.to} className="flex flex-col items-center py-1 px-3 min-w-[56px]">
              <Icon size={22} className={`transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={`text-[10px] mt-0.5 transition-colors ${isActive ? "text-primary font-semibold" : "text-muted-foreground font-medium"}`}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SiteHeader;
