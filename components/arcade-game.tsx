"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface GameProps {
  isOpen: boolean
  onClose: () => void
}

export function ArcadeGame({ isOpen, onClose }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameStarted, setGameStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const gameLoopRef = useRef<number | null>(null)

  // Game state
  const gameStateRef = useRef({
    player: {
      x: 0,
      y: 0,
      width: 30,
      height: 15,
      speed: 5,
      color: "#00ff00",
      isMovingLeft: false,
      isMovingRight: false,
      isShooting: false,
    },
    bullets: [] as { x: number; y: number; width: number; height: number; speed: number }[],
    enemies: [] as { x: number; y: number; width: number; height: number; speed: number; color: string }[],
    enemyBullets: [] as { x: number; y: number; width: number; height: number; speed: number }[],
    lastEnemyBulletTime: 0,
    enemyDirection: 1,
    enemyMoveDownCounter: 0,
    gameWidth: 0,
    gameHeight: 0,
  })

  // Initialize game
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      // Make the game take up most of the screen but maintain aspect ratio
      const maxWidth = Math.min(window.innerWidth * 0.9, 800)
      const maxHeight = Math.min(window.innerHeight * 0.8, 600)

      // Maintain a 4:3 aspect ratio
      const aspectRatio = 4 / 3
      let width = maxWidth
      let height = width / aspectRatio

      if (height > maxHeight) {
        height = maxHeight
        width = height * aspectRatio
      }

      canvas.width = width
      canvas.height = height

      // Update game state with new dimensions
      gameStateRef.current.gameWidth = width
      gameStateRef.current.gameHeight = height

      // Reset player position
      gameStateRef.current.player.x = width / 2 - gameStateRef.current.player.width / 2
      gameStateRef.current.player.y = height - gameStateRef.current.player.height - 20

      // Initialize enemies if not already done
      if (gameStateRef.current.enemies.length === 0) {
        initializeEnemies()
      }
    }

    // Initialize enemies
    const initializeEnemies = () => {
      const { gameWidth } = gameStateRef.current
      const enemies = []
      const rows = 3
      const cols = 8
      const enemyWidth = 25
      const enemyHeight = 15
      const padding = 15
      const startX = (gameWidth - cols * (enemyWidth + padding)) / 2

      const colors = ["#ff0000", "#ff00ff", "#00ffff"]

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          enemies.push({
            x: startX + col * (enemyWidth + padding),
            y: 50 + row * (enemyHeight + padding),
            width: enemyWidth,
            height: enemyHeight,
            speed: 1,
            color: colors[row % colors.length],
          })
        }
      }

      gameStateRef.current.enemies = enemies
    }

    updateCanvasDimensions()
    window.addEventListener("resize", updateCanvasDimensions)

    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver || isPaused) return

      const { player } = gameStateRef.current

      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        player.isMovingLeft = true
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        player.isMovingRight = true
      }
      if (e.code === "Space" && !player.isShooting) {
        player.isShooting = true
        // Create a new bullet
        gameStateRef.current.bullets.push({
          x: player.x + player.width / 2 - 2,
          y: player.y - 10,
          width: 4,
          height: 10,
          speed: 7,
        })

        // Play shoot sound
        playSound("shoot")
      }
      if (e.code === "Escape") {
        togglePause()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const { player } = gameStateRef.current

      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        player.isMovingLeft = false
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        player.isMovingRight = false
      }
      if (e.code === "Space") {
        player.isShooting = false
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Sound effects
    const sounds = {
      shoot: new Audio(),
      explosion: new Audio(),
      playerHit: new Audio(),
    }

    // Create simple beep sounds using AudioContext
    const createBeepSound = (frequency: number, duration: number): ArrayBuffer => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const sampleRate = audioContext.sampleRate
      const numSamples = Math.floor(duration * sampleRate)
      const buffer = audioContext.createBuffer(1, numSamples, sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate
        data[i] = Math.sin(2 * Math.PI * frequency * t) * 0.5
      }

      // Convert AudioBuffer to ArrayBuffer
      const offlineContext = new OfflineAudioContext(1, numSamples, sampleRate)
      const source = offlineContext.createBufferSource()
      source.buffer = buffer
      source.connect(offlineContext.destination)
      source.start(0)

      return offlineContext.startRendering()
    }

    // Initialize sounds
    const initSounds = async () => {
      try {
        const shootBuffer = await createBeepSound(880, 0.1)
        const explosionBuffer = await createBeepSound(220, 0.3)
        const playerHitBuffer = await createBeepSound(440, 0.2)

        sounds.shoot.src = URL.createObjectURL(new Blob([shootBuffer], { type: "audio/wav" }))
        sounds.explosion.src = URL.createObjectURL(new Blob([explosionBuffer], { type: "audio/wav" }))
        sounds.playerHit.src = URL.createObjectURL(new Blob([playerHitBuffer], { type: "audio/wav" }))
      } catch (error) {
        console.error("Failed to initialize sounds:", error)
      }
    }

    initSounds()

    const playSound = (soundName: keyof typeof sounds) => {
      try {
        const sound = sounds[soundName]
        sound.currentTime = 0
        sound.play().catch((err) => console.error("Error playing sound:", err))
      } catch (error) {
        console.error("Error playing sound:", error)
      }
    }

    // Game loop
    const gameLoop = () => {
      if (!gameStarted || gameOver || isPaused) {
        gameLoopRef.current = requestAnimationFrame(gameLoop)
        return
      }

      const { player, bullets, enemies, enemyBullets, gameWidth, gameHeight, enemyDirection } = gameStateRef.current

      // Clear canvas
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, gameWidth, gameHeight)

      // Draw starfield background
      drawStarfield(ctx, gameWidth, gameHeight)

      // Update player position
      if (player.isMovingLeft) {
        player.x = Math.max(0, player.x - player.speed)
      }
      if (player.isMovingRight) {
        player.x = Math.min(gameWidth - player.width, player.x + player.speed)
      }

      // Draw player
      ctx.fillStyle = player.color
      ctx.fillRect(player.x, player.y, player.width, player.height)
      // Draw player cannon
      ctx.fillRect(player.x + player.width / 2 - 2, player.y - 5, 4, 5)

      // Update and draw bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i]
        bullet.y -= bullet.speed

        // Remove bullets that go off screen
        if (bullet.y < 0) {
          bullets.splice(i, 1)
          continue
        }

        // Draw bullet
        ctx.fillStyle = "#fff"
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)

        // Check for collisions with enemies
        for (let j = enemies.length - 1; j >= 0; j--) {
          const enemy = enemies[j]
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            // Collision detected
            bullets.splice(i, 1)
            enemies.splice(j, 1)
            setScore((prevScore) => prevScore + 10)
            playSound("explosion")
            break
          }
        }
      }

      // Update enemy movement
      let moveEnemiesDown = false
      let maxEnemyX = 0
      let minEnemyX = gameWidth

      for (const enemy of enemies) {
        if (enemy.x + enemy.width > maxEnemyX) maxEnemyX = enemy.x + enemy.width
        if (enemy.x < minEnemyX) minEnemyX = enemy.x
      }

      // Check if enemies hit the edge of the screen
      if ((maxEnemyX >= gameWidth && enemyDirection > 0) || (minEnemyX <= 0 && enemyDirection < 0)) {
        gameStateRef.current.enemyDirection *= -1
        moveEnemiesDown = true
      }

      // Move enemies
      for (const enemy of enemies) {
        enemy.x += enemy.speed * enemyDirection

        // Only move enemies down a small amount when they hit the edge
        if (moveEnemiesDown) {
          enemy.y += 10 // Reduced from 15 to 10 for more gradual descent
        }

        // Draw enemy
        ctx.fillStyle = enemy.color
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)

        // Check if enemies reached the bottom - add some margin before game over
        if (enemy.y + enemy.height >= player.y - 20) {
          setGameOver(true)
          break
        }
      }

      // Enemy shooting
      if (enemies.length > 0 && Math.random() < 0.02) {
        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]
        enemyBullets.push({
          x: randomEnemy.x + randomEnemy.width / 2 - 2,
          y: randomEnemy.y + randomEnemy.height,
          width: 4,
          height: 10,
          speed: 3,
        })
      }

      // Update and draw enemy bullets
      for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const bullet = enemyBullets[i]
        bullet.y += bullet.speed

        // Remove bullets that go off screen
        if (bullet.y > gameHeight) {
          enemyBullets.splice(i, 1)
          continue
        }

        // Draw bullet
        ctx.fillStyle = "#ff0000"
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)

        // Check for collisions with player
        if (
          bullet.x < player.x + player.width &&
          bullet.x + bullet.width > player.x &&
          bullet.y < player.y + player.height &&
          bullet.y + bullet.height > player.y
        ) {
          // Collision detected
          enemyBullets.splice(i, 1)
          setLives((prevLives) => {
            if (prevLives <= 1) {
              setGameOver(true)
              return 0
            }
            playSound("playerHit")
            return prevLives - 1
          })
          break
        }
      }

      // Check if all enemies are destroyed
      if (enemies.length === 0) {
        // Level complete, create new enemies with increased speed
        const newEnemies = []
        const rows = 3
        const cols = 8
        const enemyWidth = 25
        const enemyHeight = 15
        const padding = 15
        const startX = (gameWidth - cols * (enemyWidth + padding)) / 2

        const colors = ["#ff0000", "#ff00ff", "#00ffff"]
        const currentSpeed =
          gameStateRef.current.enemies.length > 0
            ? gameStateRef.current.enemies[0].speed + 0.2 // Reduced from 0.5 to 0.2
            : 1.5

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            newEnemies.push({
              x: startX + col * (enemyWidth + padding),
              y: 50 + row * (enemyHeight + padding),
              width: enemyWidth,
              height: enemyHeight,
              speed: currentSpeed,
              color: colors[row % colors.length],
            })
          }
        }

        gameStateRef.current.enemies = newEnemies
      }

      // Draw score and lives
      ctx.fillStyle = "#00ff00"
      ctx.font = "16px 'Press Start 2P', monospace"
      ctx.textAlign = "left"
      ctx.fillText(`SCORE: ${score}`, 10, 20)

      ctx.textAlign = "right"
      ctx.fillText(`LIVES: ${lives}`, gameWidth - 10, 20)

      // Continue the game loop
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    // Draw starfield background
    const drawStarfield = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Create a starfield effect
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = Math.random() * 2
        const brightness = Math.random()

        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
        ctx.fillRect(x, y, size, size)
      }
    }

    // Toggle pause
    const togglePause = () => {
      setIsPaused((prev) => !prev)
    }

    // Start the game loop
    gameLoopRef.current = requestAnimationFrame(gameLoop)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasDimensions)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }

      // Clean up audio URLs
      Object.values(sounds).forEach((sound) => {
        if (sound.src.startsWith("blob:")) {
          URL.revokeObjectURL(sound.src)
        }
      })
    }
  }, [isOpen, gameStarted, gameOver, isPaused])

  // Handle game restart
  const handleRestart = () => {
    // Reset game state
    gameStateRef.current.bullets = []
    gameStateRef.current.enemyBullets = []
    gameStateRef.current.enemies = []
    gameStateRef.current.player.x = gameStateRef.current.gameWidth / 2 - gameStateRef.current.player.width / 2

    // Reset game variables
    setScore(0)
    setLives(3)
    setGameOver(false)
    setGameStarted(true)
    setIsPaused(false)
  }

  // Handle game start
  const handleStart = () => {
    setGameStarted(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative bg-background p-4 rounded-none pixel-borders max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-pixel text-primary">SPACE INVADERS</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="pixel-borders-thin">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
          {!gameStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
              <h3 className="text-2xl font-pixel text-primary mb-8">SPACE INVADERS</h3>
              <div className="space-y-4 text-center mb-8">
                <p className="font-pixel text-sm">USE ARROW KEYS OR A/D TO MOVE</p>
                <p className="font-pixel text-sm">PRESS SPACE TO SHOOT</p>
                <p className="font-pixel text-sm">PRESS ESC TO PAUSE</p>
              </div>
              <Button onClick={handleStart} className="font-pixel pixel-borders-thin">
                START GAME
              </Button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
              <h3 className="text-2xl font-pixel text-destructive mb-4">GAME OVER</h3>
              <p className="font-pixel text-lg mb-8">FINAL SCORE: {score}</p>
              <Button onClick={handleRestart} className="font-pixel pixel-borders-thin">
                PLAY AGAIN
              </Button>
            </div>
          )}

          {isPaused && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
              <h3 className="text-2xl font-pixel text-primary mb-8">PAUSED</h3>
              <Button onClick={() => setIsPaused(false)} className="font-pixel pixel-borders-thin">
                RESUME
              </Button>
            </div>
          )}

          <canvas ref={canvasRef} className="bg-black pixel-borders w-full h-full object-contain" />
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs font-pixel text-muted-foreground">PRESS ESC TO PAUSE/RESUME</p>
        </div>
      </div>
    </div>
  )
}
