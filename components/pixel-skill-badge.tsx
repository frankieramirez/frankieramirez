interface PixelSkillBadgeProps {
  name: string;
  featured?: string;
}

export function PixelSkillBadge({ name, featured = "" }: PixelSkillBadgeProps) {
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
