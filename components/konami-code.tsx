"use client"

import { useEffect, useState } from "react"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

interface KonamiCodeProps {
  onUnlock: () => void
}

export function KonamiCode({ onUnlock }: KonamiCodeProps) {
  const [input, setInput] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Get the key code
      const key = e.code

      // Add the key to the input array
      const newInput = [...input, key]

      // Only keep the last N keys where N is the length of the Konami code
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift()
      }

      setInput(newInput)

      // Check if the input matches the Konami code
      const isKonamiCode = newInput.length === KONAMI_CODE.length && newInput.every((key, i) => key === KONAMI_CODE[i])

      if (isKonamiCode) {
        onUnlock()
        // Reset the input
        setInput([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [input, onUnlock])

  return null
}
