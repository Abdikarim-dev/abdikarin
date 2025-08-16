"use client"

import { useEffect, useState } from "react"

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient background with parallax effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0F103E] to-[#7F60C8] opacity-70"
        
      />

      {/* Floating shapes with parallax effect */}
      <div
        className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.03}px)`,
        }}
      />
      <div
        className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"
        style={{
          transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.02}px)`,
        }}
      />
      <div
        className="absolute bottom-[15%] left-[15%] w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
        style={{
          transform: `translate(${scrollY * -0.01}px, ${scrollY * -0.04}px)`,
        }}
      />
      <div
        className="absolute top-[60%] left-[60%] w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.04}px, ${scrollY * 0.01}px)`,
        }}
      />

      {/* Stars/particles with different parallax speeds */}
      {/* <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translateY(${scrollY * (0.01 + Math.random() * 0.05)}px)`,
            }}
          />
        ))}
      </div> */}
    </div>
  )
}
