import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BlogAuthorCard } from "@/components/blog/blog-author"
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts"
import { getPostBySlug, getRelatedPosts, formatDate } from "@/data/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Abdikarin Ali Mohamud",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Abdikarin Ali Mohamud`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, 3)

  // Convert markdown content to HTML (simple version)
  // In a real app, you'd use a markdown parser like remark or marked
  const contentHtml = post.content
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ")) {
        return `<h1 class="text-3xl font-bold text-white mt-8 mb-4">${line.substring(2)}</h1>`
      }
      if (line.startsWith("## ")) {
        return `<h2 class="text-2xl font-bold text-white mt-6 mb-3">${line.substring(3)}</h2>`
      }
      if (line.startsWith("### ")) {
        return `<h3 class="text-xl font-bold text-white mt-5 mb-2">${line.substring(4)}</h3>`
      }
      if (line.trim() === "") {
        return "<br />"
      }
      return `<p class="text-white/80 mb-4">${line}</p>`
    })
    .join("")

  return (
    <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <Button variant="ghost" size="sm" className="mb-8 text-white/70 hover:text-white" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <FadeIn>
            <div className="mb-6">
              {post.categories.map((category) => (
                <Link key={category.id} href={`/blog/category/${category.slug}`}>
                  <Badge className="bg-purple-600 hover:bg-purple-700 mr-2">{category.name}</Badge>
                </Link>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative aspect-[21/9] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="prose prose-lg prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-white/70" />
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
                  <Badge variant="outline" className="bg-white/5 hover:bg-white/10 text-white/70">
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Separator className="my-8 bg-white/10" />
            <BlogAuthorCard author={post.author} />
          </FadeIn>

          <FadeIn delay={0.5}>
            <BlogRelatedPosts posts={relatedPosts} />
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="md:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Share This Article</h3>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {post.categories.map((category) => (
                  <Link key={category.id} href={`/blog/category/${category.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white"
                    >
                      {category.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
                    <Badge variant="outline" className="bg-white/5 hover:bg-white/10 text-white/70">
                      {tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
