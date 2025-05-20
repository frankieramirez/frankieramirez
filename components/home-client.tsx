"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PerformanceMetrics } from "@/components/performance-metrics";
import PixelContactForm from "./pixel-contact-form";

export function HomeClient() {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pixelated canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const pixelSize = 8; // Size of each "pixel" block
    const pixelGap = 1; // Gap between pixels

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight * 3}px`;

      // Disable anti-aliasing for pixelated look
      ctx.imageSmoothingEnabled = false;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create pixel grid
    const createPixelGrid = () => {
      const cols = Math.ceil(canvas.width / (pixelSize + pixelGap));
      const rows = Math.ceil(canvas.height / (pixelSize + pixelGap));
      const pixels = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Only create some pixels for a sparse effect
          if (Math.random() > 0.97) {
            pixels.push({
              x: x * (pixelSize + pixelGap),
              y: y * (pixelSize + pixelGap),
              color: getRandomColor(),
              blinkSpeed: Math.random() * 0.02 + 0.01,
              blinkState: Math.random() > 0.5,
              lastBlink: 0,
              blinkInterval: Math.random() * 2000 + 1000,
            });
          }
        }
      }

      return pixels;
    };

    // Get random retro color
    function getRandomColor() {
      const colors = [
        "#00ff00", // Green
        "#ff00ff", // Magenta
        "#00ffff", // Cyan
        "#ff0000", // Red
        "#0000ff", // Blue
        "#ffff00", // Yellow
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    const pixels = createPixelGrid();

    // Animation loop
    const animate = (timestamp) => {
      animationRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only update and draw pixels that are in or near the viewport
      const viewportTop = window.scrollY;
      const viewportBottom = viewportTop + window.innerHeight;
      const buffer = 200; // Extra buffer to ensure smooth transitions

      pixels.forEach((pixel) => {
        // Skip pixels far from viewport for better performance
        if (
          pixel.y < viewportTop - buffer ||
          pixel.y > viewportBottom + buffer
        ) {
          return;
        }

        // Blink effect
        if (timestamp - pixel.lastBlink > pixel.blinkInterval) {
          pixel.blinkState = !pixel.blinkState;
          pixel.lastBlink = timestamp;
        }

        if (pixel.blinkState) {
          ctx.fillStyle = pixel.color;
          ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
        }
      });
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen font-sans relative overflow-hidden pixel-grid">
      {/* Dark background */}
      <div className="fixed inset-0 bg-background -z-30"></div>

      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-[-20]"
      />

      <main className="relative z-10">
        {/* Hero Section */}
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
                {/* Simple static text with no animations */}
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

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-pixel-bounce">
            <Link href="#about" scroll={false} aria-label="Scroll down">
              <ChevronDown className="h-8 w-8 text-primary" />
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="container max-w-5xl">
            <div className="space-y-8">
              <div className="inline-block bg-primary p-2">
                <div className="bg-background p-2">
                  <span className="text-sm font-pixel">ABOUT ME</span>
                </div>
              </div>

              <h2 className="text-3xl font-bold tracking-tight font-pixel text-primary">
                PROFESSIONAL PROFILE
              </h2>

              <div className="mt-8 space-y-6 text-lg text-muted-foreground">
                <p className="font-pixel text-sm leading-relaxed">
                  EXPERIENCED SENIOR USER INTERFACE ENGINEER WITH A DEMONSTRATED
                  HISTORY OF WORKING IN THE INFORMATION TECHNOLOGY AND SERVICES
                  INDUSTRY. STRONG ENGINEERING PROFESSIONAL WITH A BACHELOR OF
                  SCIENCE (B.S.) FOCUSED IN WEB DESIGN & DEVELOPMENT FROM FULL
                  SAIL UNIVERSITY.
                </p>
                <p className="font-pixel text-sm leading-relaxed">
                  I SPECIALIZE IN BUILDING EXCEPTIONAL DIGITAL EXPERIENCES, FROM
                  COMPONENT LIBRARIES AND DESIGN SYSTEMS TO HIGH-PERFORMANCE WEB
                  APPLICATIONS.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="bg-background border-0 pixel-borders">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-pixel mb-4 text-primary">
                      LANGUAGES
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-pixel text-sm">ENGLISH</span>
                        <span className="text-sm text-muted-foreground font-pixel">
                          NATIVE
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-pixel text-sm">SPANISH</span>
                        <span className="text-sm text-muted-foreground font-pixel">
                          LIMITED
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background border-0 pixel-borders-secondary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-pixel mb-4 text-secondary">
                      EDUCATION
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <div className="font-pixel text-sm">
                          FULL SAIL UNIVERSITY
                        </div>
                        <div className="text-sm text-muted-foreground font-pixel">
                          B.S., WEB DESIGN & DEVELOPMENT
                        </div>
                        <div className="text-sm text-muted-foreground font-pixel">
                          2010 - 2012
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 relative">
          <div className="container max-w-5xl">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block bg-secondary p-2 mx-auto">
                <div className="bg-background p-2">
                  <span className="text-sm font-pixel">EXPERTISE</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight font-pixel text-secondary">
                SKILLS & TECHNOLOGIES
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PixelSkillBadge name="NEXT.JS" featured="primary" />
              <PixelSkillBadge name="REACT" featured="primary" />
              <PixelSkillBadge name="TAILWIND" featured="primary" />
              <PixelSkillBadge name="NODE.JS" featured="secondary" />
              <PixelSkillBadge name="JAVASCRIPT" featured="secondary" />
              <PixelSkillBadge name="TYPESCRIPT" featured="secondary" />
              <PixelSkillBadge name="HTML/CSS" />
              <PixelSkillBadge name="DESIGN SYSTEMS" />
              <PixelSkillBadge name="COMPONENTS" />
              <PixelSkillBadge name="AI" featured="accent" />
              <PixelSkillBadge name="AGILE/SCRUM" />
              <PixelSkillBadge name="PERFORMANCE" featured="accent" />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="container max-w-4xl">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block bg-accent p-2 mx-auto">
                <div className="bg-background p-2">
                  <span className="text-sm font-pixel">CONTACT</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight font-pixel text-accent">
                GET IN TOUCH
              </h2>
            </div>

            <Card className="overflow-hidden border-0 bg-background pixel-borders-accent">
              <CardContent className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-pixel text-accent">
                      LET'S CONNECT
                    </h3>
                    <p className="text-muted-foreground font-pixel text-sm leading-relaxed">
                      I'M ALWAYS OPEN TO DISCUSSING NEW PROJECTS, CREATIVE IDEAS
                      OR OPPORTUNITIES TO BE PART OF YOUR VISION.
                    </p>
                    <div className="space-y-4 pt-4">
                      <PixelContactItem
                        icon={<Mail />}
                        text="me@frankieramirez.com"
                        href="mailto:me@frankieramirez.com"
                      />
                      <PixelContactItem
                        icon={<Linkedin />}
                        text="linkedin.com/in/frankieramirez"
                        href="https://www.linkedin.com/in/frankieramirez"
                      />
                    </div>
                  </div>
                  <div>
                    <PixelContactForm />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 relative z-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-sm text-muted-foreground font-pixel">
              © {new Date().getFullYear()} FRANKIE RAMIREZ. ALL RIGHTS RESERVED.
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
      {/* Add performance metrics component in development */}
      <PerformanceMetrics />
    </div>
  );
}

// Pixelated Skill Badge Component
function PixelSkillBadge({ name, featured = "" }) {
  let borderClass = "pixel-borders-thin";
  let textClass = "";

  if (featured === "primary") {
    borderClass = "pixel-borders";
    textClass = "text-primary";
  } else if (featured === "secondary") {
    borderClass = "pixel-borders-secondary";
    textClass = "text-secondary";
  } else if (featured === "accent") {
    borderClass = "pixel-borders-accent";
    textClass = "text-accent";
  }

  return (
    <div className="group">
      <div
        className={`
        bg-background p-4 text-center 
        ${borderClass} hover:bg-primary/10 transition-colors
      `}
      >
        <span className={`text-sm font-pixel ${textClass}`}>{name}</span>
      </div>
    </div>
  );
}

// Pixelated Contact Item Component
function PixelContactItem({ icon, text, href }) {
  const content = (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex h-10 w-10 items-center justify-center bg-background pixel-borders-thin">
        {icon}
      </div>
      <span className="font-pixel">{text}</span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block hover:text-primary transition-colors"
      >
        {content}
      </Link>
    );
  }

  return content;
}
