export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Frankie Ramirez",
    jobTitle: "Frontend Architect",
    url: "https://frankieramirez.com",
    sameAs: ["https://www.linkedin.com/in/frankieramirez"],
    knowsAbout: ["React", "Next.js", "JavaScript", "TypeScript", "Node.js", "Web Development", "Frontend Architecture"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Full Sail University",
      sameAs: "https://www.fullsail.edu/",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
