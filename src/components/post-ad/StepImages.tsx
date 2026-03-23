import { useState, useRef } from "react";
import { Upload, X, ImagePlus, Camera, AlertCircle } from "lucide-react";

interface Props {
  images: string[];
  onUpdate: (images: string[]) => void;
}

const MAX_IMAGES = 10;

const tips = [
  "📸 Şəkillər işıqlı mühitdə çəkilməlidir",
  "🔲 Əsas şəkil elanın üz qabığıdır — ən yaxşısını seçin",
  "📐 Yatay (landscape) şəkillər daha yaxşı görünür",
  "🚫 Logo, nömrə və ya yazı olan şəkillər rədd edilə bilər",
];

const StepImages = ({ images, onUpdate }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages = [...images];
    Array.from(files).forEach((file) => {
      if (newImages.length < MAX_IMAGES && file.type.startsWith("image/")) {
        newImages.push(URL.createObjectURL(file));
      }
    });
    onUpdate(newImages);
  };

  const removeImage = (index: number) => {
    onUpdate(images.filter((_, i) => i !== index));
  };

  const setAsMain = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const [moved] = newImages.splice(index, 1);
    newImages.unshift(moved);
    onUpdate(newImages);
  };

  const emptySlots = Math.max(0, Math.min(4, MAX_IMAGES - images.length));

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Şəkillər əlavə edin</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Minimum 1, maksimum {MAX_IMAGES} şəkil. İlk şəkil əsas şəkil olacaq.
      </p>

      {/* Tips */}
      <div className="bg-muted/40 border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2.5">
          <AlertCircle size={14} className="text-primary" />
          <span className="text-xs font-semibold text-foreground">Şəkil tövsiyələri</span>
        </div>
        <ul className="space-y-1.5">
          {tips.map((tip, i) => (
            <li key={i} className="text-xs text-muted-foreground leading-relaxed">{tip}</li>
          ))}
        </ul>
      </div>

      {/* Image grid with slots */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {/* Uploaded images */}
        {images.map((src, i) => (
          <div
            key={i}
            className="relative group rounded-xl overflow-hidden border-2 border-border bg-card aspect-square hover:border-primary/40 transition-colors"
          >
            <img src={src} alt={`Şəkil ${i + 1}`} className="w-full h-full object-cover" />

            {/* Main badge */}
            {i === 0 && (
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">
                Əsas
              </span>
            )}

            {/* Number */}
            {i > 0 && (
              <span className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-foreground/60 text-background text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
              {i > 0 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setAsMain(i); }}
                  className="px-2 py-1 rounded-md bg-white/90 text-[10px] font-semibold text-foreground hover:bg-white transition-colors active:scale-95"
                >
                  Əsas et
                </button>
              )}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                className="w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors active:scale-90"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        ))}

        {/* Empty slots */}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <button
            key={`slot-${i}`}
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center gap-1.5 hover:border-primary/40 hover:bg-muted/40 transition-all active:scale-[0.97] cursor-pointer group"
          >
            {images.length === 0 && i === 0 ? (
              <>
                <Camera size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-medium text-muted-foreground">Əsas şəkil</span>
              </>
            ) : (
              <ImagePlus size={18} className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            )}
          </button>
        ))}

        {/* Add more button (if has images but slots are exhausted in the visible grid) */}
        {images.length > 0 && images.length < MAX_IMAGES && emptySlots === 0 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center gap-1 hover:border-primary/40 hover:bg-muted/40 transition-all active:scale-[0.97] cursor-pointer"
          >
            <ImagePlus size={18} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Əlavə et</span>
          </button>
        )}
      </div>

      {/* Drop zone - shown only when no images */}
      {images.length === 0 && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={`mt-4 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all active:scale-[0.99] ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <Upload size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-foreground mb-1">Şəkilləri sürüşdürüb buraxın</p>
          <p className="text-xs text-muted-foreground">və ya klikləyib seçin</p>
        </div>
      )}

      {/* Hidden file input - always available */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => addFiles(e.target.files)}
        className="hidden"
      />

      {/* Counter */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">{images.length}/{MAX_IMAGES} şəkil yükləndi</p>
        {images.length > 0 && images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors active:scale-[0.97]"
          >
            <ImagePlus size={13} /> Daha əlavə et
          </button>
        )}
      </div>
    </div>
  );
};

export default StepImages;
