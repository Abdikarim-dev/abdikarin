"use client"

import { useState, useEffect } from "react"
import { FadeIn } from "@/components/animations/fade-in"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Define video categories for filtering
const categories = [
  { id: "all", name: "All Videos" },
  { id: "politics", name: "Politics" },
  { id: "international", name: "International" },
  { id: "economics", name: "Economics" },
  { id: "education", name: "Education" },
]

// Define the documentary videos with metadata
const documentaryVideos = [
  {
    id: 1,
    title: "Shidaalka somaliya ee uu soo saarayo turkigu Yaa faaidada ugu badan helaya?",
    description: "An exploration of Somalia's oil production with Turkey and the distribution of benefits.",
    embedId: "ph37nyL2MvI",
    views: "52K",
    uploadDate: "3 days ago",
    categories: ["economics", "politics"],
    channel: "Waaberi Media",
  },
  {
    id: 2,
    title: "Somalia,Libya iIaa Bulgaria,Turkiga oo doonaya inay Badda Cas maraan",
    description:
      "Documentary about geopolitical interests in the Red Sea region involving Somalia, Libya, Bulgaria, and Turkey.",
    embedId: "drKa5YDWMYg",
    views: "257K",
    uploadDate: "4 months ago",
    categories: ["international", "politics"],
    channel: "Waaberi Media",
  },
  {
    id: 3,
    title: "Faransiiska oo lagaga adkaday G/Afrika, Jebuuti oo isha lagu hayo",
    description: "Analysis of France's diplomatic challenges in Africa and the strategic importance of Djibouti.",
    embedId: "5QwVosqj3kM",
    views: "7.8K",
    uploadDate: "1 hour ago",
    categories: ["international", "politics"],
    channel: "Gaylan Media",
  },
  {
    id: 4,
    title: 'Prof. Yaaxye Caamir "Soomaaliya in ay la soo baxdo Shiidaalkeed..."',
    description: "Professor Yaaxye Caamir discusses Somalia's oil resources and their potential impact.",
    embedId: "SjOx-4-41SQ",
    views: "27K",
    uploadDate: "3 days ago",
    categories: ["economics", "education"],
    channel: "Kalvante Official",
  },
  {
    id: 5,
    title: "Habeenkii la damcay in la qafaasho ninka labaad ee ugu awoodda badan Putin",
    description: "Documentary about political tensions and power dynamics in international relations.",
    embedId: "ule0nSAKouM",
    views: "77K",
    uploadDate: "2 years ago",
    categories: ["international", "politics"],
    channel: "Waaberi Media",
  },
  {
    id: 6,
    title: "Shiidaalka iyo Gaaska Anigaa isla leh 🤔 | Ogaansho",
    description: "Investigation into oil and gas ownership claims and resource management.",
    embedId: "e29jKCR7Z2w",
    views: "40K",
    uploadDate: "4 days ago",
    categories: ["economics", "politics"],
    channel: "OGAANSHO",
  },
  {
    id: 7,
    title: "SI FUDUD KU FAHAM XIISADA PAKISTAN IYO INDIA",
    description: "An easy-to-understand explanation of the tensions between Pakistan and India.",
    embedId: "ND7cr9A1N2g",
    views: "27K",
    uploadDate: "2 days ago",
    categories: ["international", "education"],
    channel: "ANNAGA PRODUCTION",
  },
  {
    id: 8,
    title: "Shaqaalaha MMTV oo leku khilaafay Cidda badimaysa Doorashada Mareykanka",
    description: "MMTV staff discuss and debate the U.S. election outcomes.",
    embedId: "KT00gsa7kLY",
    views: "3.2K",
    uploadDate: "4 hours ago",
    categories: ["politics", "international"],
    channel: "MM Somali TV",
  },
  {
    id: 9,
    title: "Sidee somaliya ku yimid Gumaysithii Portugues 🇵🇹",
    description: "Historical documentary about Portuguese colonialism in Somalia.",
    embedId: "Nb63UDJEp1M",
    views: "54K",
    uploadDate: "6 days ago",
    categories: ["education", "international"],
    channel: "Waaberi Media",
  },
  {
    id: 10,
    title: "Shidaalka iyo Gaaska Anigaa isla leh 🤔 | Ogaansho",
    description: "In-depth analysis of oil and gas ownership claims in Somalia.",
    embedId: "ZvN8V9HNOIA",
    views: "40K",
    uploadDate: "4 days ago",
    categories: ["economics", "politics"],
    channel: "OGAANSHO",
  },
  {
    id: 11,
    title: "Maxaa ka jira in Turkiga uu Soomaaliya ka dhisayo saldhig milateri?",
    description: "Investigation into claims about Turkey building a military base in Somalia.",
    embedId: "CwROQdIN_FQ",
    views: "35K",
    uploadDate: "5 days ago",
    categories: ["politics", "international"],
    channel: "Waaberi Media",
  },
  {
    id: 12,
    title: "Maxaa ka jira in Turkiga uu Soomaaliya ka dhisayo saldhig milateri?",
    description: "Analysis of Turkey's military presence and plans in Somalia.",
    embedId: "R0j_YzGa0co",
    views: "42K",
    uploadDate: "1 week ago",
    categories: ["politics", "international"],
    channel: "Waaberi Media",
  },
  {
    id: 13,
    title: "Maxay Soomaaliya uga faa'iideysatay heshiiska difaaca ee Turkiga?",
    description: "Examining the benefits Somalia has gained from its defense agreement with Turkey.",
    embedId: "VSS0uKr29jg",
    views: "38K",
    uploadDate: "2 weeks ago",
    categories: ["politics", "international"],
    channel: "Gaylan Media",
  },
  {
    id: 14,
    title: "Maxaa ka jira in Masar ay joojineyso mashruuca wabiga Nile?",
    description: "Investigation into Egypt's stance on the Nile River dam project.",
    embedId: "768Hh0LF_rc",
    views: "45K",
    uploadDate: "3 weeks ago",
    categories: ["international", "economics"],
    channel: "Waaberi Media",
  },
  {
    id: 15,
    title: "Sababaha keenay dagaalka Ukraine iyo Russia",
    description: "Analysis of the causes behind the Ukraine-Russia conflict.",
    embedId: "rXC45NXW5cw",
    views: "62K",
    uploadDate: "1 month ago",
    categories: ["international", "politics"],
    channel: "Waaberi Media",
  },
  {
    id: 16,
    title: "Xiisadda u dhaxeysa Shiinaha iyo Taiwan",
    description: "Documentary about the tensions between China and Taiwan.",
    embedId: "WDR9iLqgcY8",
    views: "48K",
    uploadDate: "2 months ago",
    categories: ["international", "politics"],
    channel: "OGAANSHO",
  },
  {
    id: 17,
    title: "Sababaha keenay burburka Midowgii Soofiyeeti",
    description: "Historical analysis of the factors that led to the collapse of the Soviet Union.",
    embedId: "A7Rtlo1IZE4",
    views: "55K",
    uploadDate: "3 months ago",
    categories: ["education", "international"],
    channel: "Waaberi Media",
  },
  {
    id: 18,
    title: "Saamaynta dhaqaale ee cunaqabateynta Ruushka",
    description: "Economic impact of sanctions on Russia and global implications.",
    embedId: "u2fZP7vIQj8",
    views: "36K",
    uploadDate: "4 months ago",
    categories: ["economics", "international"],
    channel: "Gaylan Media",
  },
  {
    id: 19,
    title: "Xiisadda u dhaxeysa Hindiya iyo Pakistan",
    description: "In-depth analysis of the ongoing tensions between India and Pakistan.",
    embedId: "XBnL8-kVnNQ",
    views: "42K",
    uploadDate: "5 months ago",
    categories: ["international", "politics"],
    channel: "ANNAGA PRODUCTION",
  },
  {
    id: 20,
    title: "Shidaalka iyo Gaaska Soomaaliya: Fursado iyo Caqabado",
    description: "Opportunities and challenges in Somalia's oil and gas sector.",
    embedId: "ZvN8V9HNOIA",
    views: "39K",
    uploadDate: "6 months ago",
    categories: ["economics", "politics"],
    channel: "OGAANSHO",
  },
  {
    id: 21,
    title: "Saamaynta isbedelka cimilada ee Soomaaliya",
    description: "The impact of climate change on Somalia's environment and economy.",
    embedId: "Q2JfrOmwl1c",
    views: "28K",
    uploadDate: "7 months ago",
    categories: ["education", "economics"],
    channel: "Waaberi Media",
  },
  {
    id: 22,
    title: "Taariikhda Gumaysiga Yurub ee Afrika",
    description: "Historical documentary about European colonization in Africa.",
    embedId: "tAqc-UWTk1o",
    views: "65K",
    uploadDate: "8 months ago",
    categories: ["education", "international"],
    channel: "Waaberi Media",
  },
]

