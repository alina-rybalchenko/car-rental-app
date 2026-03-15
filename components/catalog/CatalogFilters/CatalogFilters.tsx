'use client';

import { FormEvent, useEffect } from 'react';
import { useCarsStore } from '@/store/carsStore';
import css from './CatalogFilters.module.css';

type Props = {
  onSearch: () => void;
};

const formatMileageValue = (value: string, prefix: 'From' | 'To') => {
  if (!value) return '';
  return `${prefix} ${Number(value).toLocaleString('en-US')}`;
};

const normalizeMileageInput = (value: string) => value.replace(/\D/g, '');

export default function CatalogFilters({ onSearch }: Props) {
  const filters = useCarsStore((state) => state.filters);
  const brands = useCarsStore((state) => state.brands);
  const setFilter = useCarsStore((state) => state.setFilter);
  const fetchBrands = useCarsStore((state) => state.fetchBrands);
  const resetFilters = useCarsStore((state) => state.resetFilters);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
    resetFilters();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label className={css.label} htmlFor="brand">
          Car brand
        </label>

        <div className={css.selectWrapper}>
          <select
            id="brand"
            className={`${css.select} ${filters.brand ? css.selected : ''}`}
            value={filters.brand}
            onChange={(event) => setFilter('brand', event.target.value)}
          >
            <option value="">Choose a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <svg className={css.icon}>
            <use href="/icons.svg#icon-arrow-down" />
          </svg>
        </div>
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="price">
          Price / 1 hour
        </label>

        <div className={css.selectWrapper}>
          <select
            id="price"
            className={`${css.select} ${filters.rentalPrice ? css.selected : ''}`}
            value={filters.rentalPrice}
            onChange={(event) => setFilter('rentalPrice', event.target.value)}
          >
            <option value="">Choose a price</option>
            {Array.from({ length: 19 }, (_, index) => {
              const price = String((index + 1) * 10);

              return (
                <option key={price} value={price}>
                  {price}
                </option>
              );
            })}
          </select>

          <svg className={css.icon}>
            <use href="/icons.svg#icon-arrow-down" />
          </svg>

          {filters.rentalPrice && (
            <span className={css.priceValue}>To ${filters.rentalPrice}</span>
          )}
        </div>
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="from">
          Car mileage / km
        </label>

        <div className={css.rangeGroup}>
          <input
            id="from"
            className={`${css.input} ${css.inputLeft}`}
            type="text"
            inputMode="numeric"
            placeholder="From"
            value={formatMileageValue(filters.minMileage, 'From')}
            onChange={(event) =>
              setFilter('minMileage', normalizeMileageInput(event.target.value))
            }
          />

          <input
            id="to"
            className={`${css.input} ${css.inputRight}`}
            type="text"
            inputMode="numeric"
            placeholder="To"
            value={formatMileageValue(filters.maxMileage, 'To')}
            onChange={(event) =>
              setFilter('maxMileage', normalizeMileageInput(event.target.value))
            }
          />
        </div>
      </div>

      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
}
