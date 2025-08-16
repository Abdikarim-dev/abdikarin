import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ParallaxBackground } from "@/components/parallax-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abdikarin Ali Mohamud | Designer & Content Creator",
  description: "Portfolio website for Abdikarin Ali Mohamud - Designer, Content Creator, and Social Media Manager",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-gradient-to-br from-[#0F103E] via-[#4a3984] to-[#7660C8] dark:from-[#0F103E] dark:via-[#4a3984] dark:to-[#7660C8]  flex flex-col relative overflow-hidden">
            {/* Parallax background elements */}
            <ParallaxBackground />

            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
