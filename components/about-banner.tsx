"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

export function AboutBanner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mb-12">
      {/* Geometric shapes background */}
      <div className="absolute inset-0 z-0">
        {/* Main rectangle */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-800/30"
          style={{
            transition: "opacity 1s ease-out",
            opacity: isLoaded ? 1 : 0,
          }}
        />

        {/* Triangle 1 - Top left */}
        <div
          className="absolute top-0 left-0 w-[40%] h-[60%]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
            background:
              "linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(168, 85, 247, 0.1) 100%)",
            transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
            transform: isLoaded ? "translateX(0)" : "translateX(-100%)",
            opacity: isLoaded ? 1 : 0,
          }}
        />

        {/* Triangle 2 - Bottom right */}
        <div
          className="absolute bottom-0 right-0 w-[40%] h-[60%]"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(219, 39, 119, 0.1) 100%)",
            transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
            transform: isLoaded ? "translateX(0)" : "translateX(100%)",
            opacity: isLoaded ? 1 : 0,
          }}
        />

        {/* Rectangle - Center accent */}
        <div
          className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-indigo-500/10"
          style={{
            transition:
              "transform 0.8s ease-out 0.3s, opacity 0.8s ease-out 0.3s",
            transform: isLoaded ? "rotate(-15deg)" : "rotate(0deg) scale(0.5)",
            opacity: isLoaded ? 1 : 0,
          }}
        />

        {/* Small triangle accents */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10"
            style={{
              width: `${Math.random() * 5 + 2}%`,
              height: `${Math.random() * 5 + 2}%`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.5,
              transition: `transform 1s ease-out ${
                0.5 + i * 0.1
              }s, opacity 1s ease-out ${0.5 + i * 0.1}s`,
              animation: `float ${
                Math.random() * 10 + 10
              }s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[64rem] mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <FadeIn>
              <div className="relative">
                {/* Main image with clip path */}
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <Image
                    src="/images/profile-gradient.jpg"
                    alt="Abdikarin Ali Mohamud"
                    width={500}
                    height={600}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Decorative elements */}
                <div
                  className="absolute -top-4 -left-4 w-24 h-24 border-2 border-purple-500/30"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)",
                    transition:
                      "transform 0.8s ease-out 0.4s, opacity 0.8s ease-out 0.4s",
                    transform: isLoaded
                      ? "translate(0, 0)"
                      : "translate(-20px, -20px)",
                    opacity: isLoaded ? 1 : 0,
                  }}
                ></div>

                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-pink-500/30"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    transition:
                      "transform 0.8s ease-out 0.5s, opacity 0.8s ease-out 0.5s",
                    transform: isLoaded
                      ? "translate(0, 0)"
                      : "translate(20px, 20px)",
                    opacity: isLoaded ? 1 : 0,
                  }}
                ></div>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-7 order-2 md:order-2">
            <FadeIn delay={0.2}>
              <div className="text-sm text-white/50 mb-1.5">About Me</div>
              <h1 className="text-xl font-bold text-white mb-3">
                From Vision to Impact: Crafting Stories That Matter
              </h1>
              <div className="space-y-4 text-white/70 text-sm">
                <p>
                  Every piece of content has a purpose, and behind every
                  purposeful creation is someone who understands how to connect
                  vision with execution. I am Abdikarin Ali a digital
                  storyteller and multimedia specialist specialized in
                  documentary video editing, graphic design, and social media
                  management. I bring concepts to life through compelling
                  narratives and visually engaging experiences that not only
                  inform but inspire. In the documentary space, I focus on
                  faceless storytelling carefully blending visuals, sound, and
                  narration to create emotionally engaging videos. My content
                  has reached wide audiences, earning strong engagement through
                  clarity, rhythm, and message depth.
                </p>
                <p>
                  As a graphic designer, I craft visuals that communicate with
                  purpose. From bold compositions to clean branding assets, my
                  work merges aesthetics with function making each design not
                  just beautiful, but effective. In social media management, I
                  build digital presence through strategic planning, content
                  creation, and community engagement. I help brands grow—not
                  just in numbers, but in influence, consistency, and
                  connection. Through my multidisciplinary approach, I empower
                  brands and ideas to stand out crafting content that leaves a
                  lasting impression, both online and off.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Add keyframes for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
