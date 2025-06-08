'use client'

import { Button } from '@/core/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaginacionProductos ({
  maxPage = 1,
  totalItems = 0,
  endpoint = '/productos',
}: {
  maxPage?: number
  totalItems?: number
  endpoint?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') || '1'
  const query = searchParams.get('query') || ''
  const direction = searchParams.get('direction') || ''

  const current = Number(page)

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (query) params.set('query', query)
    if (direction) params.set('direction', direction)

    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }

    router.push(`${endpoint}?${params.toString()}`)
  }

  const getVisiblePages = () => {
    const pages = []
    const delta = 2

    if (maxPage <= 7) {
      for (let i = 1; i <= maxPage; i++) {
        pages.push(i)
      }
    } else {
      if (current <= delta + 1) {
        for (let i = 1; i <= delta + 3; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(maxPage)
      } else if (current >= maxPage - delta) {
        pages.push(1)
        pages.push('...')
        for (let i = maxPage - delta - 2; i <= maxPage; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = current - delta; i <= current + delta; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(maxPage)
      }
    }

    return pages
  }

  if (maxPage <= 1) return null

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(current - 1)}
          disabled={current <= 1}
          className="w-8 h-8 p-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            page === '...' ? (
              <div key={`ellipsis-${index}`} className="flex items-center justify-center w-8 h-8">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            ) : (
              <Button
                key={page}
                variant={current === page ? "default" : "outline"}
                size="sm"
                onClick={() => navigateToPage(page as number)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            )
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(current + 1)}
          disabled={current >= maxPage}
          className="w-8 h-8 p-0"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Página {current} de {maxPage} ({totalItems} productos)
      </p>
    </div>
  )
}
