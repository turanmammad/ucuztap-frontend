import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";

const allVipAds = [
  { id: 2, title: "3 otaqlı mənzil, Nəsimi r.", price: "185,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" },
  { id: 3, title: "iPhone 15 Pro Max 256GB", price: "2,100", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop" },
  { id: 5, title: "BMW X5 3.0d M Sport", price: "42,000", location: "Bakı", date: "2 gün əvvəl", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop" },
  { id: 6, title: "2 otaqlı mənzil kirayə", price: "800/ay", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
  { id: 8, title: "Toyota Camry 2.5 Hybrid", price: "35,000", location: "Sumqayıt", date: "3 gün əvvəl", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop" },
  { id: 10, title: "Lexus ES 300h", price: "38,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop" },
  { id: 30, title: "Range Rover Sport 3.0 SDV6", price: "68,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=400&h=300&fit=crop" },
  { id: 31, title: "Penthouse kirayə, Nərimanov", price: "2,500/ay", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop" },
  { id: 32, title: "Rolex Submariner 2023", price: "14,500", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=300&fit=crop" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const VipAds = () => {
  const [shuffleKey, setShuffleKey] = useState(0);

  // Re-shuffle every 25 seconds
  useEffect(() => {
    const interval = setInterval(() => setShuffleKey(k => k + 1), 25000);
    return () => clearInterval(interval);
  }, []);

  const vipAds = useMemo(() => shuffle(allVipAds), [shuffleKey]);

  return (
    <section className="section-padding bg-gradient-to-b from-[hsl(var(--vip-gold)/0.06)] to-transparent">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[hsl(var(--vip-gold)/0.15)]">
              <Star size={16} className="text-[hsl(var(--vip-gold))]" fill="currentColor" />
            </span>
            VIP Elanlar
          </h2>
          <Link to="/axtaris?type=vip" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            Hamısını gör <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {vipAds.map((ad) => (
            <Link
              key={ad.id}
              to={`/elanlar/${ad.id}`}
              className="rounded-xl bg-card overflow-hidden card-lift group ring-2 ring-[hsl(var(--vip-gold)/0.3)] hover:ring-[hsl(var(--vip-gold)/0.6)] transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded bg-[hsl(var(--vip-gold))] text-foreground shadow-sm">
                  <Star size={10} fill="currentColor" /> VIP
                </span>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                <p className="text-sm font-bold text-foreground mt-1">{ad.price} ₼</p>
                <div className="flex items-center justify-between mt-1 text-[11px] text-muted-foreground">
                  <span className="truncate">📍 {ad.location}</span>
                  <span className="shrink-0">{ad.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VipAds;
