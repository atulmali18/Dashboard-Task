export function formatCurrency(value, currency = 'USD', locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  } catch {
    return `$${Number(value || 0).toLocaleString()}`
  }
}


