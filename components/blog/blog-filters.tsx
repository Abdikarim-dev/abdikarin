"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BlogCategory, BlogTag } from "@/types/blog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface BlogFiltersProps {
  categories: BlogCategory[]
  tags: BlogTag[]
  activeCategory?: string
  activeTag?: string
}

export function BlogFilters({ categories, tags, activeCategory, activeTag }: BlogFiltersProps) {
  const pathname = usePathname()
  const [categoriesOpen, setCategoriesOpen] = useState(true)
  const [tagsOpen, setTagsOpen] = useState(true)

  const isRootBlogPath = pathname === "/blog"

  return (
    <div className="space-y-6">
      <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-white">Categories</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  categoriesOpen ? "transform rotate-180" : "",
                )}
              />
              <span className="sr-only">Toggle categories</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-1">
          <Button
            asChild
            variant="ghost"
            className={cn(
              "w-full justify-start text-white/70 hover:text-white hover:bg-white/5",
              isRootBlogPath && "bg-white/10 text-white",
            )}
          >
            <Link href="/blog">All Categories</Link>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start text-white/70 hover:text-white hover:bg-white/5",
                activeCategory === category.slug && "bg-white/10 text-white",
              )}
            >
              <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-white">Tags</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  tagsOpen ? "transform rotate-180" : "",
                )}
              />
              <span className="sr-only">Toggle tags</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white",
                    activeTag === tag.slug && "bg-purple-600/20 border-purple-600/50 text-purple-400",
                  )}
                >
                  {tag.name}
                </Button>
              </Link>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
