import { Link } from "react-router-dom";
import { Store, MapPin, Star, ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const shops = [
  { id: 1, name: "AutoPlus MMC", category: "Nəqliyyat", location: "Bakı", rating: 4.8, adsCount: 127, img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop" },
  { id: 2, name: "TechZone", category: "Elektronika", location: "Bakı", rating: 4.6, adsCount: 89, img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop" },
  { id: 3, name: "Əmlak.az Premium", category: "Daşınmaz Əmlak", location: "Bakı", rating: 4.9, adsCount: 243, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop" },
  { id: 4, name: "MebelCity", category: "Ev və Bağ", location: "Sumqayıt", rating: 4.5, adsCount: 64, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop" },
  { id: 5, name: "KidLand", category: "Uşaq Aləmi", location: "Bakı", rating: 4.7, adsCount: 52, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop" },
  { id: 6, name: "SportMax", category: "Hobbi və Asudə", location: "Gəncə", rating: 4.4, adsCount: 38, img: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=200&h=200&fit=crop" },
];

const ShopsPage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SiteHeader />
    <main className="flex-1">
      <section className="bg-muted/30 border-b border-border">
        <div className="container py-10 md:py-14 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">Mağazalar</h1>
            <p className="text-muted-foreground max-w-lg">Etibarlı satıcıların rəsmi mağazalarını kəşf edin.</p>
          </div>
          <Link to="/magazalar/yarat" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.98]">
            <Store size={16} /> Mağaza yarat
          </Link>
        </div>
      </section>

      <div className="container py-8 md:py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map((shop) => (
            <Link key={shop.id} to="#" className="group">
              <div className="bg-card rounded-xl border border-border p-4 card-lift flex items-start gap-4">
                <img src={shop.img} alt={shop.name} className="w-16 h-16 rounded-lg object-cover shrink-0" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold text-foreground truncate">{shop.name}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{shop.category}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin size={10} /> {shop.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-primary font-medium">
                      <Star size={10} fill="currentColor" /> {shop.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-muted-foreground">{shop.adsCount} elan</span>
                    <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default ShopsPage;
