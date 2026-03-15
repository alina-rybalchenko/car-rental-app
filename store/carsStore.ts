import { create } from 'zustand';
import { getCars, getBrands } from '@/lib/api/carsApi';
import type { Car } from '@/types/car';
import type { CarsQueryParams, Filters } from '@/types/filters';

const initialFilters: Filters = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

type CarsStore = {
  cars: Car[];
  brands: string[];
  filters: Filters;

  page: number;
  limit: number;
  totalPages: number;
  totalCars: number | null;

  isLoading: boolean;
  isLoadingMore: boolean;
  isBrandsLoading: boolean;
  error: string | null;

  hasMore: boolean;

  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  setFilters: (nextFilters: Partial<Filters>) => void;
  resetFilters: () => void;

  fetchBrands: () => Promise<void>;
  fetchCars: () => Promise<void>;
  loadMoreCars: () => Promise<void>;

  clearCars: () => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
};

export const useCarsStore = create<CarsStore>((set, get) => ({
  cars: [],
  brands: [],
  filters: initialFilters,

  page: 1,
  limit: 12,
  totalPages: 1,
  totalCars: null,

  isLoading: false,
  isLoadingMore: false,
  isBrandsLoading: false,
  error: null,

  hasMore: false,

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  setFilters: (nextFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...nextFilters,
      },
    }));
  },

  resetFilters: () => {
    set({
      filters: initialFilters,
    });
  },

  fetchBrands: async () => {
    const { isBrandsLoading } = get();

    if (isBrandsLoading) {
      return;
    }

    set({
      isBrandsLoading: true,
      error: null,
    });

    try {
      const brands = await getBrands();

      set({
        brands,
        isBrandsLoading: false,
      });
    } catch (error) {
      set({
        isBrandsLoading: false,
        error: getErrorMessage(error),
      });
    }
  },

  fetchCars: async () => {
    const { filters, limit, isLoading } = get();

    if (isLoading) {
      return;
    }

    set({
      cars: [],
      page: 1,
      totalPages: 1,
      totalCars: null,
      hasMore: false,
      isLoading: true,
      isLoadingMore: false,
      error: null,
    });

    try {
      const params: CarsQueryParams = {
        brand: filters.brand || undefined,
        rentalPrice: filters.rentalPrice || undefined,
        minMileage: filters.minMileage || undefined,
        maxMileage: filters.maxMileage || undefined,
        page: 1,
        limit,
      };

      const response = await getCars(params);

      set({
        cars: response.cars,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
        totalCars: response.totalCars ?? null,
        hasMore: response.page < response.totalPages,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: getErrorMessage(error),
      });
    }
  },

  loadMoreCars: async () => {
    const { filters, page, limit, totalPages, isLoadingMore, isLoading } =
      get();

    if (isLoading || isLoadingMore || page >= totalPages) {
      return;
    }

    const nextPage = page + 1;

    set({
      isLoadingMore: true,
      error: null,
    });

    try {
      const params: CarsQueryParams = {
        brand: filters.brand || undefined,
        rentalPrice: filters.rentalPrice || undefined,
        minMileage: filters.minMileage || undefined,
        maxMileage: filters.maxMileage || undefined,
        page: nextPage,
        limit,
      };

      const response = await getCars(params);

      set((state) => ({
        cars: [...state.cars, ...response.cars],
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
        totalCars: response.totalCars ?? state.totalCars,
        hasMore: response.page < response.totalPages,
        isLoadingMore: false,
      }));
    } catch (error) {
      set({
        isLoadingMore: false,
        error: getErrorMessage(error),
      });
    }
  },

  clearCars: () => {
    set({
      cars: [],
      page: 1,
      totalPages: 1,
      totalCars: null,
      hasMore: false,
      error: null,
    });
  },
}));
