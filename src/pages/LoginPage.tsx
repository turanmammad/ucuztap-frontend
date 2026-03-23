import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthHeader from "@/components/AuthHeader";
import SiteFooter from "@/components/SiteFooter";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] bg-card rounded-2xl border border-border shadow-lg p-8">
          <h1 className="text-2xl font-extrabold text-foreground text-center mb-7">Daxil ol</h1>

          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 h-11 rounded-lg border border-border bg-background text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors active:scale-[0.98]"
            >
              <GoogleIcon />
              Google ilə daxil ol
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 h-11 rounded-lg bg-[hsl(220,46%,48%)] text-white text-sm font-semibold hover:bg-[hsl(220,46%,42%)] transition-colors active:scale-[0.98]"
            >
              <FacebookIcon />
              Facebook ilə daxil ol
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">və ya</span>
            <span className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Şifrə</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 rounded-lg border border-input bg-background px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <Link to="/sifre-berpa" className="text-xs text-primary hover:underline font-medium">
                  Şifrəni unutdum?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-[hsl(var(--primary-hover))] transition-colors active:scale-[0.97] shadow-sm"
            >
              Daxil ol
            </button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Hesabınız yoxdur?{" "}
            <Link to="/qeydiyyat" className="text-primary font-semibold hover:underline">
              Qeydiyyat
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default LoginPage;
