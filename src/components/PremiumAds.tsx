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
  { id: 34, title: "iPad Pro M4 12.9\"", price: "2,200", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop" },
  { id: 35, title: "Volvo XC90 T8 Hybrid", price: "72,000", location: "Bakı", date: "3 saat əvvəl", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&h=300&fit=crop" },
  { id: 36, title: "Duplex mənzil, 6 otaq", price: "650,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop" },
  { id: 37, title: "Canon EOS R5 Body", price: "5,500", location: "Bakı", date: "4 saat əvvəl", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop" },
  { id: 38, title: "Mercedes-Benz GLE 450", price: "85,000", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop" },
  { id: 39, title: "Kommersiya obyekti, Nizami", price: "750,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
  { id: 40, title: "BMW X7 M50d", price: "115,000", location: "Bakı", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop" },
  { id: 41, title: "Ev, 10 sot, Novxanı", price: "320,000", location: "Bakı", date: "5 saat əvvəl", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop" },
  { id: 42, title: "Samsung S24 FE 256GB", price: "1,200", location: "Sumqayıt", date: "Bugün", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop" },
  { id: 43, title: "Jaguar F-Pace 2.0 AWD", price: "52,000", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
  { id: 44, title: "Torpaq, 20 sot, Qəbələ", price: "85,000", location: "Qəbələ", date: "3 saat əvvəl", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop" },
  { id: 45, title: "Apple Vision Pro", price: "6,800", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop" },
  { id: 46, title: "Infiniti QX80 5.6", price: "78,000", location: "Bakı", date: "4 saat əvvəl", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop" },
  { id: 47, title: "Yeni tikili, 1+1, Yasamal", price: "110,000", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" },
  { id: 48, title: "Cadillac Escalade 6.2", price: "130,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop" },
  { id: 49, title: "PlayStation 5 Pro Bundle", price: "1,400", location: "Bakı", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop" },
  { id: 50, title: "Land Rover Defender 110", price: "92,000", location: "Bakı", date: "5 saat əvvəl", img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=400&h=300&fit=crop" },
  { id: 51, title: "Mənzil, 3 otaq, Həzi Aslanov", price: "135,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop" },
  { id: 52, title: "Dyson V15 Detect+", price: "1,100", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop" },
  { id: 53, title: "Genesis GV80 3.5T AWD", price: "75,000", location: "Bakı", date: "3 saat əvvəl", img: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?w=400&h=300&fit=crop" },
  { id: 54, title: "Bina evi, 5 otaq, Badamdar", price: "890,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop" },
  { id: 55, title: "Sony WF-1000XM5", price: "480", location: "Bakı", date: "4 saat əvvəl", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop" },
  { id: 56, title: "Maserati Levante S", price: "98,000", location: "Bakı", date: "Dünən", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
  { id: 57, title: "Qaraj, 30 kv.m, Yasamal", price: "42,000", location: "Bakı", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
  { id: 58, title: "GoPro Hero 12 Black", price: "750", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop" },
  { id: 59, title: "Bentley Continental GT", price: "185,000", location: "Bakı", date: "5 saat əvvəl", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop" },
  { id: 60, title: "Villa, 15 sot, Bilgəh", price: "1,200,000", location: "Bakı", date: "Bugün", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop" },
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

  // Show all ads shuffled — minimum 50 items = 10 rows × 5 columns
  const premiumAds = useMemo(() => shuffle(allPremiumAds), [shuffleKey]);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {premiumAds.map((ad) => (
            <Link
              key={ad.id}
              to={`/elanlar/${ad.id}`}
              className="rounded-xl bg-card overflow-hidden card-lift group ring-2 ring-[hsl(var(--premium-blue)/0.25)] hover:ring-[hsl(var(--premium-blue)/0.5)] transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-[hsl(var(--premium-blue))] text-white shadow-lg">
                  <Crown size={10} /> Premium
                </span>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white font-bold text-xs line-clamp-1 drop-shadow-md">{ad.title}</p>
                  <p className="text-white/90 font-extrabold text-sm drop-shadow-md">{ad.price} ₼</p>
                </div>
              </div>
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground truncate">📍 {ad.location}</span>
                <span className="text-[11px] text-muted-foreground shrink-0">{ad.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumAds;
