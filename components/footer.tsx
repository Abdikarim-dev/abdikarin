import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-16">
      <div className="max-w-[64rem] mx-auto px-4">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Abdikarin Ali Mohamud
              </h3>
            
              <p className="text-white/70 text-sm">
                Digital storyteller and multimedia specialist skilled in content
                creation, video editing, and graphic design. I create impactful
                digital content that inspires, informs, and boosts engagement.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/designs"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Designs
                </Link>
                <Link
                  href="/videos/documentary"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Documentary Videos
                </Link>
                <Link
                  href="/videos/all"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Video Productions
                </Link>
                {/* <Link
                  href="/blog"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Blog
                </Link> */}
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <div className="flex gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-white/70 hover:text-white"
                >
                  <Link href="https://instagram.com" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-white/70 hover:text-white"
                >
                  <Link href="https://twitter.com" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-white/70 hover:text-white"
                >
                  <Link
                    href="https://linkedin.com/in/abdikarinmohamud"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-white/70 hover:text-white"
                >
                  <Link href="https://youtube.com" aria-label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="text-white/70 text-sm space-y-1">
                <p>Email: abdikarinalimohamud@gmail.com</p>
                <p>Phone: +252 613796512</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Abdikarin Ali Mohamud. All rights
            reserved.
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
