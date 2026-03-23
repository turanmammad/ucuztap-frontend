import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, Crown, TrendingUp, RefreshCw, Loader2 } from "lucide-react";
import { AdCardInFeed } from "@/components/AdBanners";

const tabs = ["Hamısı", "Nəqliyyat", "Əmlak", "Elektronika", "Ev və Bağ", "Geyim"];

type AdType = {
  id: number;
  title: string;
  price: string;
  location: string;
  date: string;
  img: string;
  cat: string;
  badge?: "vip" | "premium" | "boost";
  isNew?: boolean;
};

const adPool: AdType[] = [
  { id: 1, title: "Hyundai Tucson 2.0 GDI", price: "22,000", location: "Bakı", date: "5 dəq əvvəl", img: "https://images.unsplash.com/photo-1633695427587-dfa6a56f6572?w=400&h=300&fit=crop", cat: "Nəqliyyat", badge: "premium" },
  { id: 2, title: "1 otaqlı mənzil, Yasamal", price: "65,000", location: "Bakı", date: "12 dəq əvvəl", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop", cat: "Əmlak", badge: "vip" },
  { id: 3, title: "AirPods Pro 2-ci nəsil", price: "280", location: "Bakı", date: "20 dəq əvvəl", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 4, title: "Kia Sportage 1.6 T-GDI", price: "31,500", location: "Gəncə", date: "35 dəq əvvəl", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop", cat: "Nəqliyyat", badge: "boost" },
  { id: 5, title: "2 otaqlı mənzil, Xətai", price: "120,000", location: "Bakı", date: "1 saat əvvəl", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop", cat: "Əmlak", badge: "vip" },
  { id: 6, title: "Samsung TV 55\" 4K QLED", price: "1,200", location: "Bakı", date: "1 saat əvvəl", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 7, title: "Toyota Corolla 1.6 CVT", price: "19,800", location: "Sumqayıt", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 8, title: "Ofis mənzil, 4 otaq", price: "350,000", location: "Bakı", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", cat: "Əmlak", badge: "premium" },
  { id: 9, title: "PlayStation 5 Slim", price: "950", location: "Bakı", date: "3 saat əvvəl", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 10, title: "Chevrolet Malibu 1.5T", price: "16,500", location: "Bakı", date: "3 saat əvvəl", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 11, title: "Həyət evi, 3 sot torpaq", price: "95,000", location: "Abşeron", date: "4 saat əvvəl", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 12, title: "iPad Air M2 128GB", price: "1,100", location: "Bakı", date: "4 saat əvvəl", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop", cat: "Elektronika", badge: "boost" },
  { id: 13, title: "Nissan Qashqai 2.0", price: "24,000", location: "Bakı", date: "5 saat əvvəl", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 14, title: "Villa, Mərdəkan, 6 sot", price: "280,000", location: "Bakı", date: "5 saat əvvəl", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 15, title: "Xiaomi 14 Ultra 512GB", price: "1,450", location: "Bakı", date: "6 saat əvvəl", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 16, title: "Mercedes C 200 AMG", price: "38,000", location: "Bakı", date: "6 saat əvvəl", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", cat: "Nəqliyyat", badge: "vip" },
  { id: 17, title: "Yeni tikili, 2 otaqlı", price: "148,000", location: "Bakı", date: "7 saat əvvəl", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 18, title: "DJI Mini 4 Pro drone", price: "1,800", location: "Bakı", date: "7 saat əvvəl", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 19, title: "Lexus RX 350 F-Sport", price: "55,000", location: "Bakı", date: "8 saat əvvəl", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop", cat: "Nəqliyyat", badge: "premium" },
  { id: 20, title: "Torpaq sahəsi, 10 sot", price: "45,000", location: "Şamaxı", date: "8 saat əvvəl", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop", cat: "Əmlak" },
];

const newAdTemplates: Omit<AdType, "id" | "date" | "isNew">[] = [
  { title: "Volkswagen Passat CC 2.0 TDI", price: "18,900", location: "Bakı", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { title: "3 otaqlı mənzil, Binəqədi", price: "155,000", location: "Bakı", img: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop", cat: "Əmlak" },
  { title: "Apple Watch Ultra 2", price: "1,350", location: "Bakı", img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop", cat: "Elektronika" },
  { title: "Audi A4 2.0 TFSI S-Line", price: "27,500", location: "Sumqayıt", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { title: "Guşə divan, yeni", price: "850", location: "Bakı", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop", cat: "Ev və Bağ" },
  { title: "Nike Air Max 90, 42 ölçü", price: "120", location: "Bakı", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", cat: "Geyim" },
  { title: "Sony WH-1000XM5", price: "580", location: "Bakı", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop", cat: "Elektronika" },
  { title: "Peugeot 3008 1.6 THP", price: "21,000", location: "Gəncə", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { title: "Studio mənzil, 28 kv.m", price: "72,000", location: "Bakı", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop", cat: "Əmlak" },
  { title: "Mətbəx mebeli dəsti", price: "2,400", location: "Bakı", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", cat: "Ev və Bağ" },
  { title: "Ford Mustang GT 5.0", price: "42,000", location: "Bakı", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { title: "Canon R6 Mark II", price: "3,800", location: "Bakı", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop", cat: "Elektronika" },
  { title: "Adidas Ultraboost, 44", price: "95", location: "Bakı", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", cat: "Geyim" },
  { title: "Yataq dəsti, yeni", price: "650", location: "Bakı", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop", cat: "Ev və Bağ" },
  { title: "Mənzil, Nərimanov, 2 otaq", price: "180,000", location: "Bakı", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop", cat: "Əmlak" },
];

const timeAgo = (seconds: number) => {
  if (seconds < 60) return `${seconds} san əvvəl`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} dəq əvvəl`;
  return `${Math.floor(mins / 60)} saat əvvəl`;
};

const AD_POSITIONS = [5, 15, 25, 35];

const badgeConfig = {
  vip: {
    label: "VIP",
    icon: Star,
    badgeClass: "bg-[hsl(var(--vip-gold))] text-foreground",
    borderClass: "ring-2 ring-[hsl(var(--vip-gold)/0.4)]",
    fill: true,
  },
  premium: {
    label: "Premium",
    icon: Crown,
    badgeClass: "bg-[hsl(var(--premium-blue))] text-white",
    borderClass: "ring-2 ring-[hsl(var(--premium-blue)/0.4)]",
    fill: false,
  },
  boost: {
    label: "İrəli",
    icon: TrendingUp,
    badgeClass: "bg-[hsl(var(--boost-orange))] text-white",
    borderClass: "",
    fill: false,
  },
};

const BATCH_SIZE = 15;

const RecentAds = () => {
  const [activeTab, setActiveTab] = useState("Hamısı");
  const [ads, setAds] = useState<AdType[]>(adPool);
  const [newCount, setNewCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const nextIdRef = useRef(100);
  const templateIndexRef = useRef(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Simulate new ads arriving every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const template = newAdTemplates[templateIndexRef.current % newAdTemplates.length];
      templateIndexRef.current++;
      const newAd: AdType = {
        ...template,
        id: nextIdRef.current++,
        date: "İndi",
        isNew: true,
      };
      setAds(prev => [newAd, ...prev]);
      setNewCount(prev => prev + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Clear "new" highlight after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAds(prev => prev.map(a => a.isNew ? { ...a, isNew: false } : a));
    }, 5000);
    return () => clearTimeout(timeout);
  }, [ads]);

  // Infinite scroll with IntersectionObserver
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          setLoadingMore(true);
          // Simulate loading delay
          setTimeout(() => {
            // Generate more ads from templates
            const newAds: AdType[] = [];
            for (let i = 0; i < BATCH_SIZE; i++) {
              const template = newAdTemplates[(templateIndexRef.current + i) % newAdTemplates.length];
              newAds.push({
                ...template,
                id: nextIdRef.current++,
                date: `${Math.floor(Math.random() * 12) + 1} saat əvvəl`,
              });
            }
            templateIndexRef.current += BATCH_SIZE;
            setAds(prev => [...prev, ...newAds]);
            setVisibleCount(prev => prev + BATCH_SIZE);
            setLoadingMore(false);
          }, 800);
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [loadingMore]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setNewCount(0);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  }, []);

  const filtered = activeTab === "Hamısı" ? ads : ads.filter((ad) => ad.cat === activeTab);
  const visible = filtered.slice(0, visibleCount);

  const itemsWithAds: (AdType | "ad")[] = [];
  visible.forEach((ad, i) => {
    if (AD_POSITIONS.includes(i)) itemsWithAds.push("ad");
    itemsWithAds.push(ad);
  });

  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground">Son Elanlar</h2>
            {newCount > 0 && (
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/15 transition-colors animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <RefreshCw size={11} className={isRefreshing ? "animate-spin" : ""} />
                {newCount} yeni elan
              </button>
            )}
          </div>
          <div className="flex gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setVisibleCount(20); }}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all whitespace-nowrap ${
                  activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {itemsWithAds.map((item, idx) =>
            item === "ad" ? (
              <AdCardInFeed key={`ad-${idx}`} />
            ) : (
              <Link
                key={`${item.id}-${idx}`}
                to={`/elanlar/${item.id}`}
                className={`rounded-lg border bg-card overflow-hidden card-lift group ${
                  item.badge ? `${badgeConfig[item.badge].borderClass} border-transparent` : "border-border"
                } ${item.isNew ? "animate-in fade-in slide-in-from-top-3 duration-500 ring-2 ring-accent/30" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  {item.badge && (
                    <span className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm ${badgeConfig[item.badge].badgeClass}`}>
                      {(() => { const Icon = badgeConfig[item.badge!].icon; return <Icon size={11} fill={badgeConfig[item.badge!].fill ? "currentColor" : "none"} />; })()}
                      {badgeConfig[item.badge].label}
                    </span>
                  )}
                  {item.isNew && !item.badge && (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm bg-accent text-accent-foreground">
                      Yeni
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-card-foreground line-clamp-2 leading-snug">{item.title}</p>
                  <p className="text-sm font-bold text-foreground mt-1">{item.price} ₼</p>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-muted-foreground">
                    <span className="truncate">📍 {item.location}</span>
                    <span className="shrink-0">{item.date}</span>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

        {/* Infinite scroll loader */}
        <div ref={loaderRef} className="flex items-center justify-center py-8">
          {loadingMore && (
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin" />
              Yüklənir...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentAds;
