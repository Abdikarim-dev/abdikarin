"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, ThumbsUp } from "lucide-react"

// Import the video data
import { documentaryVideos } from "../data"

export default function DocumentaryVideoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [video, setVideo] = useState<any>(null)
  const [relatedVideos, setRelatedVideos] = useState<any[]>([])

  useEffect(() => {
    // Find the video by ID
    const videoId = Number.parseInt(params.id)
    const foundVideo = documentaryVideos.find((v) => v.id === videoId)

    if (!foundVideo) {
      router.push("/videos/documentary")
      return
    }

    setVideo(foundVideo)

    // Find related videos (same category)
    const related = documentaryVideos
      .filter((v) => v.id !== videoId && v.categories.some((cat) => foundVideo.categories.includes(cat)))
      .slice(0, 3)

    setRelatedVideos(related)
  }, [params.id, router])

  if (!video) {
    return (
      <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16 text-center">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/videos/documentary" className="text-white/70 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Videos
          </Link>
        </Button>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FadeIn>
            <div className="aspect-video relative mb-4">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.embedId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-md"
              ></iframe>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>

            <div className="flex flex-wrap justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.uploadDate}</span>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {video.categories.map((category: string) => (
                <Badge key={category} className="bg-purple-600">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>

            <Card className="bg-white/5 border-white/10 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center">
                    <span className="text-white font-medium">{video.channel.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{video.channel}</h3>
                  </div>
                </div>
                <p className="text-white/70">{video.description}</p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        <div className="lg:col-span-1">
          <FadeIn delay={0.2}>
            <h2 className="text-xl font-bold text-white mb-4">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <Link key={relatedVideo.id} href={`/videos/documentary/${relatedVideo.id}`}>
                  <Card className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-colors">
                    <div className="flex">
                      <div className="w-1/3">
                        <div className="aspect-video relative">
                          <img
                            src={`https://img.youtube.com/vi/${relatedVideo.embedId}/mqdefault.jpg`}
                            alt={relatedVideo.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="w-2/3 p-3">
                        <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">{relatedVideo.title}</h3>
                        <p className="text-white/50 text-xs">
                          {relatedVideo.views} views • {relatedVideo.uploadDate}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
