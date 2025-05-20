import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";

import PixelContactForm from "@/components/pixel-contact-form";
import { PixelContactItem } from "@/components/pixel-contact-item";

export function ContactSection() {
  return (
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
                  I'M ALWAYS OPEN TO DISCUSSING NEW PROJECTS, CREATIVE IDEAS OR
                  OPPORTUNITIES TO BE PART OF YOUR VISION.
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
  );
}
