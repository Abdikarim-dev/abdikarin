"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Maximize, Play, Pause, Volume2, VolumeX, CheckCircle, XCircle } from "lucide-react"

interface BrowserSupport {
  fullscreenAPI: boolean
  requestFullscreen: boolean
  exitFullscreen: boolean
  fullscreenElement: boolean
  fullscreenEnabled: boolean
}

export function VideoFullscreenTest() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [browserSupport, setBrowserSupport] = useState<BrowserSupport>({
    fullscreenAPI: false,
    requestFullscreen: false,
    exitFullscreen: false,
    fullscreenElement: false,
    fullscreenEnabled: false,
  })
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    // Check browser support
    const support: BrowserSupport = {
      fullscreenAPI: !!(document.fullscreenEnabled || (document as any).webkitFullscreenEnabled),
      requestFullscreen: !!(
        Element.prototype.requestFullscreen ||
        (Element.prototype as any).webkitRequestFullscreen ||
        (Element.prototype as any).mozRequestFullScreen ||
        (Element.prototype as any).msRequestFullscreen
      ),
      exitFullscreen: !!(
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).mozCancelFullScreen ||
        (document as any).msExitFullscreen
      ),
      fullscreenElement: !!(
        "fullscreenElement" in document ||
        "webkitFullscreenElement" in document ||
        "mozFullScreenElement" in document ||
        "msFullscreenElement" in document
      ),
      fullscreenEnabled: !!(document.fullscreenEnabled !== undefined),
    }

    setBrowserSupport(support)

    // Add test result
    const userAgent = navigator.userAgent
    let browserName = "Unknown"
    if (userAgent.includes("Chrome")) browserName = "Chrome"
    else if (userAgent.includes("Firefox")) browserName = "Firefox"
    else if (userAgent.includes("Safari")) browserName = "Safari"
    else if (userAgent.includes("Edge")) browserName = "Edge"

    setTestResults([
      `Browser: ${browserName}`,
      `User Agent: ${userAgent}`,
      `Screen: ${screen.width}x${screen.height}`,
      `Viewport: ${window.innerWidth}x${window.innerHeight}`,
    ])

    // Fullscreen change listeners
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch(console.error)
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const enterFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen()
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        await (containerRef.current as any).webkitRequestFullscreen()
      } else if ((containerRef.current as any).mozRequestFullScreen) {
        await (containerRef.current as any).mozRequestFullScreen()
      } else if ((containerRef.current as any).msRequestFullscreen) {
        await (containerRef.current as any).msRequestFullscreen()
      }
    } catch (error) {
      console.error("Fullscreen failed:", error)
      alert(`Fullscreen failed: ${error}`)
    }
  }

  const SupportIcon = ({ supported }: { supported: boolean }) =>
    supported ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Fullscreen Video Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Test Video */}
          <div
            ref={containerRef}
            className={`relative aspect-video bg-black rounded-lg overflow-hidden ${
              isFullscreen ? "flex items-center justify-center" : ""
            }`}
          >
            <video
              ref={videoRef}
              className={`${isFullscreen ? "max-w-full max-h-full object-contain" : "w-full h-full object-cover"}`}
              playsInline
              loop
              muted={isMuted}
            >
              <source src="/videos/afarta-madhab.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={togglePlay} className="bg-black/50 text-white">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={toggleMute} className="bg-black/50 text-white">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              <Button size="icon" variant="ghost" onClick={enterFullscreen} className="bg-black/50 text-white">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>

            {isFullscreen && (
              <div className="absolute top-4 left-4 bg-black/70 rounded p-2 text-white text-sm">
                <p>✅ Fullscreen Active</p>
                <p>Press ESC to exit</p>
              </div>
            )}
          </div>

          {/* Browser Support Status */}
          <Card className="bg-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Browser Support Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white">Fullscreen API Enabled</span>
                <div className="flex items-center gap-2">
                  <SupportIcon supported={browserSupport.fullscreenAPI} />
                  <Badge variant={browserSupport.fullscreenAPI ? "default" : "destructive"}>
                    {browserSupport.fullscreenAPI ? "Supported" : "Not Supported"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white">Request Fullscreen</span>
                <div className="flex items-center gap-2">
                  <SupportIcon supported={browserSupport.requestFullscreen} />
                  <Badge variant={browserSupport.requestFullscreen ? "default" : "destructive"}>
                    {browserSupport.requestFullscreen ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white">Exit Fullscreen</span>
                <div className="flex items-center gap-2">
                  <SupportIcon supported={browserSupport.exitFullscreen} />
                  <Badge variant={browserSupport.exitFullscreen ? "default" : "destructive"}>
                    {browserSupport.exitFullscreen ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white">Fullscreen Element Detection</span>
                <div className="flex items-center gap-2">
                  <SupportIcon supported={browserSupport.fullscreenElement} />
                  <Badge variant={browserSupport.fullscreenElement ? "default" : "destructive"}>
                    {browserSupport.fullscreenElement ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card className="bg-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Test Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <p key={index} className="text-white/70 text-sm font-mono">
                    {result}
                  </p>
                ))}
                <p className="text-white/70 text-sm font-mono">
                  Current State: {isFullscreen ? "Fullscreen" : "Normal"}
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
