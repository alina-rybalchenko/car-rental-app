'use client';

import { useFavoritesStore } from '@/store/favoritesStore';
import css from './FavoriteButton.module.css';

type Props = {
  carId: string;
};

export default function FavoriteButton({ carId }: Props) {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = favoriteIds.includes(carId);

  return (
    <button
      type="button"
      className={css.button}
      onClick={() => toggleFavorite(carId)}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`${css.icon} ${isFavorite ? css.active : ''}`}
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path
          d="M16 28s-11-6.93-11-16.1C5 6.98 8.13 4 12.1 4c2.29 0 4.47 1.06 5.9 2.73C19.43 5.06 21.61 4 23.9 4 27.87 4 31 6.98 31 11.9 31 21.07 20 28 16 28z"
          className={css.heartPath}
        />
      </svg>
    </button>
  );
}
