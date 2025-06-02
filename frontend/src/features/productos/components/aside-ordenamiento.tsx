'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const sortOptions = [
  { id: 1, direction: 'asc', sortBy: 'nombre', label: 'Nombre: A → Z' },
  { id: 2, direction: 'desc', sortBy: 'nombre', label: 'Nombre: Z → A' },
  { id: 3, direction: 'asc', sortBy: 'precio', label: 'Precio: menor a mayor' },
  { id: 4, direction: 'desc', sortBy: 'precio', label: 'Precio: mayor a menor' }
]

export default function AsideOrdenamiento () {
  const searchParams = useSearchParams()

  const createHref = (direction: string, sortBy: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('direction', direction)
    params.set('sortBy', sortBy)
    return `/productos?${params.toString()}`
  }

  return (
    <aside className='flex flex-col w-40 gap-2'>
      <h2 className='text-sm text-muted-foreground'>Ordenar por</h2>
      <ul>
        {sortOptions.map((option) => (
          <li key={option.id}>
            <Link
              href={createHref(option.direction, option.sortBy)}
              className={`text-sm ${searchParams.get('direction') === option.direction && searchParams.get('sortBy') === option.sortBy ? 'font-bold underline' : ''}`}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
