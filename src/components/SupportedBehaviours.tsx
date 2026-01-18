import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const behaviours = [
  "Neutral",
  "Happy",
  "Sad",
  "Angry",
  "Nervous",
  "Confused",
  "Talking",
  "Distracted",
];

export const SupportedBehaviours = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Info className="w-4 h-4" />
            <span>Supported behaviour classes</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-4">
          <p className="font-medium mb-2 text-foreground">Supported Behaviours:</p>
          <div className="flex flex-wrap gap-1.5">
            {behaviours.map((behaviour) => (
              <Badge key={behaviour} variant="secondary" className="text-xs">
                {behaviour}
              </Badge>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
