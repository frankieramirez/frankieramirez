"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const pixelButtonVariants = cva(
  "inline-flex items-center justify-center font-pixel text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground pixel-borders hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground pixel-borders-destructive hover:bg-destructive/90",
        outline: "bg-background pixel-borders-thin hover:bg-primary/10",
        secondary: "bg-secondary text-secondary-foreground pixel-borders-secondary hover:bg-secondary/90",
        accent: "bg-accent text-accent-foreground pixel-borders-accent hover:bg-accent/90",
        ghost: "hover:bg-primary/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {
  asChild?: boolean
}

const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return <button className={cn(pixelButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
PixelButton.displayName = "PixelButton"

export { PixelButton, pixelButtonVariants }
