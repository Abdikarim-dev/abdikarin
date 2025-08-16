export type BlogCategory = {
  id: string
  name: string
  slug: string
  description?: string
}

export type BlogTag = {
  id: string
  name: string
  slug: string
}

export type BlogAuthor = {
  id: string
  name: string
  avatar: string
  bio?: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: BlogAuthor
  publishedAt: string
  updatedAt?: string
  categories: BlogCategory[]
  tags: BlogTag[]
  readingTime: number
}

export type BlogFilters = {
  category?: string
  tag?: string
  search?: string
}
