"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, RefreshCw } from "lucide-react"

export function VideoDebugPanel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoState, setVideoState] = useState({
    readyState: 0,
    networkState: 0,
    currentTime: 0,
    duration: 0,
    paused: true,
    ended: false,
    muted: true,
    volume: 1,
  })
  const [autoplayLogs, setAutoplayLogs] = useState<string[]>([])
  const [layoutInfo, setLayoutInfo] = useState({
    containerWidth: 0,
    containerHeight: 0,
    videoWidth: 0,
    videoHeight: 0,
    controlsVisible: true,
  })

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setAutoplayLogs((prev) => [...prev.slice(-9), `${timestamp}: ${message}`])
  }

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    // Update layout info
    const updateLayoutInfo = () => {
      setLayoutInfo({
        containerWidth: container.offsetWidth,
        containerHeight: container.offsetHeight,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        controlsVisible: true,
      })
    }

    // Video event handlers
    const handleLoadStart = () => addLog("Load start")
    const handleLoadedMetadata = () => addLog("Metadata loaded")
    const handleLoadedData = () => addLog("Data loaded")
    const handleCanPlay = () => addLog("Can play")
    const handleCanPlayThrough = () => addLog("Can play through")
    const handlePlay = () => {
      addLog("Play event fired")
      setIsPlaying(true)
    }
    const handlePause = () => {
      addLog("Pause event fired")
      setIsPlaying(false)
    }
    const handleError = (e: Event) => {
      const error = (e.target as HTMLVideoElement).error
      addLog(`Error: ${error?.message || "Unknown error"}`)
    }
    const handleTimeUpdate = () => {
      setVideoState((prev) => ({
        ...prev,
        currentTime: video.currentTime,
        duration: video.duration || 0,
      }))
    }

    // Add all event listeners
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("canplaythrough", handleCanPlayThrough)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)
    video.addEventListener("timeupdate", handleTimeUpdate)

    // Update video state periodically
    const stateInterval = setInterval(() => {
      setVideoState({
        readyState: video.readyState,
        networkState: video.networkState,
        currentTime: video.currentTime,
        duration: video.duration || 0,
        paused: video.paused,
        ended: video.ended,
        muted: video.muted,
        volume: video.volume,
      })
    }, 500)

    // Update layout info on resize
    window.addEventListener("resize", updateLayoutInfo)
    updateLayoutInfo()

    return () => {
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("canplaythrough", handleCanPlayThrough)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      window.removeEventListener("resize", updateLayoutInfo)
      clearInterval(stateInterval)
    }
  }, [])

  const testAutoplay = async () => {
    const video = videoRef.current
    if (!video) return

    addLog("Testing autoplay...")
    try {
      video.muted = true
      video.currentTime = 0
      await video.play()
      addLog("✅ Autoplay successful")
    } catch (error) {
      addLog(`❌ Autoplay failed: ${error}`)
    }
  }

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (video.paused) {
        await video.play()
      } else {
        video.pause()
      }
    } catch (error) {
      addLog(`Play/pause error: ${error}`)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const getReadyStateText = (state: number) => {
    const states = ["HAVE_NOTHING", "HAVE_METADATA", "HAVE_CURRENT_DATA", "HAVE_FUTURE_DATA", "HAVE_ENOUGH_DATA"]
    return states[state] || "UNKNOWN"
  }

  const getNetworkStateText = (state: number) => {
    const states = ["NETWORK_EMPTY", "NETWORK_IDLE", "NETWORK_LOADING", "NETWORK_NO_SOURCE"]
    return states[state] || "UNKNOWN"
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Video Debug Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Video with Debug Controls */}
          <div ref={containerRef} className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              loop
              muted={isMuted}
              preload="metadata"
            >
              <source src="/videos/afarta-madhab.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Debug Controls Overlay */}
            <div className="absolute inset-0">
              {/* Top section */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <Badge className="bg-purple-600">Debug Video</Badge>
              </div>

              {/* Bottom section with controls */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    {/* Left controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={togglePlay}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={toggleMute}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={testAutoplay}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Right maximize button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Debug Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Video State */}
            <Card className="bg-white/5">
              <CardHeader>
                <CardTitle className="text-white text-sm">Video State</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Ready State:</span>
                  <Badge variant="outline" className="text-xs">
                    {getReadyStateText(videoState.readyState)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Network State:</span>
                  <Badge variant="outline" className="text-xs">
                    {getNetworkStateText(videoState.networkState)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Paused:</span>
                  <Badge variant={videoState.paused ? "destructive" : "default"} className="text-xs">
                    {videoState.paused ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Muted:</span>
                  <Badge variant={videoState.muted ? "secondary" : "default"} className="text-xs">
                    {videoState.muted ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Time:</span>
                  <span className="text-white text-xs">
                    {videoState.currentTime.toFixed(1)}s / {videoState.duration.toFixed(1)}s
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Layout Information */}
            <Card className="bg-white/5">
              <CardHeader>
                <CardTitle className="text-white text-sm">Layout Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Container:</span>
                  <span className="text-white">
                    {layoutInfo.containerWidth} × {layoutInfo.containerHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Video:</span>
                  <span className="text-white">
                    {layoutInfo.videoWidth} × {layoutInfo.videoHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Controls:</span>
                  <Badge variant={layoutInfo.controlsVisible ? "default" : "destructive"} className="text-xs">
                    {layoutInfo.controlsVisible ? "Visible" : "Hidden"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Browser Info */}
            <Card className="bg-white/5">
              <CardHeader>
                <CardTitle className="text-white text-sm">Browser Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">User Agent:</span>
                  <span className="text-white text-right text-xs max-w-32 truncate">
                    {navigator.userAgent.split(" ")[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Autoplay Policy:</span>
                  <Badge variant="secondary" className="text-xs">
                    Restricted
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Autoplay Logs */}
          <Card className="bg-white/5">
            <CardHeader>
              <CardTitle className="text-white text-sm">Autoplay Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/50 rounded p-3 max-h-40 overflow-y-auto">
                {autoplayLogs.length === 0 ? (
                  <p className="text-white/50 text-xs">No logs yet...</p>
                ) : (
                  autoplayLogs.map((log, index) => (
                    <p key={index} className="text-white/80 text-xs font-mono mb-1">
                      {log}
                    </p>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
