import { useState } from "react";
import { Search, Bell, MessageCircle, Menu, X, ChevronDown, MapPin } from "lucide-react";

const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isLoggedIn = true;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <span className="text-xl font-extrabold text-foreground">ucuz</span>
          <span className="text-xl font-extrabold text-primary">tap</span>
          <span className="text-xl font-extrabold text-muted-foreground">.az</span>
        </a>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 max-w-xl gap-2">
          <div className="flex items-center gap-1 px-3 py-2 text-sm border border-border rounded-lg bg-background cursor-pointer hover:border-primary/50 transition-colors">
            <MapPin size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground whitespace-nowrap">Bütün Azərbaycan</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
          <div className="flex flex-1 items-center rounded-lg overflow-hidden bg-muted/50 focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
            <input
              type="text"
              placeholder="Elan axtar..."
              className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <button className="h-full px-4 py-2.5 mr-1 my-0.5 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition-colors active:scale-[0.96]">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/elan-yerleshdir"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md bg-accent text-accent-foreground hover:bg-accent-hover transition-colors active:scale-[0.97]"
          >
            ＋ Elan yerləşdir
          </a>

          {isLoggedIn ? (
            <>
              <button className="relative p-2 rounded-md hover:bg-muted transition-colors">
                <Bell size={20} className="text-muted-foreground" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="p-2 rounded-md hover:bg-muted transition-colors">
                <MessageCircle size={20} className="text-muted-foreground" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  R
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-fade-in">
                      {["Profilim", "Elanlarım", "Favoritlərim", "Tənzimləmələr"].map((item) => (
                        <a key={item} href="#" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">{item}</a>
                      ))}
                      <hr className="my-1 border-border" />
                      <a href="#" className="block px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">Çıxış</a>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <a href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Daxil ol</a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center border border-border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary/30">
          <input
            type="text"
            placeholder="Elan axtar..."
            className="flex-1 px-3 py-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button className="px-4 py-2 bg-primary text-primary-foreground">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-2 animate-fade-in">
          <a href="/elan-yerleshdir" className="block w-full text-center py-2.5 rounded-md bg-accent text-accent-foreground font-semibold text-sm">＋ Elan yerləşdir</a>
          {["Profilim", "Elanlarım", "Favoritlərim", "Bildirişlər", "Mesajlar", "Tənzimləmələr"].map((item) => (
            <a key={item} href="#" className="block py-2 text-sm hover:text-primary transition-colors">{item}</a>
          ))}
          <a href="#" className="block py-2 text-sm text-destructive">Çıxış</a>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
