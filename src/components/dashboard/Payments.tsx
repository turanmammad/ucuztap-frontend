import { Plus, CheckCircle, Clock, XCircle } from "lucide-react";

const payments = [
  { date: "15.01.2025", amount: "5.00 ₼", service: "VIP elan — Toyota Camry", status: "paid" },
  { date: "10.01.2025", amount: "3.00 ₼", service: "Elanı irəli çək", status: "paid" },
  { date: "08.01.2025", amount: "10.00 ₼", service: "VIP elan — Mercedes E-Class", status: "paid" },
  { date: "05.01.2025", amount: "5.00 ₼", service: "VIP elan — BMW X5", status: "paid" },
  { date: "01.01.2025", amount: "50.00 ₼", service: "Balans artırma", status: "paid" },
  { date: "28.12.2024", amount: "2.00 ₼", service: "Elanı yenilə", status: "failed" },
];

const statusMap: Record<string, { icon: typeof CheckCircle; label: string; cls: string }> = {
  paid: { icon: CheckCircle, label: "Ödənilib", cls: "text-accent" },
  pending: { icon: Clock, label: "Gözləmədə", cls: "text-[hsl(var(--vip-gold))]" },
  failed: { icon: XCircle, label: "Uğursuz", cls: "text-destructive" },
};

const Payments = () => (
  <div>
    <h1 className="text-xl font-extrabold text-foreground mb-6">Ödənişlər</h1>

    {/* Balance card */}
    <div className="bg-card rounded-xl border border-border p-5 flex items-center justify-between mb-6">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Cari balans</p>
        <p className="text-3xl font-extrabold text-foreground">50.00 <span className="text-lg">₼</span></p>
      </div>
      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-[hsl(var(--accent-hover))] transition-colors active:scale-[0.97] shadow-sm">
        <Plus size={16} /> Artır
      </button>
    </div>

    {/* Payment history */}
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-bold text-foreground">Ödəniş tarixçəsi</h2>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Tarix</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Məbləğ</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Xidmət</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((p, i) => {
              const s = statusMap[p.status];
              return (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-sm text-foreground">{p.date}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-foreground">{p.amount}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{p.service}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${s.cls}`}>
                      <s.icon size={12} /> {s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden divide-y divide-border">
        {payments.map((p, i) => {
          const s = statusMap[p.status];
          return (
            <div key={i} className="px-5 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{p.amount}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${s.cls}`}>
                  <s.icon size={12} /> {s.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{p.service}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{p.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Payments;
