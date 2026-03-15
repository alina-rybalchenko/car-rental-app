import type { Metadata } from 'next';
import CatalogPageContent from '@/components/catalog/CatalogPageContent/CatalogPageContent';

export const metadata: Metadata = {
  title: 'Rental Car Catalog',
  description: 'Browse available rental cars',
};

export default function CatalogPage() {
  return <CatalogPageContent />;
}
