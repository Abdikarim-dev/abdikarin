"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Maximize,
  Loader2,
  AlertCircle,
  Wifi,
  WifiOff,
} from "lucide-react"

interface VideoCardProps {
  title: string
  description: string
  videoSrc: string
}

interface VideoState {
  isPlaying: boolean
  isMuted: boolean
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  isBuffering: boolean
  networkState: "online" | "offline" | "slow"
  loadProgress: number
}

const VideoCard = ({ title, description, videoSrc }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const networkCheckRef = useRef<NodeJS.Timeout | null>(null)

  // Consolidated video state
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    isMuted: true,
    isLoading: true,
    hasError: false,
    errorMessage: "",
    isBuffering: false,
    networkState: "online",
    loadProgress: 0,
  })

  // UI state
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Network monitoring - memoized to prevent recreating on every render
  const checkNetworkSpeed = useCallback(() => {
    if (!navigator.onLine) {
      setVideoState((prev) => ({ ...prev, networkState: "offline" }))
      return
    }

    const connection = (navigator as any).connection
    if (connection) {
      const effectiveType = connection.effectiveType
      const networkState = effectiveType === "2g" || effectiveType === "slow-2g" ? "slow" : "online"
      setVideoState((prev) => ({ ...prev, networkState }))
    }
  }, [])

  // Auto-hide controls - fixed dependencies
  const setControlsAutoHide = useCallback(() => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
      setControlsTimeout(null)
    }

    if (isFullscreen || isHovered) {
      const timeout = setTimeout(() => {
        if (isFullscreen && !isHovered) {
          setShowControls(false)
        }
      }, 3000)
      setControlsTimeout(timeout)
    }
  }, [isFullscreen, isHovered]) // Removed controlsTimeout from dependencies

  // Video event handlers - memoized with stable dependencies
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateVideoState = (updates: Partial<VideoState>) => {
      setVideoState((prev) => ({ ...prev, ...updates }))
    }

    const handleLoadStart = () => {
      updateVideoState({ isLoading: true, hasError: false, loadProgress: 0 })
    }

    const handleLoadedMetadata = () => {
      updateVideoState({ isLoading: false })
    }

    const handleCanPlay = async () => {
      updateVideoState({ isLoading: false, isBuffering: false })

      // Attempt autoplay with retry logic
      if (retryCount < 3) {
        try {
          video.muted = true
          video.loop = true
          await video.play()
          updateVideoState({ isPlaying: true })
          setRetryCount(0)
        } catch (error) {
          console.log(`Autoplay attempt ${retryCount + 1} failed:`, error)
          setRetryCount((prev) => prev + 1)

          // Retry after delay
          if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current)
          retryTimeoutRef.current = setTimeout(
            () => {
              if (video && retryCount < 2) {
                video.play().catch(() => {})
              }
            },
            1000 * (retryCount + 1),
          )
        }
      }
    }

    const handlePlay = () => updateVideoState({ isPlaying: true, isBuffering: false })
    const handlePause = () => updateVideoState({ isPlaying: false })
    const handleWaiting = () => updateVideoState({ isBuffering: true })
    const handlePlaying = () => updateVideoState({ isBuffering: false })
    const handleVolumeChange = () => updateVideoState({ isMuted: video.muted })

    const handleError = (e: Event) => {
      const error = (e.target as HTMLVideoElement).error
      let errorMessage = "Video failed to load"

      if (error) {
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            errorMessage = "Video loading was aborted"
            break
          case error.MEDIA_ERR_NETWORK:
            errorMessage = "Network error occurred"
            break
          case error.MEDIA_ERR_DECODE:
            errorMessage = "Video format not supported"
            break
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Video source not found"
            break
        }
      }

      updateVideoState({
        hasError: true,
        errorMessage,
        isLoading: false,
        isPlaying: false,
      })
    }

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const loadProgress = (video.buffered.end(0) / video.duration) * 100
        updateVideoState({ loadProgress })
      }
    }

    // Add event listeners
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("playing", handlePlaying)
    video.addEventListener("volumechange", handleVolumeChange)
    video.addEventListener("error", handleError)
    video.addEventListener("progress", handleProgress)

    return () => {
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("playing", handlePlaying)
      video.removeEventListener("volumechange", handleVolumeChange)
      video.removeEventListener("error", handleError)
      video.removeEventListener("progress", handleProgress)
    }
  }, [retryCount]) // Only retryCount as dependency

  // Network monitoring - separate effect with stable dependencies
  useEffect(() => {
    checkNetworkSpeed()

    const handleOnline = () => checkNetworkSpeed()
    const handleOffline = () => setVideoState((prev) => ({ ...prev, networkState: "offline" }))

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Periodic network check
    networkCheckRef.current = setInterval(checkNetworkSpeed, 30000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current)
      if (networkCheckRef.current) clearInterval(networkCheckRef.current)
    }
  }, [checkNetworkSpeed])

  // Fullscreen handling - separate effect
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)
      setShowControls(isCurrentlyFullscreen)
    }

    const events = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"]
    events.forEach((event) => document.addEventListener(event, handleFullscreenChange))

    return () => {
      events.forEach((event) => document.removeEventListener(event, handleFullscreenChange))
      if (controlsTimeout) clearTimeout(controlsTimeout)
    }
  }, []) // Empty dependency array - only run once

  // Controls auto-hide effect - separate effect with proper dependencies
  useEffect(() => {
    setControlsAutoHide()
  }, [isFullscreen, isHovered]) // Only trigger when these change

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeout) clearTimeout(controlsTimeout)
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current)
      if (networkCheckRef.current) clearInterval(networkCheckRef.current)
    }
  }, [])

  // Interaction handlers
  const togglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video || videoState.hasError) return

    try {
      if (videoState.isPlaying) {
        video.pause()
      } else {
        await video.play()
      }
    } catch (error) {
      console.error("Play/pause failed:", error)
      setVideoState((prev) => ({
        ...prev,
        hasError: true,
        errorMessage: "Playback failed",
      }))
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video || videoState.hasError) return

    video.muted = !videoState.isMuted
  }

  const enterFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const container = videoContainerRef.current
    if (!container) return

    try {
      const requestFullscreen =
        container.requestFullscreen ||
        (container as any).webkitRequestFullscreen ||
        (container as any).mozRequestFullScreen ||
        (container as any).msRequestFullscreen

      if (requestFullscreen) {
        await requestFullscreen.call(container)
      }
    } catch (error) {
      console.error("Fullscreen failed:", error)
    }
  }

  const retryVideo = () => {
    const video = videoRef.current
    if (!video) return

    setVideoState((prev) => ({
      ...prev,
      hasError: false,
      isLoading: true,
      errorMessage: "",
    }))
    setRetryCount(0)
    video.load()
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowControls(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!isFullscreen) {
      setShowControls(false)
    }
  }

  // Responsive sizing - memoized to prevent recreating
  const cardHeight = useMemo(() => {
    if (typeof window === "undefined") return "360px"
    const width = window.innerWidth
    if (width < 640) return "240px"
    if (width < 1024) return "300px"
    return "360px"
  }, [])

  return (
    <Card
      className="bg-white/5 border-white/10 overflow-hidden group transition-all duration-300 hover:bg-white/10 hover:border-white/20"
      style={{ height: cardHeight }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={videoContainerRef}
        className={`relative w-full h-full overflow-hidden ${
          isFullscreen ? "bg-black flex items-center justify-center" : ""
        }`}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className={`${
            isFullscreen ? "max-w-full max-h-full object-contain" : "w-full h-full object-cover"
          } transition-all duration-300`}
          playsInline
          muted={videoState.isMuted}
          loop
          preload="metadata"
          crossOrigin="anonymous"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading State */}
        {videoState.isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
              <div className="text-white text-sm">Loading video...</div>
              {videoState.loadProgress > 0 && (
                <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 transition-all duration-300"
                    style={{ width: `${videoState.loadProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Buffering State */}
        {videoState.isBuffering && !videoState.isLoading && (
          <div className="absolute top-4 right-4 bg-black/70 rounded-full p-2">
            <Loader2 className="h-4 w-4 text-white animate-spin" />
          </div>
        )}

        {/* Error State */}
        {videoState.hasError && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center p-6">
              <AlertCircle className="h-12 w-12 text-red-400" />
              <div className="text-white">
                <div className="font-medium mb-1">Video Error</div>
                <div className="text-sm text-white/70 mb-4">{videoState.errorMessage}</div>
                <Button onClick={retryVideo} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Retry
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Network Status Indicator */}
        {videoState.networkState !== "online" && (
          <div className="absolute top-4 left-4 bg-black/70 rounded-full p-2 flex items-center gap-2">
            {videoState.networkState === "offline" ? (
              <WifiOff className="h-4 w-4 text-red-400" />
            ) : (
              <Wifi className="h-4 w-4 text-yellow-400" />
            )}
            <span className="text-white text-xs">
              {videoState.networkState === "offline" ? "Offline" : "Slow connection"}
            </span>
          </div>
        )}

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            (showControls || isHovered) && !videoState.isLoading && !videoState.hasError
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Gradient Background for Controls */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Control Buttons */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={togglePlay}
                disabled={videoState.hasError}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 backdrop-blur-sm transition-all duration-200 hover:scale-105 disabled:opacity-50"
              >
                {videoState.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                <span className="sr-only">{videoState.isPlaying ? "Pause" : "Play"}</span>
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={toggleMute}
                disabled={videoState.hasError}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 backdrop-blur-sm transition-all duration-200 hover:scale-105 disabled:opacity-50"
              >
                {videoState.isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span className="sr-only">{videoState.isMuted ? "Unmute" : "Mute"}</span>
              </Button>
            </div>

            {/* Right Controls */}
            <Button
              size="icon"
              variant="ghost"
              onClick={enterFullscreen}
              disabled={videoState.hasError}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 backdrop-blur-sm transition-all duration-200 hover:scale-105 disabled:opacity-50"
            >
              <Maximize className="h-4 w-4" />
              <span className="sr-only">Enter fullscreen</span>
            </Button>
          </div>
        </div>

        {/* Fullscreen Instructions */}
        {isFullscreen && showControls && !videoState.hasError && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 rounded-lg p-3 text-white text-sm backdrop-blur-sm pointer-events-none">
            <p className="text-center">Press ESC to exit fullscreen</p>
          </div>
        )}
      </div>
    </Card>
  )
}

const PosterCard = ({
  title,
  imageSrc,
  link,
}: {
  title?: string
  imageSrc: string
  link: string
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Card
      className="bg-white/5 border-white/10 overflow-hidden group relative transition-all duration-300 hover:bg-white/10 hover:border-white/20"
      style={{
        height:
          typeof window !== "undefined" && window.innerWidth < 640
            ? "240px"
            : window.innerWidth < 1024
              ? "300px"
              : "360px",
      }}
    >
      {/* Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
      )}

      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title || "Design work"}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 right-4">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">View project</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export function RecentWorks() {
  return (
    <section className="pt-16 pb-32">
      <FadeIn>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Recent Works</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A showcase of my latest projects in video editing and graphic design
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* First Video Card */}
        <FadeIn delay={0.1}>
          <VideoCard
            title="Somalia Oil Production Documentary"
            description="An exploration of Somalia's oil production with Turkey and the distribution of benefits."
            videoSrc="/videos/afarta-madhab.mp4"
          />
        </FadeIn>

        {/* Poster Card */}
        <FadeIn delay={0.2}>
          <PosterCard
            title="Waaberi Academy Skills Promotion"
            imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/021.jpg-76JzIOAOqzGX5UdtFanHXBCf5VfyvY.jpeg"
            link="/designs"
          />
        </FadeIn>

        {/* Second Video Card */}
        <FadeIn delay={0.3}>
          <VideoCard
            title="Geopolitical Documentary"
            description="Documentary about geopolitical interests and regional dynamics."
            videoSrc="/videos/punt.mp4"
          />
        </FadeIn>
      </div>

      <FadeIn delay={0.4}>
        <div className="text-center mt-8">
          <Link
            href="/videos/documentary"
            className="px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors inline-flex items-center"
          >
            View All Works
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}
