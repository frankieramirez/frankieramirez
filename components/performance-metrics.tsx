"use client"

import { useEffect, useState } from "react"

// This component logs Core Web Vitals metrics to help with performance monitoring
export function PerformanceMetrics() {
  const [visible, setVisible] = useState(false)
  const [metrics, setMetrics] = useState<Record<string, number>>({})

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== "development") return

    // Check if the browser supports the Web Vitals API
    if (!("PerformanceObserver" in window)) return

    try {
      // Create a performance observer for LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          setMetrics((prev) => ({ ...prev, lcp: Math.round(lastEntry.startTime) }))
        }
      })
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

      // Create a performance observer for FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const firstEntry = entries[0]
        if (firstEntry) {
          setMetrics((prev) => ({ ...prev, fid: Math.round(firstEntry.processingStart - firstEntry.startTime) }))
        }
      })
      fidObserver.observe({ type: "first-input", buffered: true })

      // Create a performance observer for CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        setMetrics((prev) => ({ ...prev, cls: Math.round(clsValue * 1000) / 1000 }))
      })
      clsObserver.observe({ type: "layout-shift", buffered: true })

      // Cleanup
      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    } catch (error) {
      console.error("Error setting up performance observers:", error)
    }
  }, [])

  // Toggle visibility of metrics panel
  const toggleVisibility = () => setVisible(!visible)

  if (process.env.NODE_ENV !== "development") return null

  return (
    <>
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded-full shadow-lg"
        aria-label="Toggle performance metrics"
      >
        📊
      </button>
      {visible && (
        <div className="fixed bottom-16 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-lg text-sm">
          <h3 className="font-bold mb-2">Core Web Vitals</h3>
          <ul>
            <li>LCP: {metrics.lcp ? `${metrics.lcp}ms` : "Measuring..."}</li>
            <li>FID: {metrics.fid ? `${metrics.fid}ms` : "Waiting for input..."}</li>
            <li>CLS: {metrics.cls !== undefined ? metrics.cls : "Measuring..."}</li>
          </ul>
        </div>
      )}
    </>
  )
}
