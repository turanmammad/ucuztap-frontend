const stats = [
  { value: "7,500,000+", label: "elan" },
  { value: "176,000+", label: "istifadəçi" },
  { value: "3,600+", label: "kateqoriya" },
  { value: "10,000+", label: "gündəlik ziyarətçi" },
];

const StatsBar = () => (
  <section className="py-10 bg-stats-bg text-stats-foreground">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-2xl md:text-3xl font-extrabold">{s.value}</p>
            <p className="text-sm text-stats-foreground/60 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
