import DashboardCards from '@/features/admin/components/dashboard-cards'
import { actionGetSession } from '@/features/auth/actions'
import { Suspense } from 'react'

export default async function AdminDashboardPage () {
  const { data } = await actionGetSession()
  const usuario = data?.User

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido {usuario?.username} al panel de administración de Zentry</p>
      </div>

      <Suspense fallback={<div>Cargando...</div>}>
        <DashboardCards />
      </Suspense>
    </div>
  )
}
