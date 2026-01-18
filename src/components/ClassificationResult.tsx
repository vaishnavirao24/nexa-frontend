import { cn } from "@/lib/utils";

interface ClassProbabilities {
  emotion: number;
  social: number;
  physical: number;
  pose_idle: number;
}

interface ClassificationResultProps {
  predictedClass: string;
  confidence: number;
  classProbabilities: ClassProbabilities;
}

const CLASS_LABELS: Record<string, { label: string; color: string }> = {
  emotion: { label: "Emotion", color: "bg-chart-1" },
  social: { label: "Social", color: "bg-chart-2" },
  physical: { label: "Physical", color: "bg-chart-3" },
  pose_idle: { label: "Pose Idle", color: "bg-chart-4" },
};

export function ClassificationResult({ predictedClass, confidence, classProbabilities }: ClassificationResultProps) {
  const sortedClasses = Object.entries(classProbabilities).sort(([, a], [, b]) => b - a);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      {/* Predicted Class */}
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Predicted Class
        </p>
        <h2 className="text-4xl font-bold text-foreground capitalize">
          {CLASS_LABELS[predictedClass]?.label || predictedClass}
        </h2>
      </div>

      {/* Confidence Score */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm text-muted-foreground">Confidence:</span>
          <span className="text-lg font-semibold text-primary">
            {(confidence * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Probability Distribution */}
      <div className="space-y-3 pt-4 border-t border-border">
        <p className="text-sm font-medium text-muted-foreground">Class Probabilities</p>
        <div className="space-y-3">
          {sortedClasses.map(([className, probability]) => {
            const classInfo = CLASS_LABELS[className];
            const percentage = probability * 100;
            const isTop = className === predictedClass;

            return (
              <div key={className} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className={cn(
                    "font-medium",
                    isTop ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {classInfo?.label || className}
                  </span>
                  <span className={cn(
                    "font-mono",
                    isTop ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2.5 bg-border rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      classInfo?.color || "bg-primary"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
