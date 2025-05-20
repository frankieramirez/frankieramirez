import { PixelSkillBadge } from "@/components/pixel-skill-badge";

export function SkillsSection() {
  return (
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
  );
}
