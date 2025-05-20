"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PerformanceMetrics } from "@/components/performance-metrics";

interface HomeClientProps {
  children: React.ReactNode;
}

export function HomeClient({ children }: HomeClientProps) {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

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
    if (!ctx) return;
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
      const pixels: Array<{
        x: number;
        y: number;
        color: string;
        blinkSpeed: number;
        blinkState: boolean;
        lastBlink: number;
        blinkInterval: number;
      }> = [];

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
    const animate = (timestamp: number) => {
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

      <main className="relative z-10 max-w-4xl mx-auto">{children}</main>

      <PerformanceMetrics />
    </div>
  );
}
