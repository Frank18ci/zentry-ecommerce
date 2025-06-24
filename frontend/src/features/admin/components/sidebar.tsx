'use client'

import { cn } from '@/core/lib/utils'
import {
  Home,
  Package,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Productos', href: '/admin/products', icon: Package },
  { name: 'Usuarios', href: '/admin/users', icon: Users }
]

export function Sidebar () {
  const pathname = usePathname()

  return (
    <div className="shadow-sm w-64 h-screen">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Zentry Admin</h1>
      </div>
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-muted-foreground hover:bg-blue-50 hover:text-blue-700'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
