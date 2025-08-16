"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"

// Update the routes array to include the blog link
const routes = [
  { name: "Home", path: "/" },
  { name: "Designs", path: "/designs" },
  {
    name: "Videos",
    path: "/videos",
    dropdown: [
      { name: "Documentary Videos", path: "/videos/documentary" },
      { name: "Video Productions", path: "/videos/all" },
    ],
  },
  // { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled ? "backdrop-blur-md bg-[#0F103E]/80" : "bg-transparent",
      )}
    >
      <div className="max-w-[64rem] mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className=" my-4 transition-transform duration-300 hover:scale-105">
          <Image 
            src="/images/logo.png"
            alt="Abdikarin Ali"
            width={240}
            height={100}
            className="object-contain drop-shadow-[0_0_0.3rem_#ffffff70]"
            priority
          />
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-1">
            {routes.map((route) => {
              if (route.dropdown) {
                return (
                  <NavigationMenuItem key={route.path} className="relative group">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "px-3 py-2 text-sm rounded-md transition-colors",
                            pathname.startsWith(route.path)
                              ? "bg-white/10 text-white"
                              : "text-white/80 hover:text-white hover:bg-white/5",
                          )}
                        >
                          <span className="flex items-center gap-1">
                            {route.name} <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1a1b4b] border-white/10">
                        {route.dropdown.map((item) => (
                          <DropdownMenuItem key={item.path} asChild>
                            <Link
                              href={item.path}
                              className={cn(
                                "block px-4 py-2 text-sm",
                                pathname === item.path
                                  ? "bg-white/10 text-white"
                                  : "text-white/80 hover:text-white hover:bg-white/10",
                              )}
                            >
                              {item.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuItem>
                )
              }

              return (
                <NavigationMenuItem key={route.path}>
                  <Link
                    href={route.path}
                    className={cn(
                      "px-3 py-2 text-sm rounded-md transition-colors",
                      pathname === route.path
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {route.name}
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#1a1b4b] border-white/10 text-white">
            <div className="flex items-center mt-4 mb-8">
              <Image src="/images/logo.png" alt="Abdikarin logo" width={32} height={32} className="h-8 w-auto" />
              <span className="ml-2 font-bold text-lg text-white">Abdikarin Ali</span>
            </div>
            <div className="flex flex-col gap-6">
              {routes.map((route) => {
                if (route.dropdown) {
                  return (
                    <div key={route.path} className="flex flex-col gap-2">
                      <div className="font-medium">{route.name}</div>
                      <div className="flex flex-col gap-2 pl-4">
                        {route.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                              "text-sm text-white/70 hover:text-white",
                              pathname === item.path && "text-white font-medium",
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-white text-white/70",
                      pathname === route.path && "text-white",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {route.name}
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
