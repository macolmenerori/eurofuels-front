export function formatPrice(value: string, locale: string): string {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return '—';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n);
}
