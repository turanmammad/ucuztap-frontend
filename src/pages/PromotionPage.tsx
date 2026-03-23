import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Star, Crown, Lock, CreditCard, X, CheckCircle, Eye, Check, ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const plans = [
  {
    id: "boost",
    name: "İrəli çək",
    icon: "⬆️",
    price: 1,
    priceLabel: "1,00 AZN-dən",
    days: 1,
    description: "Axtarış nəticələrində birinci yerə qaldırılması",
    includes: [],
    borderClass: "border-border",
    bgClass: "bg-card",
    labelClass: "text-foreground",
  },
  {
    id: "vip",
    name: "VIP",
    icon: "🔶",
    price: 5,
    priceLabel: "5,00 AZN",
    days: 7,
    description: "Axtarışda birinci yerə qaldırılması və xüsusi bölmədə göstərilməsi",
    includes: ["+HƏR GÜN İRƏLİ ÇƏK"],
    borderClass: "border-[hsl(var(--destructive))]",
    bgClass: "bg-[hsl(var(--destructive))]/[0.04]",
    labelClass: "text-foreground",
    includeBadgeClass: "bg-[hsl(var(--destructive))] text-white",
  },
  {
    id: "premium",
    name: "Premium elan",
    icon: "👑",
    price: 10,
    priceLabel: "10,00 AZN",
    days: 14,
    description: "Axtarışda birinci yerə qaldırılması və əsas səhifədə göstərilməsi",
    includes: ["+HƏR GÜN İRƏLİ ÇƏK", "+VIP"],
    borderClass: "border-[hsl(var(--boost-orange))]",
    bgClass: "bg-[hsl(var(--boost-orange))]/[0.04]",
    labelClass: "text-foreground",
    includeBadgeClass: "bg-[hsl(var(--destructive))] text-white",
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
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-foreground">Xidməti seçin</h1>
          </div>

          {/* Ad preview */}
          <div className="flex items-center gap-3 bg-card rounded-xl border border-border p-3 mb-6">
            <img src={ad.img} alt={ad.title} className="w-16 h-14 rounded-lg object-cover shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{ad.title}</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{ad.price}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground shrink-0" />
          </div>

          {/* Plan cards — stacked like reference */}
          <div className="space-y-4">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => handleSelect(plan.id)}
                className={`w-full text-left rounded-2xl border-2 p-5 transition-all active:scale-[0.98] ${plan.borderClass} ${plan.bgClass} ${
                  selected === plan.id ? "shadow-lg ring-2 ring-primary/20" : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className={`text-lg font-bold ${plan.labelClass}`}>{plan.name}</h3>
                      <span className="text-lg">{plan.icon}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Include badges */}
                    {plan.includes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {plan.includes.map((inc) => (
                          <span
                            key={inc}
                            className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wide ${plan.includeBadgeClass}`}
                          >
                            {inc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price badge (only for boost which has simple price) */}
                  {plan.id === "boost" && (
                    <span className="shrink-0 inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                      {plan.priceLabel}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Info note */}
          <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
            VIP və Premium elanlar avtomatik olaraq hər gün irəli çəkilir.
            <br />
            Ödəniş etdikdən sonra xidmət dərhal aktivləşir.
          </p>
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
                <div className="bg-muted rounded-xl px-4 py-3.5 mb-5 mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-semibold text-foreground">{selectedPlan.name}</span>
                      <span className="text-muted-foreground"> — {selectedPlan.days} gün</span>
                    </div>
                    <span className="font-bold text-foreground text-base">{selectedPlan.price.toFixed(2)} ₼</span>
                  </div>
                  {selectedPlan.includes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedPlan.includes.map(inc => (
                        <span key={inc} className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                          {inc}
                        </span>
                      ))}
                    </div>
                  )}
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
