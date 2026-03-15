'use client';

import Link from 'next/link';
import Image from 'next/image';

import type { Car } from '@/types/car';
import { formatMileage } from '@/lib/utils/formatMileage';
import { formatPrice } from '@/lib/utils/formatPrice';

import FavoriteButton from '../FavoriteButton/FavoriteButton';
import css from './CarCard.module.css';

type Props = {
  car: Car;
};

export default function CarCard({ car }: Props) {
  const addressParts = car.address.split(',');
  const city = addressParts[1]?.trim() ?? '';
  const country = addressParts[2]?.trim() ?? '';

  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          className={css.image}
        />

        <FavoriteButton carId={car.id} />
      </div>

      <div className={css.info}>
        <div className={css.top}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{' '}
            {car.year}
          </h3>

          <p className={css.price}>{formatPrice(car.rentalPrice)}</p>
        </div>

        <div className={css.meta}>
          <div className={css.metaRow}>
            <span>{city}</span>
            <span>{country}</span>
            <span>{car.rentalCompany}</span>
          </div>

          <div className={css.metaRow}>
            <span>{car.type}</span>
            <span>{formatMileage(car.mileage)} km</span>
          </div>
        </div>

        <Link href={`/catalog/${car.id}`} className="button">
          Read more
        </Link>
      </div>
    </li>
  );
}
