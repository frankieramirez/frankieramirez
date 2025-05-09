"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToSection() {
  const pathname = usePathname()

  useEffect(() => {
    // Check if there's a hash in the URL when the page loads
    if (window.location.hash) {
      // Get the target element
      const targetId = window.location.hash.substring(1)
      const targetElement = document.getElementById(targetId)

      // If the target element exists, scroll to it with a slight delay
      // to ensure all content is loaded
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }

    // Handle clicks on anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (anchor && anchor.hash && anchor.href.includes(window.location.pathname)) {
        e.preventDefault()

        const targetId = anchor.hash.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Update URL without causing a page reload
          window.history.pushState({}, "", anchor.hash)

          // Scroll to the target element
          targetElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    // Add event listener
    document.addEventListener("click", handleAnchorClick)

    // Clean up
    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [pathname])

  return null
}
