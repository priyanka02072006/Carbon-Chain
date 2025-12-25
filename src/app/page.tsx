import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ArrowRight, Sprout } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-background/80 backdrop-blur-sm px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="p-2 rounded-lg bg-primary/20">
            <Sprout className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-primary font-headline">CarbonChain</h1>
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4 -mt-16">
          <h1 className="text-5xl font-bold tracking-tight text-primary-foreground font-headline">
            Welcome to CarbonChain
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            A transparent, verifiable, and efficient platform for the blue carbon market, connecting conservation projects with carbon-conscious businesses and individuals.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
      </main>
    </div>
  );
}
