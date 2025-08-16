import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { formatDate } from "@/data/blog-data"
import type { BlogPost } from "@/types/blog"

interface BlogRelatedPostsProps {
  posts: BlogPost[]
}

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[16/9] mb-3 overflow-hidden rounded-md">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">{post.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
