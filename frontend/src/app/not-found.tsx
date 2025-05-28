import { buttonVariants } from '@/core/components/ui/button'
import Link from 'next/link'

export default function NotFoundPage () {
  return (
    <main className='flex flex-col items-center justify-center gap-5 grow'>
      <h1 className="text-4xl font-bold text-balance">
        Página no encontrada
      </h1>
      <p className='text-xl text-muted-foreground'>Lo sentimos, la página que estás buscando no existe.</p>

      <Link href='/' className={buttonVariants({ variant: 'link' })}>
        Volver al inicio
      </Link>
    </main>
  )
}
