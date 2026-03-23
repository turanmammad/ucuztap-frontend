import { Check, Eye, Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Success icon */}
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
          <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center">
            <Check size={24} className="text-accent-foreground" strokeWidth={3} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">Elanınız yerləşdirildi!</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Elanınız uğurla dərc edildi və artıq saytda görünür.
        </p>

        <div className="space-y-3">
          <Link
            to="/elanlar/1"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.97]"
          >
            <Eye size={16} /> Elanıma bax
          </Link>

          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[hsl(var(--vip-gold))] text-foreground font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97] shadow-md"
          >
            <Star size={16} /> Elanı irəli çək (VIP)
          </button>

          <Link
            to="/elan-yerlesdir"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors active:scale-[0.97]"
          >
            <Plus size={16} /> Yeni elan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
