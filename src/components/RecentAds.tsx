import { useState } from "react";
import { Link } from "react-router-dom";

const tabs = ["Hamısı", "Nəqliyyat", "Əmlak", "Elektronika"];

const allAds = [
  { id: 1, title: "Hyundai Tucson 2.0 GDI", price: "22,000", location: "Bakı", date: "5 dəq əvvəl", img: "https://images.unsplash.com/photo-1633695427587-dfa6a56f6572?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 2, title: "1 otaqlı mənzil, Yasamal", price: "65,000", location: "Bakı", date: "12 dəq əvvəl", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 3, title: "AirPods Pro 2-ci nəsil", price: "280", location: "Bakı", date: "20 dəq əvvəl", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 4, title: "Kia Sportage 1.6 T-GDI", price: "31,500", location: "Gəncə", date: "35 dəq əvvəl", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 5, title: "2 otaqlı mənzil, Xətai", price: "120,000", location: "Bakı", date: "1 saat əvvəl", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 6, title: "Samsung TV 55\" 4K QLED", price: "1,200", location: "Bakı", date: "1 saat əvvəl", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 7, title: "Toyota Corolla 1.6 CVT", price: "19,800", location: "Sumqayıt", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 8, title: "Ofis mənzil, 4 otaq", price: "350,000", location: "Bakı", date: "2 saat əvvəl", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 9, title: "PlayStation 5 Slim", price: "950", location: "Bakı", date: "3 saat əvvəl", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 10, title: "Chevrolet Malibu 1.5T", price: "16,500", location: "Bakı", date: "3 saat əvvəl", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 11, title: "Həyət evi, 3 sot torpaq", price: "95,000", location: "Abşeron", date: "4 saat əvvəl", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 12, title: "iPad Air M2 128GB", price: "1,100", location: "Bakı", date: "4 saat əvvəl", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 13, title: "Nissan Qashqai 2.0", price: "24,000", location: "Bakı", date: "5 saat əvvəl", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 14, title: "Villa, Mərdəkan, 6 sot", price: "280,000", location: "Bakı", date: "5 saat əvvəl", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 15, title: "Xiaomi 14 Ultra 512GB", price: "1,450", location: "Bakı", date: "6 saat əvvəl", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 16, title: "Mercedes C 200 AMG", price: "38,000", location: "Bakı", date: "6 saat əvvəl", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 17, title: "Yeni tikili, 2 otaqlı", price: "148,000", location: "Bakı", date: "7 saat əvvəl", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", cat: "Əmlak" },
  { id: 18, title: "DJI Mini 4 Pro drone", price: "1,800", location: "Bakı", date: "7 saat əvvəl", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop", cat: "Elektronika" },
  { id: 19, title: "Lexus RX 350 F-Sport", price: "55,000", location: "Bakı", date: "8 saat əvvəl", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop", cat: "Nəqliyyat" },
  { id: 20, title: "Torpaq sahəsi, 10 sot", price: "45,000", location: "Şamaxı", date: "8 saat əvvəl", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop", cat: "Əmlak" },
];

const RecentAds = () => {
  const [activeTab, setActiveTab] = useState("Hamısı");
  const filtered = activeTab === "Hamısı" ? allAds : allAds.filter((ad) => ad.cat === activeTab);

  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-xl font-bold text-foreground">Son Elanlar</h2>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
                  activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((ad) => (
            <Link key={ad.id} to={`/elanlar/${ad.id}`} className="rounded-lg border border-border bg-card overflow-hidden card-lift group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                <p className="text-base font-bold text-foreground mt-1">{ad.price} ₼</p>
                <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
                  <span>📍 {ad.location}</span>
                  <span>{ad.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/axtaris" className="px-6 py-2.5 border-2 border-border rounded-lg text-sm font-semibold text-foreground hover:border-primary hover:shadow-sm transition-all active:scale-[0.97] inline-block">
            Daha çox göstər →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentAds;
