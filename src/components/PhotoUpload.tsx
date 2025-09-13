import { forwardRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera } from 'lucide-react';

interface PhotoUploadProps {
  onImageSelect: (file: File) => void;
  imagePreview: string | null;
}

const PhotoUpload = forwardRef<HTMLInputElement, PhotoUploadProps>(
  ({ onImageSelect, imagePreview }, ref) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    };

    const handleDragOver = (event: React.DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    };

    const openFileDialog = () => {
      (ref as React.RefObject<HTMLInputElement>)?.current?.click();
    };

    return (
      <Card className="shadow-card-soft">
        <div
          className="p-8 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={ref}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {imagePreview ? (
            <div className="text-center">
              <img
                src={imagePreview}
                alt="Car preview"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-md mb-4"
              />
              <p className="text-sm text-muted-foreground mb-4">
                Click to change image or drag & drop a new one
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Car Photo</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your car image here, or click to select
              </p>
              <div className="flex justify-center gap-2 text-sm text-muted-foreground">
                <Camera className="w-4 h-4" />
                <span>Supports JPG, PNG, WEBP</span>
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="mt-4 w-full"
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
          >
            {imagePreview ? 'Change Photo' : 'Select Photo'}
          </Button>
        </div>
      </Card>
    );
  }
);

PhotoUpload.displayName = 'PhotoUpload';

export default PhotoUpload;