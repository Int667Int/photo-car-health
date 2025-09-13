import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PhotoUpload from './PhotoUpload';
import AnalysisResults from './AnalysisResults';
import { analyzeCarCondition } from '@/lib/carAnalysis';

export interface AnalysisResult {
  overallCondition: string;
  conditionScore: number;
  damages: string[];
  recommendations: string[];
  confidence: number;
}

const CarAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setAnalysisResult(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload a car photo first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await analyzeCarCondition(selectedImage);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "Your car condition report is ready!",
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="analyzer" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upload Your Car Photo</h2>
          <p className="text-muted-foreground text-lg">
            Our AI will analyze the image and provide detailed condition assessment
          </p>
        </div>

        <div className="space-y-8">
          <PhotoUpload
            onImageSelect={handleImageSelect}
            imagePreview={imagePreview}
            ref={fileInputRef}
          />

          {selectedImage && (
            <Card className="p-6 text-center">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Image ready for analysis: {selectedImage.name}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Condition'}
                  </Button>
                  <Button
                    onClick={resetAnalysis}
                    variant="outline"
                    size="lg"
                  >
                    Upload New Photo
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {analysisResult && (
            <AnalysisResults result={analysisResult} />
          )}
        </div>
      </div>
    </section>
  );
};

export default CarAnalyzer;