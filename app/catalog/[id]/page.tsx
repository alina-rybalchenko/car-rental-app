import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getCarById } from '@/lib/api/carsApi';
import CarDetails from '@/components/details/CarDetails/CarDetails';
import BookingForm from '@/components/details/BookingForm/BookingForm';

import css from './page.module.css';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    return {
      title: 'Car not found | Car Rental',
      description: 'The requested car could not be found.',
    };
  }

  return {
    title: `${car.brand} ${car.model} | Car Rental`,
    description: car.description,
  };
}

export default async function CatalogItemPage({ params }: PageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <main className={`container ${css.page}`}>
      <div className={css.grid}>
        <div className={css.leftColumn}>
          <div className={css.imageBlock}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={640}
              height={512}
              className={css.image}
              priority
            />
          </div>

          <BookingForm />
        </div>

        <div className={css.rightColumn}>
          <CarDetails car={car} />
        </div>
      </div>
    </main>
  );
}