export default function DocumentaryVideosPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredVideos, setFilteredVideos] = useState(documentaryVideos)

  // Filter videos based on category and search query
  useEffect(() => {
    let results = documentaryVideos

    // Filter by category
    if (activeCategory !== "all") {
      results = results.filter((video) => video.categories.includes(activeCategory))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.channel.toLowerCase().includes(query),
      )
    }

    setFilteredVideos(results)
  }, [activeCategory, searchQuery])

  return (
    <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Documentary Videos</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Featuring my documentary videos that tell compelling stories about current affairs and have a meaningful
            impact on our community
          </p>
        </div>
      </FadeIn>

      {/* Search and Filter */}
      <FadeIn delay={0.1}>
        <div className="mb-8 space-y-4">
          {/*
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/50"
            />
          </div>
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="bg-white/10 w-full flex overflow-x-auto pb-px">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-purple-600 flex-shrink-0"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          */}
          
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
      
        </div>
      </FadeIn>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <FadeIn key={video.id} delay={0.05 * (index + 1)}>
              <Card className="bg-white/5 border-white/10 overflow-hidden h-full">
                <div className="aspect-video relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  ></iframe>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium line-clamp-2">{video.title}</h3>
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/20 text-purple-300 border-none whitespace-nowrap"
                      >
                        {video.views} views
                      </Badge>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex justify-between items-center text-sm text-white/50">
                    <span>{video.channel}</span>
                    <span>{video.uploadDate}</span>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-12">
            <h3 className="text-xl font-medium text-white mb-2">No videos found</h3>
            <p className="text-white/70">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* About My Documentary Work */}
      <FadeIn delay={0.3}>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">About My Documentary Work</h2>
            <div className="space-y-4 text-white/70">
              <p>
                These videos represent my passion for storytelling and documenting important events and issues that
                affect our community. I edit these documentaries with care, focusing on presenting factual information
                in an engaging and accessible way.
              </p>
              <p>
                My goal is to create content that not only informs but also inspires viewers to think critically about
                current affairs, history, and the complex dynamics of international relations. Each documentary is
                crafted to provide context and depth to topics that matter to our audience.
              </p>
              <p>
                Using professional editing techniques, I strive to create documentaries that are both informative and
                visually compelling. I believe in the power of visual storytelling to make complex topics more
                accessible and to create meaningful connections with viewers.
              </p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}
