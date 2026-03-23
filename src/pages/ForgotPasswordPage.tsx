import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import AuthHeader from "@/components/AuthHeader";
import SiteFooter from "@/components/SiteFooter";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] bg-card rounded-2xl border border-border shadow-lg p-8">
          {!sent ? (
            <>
              <h1 className="text-2xl font-extrabold text-foreground text-center mb-3">Şifrə bərpası</h1>
              <p className="text-sm text-muted-foreground text-center mb-7">
                Email və ya telefon nömrənizi daxil edin, bərpa linki göndərəcəyik.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email və ya telefon</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@nümunə.az"
                    className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97] shadow-sm"
                >
                  Göndər
                </button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Bərpa linki email/SMS ilə göndəriləcək
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <Mail size={24} className="text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Link göndərildi!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                <span className="font-medium text-foreground">{email}</span> ünvanına bərpa linki göndərildi. Zəhmət olmasa yoxlayın.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-sm text-primary font-semibold hover:underline"
              >
                Yenidən göndər
              </button>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <Link
              to="/daxil-ol"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> Daxil ol səhifəsinə qayıt
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ForgotPasswordPage;
