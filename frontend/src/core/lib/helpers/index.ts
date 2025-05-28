//* Strings
export const formatAmount = (amount: number): string => {
  const LOCALE = 'es-PE'
  const CURRENCY = 'PEN'

  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
  }).format(amount)
}
