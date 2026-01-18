import { AlertCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-border">
      <div className="flex items-start gap-2 text-xs text-muted-foreground max-w-md mx-auto text-center">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          Model trained on synthetic data. Predictions are indicative only and should not be used for critical decision-making.
        </p>
      </div>
    </footer>
  );
}
