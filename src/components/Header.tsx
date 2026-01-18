import { Brain } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="text-center space-y-4 mb-8 relative">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      <div className="inline-flex items-center justify-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
          <Brain className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Nexa
        </h1>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
          Human Behaviour Classification
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Upload a short video to detect human behaviour using AI-powered motion analysis.
        </p>
      </div>
    </header>
  );
}
