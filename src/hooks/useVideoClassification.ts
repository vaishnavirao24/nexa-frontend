import { useState, useCallback } from "react";

interface ClassProbabilities {
  emotion: number;
  social: number;
  physical: number;
  pose_idle: number;
}

interface ClassificationResult {
  predicted_label: string;
  confidence: number;
  topk: { label: string; score: number }[];
}

interface UseVideoClassificationReturn {
  result: ClassificationResult | null;
  isLoading: boolean;
  error: string | null;
  classifyVideo: (file: File) => Promise<void>;
  reset: () => void;
}

// IMPORTANT: Vercel env vars must be set in Vercel dashboard.
// This fallback is okay.
const API_BASE =
  (import.meta as any).env?.VITE_NEXA_API_BASE_URL ??
  "https://nexa-backend-able.onrender.com";

export function useVideoClassification(): UseVideoClassificationReturn {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classifyVideo = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      // ✅ must be "file" (matches FastAPI param name)
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        body: formData,
      });

      // If backend returned error JSON, show it.
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error ${res.status}: ${text}`);
      }

      const data = (await res.json()) as ClassificationResult;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, classifyVideo, reset };
}
