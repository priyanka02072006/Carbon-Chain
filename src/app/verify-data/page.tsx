import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzeUploadedData, type AnalyzeUploadedDataOutput } from "@/ai/flows/analyze-uploaded-data";
import { Loader2, AlertCircle, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";

const formSchema = z.object({
  plantationData: z.instanceof(FileList).refine((files) => files?.length === 1, "Plantation data file is required."),
  supportingEvidence: z.instanceof(FileList).refine((files) => files?.length === 1, "Supporting evidence file is required."),
});

type FormValues = z.infer<typeof formSchema>;

const fileToDataURI = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        resolve(event.target.result);
      } else {
        reject(new Error('Failed to read file.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export default function VerifyDataPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeUploadedDataOutput | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const plantationDataURI = await fileToDataURI(data.plantationData[0]);
      const supportingEvidenceURI = await fileToDataURI(data.supportingEvidence[0]);

      const analysisResult = await analyzeUploadedData({
        plantationData: plantationDataURI,
        supportingEvidence: supportingEvidenceURI,
      });

      setResult(analysisResult);
    } catch (e) {
      setError("An error occurred during analysis. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Verify Project Data</CardTitle>
          <CardDescription>
            Upload verified plantation data and supporting evidence for automated analysis and validation.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="plantationData">Plantation & Restoration Data</Label>
              <Input id="plantationData" type="file" {...register("plantationData")} />
               <p className="text-sm text-muted-foreground">
                Upload a structured data file (e.g., CSV, JSON, TXT, or a PDF report) containing project details like species, area, location, and dates.
              </p>
              {errors.plantationData && <p className="text-sm text-destructive">{errors.plantationData.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportingEvidence">Supporting Evidence</Label>
              <Input id="supportingEvidence" type="file" {...register("supportingEvidence")} />
              <p className="text-sm text-muted-foreground">
                Provide documentation to back up your claims. This can include photos, satellite imagery, third-party audit reports, or signed affidavits (e.g., JPG, PNG, PDF).
              </p>
              {errors.supportingEvidence && <p className="text-sm text-destructive">{errors.supportingEvidence.message as string}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Analyzing..." : "Verify Data"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-headline">Analysis Results</h2>
        {isLoading && (
          <Card className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Analyzing documents, please wait...</p>
          </Card>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.validationResult.isValid ? <CheckCircle2 className="text-green-600" /> : <AlertCircle className="text-destructive" />}
                Validation Status: {result.validationResult.isValid ? "Valid" : "Invalid"}
              </CardTitle>
              <CardDescription>{result.validationResult.reason}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    <div>
                        <Label>Confidence Score</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={result.validationResult.confidenceScore * 100} className="w-full" />
                          <span className="font-bold text-lg text-primary">{(result.validationResult.confidenceScore * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                </div>
                 <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                    <TrendingUp className="w-8 h-8 text-accent-foreground" />
                    <div>
                        <Label>Estimated Carbon Credit Score</Label>
                        <p className="font-bold text-3xl text-accent-foreground">{result.carbonCreditScore}</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
