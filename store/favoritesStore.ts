import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type FavoritesStore = {
  favoriteIds: string[];
  toggleFavorite: (carId: string) => void;
  addFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      toggleFavorite: (carId: string) => {
        const { favoriteIds } = get();
        const isAlreadyFavorite = favoriteIds.includes(carId);

        set({
          favoriteIds: isAlreadyFavorite
            ? favoriteIds.filter((id) => id !== carId)
            : [...favoriteIds, carId],
        });
      },

      addFavorite: (carId: string) => {
        const { favoriteIds } = get();

        if (favoriteIds.includes(carId)) {
          return;
        }

        set({
          favoriteIds: [...favoriteIds, carId],
        });
      },

      removeFavorite: (carId: string) => {
        const { favoriteIds } = get();

        set({
          favoriteIds: favoriteIds.filter((id) => id !== carId),
        });
      },

      isFavorite: (carId: string) => {
        return get().favoriteIds.includes(carId);
      },

      clearFavorites: () => {
        set({ favoriteIds: [] });
      },
    }),
    {
      name: 'car-rental-favorites',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favoriteIds: state.favoriteIds,
      }),
    }
  )
);
