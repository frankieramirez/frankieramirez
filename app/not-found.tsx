import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="text-center space-y-8 max-w-md">
        <div className="inline-block p-2 bg-primary mb-6 mx-auto">
          <div className="bg-background p-2">
            <span className="text-sm font-pixel">404 ERROR</span>
          </div>
        </div>

        <h1 className="text-4xl font-pixel text-primary">PAGE NOT FOUND</h1>

        <p className="text-muted-foreground font-pixel text-sm">
          THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST OR HAS BEEN MOVED.
        </p>

        <div className="pt-8">
          <Link href="/">
            <Button className="font-pixel pixel-borders-thin">RETURN HOME</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
