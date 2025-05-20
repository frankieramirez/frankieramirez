import { Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-8 right-8 flex gap-4">
        <Link href="mailto:me@frankieramirez.com">
          <Button
            variant="outline"
            size="icon"
            className="pixel-borders-thin bg-background hover:bg-primary/20 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </Link>
        <Link
          href="https://www.linkedin.com/in/frankieramirez"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="icon"
            className="pixel-borders-thin bg-background hover:bg-primary/20 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-block p-2 bg-primary mb-6">
          <div className="bg-background p-2">
            <span className="text-sm font-pixel">FRONTEND ARCHITECT</span>
          </div>
        </div>

        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-pixel text-primary cursor-blink">
            <span className="font-pixel">FRANKIE RAMIREZ</span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-pixel">
          BUILDING EXCEPTIONAL DIGITAL EXPERIENCES
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <Link
            href="#skills"
            scroll={false}
            className="inline-flex items-center justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="font-pixel bg-background pixel-borders-thin hover:bg-primary/20 transition-colors"
            >
              <span>MY SKILLS</span>
              <span className="ml-2 animate-pixel-pulse">&gt;</span>
            </Button>
          </Link>
          <Link
            href="#contact"
            scroll={false}
            className="inline-flex items-center justify-center"
          >
            <Button size="lg" className="font-pixel pixel-borders-thin">
              <span>GET IN TOUCH</span>
              <span className="ml-2 animate-pixel-pulse">&gt;</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* The ChevronDown for scrolling to #about will be part of the main layout in home-client/InteractiveHomeWrapper if it needs to be outside this section */}
      {/* For now, keeping it here, assuming section might control its own "scroll to next" affordance */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-pixel-bounce">
        <Link href="#about" scroll={false} aria-label="Scroll down">
          {/* ChevronDown import will be needed if we keep this, or it can be passed as a prop or live in the parent wrapper */}
          {/* For now, assuming ChevronDown will be added or this part moved */}
          {/* <ChevronDown className="h-8 w-8 text-primary" /> */}
        </Link>
      </div>
    </section>
  );
}
