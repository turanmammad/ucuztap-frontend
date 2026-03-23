import { Link, Outlet, useLocation } from "react-router-dom";
import { ClipboardList, Heart, MessageCircle, Bell, CreditCard, BarChart3, Star, Settings, Plus, LogOut, Store } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const navItems = [
  { icon: ClipboardList, label: "Elanlarım", path: "/panel/elanlarim" },
  { icon: Store, label: "Mağazam", path: "/panel/magazam" },
  { icon: Heart, label: "Favoritlərim", path: "/panel/favoritler" },
  { icon: MessageCircle, label: "Mesajlar", path: "/panel/mesajlar", badge: 3 },
  { icon: Bell, label: "Bildirişlər", path: "/panel/bildirisler", badge: 5 },
  { icon: CreditCard, label: "Ödənişlər", path: "/panel/odenisler" },
  { icon: BarChart3, label: "Statistika", path: "/panel/statistika" },
  { icon: Star, label: "Rəylərim", path: "/panel/reyler" },
  { icon: Settings, label: "Tənzimləmələr", path: "/panel/tenzimlemer" },
];

const DashboardLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path || (path === "/panel/elanlarim" && currentPath === "/panel");

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SiteHeader />

      <div className="flex-1 container py-6 md:py-8">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[240px] shrink-0">
            {/* User card */}
            <div className="bg-card rounded-xl border border-border p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  ƏH
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">Əli Həsənov</p>
                  <p className="text-xs text-muted-foreground">ID: 284719</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="bg-card rounded-xl border border-border overflow-hidden">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-[3px] ${
                    isActive(item.path)
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="border-t border-border">
                <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors w-full border-l-[3px] border-transparent">
                  <LogOut size={18} />
                  Çıxış
                </button>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 pb-20 lg:pb-0">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile bottom tabs */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border">
        <div className="flex items-center justify-around py-1.5 px-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors relative ${
                isActive(item.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label.split("ə")[0].slice(0, 6)}</span>
              {item.badge && (
                <span className="absolute -top-0.5 right-0 min-w-[16px] h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      <div className="hidden lg:block">
        <SiteFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
