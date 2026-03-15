import type { Car } from '@/types/car';
import { formatMileage } from '@/lib/utils/formatMileage';
import { formatPrice } from '@/lib/utils/formatPrice';

import css from './CarDetails.module.css';

type Props = {
  car: Car;
};

const parseMinimumAge = (conditions: string[]) => {
  const minAgeCondition = conditions.find((condition: string) =>
    condition.toLowerCase().includes('minimum age')
  );

  if (!minAgeCondition) {
    return null;
  }

  const age = minAgeCondition.match(/\d+/)?.[0];
  return age ?? null;
};

const getShortId = (id: string) => id.slice(0, 4);

export default function CarDetails({ car }: Props) {
  const [, city = '', country = ''] = car.address.split(',');
  const location = `${city.trim()}, ${country.trim()}`;

  const minAge = parseMinimumAge(car.rentalConditions);

  const conditions = car.rentalConditions.filter(
    (condition: string) => !condition.toLowerCase().includes('minimum age')
  );

  const features = [...car.accessories, ...car.functionalities];

  return (
    <section className={css.section}>
      <div className={css.header}>
        <div className={css.titleRow}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h1>

          <p className={css.id}>Id: {getShortId(car.id)}</p>
        </div>

        <div className={css.metaRow}>
          <span className={css.metaItem}>
            <svg className={css.metaIcon}>
              <use href="/icons.svg#icon-location" />
            </svg>
            {location}
          </span>

          <span className={css.metaItem}>
            Mileage: {formatMileage(car.mileage)} km
          </span>
        </div>

        <p className={css.price}>{formatPrice(car.rentalPrice)}</p>
      </div>

      <p className={css.description}>{car.description}</p>

      <div className={css.block}>
        <h2 className={css.subtitle}>Rental Conditions:</h2>

        <ul className={css.list}>
          {minAge && (
            <li className={css.listItem}>
              <svg className={css.listIcon}>
                <use href="/icons.svg#icon-check-circle" />
              </svg>
              Minimum age : {minAge}
            </li>
          )}

          {conditions.map((condition: string, index: number) => (
            <li key={`${condition}-${index}`} className={css.listItem}>
              <svg className={css.listIcon}>
                <use href="/icons.svg#icon-check-circle" />
              </svg>
              {condition}
            </li>
          ))}
        </ul>
      </div>

      <div className={css.block}>
        <h2 className={css.subtitle}>Car Specifications:</h2>

        <ul className={css.list}>
          <li className={css.listItem}>
            <svg className={css.listIcon}>
              <use href="/icons.svg#icon-calendar" />
            </svg>
            Year: {car.year}
          </li>

          <li className={css.listItem}>
            <svg className={css.listIcon}>
              <use href="/icons.svg#icon-car" />
            </svg>
            Type: {car.type}
          </li>

          <li className={css.listItem}>
            <svg className={css.listIcon}>
              <use href="/icons.svg#icon-fuel-pump" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>

          <li className={css.listItem}>
            <svg className={css.listIcon}>
              <use href="/icons.svg#icon-gear" />
            </svg>
            Engine Size: {car.engineSize}
          </li>
        </ul>
      </div>

      <div className={css.block}>
        <h2 className={css.subtitle}>Accessories and functionalities:</h2>

        <ul className={css.list}>
          {features.map((item: string, index: number) => (
            <li key={`${item}-${index}`} className={css.listItem}>
              <svg className={css.listIcon}>
                <use href="/icons.svg#icon-check-circle" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
