export default function CheckoutPage () {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground mb-8">
            Esta página está en construcción. Aquí se implementará el proceso de checkout completo.
          </p>
          <div className="space-y-4">
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Próximas funcionalidades:</h2>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li>• Formulario de datos de envío</li>
                <li>• Métodos de pago</li>
                <li>• Confirmación de pedido</li>
                <li>• Integración con pasarelas de pago</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
