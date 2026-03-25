import { useState } from "react";
import { Heart, Share2, Flag, Phone, MessageCircle, Star, ChevronRight, Check, Link2, AlertTriangle, X, Eye, Calendar, MapPin, Hash, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const reportReasons = [
  "Saxta elan",
  "Yanlış qiymət",
  "Təkrar elan",
  "Qeyri-qanuni məhsul/xidmət",
  "Şəkillər uyğun deyil",
  "Fırıldaqçılıq şübhəsi",
  "Digər",
];

const AdSidebar = () => {
  const [fav, setFav] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);

  const handleReport = () => {
    if (!reportReason) return;
    setReportSubmitting(true);
    setTimeout(() => {
      setReportSubmitting(false);
      setReportOpen(false);
      setReportReason("");
      setReportDetails("");
      toast.success("Şikayətiniz qəbul edildi", {
        description: "Moderasiya komandamız yaxın zamanda yoxlayacaq.",
      });
    }, 800);
  };

  return (
    <div className="space-y-4">
      {/* Price block */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-[hsl(var(--vip-gold)/0.15)] text-[hsl(var(--vip-gold))]">
            <Star size={11} fill="currentColor" /> VIP
          </span>
          <span className="text-xs text-muted-foreground">Yeniləndi: 2 saat əvvəl</span>
        </div>
        <h1 className="text-xl font-extrabold text-foreground leading-tight mb-4">Mercedes-Benz C200, 2019</h1>
        <p className="text-3xl font-black text-primary">25,000 ₼</p>
        <p className="text-xs text-muted-foreground mt-1">Oxşar elanlar: 22,000 — 28,000 ₼</p>
      </div>

      {/* Meta info */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <MapPin size={15} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Şəhər</p>
              <p className="text-sm font-semibold text-foreground">Bakı, Nəsimi</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Calendar size={15} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Tarix</p>
              <p className="text-sm font-semibold text-foreground">23 Mart 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Eye size={15} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Baxış</p>
              <p className="text-sm font-semibold text-foreground">1,245</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Hash size={15} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Elan №</p>
              <p className="text-sm font-semibold text-foreground">12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seller card */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center shrink-0">ƏM</div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-foreground">Əli Məmmədov</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star size={13} className="text-[hsl(var(--vip-gold))] fill-[hsl(var(--vip-gold))]" />
              <span className="font-semibold text-foreground">4.8</span>
              <span>(23 rəy)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-muted text-muted-foreground">
            <Clock size={11} /> 2020-ci ildən üzv
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-accent/10 text-accent">
            <Check size={11} /> Telefon təsdiqlənib
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-muted/60 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>Əlaqə saatları: <span className="font-semibold text-foreground">09:00 — 22:00</span></span>
        </div>

        <Link to="#" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          Bütün elanları (23) <ChevronRight size={14} />
        </Link>

        {/* Contact buttons */}
        <div className="space-y-2">
          <button
            onClick={() => setPhoneRevealed(true)}
            className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors active:scale-[0.97] flex items-center justify-center gap-2 shadow-sm"
          >
            <Phone size={17} />
            {phoneRevealed ? "+994 50 123 45 67" : "Nömrəni göstər"}
          </button>
          <button className="w-full py-3 rounded-xl border-2 border-primary font-bold text-sm text-primary hover:bg-primary/5 transition-colors active:scale-[0.97] flex items-center justify-center gap-2">
            <MessageCircle size={17} /> Mesaj yaz
          </button>
          <button className="w-full py-2.5 rounded-xl border border-border font-medium text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors active:scale-[0.97] flex items-center justify-center gap-2">
            📱 WhatsApp
          </button>
        </div>
      </div>

      {/* Action row */}
      <div className="flex gap-2">
        <button
          onClick={() => setFav(!fav)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-medium transition-all active:scale-[0.97] ${
            fav ? "border-destructive text-destructive bg-destructive/5" : "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
          }`}
        >
          <Heart size={16} fill={fav ? "currentColor" : "none"} />
          {fav ? "Seçilmiş" : "Seçilmişlərə"}
        </button>

        <div className="relative flex-1">
          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground transition-all active:scale-[0.97]"
          >
            <Share2 size={16} /> Paylaş
          </button>
          {shareOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShareOpen(false)} />
              <div className="absolute left-0 top-full mt-1 w-48 bg-popover border border-border rounded-xl shadow-xl z-50 py-1.5 animate-fade-in">
                <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors">💬 WhatsApp</a>
                <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors">✈️ Telegram</a>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); setShareOpen(false); toast.success("Link kopyalandı"); }} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors w-full text-left">
                  <Link2 size={14} /> Link kopyala
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => setReportOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:border-destructive hover:text-destructive transition-all active:scale-[0.97]"
        >
          <Flag size={16} />
        </button>
      </div>

      {/* Report modal */}
      {reportOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setReportOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <AlertTriangle size={18} className="text-destructive" />
                  Elanı şikayət et
                </h3>
                <button onClick={() => setReportOpen(false)} className="p-1 rounded-md hover:bg-muted transition-colors">
                  <X size={18} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Səbəb seçin</p>
                  <div className="space-y-1.5">
                    {reportReasons.map((reason) => (
                      <label
                        key={reason}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
                          reportReason === reason
                            ? "border-primary bg-primary/5 text-foreground font-medium"
                            : "border-border hover:border-primary/30 text-muted-foreground"
                        }`}
                      >
                        <input type="radio" name="report-reason" value={reason} checked={reportReason === reason} onChange={() => setReportReason(reason)} className="sr-only" />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${reportReason === reason ? "border-primary" : "border-muted-foreground/40"}`}>
                          {reportReason === reason && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        {reason}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1.5">Əlavə qeyd <span className="text-muted-foreground font-normal">(istəyə bağlı)</span></p>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Ətraflı izah edin..."
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>
              </div>
              <div className="px-5 py-4 border-t border-border flex gap-2">
                <button onClick={() => setReportOpen(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">Ləğv et</button>
                <button
                  onClick={handleReport}
                  disabled={!reportReason || reportSubmitting}
                  className="flex-1 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-bold hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  {reportSubmitting ? "Göndərilir..." : "Şikayət et"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdSidebar;
