import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import { actionGetUsers } from '@/features/auth/actions'
import { actionGetCategorias, actionGetSubCategorias } from '@/features/categorias/actions'
import { actionGetProducts } from '@/features/productos/actions'
import { Package } from 'lucide-react'

export default async function DashboardCards () {
  const [dataUsuarios, dataProducts, dataCategorias, dataSubCategorias] = await Promise.all([
    actionGetUsers(),
    actionGetProducts(),
    actionGetCategorias(),
    actionGetSubCategorias()
  ])

  const usuarios = dataUsuarios.data
  const products = dataProducts.data
  const categorias = dataCategorias.data
  const subCategorias = dataSubCategorias.data

  const cards = [
    {
      title: 'Total de Usuarios',
      value: usuarios?.length,
      icon: Package,
      description: 'Usuarios registrados',
    },
    {
      title: 'Total de Productos',
      value: products?.totalElements,
      icon: Package,
      description: 'Productos activos en inventario',
    },
    {
      title: 'Total de Categorías',
      value: categorias?.length,
      icon: Package,
      description: 'Categorías disponibles',
    },
    {
      title: 'Total de Subcategorías',
      value: subCategorias?.length,
      icon: Package,
      description: 'Subcategorías disponibles',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
