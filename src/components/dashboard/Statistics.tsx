import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const viewsData = [
  { day: "1 Yan", views: 12 }, { day: "5 Yan", views: 28 }, { day: "10 Yan", views: 45 },
  { day: "15 Yan", views: 38 }, { day: "20 Yan", views: 62 }, { day: "25 Yan", views: 51 },
  { day: "30 Yan", views: 74 },
];

const topAds = [
  { name: "Toyota Camry", views: 234 },
  { name: "Mercedes E-Class", views: 312 },
  { name: "iPhone 15 Pro", views: 189 },
  { name: "BMW X5", views: 156 },
  { name: "Mənzil Nəsimi", views: 98 },
];

const cityData = [
  { name: "Bakı", value: 340 },
  { name: "Sumqayıt", value: 56 },
  { name: "Gəncə", value: 34 },
  { name: "Digər", value: 26 },
];

const COLORS = [
  "hsl(51, 95%, 48%)",
  "hsl(145, 63%, 49%)",
  "hsl(217, 91%, 60%)",
  "hsl(220, 9%, 46%)",
];

const Statistics = () => (
  <div>
    <h1 className="text-xl font-extrabold text-foreground mb-6">Statistika</h1>

    <div className="space-y-6">
      {/* Line chart - views */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="text-sm font-bold text-foreground mb-4">📈 Elan baxışları (son 30 gün)</h2>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,13%,90%)", fontSize: 12 }} />
              <Line type="monotone" dataKey="views" stroke="hsl(51, 95%, 48%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(51, 95%, 48%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart - top ads */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-sm font-bold text-foreground mb-4">📊 Ən çox baxılan elanlarım</h2>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topAds} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" width={100} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,13%,90%)", fontSize: 12 }} />
                <Bar dataKey="views" fill="hsl(145, 63%, 49%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart - cities */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-sm font-bold text-foreground mb-4">📍 Baxışlar şəhərə görə</h2>
          <div className="h-[220px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {cityData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,13%,90%)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Statistics;
