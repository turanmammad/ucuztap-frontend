import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Check, Zap, Crown, Lock, CreditCard, X, CheckCircle, Eye } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const plans = [
  {
    id: "boost",
    name: "İrəli Çək",
    icon: Zap,
    price: 2,
    days: 3,
    color: "border-border",
    badgeColor: "",
    recommended: false,
    features: ["Kateqoriyada yuxarıda 3 gün"],
    btnClass: "border border-border text-foreground hover:bg-muted",
  },
  {
    id: "vip",
    name: "VIP",
    icon: Star,
    price: 5,
    days: 7,
    color: "border-[hsl(var(--vip-gold))] ring-1 ring-[hsl(var(--vip-gold))]/30",
    badgeColor: "bg-[hsl(var(--vip-gold))]",
    recommended: true,
    features: [
      "Ana səhifədə VIP bölmə",
      "VIP badge",
      "Kateqoriyada yuxarıda 7 gün",
    ],
    btnClass: "bg-[hsl(var(--vip-gold))] text-foreground hover:opacity-90 shadow-sm",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    price: 10,
    days: 14,
    color: "border-border",
    badgeColor: "",
    recommended: false,
    features: [
      "Hər yerdə ən yuxarıda",
      "Premium badge",
      "Böyük card dizayn",
      "14 gün müddət",
    ],
    btnClass: "border border-border text-foreground hover:bg-muted",
  },
];

const ad = {
  title: "Toyota Camry 2.5 Hybrid, 2021",
  price: "35,000 ₼",
  location: "Bakı",
  img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop",
};

const PromotionPage = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const selectedPlan = plans.find((p) => p.id === selected);

  const handleSelect = (id: string) => {
    setSelected(id);
    setShowPayment(true);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0 bg-muted/30">
      <SiteHeader />

      <main className="flex-1 container py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-extrabold text-foreground mb-6">Elanınızı irəli çəkin</h1>

          {/* Ad preview */}
          <div className="flex items-center gap-3 bg-card rounded-xl border border-border p-3 mb-8">
            <img src={ad.img} alt={ad.title} className="w-20 h-16 rounded-lg object-cover shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{ad.title}</p>
              <p className="text-base font-bold text-foreground mt-0.5">{ad.price}</p>
              <p className="text-xs text-muted-foreground">📍 {ad.location}</p>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl border-2 bg-card p-5 flex flex-col transition-all ${plan.color} ${
                  selected === plan.id ? "shadow-lg scale-[1.02]" : ""
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[hsl(var(--vip-gold))] text-foreground text-xs font-bold shadow-sm">
                    <Star size={12} fill="currentColor" /> Tövsiyə
                  </span>
                )}

                <div className="flex items-center gap-2 mb-3 mt-1">
                  <plan.icon size={20} className={plan.recommended ? "text-[hsl(var(--vip-gold))]" : "text-muted-foreground"} />
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                </div>

                <p className="text-3xl font-extrabold text-foreground mb-4">
                  {plan.price} <span className="text-base font-medium text-muted-foreground">₼</span>
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check size={16} className="text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(plan.id)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-[0.97] ${plan.btnClass}`}
                >
                  Seç
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPayment && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => { if (!paymentSuccess) { setShowPayment(false); } }} />

          <div className="relative bg-card rounded-2xl shadow-2xl max-w-sm w-full p-7 animate-in fade-in zoom-in-95 duration-300">
            {!paymentSuccess ? (
              <>
                <button
                  onClick={() => setShowPayment(false)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>

                <h2 className="text-lg font-bold text-foreground mb-1">Ödəniş</h2>

                {/* Summary */}
                <div className="bg-muted rounded-lg px-4 py-3 mb-5 mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{selectedPlan.name} Elan — {selectedPlan.days} gün</span>
                    <span className="font-bold text-foreground">{selectedPlan.price.toFixed(2)} ₼</span>
                  </div>
                </div>

                {/* Card form */}
                <form onSubmit={handlePay} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Kart nömrəsi</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full h-11 rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow tracking-wider"
                      />
                      <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Bitmə tarixi</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="AA/İİ"
                        maxLength={5}
                        className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">CVV</label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        placeholder="•••"
                        maxLength={3}
                        className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 rounded-lg bg-accent text-accent-foreground font-bold text-sm hover:bg-[hsl(var(--accent-hover))] transition-colors active:scale-[0.97] shadow-sm"
                  >
                    Ödə: {selectedPlan.price.toFixed(2)} ₼
                  </button>
                </form>

                <p className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground mt-4">
                  <Lock size={10} /> Təhlükəsiz ödəniş — Payriff
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Ödəniş uğurlu!</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Elanınız <span className="font-semibold text-foreground">{selectedPlan.name}</span> statusu aldı.
                </p>
                <div className="space-y-2.5">
                  <Link
                    to="/elanlar/1"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97]"
                  >
                    <Eye size={16} /> Elanıma bax
                  </Link>
                  <Link
                    to="/panel/elanlarim"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors active:scale-[0.97]"
                  >
                    Elanlarıma qayıt
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
};

export default PromotionPage;
