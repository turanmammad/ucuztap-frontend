import { Star } from "lucide-react";

const reviews = [
  { id: 1, name: "Leyla Əliyeva", rating: 5, comment: "Çox yaxşı satıcıdır. Maşın tam təsvir olunduğu kimi idi. Təşəkkür edirəm!", date: "12.01.2025" },
  { id: 2, name: "Rəşad Hüseynov", rating: 5, comment: "Sürətli cavab verdi, əla kommunikasiya. Tövsiyə edirəm.", date: "08.01.2025" },
  { id: 3, name: "Nigar Quliyeva", rating: 4, comment: "Yaxşı idi, amma görüşə bir az gec gəldi. Məhsul keyfiyyətli idi.", date: "03.01.2025" },
  { id: 4, name: "Kamran İsmayılov", rating: 5, comment: "Etibarlı satıcı. Təkrar alış-veriş edərdim.", date: "28.12.2024" },
  { id: 5, name: "Aynur Həsənova", rating: 4, comment: "Qiymət razılaşması yaxşı keçdi. Məhsul gözlədiyim kimi idi.", date: "20.12.2024" },
  { id: 6, name: "Tural Babayev", rating: 5, comment: "Mükəmməl! Hər şey qaydasında idi.", date: "15.12.2024" },
];

const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

const Reviews = () => (
  <div>
    <h1 className="text-xl font-extrabold text-foreground mb-6">Rəylərim</h1>

    {/* Average rating card */}
    <div className="bg-card rounded-xl border border-border p-5 mb-6 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-2xl font-extrabold text-foreground">{avgRating}</span>
      </div>
      <div>
        <div className="flex items-center gap-0.5 mb-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={18} className={s <= Math.round(Number(avgRating)) ? "text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" : "text-border"} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{reviews.length} rəy əsasında</p>
      </div>
    </div>

    {/* Reviews list */}
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                {r.name.split(" ").map((w) => w[0]).join("")}
              </div>
              <span className="text-sm font-semibold text-foreground">{r.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{r.date}</span>
          </div>
          <div className="flex items-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={14} className={s <= r.rating ? "text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" : "text-border"} />
            ))}
          </div>
          <p className="text-sm text-foreground leading-relaxed">{r.comment}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Reviews;
