import { useCallback, useState } from "react";
import { Upload, Film, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  onClear: () => void;
  selectedFile: File | null;
  videoPreviewUrl: string | null;
}

const ACCEPTED_FORMATS = ["video/mp4", "video/quicktime", "video/x-matroska", "video/avi", "video/x-msvideo"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function VideoUpload({ onVideoSelect, onClear, selectedFile, videoPreviewUrl }: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return "Invalid file format. Please upload MP4, MOV, MKV, or AVI.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File too large. Maximum size is 50MB.";
    }
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onVideoSelect(file);
  }, [onVideoSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (selectedFile && videoPreviewUrl) {
    return (
      <div className="w-full">
        <div className="relative rounded-lg overflow-hidden bg-foreground/5 border border-border">
          <video
            src={videoPreviewUrl}
            controls
            className="w-full max-h-80 object-contain"
          />
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/90 hover:bg-background transition-colors shadow-md"
            aria-label="Remove video"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Film className="w-4 h-4" />
          <span className="truncate">{selectedFile.name}</span>
          <span className="text-xs">({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-accent/30"
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={cn(
            "w-10 h-10 mb-4 transition-colors",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
          <p className="mb-2 text-sm text-foreground">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">MP4, MOV, MKV, AVI (max 50MB)</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".mp4,.mov,.mkv,.avi,video/mp4,video/quicktime,video/x-matroska,video/avi"
          onChange={handleInputChange}
        />
      </label>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
