import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProcessingStep = 
  | "uploading"
  | "extracting"
  | "analyzing"
  | "predicting"
  | "complete";

interface ProcessingStatusProps {
  currentStep: ProcessingStep;
}

const steps = [
  { id: "uploading", label: "Video uploaded" },
  { id: "extracting", label: "Extracting frames" },
  { id: "analyzing", label: "Analysing motion patterns" },
  { id: "predicting", label: "Predicting behaviour" },
];

const stepOrder = ["uploading", "extracting", "analyzing", "predicting", "complete"];

export const ProcessingStatus = ({ currentStep }: ProcessingStatusProps) => {
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="space-y-3 p-4 rounded-lg bg-muted/50 border border-border">
      <p className="text-sm font-medium text-muted-foreground mb-3">Processing Status</p>
      
      {steps.map((step, index) => {
        const stepIndex = stepOrder.indexOf(step.id);
        const isComplete = currentIndex > stepIndex;
        const isCurrent = currentIndex === stepIndex;
        
        return (
          <div key={step.id} className="flex items-center gap-3">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300",
              isComplete && "bg-primary text-primary-foreground",
              isCurrent && "bg-primary/20 text-primary",
              !isComplete && !isCurrent && "bg-muted text-muted-foreground"
            )}>
              {isComplete ? (
                <Check className="w-3 h-3" />
              ) : isCurrent ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              )}
            </div>
            <span className={cn(
              "text-sm transition-colors duration-200",
              isComplete && "text-foreground",
              isCurrent && "text-foreground font-medium",
              !isComplete && !isCurrent && "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
