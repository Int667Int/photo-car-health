import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import { AnalysisResult } from './CarAnalyzer';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'fair':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'poor':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-automotive">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Analysis Complete</h3>
          <p className="text-muted-foreground">Here's your car condition report</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Condition */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Overall Condition</h4>
              {getConditionIcon(result.overallCondition)}
            </div>
            
            <Badge 
              variant="secondary" 
              className={`text-sm px-3 py-1 ${getConditionColor(result.overallCondition)}`}
            >
              {result.overallCondition}
            </Badge>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Condition Score</span>
                <span className="font-medium">{result.conditionScore}/100</span>
              </div>
              <Progress value={result.conditionScore} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Confidence</span>
                <span className="font-medium">{Math.round(result.confidence * 100)}%</span>
              </div>
              <Progress value={result.confidence * 100} className="h-2" />
            </div>
          </div>

          {/* Detected Issues */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h4 className="font-semibold text-lg">Detected Issues</h4>
            </div>
            
            {result.damages.length > 0 ? (
              <div className="space-y-2">
                {result.damages.map((damage, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>{damage}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No significant issues detected</p>
            )}
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-lg">Recommendations</h4>
          </div>
          
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gradient-card rounded-lg">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;