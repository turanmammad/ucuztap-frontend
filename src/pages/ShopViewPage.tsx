import { Link, useParams } from "react-router-dom";
import { MapPin, Star, Phone, Globe, Clock, MessageCircle, ChevronRight, ShieldCheck, Store } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { AdBannerSidebar } from "@/components/AdBanners";

const shopData = {
  id: "autoplus",
  name: "AutoPlus MMC",
  category: "Nəqliyyat",
  description: "Bakının ən etibarlı avtomobil satış mərkəzi. 2015-ci ildən fəaliyyət göstəririk. Yeni və ikinci əl avtomobillər, lizinq imkanları, texniki xidmət.",
  location: "Bakı, Nəsimi r.",
  rating: 4.8,
  reviewCount: 127,
  adsCount: 48,
  memberSince: "2015",
  phone: "+994 50 123 45 67",
  website: "https://autoplus.az",
  verified: true,
  logo: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop",
  cover: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop",
  ads: [
    { id: 1, title: "Mercedes-Benz C200, 2019", price: "25,000", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", date: "Bugün" },
    { id: 2, title: "BMW X5 3.0d M Sport", price: "42,000", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", date: "Dünən" },
    { id: 3, title: "Toyota Camry 2.5 Hybrid", price: "35,000", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop", date: "2 gün əvvəl" },
    { id: 4, title: "Hyundai Tucson 2.0 GDI", price: "22,000", img: "https://images.unsplash.com/photo-1633695427587-dfa6a56f6572?w=400&h=300&fit=crop", date: "3 gün əvvəl" },
    { id: 5, title: "Kia Sportage 1.6 T-GDI", price: "31,500", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop", date: "3 gün əvvəl" },
    { id: 6, title: "Lexus RX 350 F-Sport", price: "55,000", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop", date: "4 gün əvvəl" },
  ],
};

const ShopViewPage = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Cover */}
        <div className="relative h-40 md:h-56 overflow-hidden bg-muted">
          <img src={shopData.cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="container -mt-12 md:-mt-16 relative z-10">
          {/* Shop header */}
          <div className="flex items-end gap-4 mb-6">
            <img
              src={shopData.logo}
              alt={shopData.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-4 border-background object-cover shadow-lg"
            />
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold text-foreground">{shopData.name}</h1>
                {shopData.verified && (
                  <ShieldCheck size={18} className="text-accent" />
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-sm text-muted-foreground">{shopData.category}</span>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  <Star size={13} fill="currentColor" /> {shopData.rating}
                  <span className="text-muted-foreground font-normal">({shopData.reviewCount})</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={13} /> {shopData.location}
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-6 pb-10">
            {/* Main content */}
            <div className="space-y-6">
              {/* About */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold text-foreground mb-2">Haqqında</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{shopData.description}</p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock size={12} /> {shopData.memberSince}-dən üzv</span>
                  <span>{shopData.adsCount} aktiv elan</span>
                </div>
              </div>

              {/* Ads */}
              <div>
                <h2 className="text-base font-bold text-foreground mb-4">Elanlar ({shopData.ads.length})</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shopData.ads.map((ad) => (
                    <Link key={ad.id} to={`/elanlar/${ad.id}`} className="rounded-lg border border-border bg-card overflow-hidden card-lift group">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                        <p className="text-base font-bold text-foreground mt-1">{ad.price} ₼</p>
                        <span className="text-xs text-muted-foreground">{ad.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Contact card */}
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Əlaqə</h3>
                <a href={`tel:${shopData.phone}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                  <Phone size={14} className="text-muted-foreground" /> {shopData.phone}
                </a>
                {shopData.website && (
                  <a href={shopData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Globe size={14} /> Veb sayt
                  </a>
                )}
                <button className="w-full py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-hover transition-colors active:scale-[0.98] flex items-center justify-center gap-2">
                  <MessageCircle size={15} /> Mesaj yaz
                </button>
              </div>

              <AdBannerSidebar />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ShopViewPage;
