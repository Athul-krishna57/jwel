const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(value) {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  if (Number.isNaN(number)) return '₹0';
  return formatter.format(number);
}
