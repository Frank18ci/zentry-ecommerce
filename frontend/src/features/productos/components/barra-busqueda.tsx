'use client'

import { Input } from '@/core/components/ui/input'
import debounce from 'lodash/debounce'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function BarraBusqueda () {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('query') || '')

  const debouncedSearch =
    debounce((searchTerm: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (searchTerm) {
        params.set('query', searchTerm)
      } else {
        params.delete('query')
      }

      router.push(`/productos?${params.toString()}`)
    }, 300)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        key={searchParams.get('query')}
        type="search"
        name="query"
        placeholder='Buscar productos...'
        value={query}
        onChange={handleChangeQuery}
        autoFocus
        className="pl-10 pr-4"
      />
    </div>
  )
}
