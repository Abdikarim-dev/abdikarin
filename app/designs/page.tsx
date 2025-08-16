"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FadeIn } from "@/components/animations/fade-in"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbox } from "@/components/lightbox"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

// Define design categories
const categories = [
  { id: "all", name: "All Designs" },
  // { id: "marketing", name: "Marketing" },
  // { id: "education", name: "Education" },
  { id: "waaberi", name: "Waaberi Academy" },
  { id: "banking", name: "Banking" },
  { id: "bayaan", name: "Bayaan Brand" },
]

// Define design items with their categories
const designItems = [
  {
    id: 1,
    title: "Amal Bank Customer Support",
    description: "Customer support poster design for Amal Bank featuring a vintage telephone.",
    image: "/images/designs/amal-bank.jpeg",
    categories: ["banking"],
  },
  {
    id: 2,
    title: "BB Bank Children's Account",
    description: "Children's account promotional design for Bushra Business Bank.",
    image: "/images/designs/bb-bank.jpeg",
    categories: ["banking"],
  },
  {
    id: 3,
    title: "Digital Marketing Concept",
    description: "Creative concept illustrating business without digital marketing.",
    image: "/images/designs/bayaan-car.jpeg",
    categories: ["bayaan"],
  },
  {
    id: 4,
    title: "Creative Agency Contact",
    description: "Contact poster for Bayaan Brand creative agency.",
    image: "/images/designs/bayaan-phone.jpeg",
    categories: ["bayaan"],
  },
  {
    id: 5,
    title: "Plant Photo Challenge",
    description: "Promotional poster for Geedsoor plant photography contest.",
    image: "/images/designs/geedsoor.jpeg",
    categories: [""],
  },
  {
    id: 6,
    title: "Graphic Design Course",
    description: "SomCourse graphic design professional training advertisement.",
    image: "/images/designs/somcourse-graphic.jpeg",
    categories: [""],
  },
  {
    id: 7,
    title: "SomCourse Founder",
    description: "Profile poster for Zakariye Abdiraxman Zoona, founder of SomCourse.",
    image: "/images/designs/somcourse-founder.jpeg",
    categories: [""],
  },
  {
    id: 8,
    title: "SomBank Card",
    description: "Promotional design for SomBank card services.",
    image: "/images/designs/sombank-card.jpeg",
    categories: ["banking"],
  },
  // New designs
  {
    id: 9,
    title: "Internet Usage Statistics",
    description: "Infographic showing that 75% of people use the internet for research and information.",
    image: "/images/designs/internet-statistics.webp",
    categories: [ "bayaan"],
  },
  {
    id: 10,
    title: "Success Partnership",
    description: "Motivational graphic featuring clasped hands with the message 'We work for your success!'",
    image: "/images/designs/success-handshake.webp",
    categories: ["marketing", "bayaan"],
  },
  {
    id: 11,
    title: "Personal Branding Guide",
    description: "Educational graphic about 5 ways to build your personal brand featuring a professional in a suit.",
    image: "/images/designs/personal-branding.jpeg",
    categories: ["education", "waaberi"],
  },
  {
    id: 12,
    title: "Goal Setting Strategy",
    description: "Motivational graphic with a target and arrows illustrating the importance of setting clear goals.",
    image: "/images/designs/target-goals.jpeg",
    categories: ["marketing", "bayaan"],
  },
  {
    id: 13,
    title: "Advertising Value Quote",
    description:
      "Thought-provoking quote comparing stopping advertising to save money with stopping a clock to save time.",
    image: "/images/designs/advertising-quote.jpeg",
    categories: ["marketing", "bayaan"],
  },
  {
    id: 14,
    title: "Website Design Guide",
    description: "Educational graphic about the most effective website color schemes and design principles.",
    image: "/images/designs/website-design.jpeg",
    categories: ["education", "waaberi"],
  },
  {
    id: 15,
    title: "Digital Skills Statistics",
    description: "Infographic highlighting that 75% of students who learn digital skills find opportunities quickly.",
    image: "/images/designs/digital-skills.jpeg",
    categories: ["education", "waaberi"],
  },
  {
    id: 16,
    title: "Sha'ban Calendar",
    description:
      "Religious calendar showing important dates in the Islamic month of Sha'ban with both Gregorian and Hijri dates.",
    image: "/images/designs/shaban-calendar.jpeg",
    categories: ["education", "waaberi"],
  },
  {
    id: 17,
    title: "Ramadan Kareem Greeting",
    description: "Elegant Ramadan greeting card with Arabic calligraphy and traditional lantern decorations.",
    image: "/images/designs/ramadan-greeting.jpeg",
    categories: ["marketing", "waaberi"],
  },
  {
    id: 18,
    title: "Skills Development Guide",
    description:
      "Educational graphic outlining three key principles for developing professional skills with hand gesture icons.",
    image: "/images/designs/skills-development.jpeg",
    categories: ["education", "waaberi"],
  },
]

