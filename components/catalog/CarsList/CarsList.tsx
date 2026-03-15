'use client';

import type { Car } from '@/types/car';
import CarCard from '../CarCard/CarCard';
import css from './CarsList.module.css';

type Props = {
  cars: Car[];
};

export default function CarsList({ cars }: Props) {
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </ul>
  );
}
