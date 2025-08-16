import Link from "next/link"
import type { Metadata } from "next"
import { FadeIn } from "@/components/animations/fade-in"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogSearch } from "@/components/blog/blog-search"
import { BlogFilters } from "@/components/blog/blog-filters"
import { blogPosts, blogCategories, blogTags } from "@/data/blog-data"

export const metadata: Metadata = {
  title: "Blog | Abdikarin Ali Mohamud",
  description: "Insights, tutorials, and thoughts on design, video production, and content creation",
}

const POSTS_PER_PAGE = 9

export default function BlogPage() {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  // Get featured post (most recent)
  const featuredPost = sortedPosts[0]

  // Get remaining posts for this page
  const remainingPosts = sortedPosts.slice(1, POSTS_PER_PAGE)

  // Calculate total pages
  const totalPages = Math.ceil((sortedPosts.length - 1) / (POSTS_PER_PAGE - 1))

  return (
    <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Blog</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on design, video production, and content creation
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar with filters */}
        <FadeIn delay={0.1} className="md:col-span-1">
          <div className="space-y-6">
            <BlogSearch />
            <Separator className="bg-white/10" />
            <BlogFilters categories={blogCategories} tags={blogTags} />
          </div>
        </FadeIn>

        {/* Main content */}
        <div className="md:col-span-3">
          {/* Featured post */}
          <FadeIn delay={0.2}>
            <BlogCard post={featuredPost} variant="featured" />
          </FadeIn>

          {/* Recent posts grid */}
          <div className="mt-8">
            <FadeIn delay={0.3}>
              <h2 className="text-2xl font-bold text-white mb-6">Recent Articles</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingPosts.map((post, index) => (
                <FadeIn key={post.id} delay={0.4 + index * 0.1}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>

            {/* Show more button if there are more pages */}
            {totalPages > 1 && (
              <FadeIn delay={0.6} className="mt-8 text-center">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/blog/page/2">View More Articles</Link>
                </Button>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
