import { Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PageFooter() {
  return (
    <footer className="py-8 relative z-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="text-sm text-muted-foreground font-pixel uppercase">
            © {new Date().getFullYear()} Frankie Ramirez. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="mailto:me@frankieramirez.com">
            <Button
              variant="outline"
              size="icon"
              className="pixel-borders-thin bg-background hover:bg-primary/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
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
              <Linkedin className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <p className="text-xs text-muted-foreground font-pixel mt-2 opacity-50">
          HINT: THERE'S A SECRET KONAMI CODE EASTER EGG...
        </p>
      </div>
    </footer>
  );
}
