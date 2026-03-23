import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const subjects = ["Ümumi sual", "Texniki problem", "Elan ilə bağlı", "Ödəniş", "Reklam", "Digər"];

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
      <SiteHeader />
      <main className="flex-1 container py-10 md:py-14">
        <h1 className="text-2xl font-extrabold text-foreground mb-8">Əlaqə</h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl">
          {/* Form */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-5">Bizə yazın</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Ad Soyad</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Mövzu</label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring appearance-none">
                  <option value="">Seçin</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Mesaj</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <button type="submit" className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97]">
                <Send size={14} className="inline mr-2" /> Göndər
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Əlaqə məlumatları</h2>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-foreground">info@ucuztap.az</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-foreground">+994 12 555 00 00</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">Bakı şəhəri, Nəsimi rayonu, Nizami küçəsi 42</span>
              </div>
            </div>

            {/* Social */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-sm font-bold text-foreground mb-3">Sosial şəbəkələr</h3>
              <div className="flex gap-3">
                {["Facebook", "Instagram", "LinkedIn", "YouTube"].map((s) => (
                  <a key={s} href="#" className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-muted rounded-xl border border-border h-48 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">📍 Xəritə burada göstəriləcək</span>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ContactPage;
