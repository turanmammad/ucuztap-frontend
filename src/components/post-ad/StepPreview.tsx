import { Pencil, MapPin, Phone, MessageCircle, Check } from "lucide-react";

interface Props {
  categoryPath: string[];
  formData: Record<string, string>;
  images: string[];
  contact: {
    fullName: string;
    phone: string;
    extraPhone: string;
    city: string;
    district: string;
    whatsapp: boolean;
    address: string;
  };
  accepted: boolean;
  onAcceptChange: (v: boolean) => void;
  onGoToStep: (step: number) => void;
}

const StepPreview = ({ categoryPath, formData, images, contact, accepted, onAcceptChange, onGoToStep }: Props) => {
  const mainImage = images[0];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Elanınıza baxın</h2>

      <div className="rounded-xl border border-border bg-card overflow-hidden max-w-2xl">
        {/* Image */}
        {mainImage && (
          <div className="relative aspect-video bg-muted">
            <img src={mainImage} alt="Elan" className="w-full h-full object-cover" />
            {images.length > 1 && (
              <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-foreground/70 text-background text-xs font-medium">
                +{images.length - 1} şəkil
              </span>
            )}
            <EditBtn onClick={() => onGoToStep(3)} />
          </div>
        )}

        {/* Main info */}
        <div className="p-5 space-y-4">
          <div className="relative">
            <h3 className="text-lg font-bold text-foreground pr-8">{formData.title || "Başlıq yoxdur"}</h3>
            <p className="text-xl font-extrabold text-foreground mt-1">
              {formData.price ? `${Number(formData.price).toLocaleString()} ₼` : "Razılaşma yolu ilə"}
            </p>
            <EditBtn onClick={() => onGoToStep(2)} />
          </div>

          {/* Category path */}
          <div className="relative">
            <p className="text-xs text-muted-foreground">{categoryPath.join(" › ")}</p>
            <EditBtn onClick={() => onGoToStep(1)} />
          </div>

          {/* Description */}
          {formData.description && (
            <div className="relative border-t border-border pt-4">
              <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{formData.description}</p>
              <EditBtn onClick={() => onGoToStep(2)} />
            </div>
          )}

          {/* Vehicle specs */}
          {formData.brand && (
            <div className="relative border-t border-border pt-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {formData.brand && <Spec label="Marka" value={formData.brand} />}
                {formData.model && <Spec label="Model" value={formData.model} />}
                {formData.year && <Spec label="İl" value={formData.year} />}
                {formData.mileage && <Spec label="Yürüş" value={`${formData.mileage} km`} />}
                {formData.engine && <Spec label="Mühərrik" value={`${formData.engine}L`} />}
                {formData.fuel && <Spec label="Yanacaq" value={formData.fuel} />}
                {formData.gear && <Spec label="Ötürmə" value={formData.gear} />}
                {formData.body && <Spec label="Ban" value={formData.body} />}
                {formData.color && <Spec label="Rəng" value={formData.color} />}
                {formData.drive && <Spec label="Sürücülük" value={formData.drive} />}
              </div>
              <EditBtn onClick={() => onGoToStep(2)} />
            </div>
          )}

          {/* Contact */}
          <div className="relative border-t border-border pt-4">
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-foreground">{contact.fullName || "İstifadəçi"}</p>
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin size={14} /> {[contact.city, contact.district].filter(Boolean).join(", ") || "Şəhər seçilməyib"}
              </p>
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <Phone size={14} /> +994 {contact.phone || "___"}
              </p>
              {contact.whatsapp && (
                <p className="flex items-center gap-1.5 text-accent">
                  <MessageCircle size={14} /> WhatsApp aktiv
                </p>
              )}
            </div>
            <EditBtn onClick={() => onGoToStep(4)} />
          </div>
        </div>
      </div>

      {/* Terms checkbox */}
      <label className="flex items-start gap-3 mt-6 cursor-pointer max-w-2xl">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onAcceptChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-accent rounded"
        />
        <span className="text-sm text-muted-foreground">
          Qaydaları oxudum və qəbul edirəm. Elanımın saytda yerləşdirilməsinə razıyam.
        </span>
      </label>
    </div>
  );
};

const EditBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-0 right-0 w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors active:scale-90"
  >
    <Pencil size={12} />
  </button>
);

const Spec = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-1 border-b border-border/50">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-foreground">{value}</span>
  </div>
);

export default StepPreview;
