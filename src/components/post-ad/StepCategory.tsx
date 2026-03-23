import { ChevronRight } from "lucide-react";

const categories = [
  { emoji: "🚗", name: "Nəqliyyat" },
  { emoji: "🏠", name: "Daşınmaz Əmlak" },
  { emoji: "📱", name: "Elektronika" },
  { emoji: "🏡", name: "Ev və Bağ" },
  { emoji: "💼", name: "İş Elanları" },
  { emoji: "🔧", name: "Xidmətlər" },
  { emoji: "👔", name: "Geyim və Aksesuar" },
  { emoji: "🐾", name: "Heyvanlar" },
  { emoji: "⚽", name: "Hobbi və Asudə" },
  { emoji: "👶", name: "Uşaq Aləmi" },
  { emoji: "🏗️", name: "Tikinti və Təmir" },
  { emoji: "📦", name: "Digər" },
];

const subCategories: Record<string, string[]> = {
  "Nəqliyyat": ["Avtomobil", "Motosiklet", "Ehtiyat hissələri", "Su nəqliyyatı", "Digər"],
  "Daşınmaz Əmlak": ["Mənzil", "Ev / Villa", "Torpaq", "Qaraj", "Obyekt"],
  "Elektronika": ["Telefon", "Kompüter", "TV və Audio", "Foto / Video", "Digər"],
  "Ev və Bağ": ["Mebel", "Məişət texnikası", "Bağ ləvazimatları", "Digər"],
  "İş Elanları": ["Tam iş", "Yarım iş", "Freelance", "Staj"],
  "Xidmətlər": ["Təmir", "Təmizlik", "Nəqliyyat", "Təhsil", "Digər"],
  "Geyim və Aksesuar": ["Kişi", "Qadın", "Uşaq", "Aksesuar"],
  "Heyvanlar": ["İt", "Pişik", "Quş", "Digər"],
  "Hobbi və Asudə": ["İdman", "Musiqi", "Kitab", "Oyun", "Digər"],
  "Uşaq Aləmi": ["Geyim", "Oyuncaq", "Araba", "Digər"],
  "Tikinti və Təmir": ["Material", "Alət", "Xidmət"],
  "Digər": ["Digər"],
};

const deepCategories: Record<string, string[]> = {
  "Avtomobil": ["Mercedes-Benz", "BMW", "Toyota", "Hyundai", "Kia", "Lexus", "Audi", "Volkswagen", "Chevrolet", "Nissan"],
  "Telefon": ["iPhone", "Samsung", "Xiaomi", "Huawei", "OnePlus", "Digər"],
  "Mənzil": ["Kirayə", "Satılır", "Günlük"],
};

interface Props {
  selectedPath: string[];
  onSelect: (path: string[]) => void;
}

const StepCategory = ({ selectedPath, onSelect }: Props) => {
  const mainCat = selectedPath[0];
  const subCat = selectedPath[1];

  const handleMainSelect = (name: string) => {
    onSelect([name]);
  };

  const handleSubSelect = (name: string) => {
    onSelect([mainCat, name]);
  };

  const handleDeepSelect = (name: string) => {
    onSelect([mainCat, subCat, name]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Kateqoriya seçin</h2>

      {/* Selected path breadcrumb */}
      {selectedPath.length > 0 && (
        <div className="flex items-center gap-1.5 mb-5 text-sm flex-wrap">
          {selectedPath.map((p, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} className="text-muted-foreground" />}
              <button
                onClick={() => onSelect(selectedPath.slice(0, i + 1))}
                className={`font-medium transition-colors ${
                  i === selectedPath.length - 1 ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Main categories */}
      {!mainCat && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleMainSelect(cat.name)}
              className="flex flex-col items-center gap-2.5 p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all active:scale-[0.97] group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-sm font-semibold text-card-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Sub categories */}
      {mainCat && !subCat && (
        <div className="space-y-1">
          {(subCategories[mainCat] || []).map((sub) => (
            <button
              key={sub}
              onClick={() => handleSubSelect(sub)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all active:scale-[0.99] text-left"
            >
              <span className="text-sm font-medium text-card-foreground">{sub}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      )}

      {/* Deep categories */}
      {mainCat && subCat && !selectedPath[2] && deepCategories[subCat] && (
        <div className="space-y-1">
          {deepCategories[subCat].map((deep) => (
            <button
              key={deep}
              onClick={() => handleDeepSelect(deep)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all active:scale-[0.99] text-left"
            >
              <span className="text-sm font-medium text-card-foreground">{deep}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepCategory;
