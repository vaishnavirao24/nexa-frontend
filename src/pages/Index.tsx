import { useState, useCallback, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoUpload } from "@/components/VideoUpload";
import { ClassificationResult } from "@/components/ClassificationResult";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { SupportedBehaviours } from "@/components/SupportedBehaviours";
import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useVideoClassification } from "@/hooks/useVideoClassification";
import { Loader2, Play, RotateCcw } from "lucide-react";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const { result, isLoading, error, classifyVideo, reset } = useVideoClassification();

  const handleVideoSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
    reset();
  }, [reset]);

  const handleClear = useCallback(() => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setSelectedFile(null);
    setVideoPreviewUrl(null);
    reset();
  }, [videoPreviewUrl, reset]);

  const handleClassify = useCallback(() => {
    if (selectedFile) {
      classifyVideo(selectedFile);
    }
  }, [selectedFile, classifyVideo]);

  const canClassify = useMemo(() => selectedFile && !isLoading, [selectedFile, isLoading]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-12 md:py-16">
        <Header />

        <Card className="border-border shadow-sm">
          <CardContent className="p-6 md:p-8 space-y-6">
            <VideoUpload
              onVideoSelect={handleVideoSelect}
              onClear={handleClear}
              selectedFile={selectedFile}
              videoPreviewUrl={videoPreviewUrl}
            />

            <div className="flex justify-center">
              <SupportedBehaviours />
            </div>

            <div className="flex justify-center">
              {!result ? (
                <Button
                  onClick={handleClassify}
                  disabled={!canClassify}
                  size="lg"
                  className="min-w-48"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Classification
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleClear}
                  variant="outline"
                  size="lg"
                  className="min-w-48"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Classify Another
                </Button>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            {result && (
              <div className="pt-2">
                <ClassificationResult
                  predictedClass={result.predicted_class}
                  confidence={result.confidence}
                  classProbabilities={result.class_probabilities}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6">
          <HowItWorks />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
