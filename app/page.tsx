import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeClient } from "@/components/home-client";
import { PageFooter } from "@/components/page-footer";
import Script from "next/script";
import { SkillsSection } from "@/components/sections/skills-section";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Your Page Title", // Replace with your page title
    description: "A concise description of your page.", // Replace with your page description
    url: "https://yourwebsite.com", // Replace with your page URL
    mainEntity: {
      "@type": "Person",
      name: "Your Name", // Replace with your name
      url: "https://yourwebsite.com", // Replace with your profile URL or website
      // Add other relevant properties like "jobTitle", "alumniOf", "knowsAbout", etc.
    },
  };

  return (
    <HomeClient>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <PageFooter />
    </HomeClient>
  );
}
