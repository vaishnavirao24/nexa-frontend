import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "1",
    title: "Frame Extraction",
    description: "The uploaded video is split into individual frames for analysis",
  },
  {
    number: "2",
    title: "Feature Extraction",
    description: "Human pose and appearance features are extracted from each frame",
  },
  {
    number: "3",
    title: "Motion Analysis",
    description: "Temporal motion patterns are analysed using a deep learning model",
  },
  {
    number: "4",
    title: "Behaviour Prediction",
    description: "The system predicts the most likely behaviour based on the analysis",
  },
];

export const HowItWorks = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors">
        <span className="font-medium text-foreground">How Nexa works</span>
        <ChevronDown className={cn(
          "w-5 h-5 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="pt-4 space-y-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-4 p-3 rounded-lg bg-muted/30"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center">
                {step.number}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{step.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
