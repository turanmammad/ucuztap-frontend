import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Crown } from "lucide-react";

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

  // Re-shuffle every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => setShuffleKey(k => k + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const premiumAds = useMemo(() => shuffle(allPremiumAds).slice(0, 6), [shuffleKey]);

  return (
    <section className="section-padding bg-gradient-to-b from-[hsl(var(--premium-blue)/0.06)] to-transparent">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[hsl(var(--premium-blue)/0.15)]">
              <Crown size={16} className="text-[hsl(var(--premium-blue))]" />
            </span>
            Premium Elanlar
          </h2>
          <Link to="/axtaris?type=premium" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            Hamısını gör <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {premiumAds.map((ad) => (
            <Link
              key={ad.id}
              to={`/elanlar/${ad.id}`}
              className="rounded-xl bg-card overflow-hidden card-lift group ring-2 ring-[hsl(var(--premium-blue)/0.25)] hover:ring-[hsl(var(--premium-blue)/0.5)] transition-all"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md bg-[hsl(var(--premium-blue))] text-white shadow-lg">
                  <Crown size={12} /> Premium
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm line-clamp-1 drop-shadow-md">{ad.title}</p>
                  <p className="text-white/90 font-extrabold text-lg drop-shadow-md">{ad.price} ₼</p>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">📍 {ad.location}</span>
                <span className="text-xs text-muted-foreground">{ad.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumAds;
