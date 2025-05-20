import Link from "next/link";
import React from "react";

interface PixelContactItemProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
}

export function PixelContactItem({ icon, text, href }: PixelContactItemProps) {
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
