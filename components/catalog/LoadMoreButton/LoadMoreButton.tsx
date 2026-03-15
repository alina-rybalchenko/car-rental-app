'use client';

import css from './LoadMoreButton.module.css';

type Props = {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function LoadMoreButton({
  onClick,
  disabled = false,
  isLoading = false,
}: Props) {
  return (
    <button
      type="button"
      className={css.button}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  );
}
