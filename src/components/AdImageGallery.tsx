import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=450&fit=crop",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=450&fit=crop",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=450&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=450&fit=crop",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=450&fit=crop",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=450&fit=crop",
];

const AdImageGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const go = (dir: number) => {
    setActiveIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <>
      {/* Main image */}
      <div className="relative rounded-lg overflow-hidden bg-muted aspect-video cursor-pointer group" onClick={() => setFullscreen(true)}>
        <img
          src={images[activeIndex]}
          alt="Elan şəkli"
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-foreground/60 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/80"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); go(1); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-foreground/60 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/80"
        >
          <ChevronRight size={20} />
        </button>
        <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-foreground/60 text-background text-xs font-medium">
          {activeIndex + 1}/{images.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
              i === activeIndex ? "border-primary shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Fullscreen */}
      {fullscreen && (
        <div className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center" onClick={() => setFullscreen(false)}>
          <button className="absolute top-4 right-4 text-background/80 hover:text-background z-10" onClick={() => setFullscreen(false)}>
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/20 text-background flex items-center justify-center hover:bg-background/30"
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={images[activeIndex]}
            alt="Elan şəkli"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/20 text-background flex items-center justify-center hover:bg-background/30"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-background w-5" : "bg-background/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdImageGallery;
