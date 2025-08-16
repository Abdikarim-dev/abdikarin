"use client";

import { AdvancedVideoPlayer } from "@/components/advanced-video-player";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { useState } from "react";

// Define the video collection with Cloudinary URLs
const videoCollection = [
  {
    id: 1,
    videoSources: {
      src: "/videos/soderma_1.mp4",
      type: "video/mp4"
    },
    poster: "https://res.cloudinary.com/dxrpcnsyf/video/upload/so_5/f_auto,q_auto/v1748559156/abdikarin-portfolio/videos/soderma_2_x2bwvt.jpg"
  },
  {
    id: 2,
    videoSources: {
      src: "https://res.cloudinary.com/dxrpcnsyf/video/upload/f_auto,q_auto,vc_auto/v1748559168/abdikarin-portfolio/videos/soderma_1_cnidzl.mp4",
      type: "video/mp4"
    },
    poster: "https://res.cloudinary.com/dxrpcnsyf/video/upload/so_3/f_auto,q_auto/v1748559168/abdikarin-portfolio/videos/soderma_1_cnidzl.jpg",
    title: "Soderma Video 2"
  },
  // {
  //   id: 3,
  //   videoSources: {
  //     src: "/videos/punt.mp4",
  //     type: "video/mp4"
  //   },
  //   poster: "https://res.cloudinary.com/dxrpcnsyf/video/upload/so_3/f_auto,q_auto/v1748559168/abdikarin-portfolio/videos/afarta-madhab_zojmif.jpg",
  //   title: "Afarta Madhab"
  // },
];

export default function VideoProductionPage() {
  const [filteredVideos] = useState(videoCollection);

  return (
    <div className="max-w-[80rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Video Production
          </h1>
          <p className="text-white/70 max-w-3xl mx-auto">
            Professional video content showcasing documentaries, promotional
            materials, and educational content created with industry-standard
            editing techniques and storytelling approaches.
          </p>
        </div>
      </FadeIn>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredVideos.map((video) => (
          <FadeIn key={video.id}>
            <Card className="bg-white/5 border-white/10 overflow-hidden h-full">
              <div className="p-2">
                <AdvancedVideoPlayer
                  videoSources={[video.videoSources]}
                  poster={video.poster}
                  className="w-full aspect-video rounded-lg"
                />
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Production Information */}
      {/* <FadeIn delay={0.3}>
        <Card className="bg-white/5 border-white/10 mt-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Video Production Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-400"
                  >
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  Documentary Production
                </h3>
                <p className="text-white/70 text-sm">
                  Professional documentary creation with compelling
                  storytelling, expert interviews, and high-quality production
                  values.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-400"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  Educational Content
                </h3>
                <p className="text-white/70 text-sm">
                  Engaging educational videos that simplify complex topics and
                  make learning accessible and enjoyable for all audiences.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-400"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  Promotional Videos
                </h3>
                <p className="text-white/70 text-sm">
                  Dynamic promotional content that effectively communicates your
                  brand message and drives audience engagement and action.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-xl font-medium text-white mb-4 text-center">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="text-white font-medium mb-2">Video Quality</h4>
                  <ul className="text-white/70 space-y-1">
                    <li>• 4K Ultra HD (3840x2160) resolution</li>
                    <li>• 60fps for smooth motion</li>
                    <li>• Professional color grading</li>
                    <li>• HDR support for enhanced visuals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Audio Quality</h4>
                  <ul className="text-white/70 space-y-1">
                    <li>• 48kHz/24-bit audio recording</li>
                    <li>• Professional noise reduction</li>
                    <li>• Multi-channel audio mixing</li>
                    <li>• Custom music composition</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn> */}
    </div>
  );
}
