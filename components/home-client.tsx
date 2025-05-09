"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Linkedin, Mail, ChevronDown, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { PerformanceMetrics } from "@/components/performance-metrics"

export function HomeClient() {
  const [scrollY, setScrollY] = useState(0)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState("")
  const recaptchaLoaded = useRef(false)

  // Fetch reCAPTCHA site key from server
  useEffect(() => {
    const fetchRecaptchaKey = async () => {
      try {
        const response = await fetch("/api/recaptcha-key")
        const data = await response.json()
        setRecaptchaSiteKey(data.siteKey)
      } catch (error) {
        console.error("Failed to fetch reCAPTCHA site key:", error)
      }
    }

    fetchRecaptchaKey()
  }, [])

  // Load reCAPTCHA script when site key is available
  useEffect(() => {
    if (recaptchaSiteKey && !recaptchaLoaded.current) {
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      recaptchaLoaded.current = true

      return () => {
        document.head.removeChild(script)
        recaptchaLoaded.current = false
      }
    }
  }, [recaptchaSiteKey])

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Pixelated canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const pixelSize = 8 // Size of each "pixel" block
    const pixelGap = 1 // Gap between pixels

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight * 3}px`

      // Disable anti-aliasing for pixelated look
      ctx.imageSmoothingEnabled = false
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create pixel grid
    const createPixelGrid = () => {
      const cols = Math.ceil(canvas.width / (pixelSize + pixelGap))
      const rows = Math.ceil(canvas.height / (pixelSize + pixelGap))
      const pixels = []

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
            })
          }
        }
      }

      return pixels
    }

    // Get random retro color
    function getRandomColor() {
      const colors = [
        "#00ff00", // Green
        "#ff00ff", // Magenta
        "#00ffff", // Cyan
        "#ff0000", // Red
        "#0000ff", // Blue
        "#ffff00", // Yellow
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const pixels = createPixelGrid()

    // Animation loop
    const animate = (timestamp) => {
      animationRef.current = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Only update and draw pixels that are in or near the viewport
      const viewportTop = window.scrollY
      const viewportBottom = viewportTop + window.innerHeight
      const buffer = 200 // Extra buffer to ensure smooth transitions

      pixels.forEach((pixel) => {
        // Skip pixels far from viewport for better performance
        if (pixel.y < viewportTop - buffer || pixel.y > viewportBottom + buffer) {
          return
        }

        // Blink effect
        if (timestamp - pixel.lastBlink > pixel.blinkInterval) {
          pixel.blinkState = !pixel.blinkState
          pixel.lastBlink = timestamp
        }

        if (pixel.blinkState) {
          ctx.fillStyle = pixel.color
          ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize)
        }
      })
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen font-sans relative overflow-hidden pixel-grid">
      {/* Dark background */}
      <div className="fixed inset-0 bg-background -z-30"></div>

      {/* Canvas Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-20]" />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
          <div className="absolute top-8 right-8 flex gap-4">
            <Link href="mailto:me@frankieramirez.com">
              <Button
                variant="outline"
                size="icon"
                className="pixel-borders-thin bg-background hover:bg-primary/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/frankieramirez" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="pixel-borders-thin bg-background hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block p-2 bg-primary mb-6">
              <div className="bg-background p-2">
                <span className="text-sm font-pixel">FRONTEND ARCHITECT</span>
              </div>
            </div>

            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-pixel text-primary cursor-blink">
                {/* Simple static text with no animations */}
                <span className="font-pixel">FRANKIE RAMIREZ</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-pixel">
              BUILDING EXCEPTIONAL DIGITAL EXPERIENCES
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <Link href="#skills" scroll={false} className="inline-flex items-center justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-pixel bg-background pixel-borders-thin hover:bg-primary/20 transition-colors"
                >
                  <span>MY SKILLS</span>
                  <span className="ml-2 animate-pixel-pulse">&gt;</span>
                </Button>
              </Link>
              <Link href="#contact" scroll={false} className="inline-flex items-center justify-center">
                <Button size="lg" className="font-pixel pixel-borders-thin">
                  <span>GET IN TOUCH</span>
                  <span className="ml-2 animate-pixel-pulse">&gt;</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-pixel-bounce">
            <Link href="#about" scroll={false} aria-label="Scroll down">
              <ChevronDown className="h-8 w-8 text-primary" />
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="container max-w-5xl">
            <div className="space-y-8">
              <div className="inline-block bg-primary p-2">
                <div className="bg-background p-2">
                  <span className="text-sm font-pixel">ABOUT ME</span>
                </div>
              </div>

              <h2 className="text-3xl font-bold tracking-tight font-pixel text-primary">PROFESSIONAL PROFILE</h2>

              <div className="mt-8 space-y-6 text-lg text-muted-foreground">
                <p className="font-pixel text-sm leading-relaxed">
                  EXPERIENCED SENIOR USER INTERFACE ENGINEER WITH A DEMONSTRATED HISTORY OF WORKING IN THE INFORMATION
                  TECHNOLOGY AND SERVICES INDUSTRY. STRONG ENGINEERING PROFESSIONAL WITH A BACHELOR OF SCIENCE (B.S.)
                  FOCUSED IN WEB DESIGN & DEVELOPMENT FROM FULL SAIL UNIVERSITY.
                </p>
                <p className="font-pixel text-sm leading-relaxed">
                  I SPECIALIZE IN BUILDING EXCEPTIONAL DIGITAL EXPERIENCES, FROM COMPONENT LIBRARIES AND DESIGN SYSTEMS
                  TO HIGH-PERFORMANCE WEB APPLICATIONS.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="bg-background border-0 pixel-borders">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-pixel mb-4 text-primary">LANGUAGES</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-pixel text-sm">ENGLISH</span>
                        <span className="text-sm text-muted-foreground font-pixel">NATIVE</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-pixel text-sm">SPANISH</span>
                        <span className="text-sm text-muted-foreground font-pixel">LIMITED</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background border-0 pixel-borders-secondary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-pixel mb-4 text-secondary">EDUCATION</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="font-pixel text-sm">FULL SAIL UNIVERSITY</div>
                        <div className="text-sm text-muted-foreground font-pixel">B.S., WEB DESIGN & DEVELOPMENT</div>
                        <div className="text-sm text-muted-foreground font-pixel">2010 - 2012</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 relative">
          <div className="container max-w-5xl">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block bg-secondary p-2 mx-auto">
                <div className="bg-background p-2">
                  <span className="text-sm font-pixel">EXPERTISE</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight font-pixel text-secondary">SKILLS & TECHNOLOGIES</h2>
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

        {/* Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="container max-w-4xl">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block bg-accent p-2 mx-auto">
                <div className="bg-background p-2">
                  <span className="text-sm font-pixel">CONTACT</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight font-pixel text-accent">GET IN TOUCH</h2>
            </div>

            <Card className="overflow-hidden border-0 bg-background pixel-borders-accent">
              <CardContent className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-pixel text-accent">LET'S CONNECT</h3>
                    <p className="text-muted-foreground font-pixel text-sm leading-relaxed">
                      I'M ALWAYS OPEN TO DISCUSSING NEW PROJECTS, CREATIVE IDEAS OR OPPORTUNITIES TO BE PART OF YOUR
                      VISION.
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
                    <PixelContactForm recaptchaSiteKey={recaptchaSiteKey} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 relative z-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-sm text-muted-foreground font-pixel">
              © {new Date().getFullYear()} FRANKIE RAMIREZ. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="mailto:me@frankieramirez.com">
              <Button
                variant="outline"
                size="icon"
                className="pixel-borders-thin bg-background hover:bg-primary/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/frankieramirez" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="pixel-borders-thin bg-background hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground font-pixel mt-2 opacity-50">
            HINT: THERE'S A SECRET KONAMI CODE EASTER EGG...
          </p>
        </div>
      </footer>
      {/* Add performance metrics component in development */}
      <PerformanceMetrics />
    </div>
  )
}

// Pixelated Skill Badge Component
function PixelSkillBadge({ name, featured = "" }) {
  let borderClass = "pixel-borders-thin"
  let textClass = ""

  if (featured === "primary") {
    borderClass = "pixel-borders"
    textClass = "text-primary"
  } else if (featured === "secondary") {
    borderClass = "pixel-borders-secondary"
    textClass = "text-secondary"
  } else if (featured === "accent") {
    borderClass = "pixel-borders-accent"
    textClass = "text-accent"
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
  )
}

// Pixelated Contact Item Component
function PixelContactItem({ icon, text, href }) {
  const content = (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex h-10 w-10 items-center justify-center bg-background pixel-borders-thin">{icon}</div>
      <span className="font-pixel">{text}</span>
    </div>
  )

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
    )
  }

  return content
}

// Pixelated Contact Form Component
function PixelContactForm({ recaptchaSiteKey }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState(null) // null, 'success', 'error'
  const [recaptchaToken, setRecaptchaToken] = useState("")
  const formRef = useRef(null)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  // Load reCAPTCHA when component mounts
  useEffect(() => {
    // This function will be called when reCAPTCHA token is received
    window.onRecaptchaVerify = (token) => {
      setRecaptchaToken(token)
    }

    return () => {
      // Cleanup
      window.onRecaptchaVerify = undefined
    }
  }, [])

  // Execute reCAPTCHA when form is about to be submitted
  const executeRecaptcha = () => {
    if (window.grecaptcha && window.grecaptcha.execute && recaptchaSiteKey) {
      try {
        window.grecaptcha.execute(recaptchaSiteKey, { action: "submit" }).then((token) => {
          setRecaptchaToken(token)
          submitForm(token)
        })
      } catch (error) {
        console.error("reCAPTCHA execution error:", error)
        setFormStatus("error")
        setIsSubmitting(false)
      }
    } else {
      // If reCAPTCHA isn't loaded yet, try again after a short delay
      setTimeout(() => executeRecaptcha(), 500)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "NAME IS REQUIRED"
    }

    if (!formData.email.trim()) {
      newErrors.email = "EMAIL IS REQUIRED"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "EMAIL IS INVALID"
    }

    if (!formData.message.trim()) {
      newErrors.message = "MESSAGE IS REQUIRED"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitForm = async (token) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recaptchaToken: token,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus("success")
        setFormData({ name: "", email: "", message: "", website: "" })
        setLastSubmitTime(Date.now())

        // Show success toast
        toast({
          title: "MESSAGE SENT!",
          description: data.message || "THANKS FOR REACHING OUT. I'LL GET BACK TO YOU SOON.",
          action: <ToastAction altText="Close">CLOSE</ToastAction>,
        })
      } else {
        throw new Error(data.message || "Error submitting form")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setFormStatus("error")

      // Show error toast
      toast({
        variant: "destructive",
        title: "ERROR!",
        description: error.message || "THERE WAS A PROBLEM SENDING YOUR MESSAGE. PLEASE TRY AGAIN.",
        action: <ToastAction altText="Try again">TRY AGAIN</ToastAction>,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if the honeypot field is filled (bots will fill this)
    if (formData.website) {
      console.log("Honeypot field filled - likely a bot")
      // Pretend success but don't actually submit
      setFormStatus("success")
      setFormData({ name: "", email: "", message: "", website: "" })
      toast({
        title: "MESSAGE SENT!",
        description: "THANKS FOR REACHING OUT. I'LL GET BACK TO YOU SOON.",
        action: <ToastAction altText="Close">CLOSE</ToastAction>,
      })
      return
    }

    // Rate limiting - prevent more than 1 submission every 30 seconds
    const now = Date.now()
    if (now - lastSubmitTime < 30000) {
      toast({
        variant: "destructive",
        title: "PLEASE WAIT",
        description: "YOU CAN ONLY SUBMIT THE FORM ONCE EVERY 30 SECONDS.",
        action: <ToastAction altText="Close">CLOSE</ToastAction>,
      })
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)
    setFormStatus(null)

    // Execute reCAPTCHA to get token, which will then submit the form
    executeRecaptcha()
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-pixel">
          NAME
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`flex h-12 w-full border-0 ${
            errors.name ? "pixel-borders-destructive" : "pixel-borders-thin"
          } bg-background px-4 py-2 text-sm font-pixel placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
          placeholder="YOUR NAME"
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-xs text-destructive mt-1 font-pixel">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-pixel">
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`flex h-12 w-full border-0 ${
            errors.email ? "pixel-borders-destructive" : "pixel-borders-thin"
          } bg-background px-4 py-2 text-sm font-pixel placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
          placeholder="YOUR EMAIL"
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-xs text-destructive mt-1 font-pixel">{errors.email}</p>}
      </div>

      {/* Honeypot field - hidden from humans but visible to bots */}
      <div className="absolute opacity-0 -z-10 h-0 w-0 overflow-hidden pointer-events-none">
        <label htmlFor="website" className="text-sm font-pixel">
          WEBSITE (LEAVE THIS EMPTY)
        </label>
        <input
          id="website"
          name="website"
          type="text"
          value={formData.website}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-pixel">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`flex min-h-[120px] w-full border-0 ${
            errors.message ? "pixel-borders-destructive" : "pixel-borders-thin"
          } bg-background px-4 py-2 text-sm font-pixel placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
          placeholder="YOUR MESSAGE"
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-xs text-destructive mt-1 font-pixel">{errors.message}</p>}
      </div>

      {/* Hidden reCAPTCHA badge - now using the dynamically loaded site key */}
      {recaptchaSiteKey && (
        <div
          className="g-recaptcha"
          data-sitekey={recaptchaSiteKey}
          data-size="invisible"
          data-callback="onRecaptchaVerify"
        ></div>
      )}

      <Button type="submit" className="w-full pixel-borders-thin font-pixel" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            SENDING...
          </>
        ) : formStatus === "success" ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            MESSAGE SENT
          </>
        ) : formStatus === "error" ? (
          <>
            <AlertCircle className="mr-2 h-4 w-4" />
            TRY AGAIN
          </>
        ) : (
          "SEND MESSAGE"
        )}
      </Button>
    </form>
  )
}
