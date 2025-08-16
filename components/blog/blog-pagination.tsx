import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function BlogPagination({ currentPage, totalPages, basePath }: BlogPaginationProps) {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page, last page, current page, and pages adjacent to current
      pages.push(1)

      // Add ellipsis if needed
      if (currentPage > 3) {
        pages.push(-1) // -1 represents ellipsis
      }

      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push(-2) // -2 represents ellipsis
      }

      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <Button
        variant="outline"
        size="icon"
        className="bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white"
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage === 1 ? (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        ) : (
          <Link href={`${basePath}${currentPage === 2 ? "" : `page/${currentPage - 1}`}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        )}
      </Button>

      {pageNumbers.map((pageNumber, index) => {
        // Handle ellipsis
        if (pageNumber < 0) {
          return (
            <span key={`ellipsis-${index}`} className="text-white/50 px-3">
              ...
            </span>
          )
        }

        const isCurrentPage = pageNumber === currentPage

        return (
          <Button
            key={pageNumber}
            variant={isCurrentPage ? "default" : "outline"}
            size="icon"
            className={
              isCurrentPage
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white"
            }
            asChild={!isCurrentPage}
          >
            {isCurrentPage ? (
              <span>{pageNumber}</span>
            ) : (
              <Link href={`${basePath}${pageNumber === 1 ? "" : `page/${pageNumber}`}`}>{pageNumber}</Link>
            )}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        className="bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white"
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage === totalPages ? (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        ) : (
          <Link href={`${basePath}page/${currentPage + 1}`}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </Button>
    </div>
  )
}
