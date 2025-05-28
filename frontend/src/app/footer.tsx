import { buttonVariants } from '@/core/components/ui/button'
import { APP_DESCRIPTION, APP_NAME } from '@/core/lib/constants'
import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

const linkVariant = buttonVariants({
  variant: 'link',
  size: 'sm'
})

export function Footer () {
  return (
    <footer className="border-t bg-zinc-900 -mx-5 px-5 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo y descripción */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">{APP_NAME}</h3>
          <p className="text-gray-400 text-sm">
            {APP_DESCRIPTION}
          </p>
          <div className="flex space-x-4">
            <Link href="#" className={linkVariant}>
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className={linkVariant}>
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className={linkVariant}>
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/productos" className={linkVariant}>
                Productos
              </Link>
            </li>
            <li>
              <Link href="/categorias" className={linkVariant}>
                Categorías
              </Link>
            </li>
            <li>
              <Link href="/ofertas" className={linkVariant}>
                Ofertas
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className={linkVariant}>
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* Atención al cliente */}
        <div>
          <h4 className="font-semibold mb-4">Atención al Cliente</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contacto" className={linkVariant}>
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/envios" className={linkVariant}>
                Envíos
              </Link>
            </li>
            <li>
              <Link href="/devoluciones" className={linkVariant}>
                Devoluciones
              </Link>
            </li>
            <li>
              <Link href="/faq" className={linkVariant}>
                Preguntas Frecuentes
              </Link>
            </li>
          </ul>
        </div>

        {/* Información legal */}
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacidad" className={linkVariant}>
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos" className={linkVariant}>
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link href="/cookies" className={linkVariant}>
                Política de Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
