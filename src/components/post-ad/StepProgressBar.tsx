import { Check } from "lucide-react";

const steps = [
  { label: "Kateqoriya", num: 1 },
  { label: "Məlumatlar", num: 2 },
  { label: "Şəkillər", num: 3 },
  { label: "Əlaqə", num: 4 },
  { label: "Ön baxış", num: 5 },
];

interface Props {
  current: number;
  onStepClick?: (step: number) => void;
}

const StepProgressBar = ({ current, onStepClick }: Props) => (
  <div className="w-full bg-card border-b border-border">
    <div className="container py-4">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, i) => {
          const done = current > step.num;
          const active = current === step.num;
          const clickable = done && onStepClick;

          return (
            <div key={step.num} className="flex items-center flex-1 last:flex-initial">
              <button
                type="button"
                onClick={() => clickable && onStepClick(step.num)}
                disabled={!clickable}
                className="flex flex-col items-center gap-1.5 group disabled:cursor-default"
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    done
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground"
                  } ${clickable ? "group-hover:scale-110 cursor-pointer" : ""}`}
                >
                  {done ? <Check size={16} strokeWidth={3} /> : step.num}
                </span>
                <span
                  className={`text-xs font-medium hidden sm:block transition-colors ${
                    done
                      ? "text-accent"
                      : active
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {i < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 rounded-full overflow-hidden bg-muted">
                  <div
                    className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
                    style={{ width: done ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default StepProgressBar;
