import { useState } from "react";
import { Send, Paperclip, MessageCircle } from "lucide-react";

const conversations = [
  { id: 1, name: "Əli Məmmədov", avatar: "ƏM", lastMsg: "Salam, qiymətdə endirim olarmı?", time: "5 dəq", unread: 2 },
  { id: 2, name: "Leyla Əliyeva", avatar: "LƏ", lastMsg: "Mən maraqlanıram, hələ satılıb?", time: "1 saat", unread: 1 },
  { id: 3, name: "Rəşad Hüseynov", avatar: "RH", lastMsg: "Baxışa gələ bilərəm sabah?", time: "3 saat", unread: 0 },
  { id: 4, name: "Nigar Quliyeva", avatar: "NQ", lastMsg: "Təşəkkürlər, düşünəcəm.", time: "dünən", unread: 0 },
  { id: 5, name: "Kamran İsmayılov", avatar: "Kİ", lastMsg: "Son qiymət nədir?", time: "2 gün", unread: 0 },
];

const chatMessages = [
  { id: 1, from: "them", text: "Salam, Toyota Camry elanınızla maraqlanıram.", time: "14:30" },
  { id: 2, from: "me", text: "Salam! Bəli, hələ satılmayıb. Buyurun soruşun.", time: "14:32" },
  { id: 3, from: "them", text: "Qiymətdə endirim olarmı? 32,000-ə razılaşarsınızmı?", time: "14:35" },
  { id: 4, from: "me", text: "Ən aşağı 33,500 deyə bilərəm. Əla vəziyyətdədir.", time: "14:36" },
  { id: 5, from: "them", text: "Yaxşı, sabah baxışa gələ bilərəm?", time: "14:40" },
];

const Messages = () => {
  const [selected, setSelected] = useState(conversations[0].id);
  const [input, setInput] = useState("");
  const activeConv = conversations.find((c) => c.id === selected);

  return (
    <div>
      <h1 className="text-xl font-extrabold text-foreground mb-6">Mesajlar</h1>

      <div className="bg-card rounded-xl border border-border overflow-hidden flex" style={{ height: "520px" }}>
        {/* Left panel - conversations */}
        <div className="w-[280px] shrink-0 border-r border-border overflow-y-auto hidden sm:block">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                selected === c.id ? "bg-muted/60" : "hover:bg-muted/30"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground truncate">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMsg}</p>
              </div>
              {c.unread > 0 && (
                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center shrink-0">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right panel - chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              {activeConv?.avatar}
            </div>
            <span className="text-sm font-semibold text-foreground">{activeConv?.name}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm ${
                  msg.from === "me"
                    ? "bg-accent/15 text-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-accent/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Paperclip size={16} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesaj yazın..."
                className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              <button className="w-9 h-9 rounded-lg bg-accent text-accent-foreground flex items-center justify-center hover:bg-[hsl(var(--accent-hover))] transition-colors active:scale-95">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
