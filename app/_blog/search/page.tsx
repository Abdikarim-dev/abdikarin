import type { Metadata } from "next"
import { FadeIn } from "@/components/animations/fade-in"
import { Separator } from "@/components/ui/separator"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogSearch } from "@/components/blog/blog-search"
import { BlogFilters } from "@/components/blog/blog-filters"
import { blogCategories, blogTags, searchPosts } from "@/data/blog-data"

export const metadata: Metadata = {
  title: "Search Results | Abdikarin Ali Mohamud",
  description: "Search results for blog articles",
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""
  const posts = query ? searchPosts(query) : []

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return (
    <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Search Results</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            {query ? (
              <>
                Found {sortedPosts.length} {sortedPosts.length === 1 ? "result" : "results"} for "{query}"
              </>
            ) : (
              "Enter a search term to find articles"
            )}
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
          {query ? (
            sortedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedPosts.map((post, index) => (
                  <FadeIn key={post.id} delay={0.2 + index * 0.1}>
                    <BlogCard post={post} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <FadeIn delay={0.2}>
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium text-white mb-2">No results found</h2>
                  <p className="text-white/70">Try different keywords or browse categories and tags instead.</p>
                </div>
              </FadeIn>
            )
          ) : (
            <FadeIn delay={0.2}>
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-white mb-2">Enter a search term</h2>
                <p className="text-white/70">
                  Use the search box to find articles by title, content, category, or tag.
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  )
}
