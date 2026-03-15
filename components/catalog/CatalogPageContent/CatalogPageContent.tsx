'use client';

import { useEffect } from 'react';
import { useCarsStore } from '@/store/carsStore';

import CatalogFilters from '../CatalogFilters/CatalogFilters';
import CarsList from '../CarsList/CarsList';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import CarsSkeleton from '../CarsSkeleton/CarsSkeleton';

import css from './CatalogPageContent.module.css';

export default function CatalogPageContent() {
  const cars = useCarsStore((state) => state.cars);
  const fetchCars = useCarsStore((state) => state.fetchCars);
  const loadMoreCars = useCarsStore((state) => state.loadMoreCars);
  const isLoading = useCarsStore((state) => state.isLoading);
  const isLoadingMore = useCarsStore((state) => state.isLoadingMore);
  const hasMore = useCarsStore((state) => state.hasMore);
  const error = useCarsStore((state) => state.error);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <main className={`container pageSection ${css.page}`}>
      <CatalogFilters onSearch={fetchCars} />

      {isLoading ? (
        <CarsSkeleton />
      ) : error ? (
        <p className={css.message}>{error}</p>
      ) : cars.length === 0 ? (
        <p className={css.message}>No cars found.</p>
      ) : (
        <>
          <CarsList cars={cars} />

          {hasMore && (
            <LoadMoreButton onClick={loadMoreCars} isLoading={isLoadingMore} />
          )}
        </>
      )}
    </main>
  );
}
