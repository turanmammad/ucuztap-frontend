import { useState, useRef } from "react";
import { Upload, X, GripVertical, Sparkles } from "lucide-react";

interface Props {
  images: string[];
  onUpdate: (images: string[]) => void;
}

const StepImages = ({ images, onUpdate }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages = [...images];
    Array.from(files).forEach((file) => {
      if (newImages.length < 10 && file.type.startsWith("image/")) {
        newImages.push(URL.createObjectURL(file));
      }
    });
    onUpdate(newImages);
  };

  const removeImage = (index: number) => {
    onUpdate(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Şəkillər əlavə edin</h2>
      <p className="text-sm text-muted-foreground mb-6">Minimum 1, maksimum 10 şəkil yükləyə bilərsiniz</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all active:scale-[0.99] ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        }`}
      >
        <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
        <p className="text-sm font-medium text-foreground mb-1">📸 Şəkil yükləyin</p>
        <p className="text-xs text-muted-foreground mb-3">Şəkilləri sürüşdürüb buraxın və ya kliklə seçin</p>
        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
          Fayl seçin
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => addFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
          {images.map((src, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden border border-border bg-card aspect-square">
              <img src={src} alt={`Şəkil ${i + 1}`} className="w-full h-full object-cover" />

              {/* Main badge */}
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">
                  Əsas
                </span>
              )}

              {/* Delete button */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
              >
                <X size={12} />
              </button>

              {/* Drag handle */}
              <div className="absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-70 transition-opacity">
                <GripVertical size={14} className="text-white drop-shadow" />
              </div>

              {/* AI quality feedback */}
              <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-accent/90 text-[10px] font-bold text-accent-foreground shadow-sm">
                  <Sparkles size={8} /> Yaxşı ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-3">{images.length}/10 şəkil yükləndi</p>
    </div>
  );
};

export default StepImages;
