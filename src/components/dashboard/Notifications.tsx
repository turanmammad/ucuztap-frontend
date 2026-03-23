import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, MessageCircle, TrendingDown, Eye, X, CheckCheck } from "lucide-react";

const initialNotifications = [
  { id: 1, icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", title: "Elanınız təsdiqləndi", desc: "\"Toyota Camry 2021\" elanınız aktivdir", time: "2 saat əvvəl", read: false, link: "/panel/elanlarim" },
  { id: 2, icon: MessageCircle, color: "text-primary", bg: "bg-primary/10", title: "Yeni mesaj Əli Məmmədovdan", desc: "\"Salam, qiymətdə endirim olarmı?\"", time: "5 saat əvvəl", read: false, link: "/panel/mesajlar" },
  { id: 3, icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10", title: "Favoritinizdə qiymət düşdü", desc: "iPhone 15 Pro Max: 2,400 ₼ → 2,200 ₼", time: "dünən", read: false, link: "/panel/favoritler" },
  { id: 4, icon: Eye, color: "text-muted-foreground", bg: "bg-muted", title: "Elanınız 100 dəfə baxıldı", desc: "\"Mercedes E-Class\" elanınız populyardır!", time: "dünən", read: true, link: "/panel/statistika" },
  { id: 5, icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", title: "Elanınız təsdiqləndi", desc: "\"BMW X5\" elanınız aktivdir", time: "2 gün əvvəl", read: true, link: "/panel/elanlarim" },
  { id: 6, icon: MessageCircle, color: "text-primary", bg: "bg-primary/10", title: "Yeni mesaj Leyla Əliyevadan", desc: "\"Mən maraqlanıram, hələ satılıb?\"", time: "3 gün əvvəl", read: true, link: "/panel/mesajlar" },
];

const Notifications = () => {
  const [items, setItems] = useState(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setItems(items.map((n) => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: number) => setItems(items.filter((n) => n.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-foreground">
          Bildirişlər {unreadCount > 0 && <span className="text-sm font-normal text-muted-foreground ml-1">({unreadCount} yeni)</span>}
        </h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            <CheckCheck size={14} /> Hamısını oxunmuş et
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <CheckCheck size={24} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Bildirişiniz yoxdur</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
          {items.map((n) => (
            <div key={n.id} className={`flex items-start gap-3 relative ${!n.read ? "bg-primary/[0.03]" : ""}`}>
              {!n.read && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />}
              <Link
                to={n.link}
                onClick={() => markRead(n.id)}
                className="flex items-start gap-3 flex-1 px-5 py-4 hover:bg-muted/30 transition-colors"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.color} ${n.bg}`}>
                  <n.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!n.read ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                </div>
              </Link>
              <button
                onClick={() => dismiss(n.id)}
                className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 mt-4 mr-4"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
