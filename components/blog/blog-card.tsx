import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/types/blog"
import { formatDate } from "@/data/blog-data"

interface BlogCardProps {
  post: BlogPost
  variant?: "default" | "featured"
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const isFeatured = variant === "featured"

  return (
    <Card
      className={`overflow-hidden bg-white/5 border-white/10 group transition-all duration-300 hover:bg-white/10 ${
        isFeatured ? "md:col-span-2" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className={`relative ${isFeatured ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-purple-600 hover:bg-purple-700">{post.categories[0].name}</Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3
            className={`font-bold text-white mb-2 group-hover:text-purple-400 transition-colors ${
              isFeatured ? "text-2xl" : "text-xl"
            }`}
          >
            {post.title}
          </h3>
        </Link>
        <p className="text-white/70 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Link href={`/blog/tag/${tag.slug}`} key={tag.id}>
              <Badge variant="outline" className="bg-white/5 hover:bg-white/10 text-white/70">
                {tag.name}
              </Badge>
            </Link>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="bg-white/5 text-white/70">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
