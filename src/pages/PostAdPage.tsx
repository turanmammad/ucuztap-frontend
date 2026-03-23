import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StepProgressBar from "@/components/post-ad/StepProgressBar";
import StepCategory from "@/components/post-ad/StepCategory";
import StepDetails from "@/components/post-ad/StepDetails";
import StepImages from "@/components/post-ad/StepImages";
import StepContact from "@/components/post-ad/StepContact";
import StepPreview from "@/components/post-ad/StepPreview";
import SuccessModal from "@/components/post-ad/SuccessModal";

const PostAdPage = () => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Step 1
  const [categoryPath, setCategoryPath] = useState<string[]>([]);

  // Step 2
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Step 3
  const [images, setImages] = useState<string[]>([]);

  // Step 4
  const [contact, setContact] = useState({
    fullName: "Əli Həsənov",
    phone: "50 123 45 67",
    extraPhone: "",
    city: "Bakı",
    district: "",
    whatsapp: true,
    address: "",
  });

  // Step 5
  const [accepted, setAccepted] = useState(false);

  const canNext = () => {
    switch (step) {
      case 1: return categoryPath.length >= 2;
      case 2: return !!(formData.title && formData.description && formData.price);
      case 3: return images.length >= 1;
      case 4: return !!(contact.phone && contact.city);
      case 5: return accepted;
      default: return false;
    }
  };

  const goNext = () => {
    if (step < 5 && canNext()) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePublish = () => {
    if (accepted) setShowSuccess(true);
  };

  const handleGoToStep = (s: number) => {
    setStep(s);
  };

  const handleReset = () => {
    setStep(1);
    setCategoryPath([]);
    setFormData({});
    setImages([]);
    setAccepted(false);
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SiteHeader />

      <StepProgressBar current={step} onStepClick={(s) => s < step && setStep(s)} />

      <main className="flex-1 container py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          {/* Step content */}
          {step === 1 && <StepCategory selectedPath={categoryPath} onSelect={setCategoryPath} />}
          {step === 2 && <StepDetails categoryPath={categoryPath} formData={formData} onUpdate={setFormData} />}
          {step === 3 && <StepImages images={images} onUpdate={setImages} />}
          {step === 4 && <StepContact data={contact} onUpdate={setContact} />}
          {step === 5 && (
            <StepPreview
              categoryPath={categoryPath}
              formData={formData}
              images={images}
              contact={contact}
              accepted={accepted}
              onAcceptChange={setAccepted}
              onGoToStep={handleGoToStep}
            />
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors active:scale-[0.97]"
              >
                <ArrowLeft size={16} /> Geri
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canNext()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-[hsl(var(--accent-hover))] transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] shadow-sm"
              >
                Növbəti <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                disabled={!accepted}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-accent text-accent-foreground text-sm font-bold hover:bg-[hsl(var(--accent-hover))] transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] shadow-md"
              >
                <Check size={16} strokeWidth={3} /> Dərc et
              </button>
            )}
          </div>
        </div>
      </main>

      <SuccessModal open={showSuccess} onClose={handleReset} />
      <SiteFooter />
    </div>
  );
};

export default PostAdPage;
