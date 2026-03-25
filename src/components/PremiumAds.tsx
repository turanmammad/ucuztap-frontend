import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Crown, Heart } from "lucide-react";

const allPremiumAds = [
  { id: 1, title: "Mercedes-Benz E 220 CDI", price: "28,500", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop" },
  { id: 4, title: "Samsung Galaxy S24 Ultra", price: "1,850", location: "Gəncə", date: "Dünən", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop" },
  { id: 7, title: "MacBook Pro M3 14\"", price: "3,200", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop" },
  { id: 9, title: "Hyundai Tucson 2.0 GDI", price: "22,000", location: "Bakı", date: "5 dəq əvvəl", img: "https://images.unsplash.com/photo-1633695427587-dfa6a56f6572?w=400&h=300&fit=crop" },
  { id: 11, title: "Ofis mənzil, 4 otaq, Nərimanov", price: "350,000", location: "Bakı", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
  { id: 12, title: "Lexus RX 350 F-Sport", price: "55,000", location: "Bakı", date: "8 saat əvvəl", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop" },
  { id: 20, title: "BMW 5 Series 530i M Sport", price: "47,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop" },
  { id: 21, title: "Penthouse, 5 otaq, Nərimanov", price: "520,000", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop" },
  { id: 22, title: "Sony A7 IV + 24-70mm", price: "4,200", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop" },
  { id: 23, title: "Audi Q7 3.0 TDI S-Line", price: "62,000", location: "Bakı", date: "3 saat əvvəl", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop" },
  { id: 24, title: "Villa, 8 sot, Mərdəkan", price: "480,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop" },
  { id: 25, title: "iPhone 15 Pro Max 1TB", price: "2,800", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop" },
  { id: 26, title: "Range Rover Velar 2.0", price: "58,000", location: "Bakı", date: "4 saat əvvəl", img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=400&h=300&fit=crop" },
  { id: 27, title: "3 otaqlı yeni tikili, Xətai", price: "195,000", location: "Bakı", date: "6 saat əvvəl", img: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop" },
  { id: 28, title: "Porsche Cayenne Turbo", price: "95,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop" },
  { id: 29, title: "DJI Mavic 3 Pro", price: "3,500", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop" },
  { id: 30, title: "Rolex Submariner Date", price: "14,500", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=300&fit=crop" },
  { id: 31, title: "Toyota Land Cruiser 300", price: "120,000", location: "Bakı", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop" },
  { id: 32, title: "Penthouse kirayə, 4 otaq", price: "3,500/ay", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
  { id: 33, title: "Tesla Model 3 Long Range", price: "45,000", location: "Bakı", date: "5 saat əvvəl", img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PremiumAds = () => {
  const [shuffleKey, setShuffleKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setShuffleKey(k => k + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const premiumAds = useMemo(() => shuffle(allPremiumAds), [shuffleKey]);

  return (
    <section className="section-padding py-8 md:py-12 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--premium-blue)/0.1)] flex items-center justify-center">
              <Crown size={16} className="text-[hsl(var(--premium-blue))]" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Premium Elanlar</h2>
          </div>
          <Link to="/axtaris?type=premium" className="text-sm font-medium text-[hsl(var(--premium-blue))] hover:underline inline-flex items-center gap-1 transition-colors">
            Hamısına bax <ChevronRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {premiumAds.map((ad) => (
            <Link
              key={ad.id}
              to={`/elanlar/${ad.id}`}
              className="group relative rounded-xl bg-card overflow-hidden border border-border hover:border-[hsl(var(--premium-blue)/0.4)] hover:shadow-[0_4px_20px_hsl(var(--premium-blue)/0.08)] transition-all duration-300"
            >
              {/* Image with overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={ad.img}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-[3px] rounded-md bg-[hsl(var(--premium-blue))] text-[10px] font-bold text-white shadow-sm">
                  <Crown size={9} /> Premium
                </div>

                {/* Favorite */}
                <button
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart size={13} className="text-white" />
                </button>

                {/* Price on image */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white font-extrabold text-sm drop-shadow-md tracking-tight">{ad.price} ₼</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5 space-y-1">
                <p className="text-xs font-medium text-card-foreground line-clamp-2 leading-[1.4]">{ad.title}</p>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[11px] text-muted-foreground truncate">📍 {ad.location}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">{ad.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumAds;
