import { Button } from '@/components/ui/button';
import { Car, Zap, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-car-ai.jpg';

const Hero = () => {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-hero text-primary-foreground py-20 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container mx-auto text-center relative z-10">
        <div className="mb-8">
          <Car className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            AI-Powered Car Condition Assessment
          </h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get instant, accurate car condition reports using advanced AI analysis. 
            Simply upload a photo and receive professional-grade assessment in seconds.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 text-primary-foreground/90">
            <Zap className="w-5 h-5" />
            <span>Instant Analysis</span>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/90">
            <Shield className="w-5 h-5" />
            <span>Professional Grade</span>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/90">
            <Car className="w-5 h-5" />
            <span>All Vehicle Types</span>
          </div>
        </div>
        
        <Button 
          size="lg" 
          variant="secondary"
          onClick={scrollToAnalyzer}
          className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
        >
          Start Analysis
        </Button>
      </div>
    </section>
  );
};

export default Hero;