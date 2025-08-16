import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FadeIn } from "@/components/animations/fade-in"
import { Separator } from "@/components/ui/separator"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogSearch } from "@/components/blog/blog-search"
import { BlogFilters } from "@/components/blog/blog-filters"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { blogCategories, blogTags, getPostsByTag } from "@/data/blog-data"

interface TagPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = blogTags.find((t) => t.slug === params.slug)

  if (!tag) {
    return {
      title: "Tag Not Found | Abdikarin Ali Mohamud",
      description: "The requested tag could not be found.",
    }
  }

  return {
    title: `${tag.name} Articles | Abdikarin Ali Mohamud`,
    description: `Articles tagged with ${tag.name}`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = blogTags.find((t) => t.slug === params.slug)

  if (!tag) {
    notFound()
  }

  const posts = getPostsByTag(params.slug)

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const POSTS_PER_PAGE = 6
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const currentPage = 1
  const displayPosts = sortedPosts.slice(0, POSTS_PER_PAGE)

  return (
    <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Articles Tagged: {tag.name}</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Explore all articles related to {tag.name}</p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar with filters */}
        <FadeIn delay={0.1} className="md:col-span-1">
          <div className="space-y-6">
            <BlogSearch />
            <Separator className="bg-white/10" />
            <BlogFilters categories={blogCategories} tags={blogTags} activeTag={params.slug} />
          </div>
        </FadeIn>

        {/* Main content */}
        <div className="md:col-span-3">
          {displayPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayPosts.map((post, index) => (
                  <FadeIn key={post.id} delay={0.2 + index * 0.1}>
                    <BlogCard post={post} />
                  </FadeIn>
                ))}
              </div>

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/blog/tag/${params.slug}/`}
              />
            </>
          ) : (
            <FadeIn delay={0.2}>
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-white mb-2">No articles found</h2>
                <p className="text-white/70">There are no articles with this tag yet. Check back later!</p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  )
}
