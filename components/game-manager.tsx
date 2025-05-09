"use client"

import { useState } from "react"
import { KonamiCode } from "./konami-code"
import { ArcadeGame } from "./arcade-game"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function GameManager() {
  const [isGameOpen, setIsGameOpen] = useState(false)

  const handleKonamiCode = () => {
    // Open the game immediately when Konami code is entered
    setIsGameOpen(true)

    // Also show a toast notification
    toast({
      title: "KONAMI CODE ACTIVATED!",
      description: "You've unlocked the secret arcade game!",
      action: <ToastAction altText="Close">CLOSE</ToastAction>,
    })
  }

  return (
    <>
      <KonamiCode onUnlock={handleKonamiCode} />
      <ArcadeGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  )
}
