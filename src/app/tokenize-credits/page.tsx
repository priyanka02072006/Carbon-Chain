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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { determineCarbonCreditScore, type DetermineCarbonCreditScoreOutput } from "@/ai/flows/determine-carbon-credit-score";
import { Loader2, AlertCircle, Sparkles, Wand2, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  ChartContainer,
  ChartConfig,
} from "@/components/ui/chart"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts"

const formSchema = z.object({
  plantationData: z.string().min(50, "Please provide detailed plantation data (min. 50 characters)."),
  restorationData: z.string().min(50, "Please provide detailed restoration data (min. 50 characters)."),
});

type FormValues = z.infer<typeof formSchema>;

export default function TokenizeCreditsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetermineCarbonCreditScoreOutput | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const scoreResult = await determineCarbonCreditScore(data);
      setResult(scoreResult);
    } catch (e) {
      setError("An error occurred while determining the score. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMintTokens = () => {
    toast({
      title: "Tokens Minted Successfully!",
      description: `${result?.carbonCreditScore} carbon credit tokens have been added to the registry.`,
      action: <div className="p-2 rounded-full bg-primary/20"><Sparkles className="h-5 w-5 text-primary" /></div>,
    });
  };

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Determine Carbon Credit Score</CardTitle>
          <CardDescription>
            Provide project details for our system to calculate a carbon credit score, ready for tokenization.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plantationData">Plantation Data</Label>
              <Textarea
                id="plantationData"
                placeholder="e.g., Species: Rhizophora mucronata, Area: 50 hectares, Location: Pichavaram, Tamil Nadu. Planted 50,000 saplings in Q2 2023..."
                {...register("plantationData")}
                className="min-h-[120px]"
              />
              {errors.plantationData && <p className="text-sm text-destructive">{errors.plantationData.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="restorationData">Restoration Data</Label>
              <Textarea
                id="restorationData"
                placeholder="e.g., Technique: Community-based ecological mangrove restoration (CBEMR), Area: 50 hectares. Monitored water salinity and tidal flow to ensure optimal growth conditions..."
                {...register("restorationData")}
                className="min-h-[120px]"
              />
              {errors.restorationData && <p className="text-sm text-destructive">{errors.restorationData.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Calculating..." : "Calculate Score"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-6 sticky top-24">
        <h2 className="text-2xl font-semibold font-headline">Credit Score & Tokenization</h2>
        {isLoading && (
          <Card className="flex flex-col items-center justify-center p-12">
            <Wand2 className="h-12 w-12 animate-pulse text-primary" />
            <p className="mt-4 text-muted-foreground">Our system is working its magic...</p>
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
            <CardHeader className="items-center text-center">
              <CardTitle>Calculated Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <div className="relative w-48 h-48">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                        <RadarChart data={[{ subject: 'Score', score: result.carbonCreditScore, fullMark: 100 }]}>
                            <PolarGrid gridType="circle" />
                            <PolarAngleAxis dataKey="subject" tick={false} />
                            <Radar name="Score" dataKey="score" stroke="var(--color-score)" fill="var(--color-score)" fillOpacity={0.6} />
                        </RadarChart>
                    </ChartContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-primary">{result.carbonCreditScore}</span>
                        <span className="text-sm text-muted-foreground">out of 100</span>
                    </div>
                </div>

              <div className="w-full space-y-4">
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>Justification</AlertTitle>
                  <AlertDescription>{result.justification}</AlertDescription>
                </Alert>
                <Button size="lg" className="w-full" onClick={handleMintTokens}>
                  <Coins className="mr-2 h-5 w-5" />
                  Mint {result.carbonCreditScore} Credit Tokens
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
