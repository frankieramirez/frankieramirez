import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeClient } from "@/components/home-client";
import { PageFooter } from "@/components/page-footer";
import { SkillsSection } from "@/components/sections/skills-section";

export default function Home() {
  return (
    <HomeClient>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <PageFooter />
    </HomeClient>
  );
}
