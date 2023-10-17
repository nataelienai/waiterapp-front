export function formatCurrency(value: number) {
  const currencyFormatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  return currencyFormatter.format(value);
}
