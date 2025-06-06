import { Button } from "@/core/components/ui/button"
import Link from "next/link"

export function HeroSection () {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            Lo mejor de la moda
            <span className="block text-muted-foreground">para el día a día</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra colección cuidadosamente seleccionada de prendas atemporales que combinan estilo, comodidad y calidad excepcional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href="/productos">Explorar Colección</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