// Animation variants for items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Design item component with animation and lightbox
function DesignItem({
  item,
  index,
  onImageClick,
}: {
  item: (typeof designItems)[0]
  index: number
  onImageClick: (item: (typeof designItems)[0]) => void
}) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className="bg-white/5 border-white/10 overflow-hidden group h-full cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => onImageClick(item)}
      >
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <span className="text-white font-medium px-4 py-2 bg-purple-600/80 rounded-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              View
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function DesignsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredItems, setFilteredItems] = useState(designItems)
  const [lightboxImage, setLightboxImage] = useState<(typeof designItems)[0] | null>(null)

  // Filter items when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(designItems)
    } else {
      setFilteredItems(designItems.filter((item) => item.categories.includes(activeCategory)))
    }
  }, [activeCategory])

  const handleImageClick = (item: (typeof designItems)[0]) => {
    setLightboxImage(item)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  return (
    <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Design Portfolio</h1>
          <p className="text-white/70">A showcase of my graphic design and marketing work</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="bg-white/10 mx-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="data-[state=active]:bg-[#262059] data-[state=active]:text-white data-[state=active]:text-opacity-80">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <DesignItem key={item.id} item={item} index={index} onImageClick={handleImageClick} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <FadeIn>
          <div className="text-center py-20">
            <h2 className="text-xl font-medium text-white mb-2">No designs found</h2>
            <p className="text-white/70">No designs match the selected category.</p>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.3}>
        <div className="bg-white/5 rounded-lg p-8 mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-purple-400 text-2xl font-bold mb-2">01</div>
              <h3 className="text-white text-xl font-medium mb-2">Discovery</h3>
              <p className="text-white/70 text-sm">
                I begin by understanding your brand, target audience, and goals to ensure the design aligns with your
                vision.
              </p>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-2xl font-bold mb-2">02</div>
              <h3 className="text-white text-xl font-medium mb-2">Concept & Design</h3>
              <p className="text-white/70 text-sm">
                Creating initial concepts and refining them based on feedback until we achieve the perfect design.
              </p>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-2xl font-bold mb-2">03</div>
              <h3 className="text-white text-xl font-medium mb-2">Delivery</h3>
              <p className="text-white/70 text-sm">
                Finalizing the designs and delivering them in all the formats you need for your platforms.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Lightbox for design images */}
      <Lightbox isOpen={!!lightboxImage} onClose={closeLightbox}>
        {lightboxImage && (
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={lightboxImage.image || "/placeholder.svg"}
              alt={lightboxImage.title}
              width={1200}
              height={1200}
              className="object-contain max-w-full max-h-[90vh]"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-xl font-bold mb-2">{lightboxImage.title}</h3>
              <p className="text-white/80 text-sm">{lightboxImage.description}</p>
            </div>
          </div>
        )}
      </Lightbox>
    </div>
  )
}
