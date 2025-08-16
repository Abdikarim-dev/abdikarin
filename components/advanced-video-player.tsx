"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useRef, useState, useEffect } from "react"

interface VideoSource {
  src: string
  type: string
}

interface VideoPlayerProps {
  videoSources: VideoSource[]
  poster?: string
  title?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

export function AdvancedVideoPlayer({
  videoSources,
  poster,
  title,
  className,
  autoPlay = false,
  loop = false,
  muted = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  
  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement)
      setIsFullscreen(isCurrentlyFullscreen)
    }

    const events = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"]
    events.forEach(event => document.addEventListener(event, handleFullscreenChange))

    return () => {
      events.forEach(event => document.removeEventListener(event, handleFullscreenChange))
    }
  }, [])
  
  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    
    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(err => console.error("Error playing video:", err))
    }
  }
  
  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    
    video.muted = !video.muted
    setIsMuted(video.muted)
  }
  
  // Toggle fullscreen
  const toggleFullscreen = async () => {
    const container = containerRef.current
    if (!container) return

    try {
      if (!isFullscreen) {
        if (container.requestFullscreen) {
          await container.requestFullscreen()
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen()
        } else if ((container as any).mozRequestFullScreen) {
          await (container as any).mozRequestFullScreen()
        } else if ((container as any).msRequestFullscreen) {
          await (container as any).msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
      }
    } catch (error) {
      console.error("Fullscreen toggle failed:", error)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-72 bg-black rounded-lg overflow-hidden",
        isFullscreen && "!fixed !inset-0 !rounded-none z-50",
        className
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={() => setIsMuted(videoRef.current?.muted || false)}
      >
        {videoSources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        <p className="text-white">Your browser does not support the video tag.</p>
      </video>

      {/* Controls Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          size="icon"
          variant="ghost"
          onClick={togglePlay}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full h-16 w-16"
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        </Button>
      </div>
      
      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-black/60 p-2 flex justify-between items-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={togglePlay}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleFullscreen}
          className="text-white hover:bg-white/20 h-8 w-8"
        >
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
