export const formatPrice = (price: string | number): string => {
  const value =
    typeof price === 'string' ? Number(price.replace(/\$/g, '')) : price;

  if (!Number.isFinite(value)) {
    return '$0';
  }

  return `$${value}`;
};
