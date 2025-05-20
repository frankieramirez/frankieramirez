import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
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
              SCIENCE (B.S.) FOCUSED IN WEB DESIGN & DEVELOPMENT FROM FULL SAIL
              UNIVERSITY.
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
  );
}
