import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme: Theme) => {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored || "system";
  });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  const options: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Gündüz", icon: Sun },
    { value: "dark", label: "Gecə", icon: Moon },
    { value: "system", label: "Sistem", icon: Monitor },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-muted transition-colors"
        aria-label="Tema dəyiş"
      >
        <Icon size={18} className="text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-fade-in">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setTheme(opt.value); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                theme === opt.value ? "text-primary font-medium bg-muted/50" : "text-foreground hover:bg-muted"
              }`}
            >
              <opt.icon size={14} />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
