import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogAuthor } from "@/types/blog"

interface BlogAuthorCardProps {
  author: BlogAuthor
}

export function BlogAuthorCard({ author }: BlogAuthorCardProps) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image src={author.avatar || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">{author.name}</h3>
            {author.bio && <p className="text-white/70 text-sm">{author.bio}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
