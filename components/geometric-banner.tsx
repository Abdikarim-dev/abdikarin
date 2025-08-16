"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";

export function GeometricBanner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mb-20">
      {/* Geometric shapes background */}
      <div className="absolute inset-0 z-0">
        {/* Triangle 1 - Purple */}
        <div
          className="absolute top-0 left-0 w-[60%] h-[80%] bg-purple-600/30 transform -skew-x-12"
          style={{
            clipPath: "polygon(0 0, 100% 0, 60% 100%, 0% 100%)",
            transition: "transform 0.8s ease-out",
            transform: isLoaded
              ? "translateX(0) skew(-12deg)"
              : "translateX(-100%) skew(-12deg)",
          }}
        />

        {/* Rectangle 1 - Dark blue */}
        <div
          className="absolute top-[20%] right-[10%] w-[40%] h-[60%] bg-indigo-900/40"
          style={{
            transition: "transform 0.8s ease-out 0.2s",
            transform: isLoaded ? "translateX(0)" : "translateX(100%)",
          }}
        />

        {/* Triangle 2 - Pink accent */}
        <div
          className="absolute bottom-0 right-[30%] w-[30%] h-[40%]"
          style={{
            clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
            background:
              "linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(219,39,119,0.1) 100%)",
            transition: "transform 0.8s ease-out 0.4s",
            transform: isLoaded ? "translateY(0)" : "translateY(100%)",
          }}
        />

        {/* Rectangle 2 - Subtle accent */}
        <div
          className="absolute top-[10%] left-[20%] w-[15%] h-[30%] bg-purple-400/10 rotate-45"
          style={{
            transition:
              "transform 0.8s ease-out 0.3s, opacity 0.8s ease-out 0.3s",
            transform: isLoaded
              ? "translateY(0) rotate(45deg)"
              : "translateY(-100%) rotate(45deg)",
            opacity: isLoaded ? 1 : 0,
          }}
        />
      </div>

      <div className="max-w-[64rem] mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <FadeIn className="order-2 md:order-1">
            <div className="text-sm text-purple-400 mb-2">
              Content Creator & Designer
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Abdikarin Ali <span className="text-pink-500">Mohamud</span>
            </h1>
            <p className="text-white/70 mb-6">
              Digital storyteller and multimedia specialist specializing in
              content creation, video editing, and graphic design. I craft
              compelling digital content that inspires, informs, and drives
              engagement through visual storytelling.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors button-hover"
              >
                Get In Touch
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-md font-medium hover:bg-white/5 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </FadeIn>

          <div className="order-1 md:order-2 relative">
            <div
              className="relative aspect-square max-w-[450px] mx-auto z-10"
              style={{
                transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
                transform: isLoaded ? "scale(1)" : "scale(0.8)",
                opacity: isLoaded ? 1 : 0,
              }}
            >
              {/* Clip path for the profile image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(0 10%, 30% 0, 100% 0, 100% 90%, 70% 100%, 0 100%)",
                }}
              >
                <Image
                  src="/images/profile-formal.jpg"
                  alt="Abdikarin Ali Mohamud"
                  width={500}
                  height={600}
                  className="object-cover object-top w-full h-full"
                  priority
                />
              </div>

              {/* Decorative border elements */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath:
                    "polygon(0 10%, 30% 0, 100% 0, 100% 90%, 70% 100%, 0 100%)",
                  border: "2px solid rgba(168, 85, 247, 0.4)",
                  transform: "scale(1.02)",
                }}
              ></div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute top-[-5%] right-[10%] w-[40%] h-[40%]"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.1) 100%)",
                transition:
                  "transform 1s ease-out 0.5s, opacity 1s ease-out 0.5s",
                transform: isLoaded
                  ? "rotate(15deg)"
                  : "rotate(0deg) scale(0.5)",
                opacity: isLoaded ? 1 : 0,
              }}
            ></div>

            <div
              className="absolute bottom-[-5%] left-[15%] w-[30%] h-[30%]"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                background:
                  "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.1) 100%)",
                transition:
                  "transform 1s ease-out 0.6s, opacity 1s ease-out 0.6s",
                transform: isLoaded
                  ? "rotate(-15deg)"
                  : "rotate(0deg) scale(0.5)",
                opacity: isLoaded ? 1 : 0,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
