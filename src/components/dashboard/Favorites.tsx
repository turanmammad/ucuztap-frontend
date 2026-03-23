import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bell } from "lucide-react";

const favAds = [
  { id: 1, title: "BMW X5 xDrive30d, 2020", price: "55,000 ₼", location: "Bakı", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", notify: true },
  { id: 2, title: "iPhone 15 Pro Max 256GB", price: "2,200 ₼", location: "Bakı", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop", notify: false },
  { id: 3, title: "3 otaqlı mənzil, Yasamal", price: "220,000 ₼", location: "Bakı", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", notify: true },
  { id: 4, title: "MacBook Pro M3, 16GB", price: "3,800 ₼", location: "Sumqayıt", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop", notify: false },
  { id: 5, title: "Toyota Camry 2.5, 2022", price: "42,000 ₼", location: "Bakı", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop", notify: false },
  { id: 6, title: "Samsung 55\" QLED TV", price: "1,450 ₼", location: "Gəncə", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop", notify: false },
];

const Favorites = () => {
  const [items, setItems] = useState(favAds);

  const remove = (id: number) => setItems(items.filter((i) => i.id !== id));
  const toggleNotify = (id: number) =>
    setItems(items.map((i) => (i.id === id ? { ...i, notify: !i.notify } : i)));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Heart size={28} className="text-muted-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">Favoritiniz yoxdur</h2>
        <p className="text-sm text-muted-foreground mb-5">Bəyəndiyiniz elanları ❤️ ilə favoritlərə əlavə edin</p>
        <Link to="/" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-[hsl(var(--primary-hover))] transition-colors">
          Elanlara bax
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-extrabold text-foreground mb-6">Favoritlərim ({items.length})</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((ad) => (
          <div key={ad.id} className="rounded-xl border border-border bg-card overflow-hidden group relative">
            <Link to={`/elanlar/${ad.id}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            </Link>

            {/* Remove button */}
            <button
              onClick={() => remove(ad.id)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/90 border border-border flex items-center justify-center text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground active:scale-90"
            >
              <Heart size={14} fill="currentColor" />
            </button>

            <div className="p-3">
              <p className="text-sm font-medium text-card-foreground line-clamp-1">{ad.title}</p>
              <p className="text-base font-bold text-foreground mt-1">{ad.price}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">📍 {ad.location}</span>
                <button
                  onClick={() => toggleNotify(ad.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                    ad.notify
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Bell size={10} />
                  {ad.notify ? "Bildir ✓" : "Bildir"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
