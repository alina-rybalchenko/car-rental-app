export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('uk-UA').format(mileage);
}
