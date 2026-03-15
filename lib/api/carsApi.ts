import { AxiosResponse } from 'axios';
import { api } from './api';
import type { Car, CarsResponse } from '@/types/car';
import type { CarsQueryParams } from '@/types/filters';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

const normalizeCar = (raw: unknown): Car => {
  const car = isRecord(raw) ? raw : {};

  return {
    id: String(car.id ?? car._id ?? ''),
    brand: String(car.brand ?? ''),
    model: String(car.model ?? ''),
    year: Number(car.year ?? 0),
    type: String(car.type ?? ''),
    img: String(car.img ?? ''),
    description: String(car.description ?? ''),
    rentalPrice: String(car.rentalPrice ?? ''),
    rentalCompany: String(car.rentalCompany ?? ''),
    address: String(car.address ?? ''),
    mileage: Number(car.mileage ?? 0),
    fuelConsumption: String(car.fuelConsumption ?? ''),
    engineSize: String(car.engineSize ?? ''),
    accessories: Array.isArray(car.accessories)
      ? car.accessories.map(String)
      : [],
    functionalities: Array.isArray(car.functionalities)
      ? car.functionalities.map(String)
      : [],
    rentalConditions: Array.isArray(car.rentalConditions)
      ? car.rentalConditions.map(String)
      : [],
  };
};

const normalizeCarsResponse = (
  response: AxiosResponse<unknown>,
  page: number,
  limit: number
): CarsResponse => {
  const payload = response.data;
  const root = isRecord(payload) ? payload : {};

  const rawCars = Array.isArray(root.cars)
    ? root.cars
    : Array.isArray(root.items)
      ? root.items
      : Array.isArray(root.data)
        ? root.data
        : [];

  const cars = rawCars.map(normalizeCar);

  const totalPages =
    typeof root.totalPages === 'number'
      ? root.totalPages
      : isRecord(root.pagination) &&
          typeof root.pagination.totalPages === 'number'
        ? root.pagination.totalPages
        : 1;

  const totalCars =
    typeof root.totalCars === 'number'
      ? root.totalCars
      : typeof root.total === 'number'
        ? root.total
        : undefined;

  return {
    cars,
    totalPages,
    page,
    limit,
    totalCars,
  };
};

const buildCarsParams = (
  params: CarsQueryParams
): Record<string, string | number> => {
  const result: Record<string, string | number> = {};

  const brand = params.brand?.trim();
  const rentalPrice = params.rentalPrice?.trim();
  const minMileage = params.minMileage?.trim();
  const maxMileage = params.maxMileage?.trim();

  if (brand) {
    result.brand = brand;
  }

  if (rentalPrice) {
    result.rentalPrice = rentalPrice;
  }

  if (minMileage) {
    result.minMileage = minMileage;
  }

  if (maxMileage) {
    result.maxMileage = maxMileage;
  }

  if (typeof params.page === 'number') {
    result.page = params.page;
  }

  if (typeof params.limit === 'number') {
    result.limit = params.limit;
  }

  return result;
};

export const getCars = async (
  params: CarsQueryParams = {}
): Promise<CarsResponse> => {
  const page = params.page ?? 1;
  const limit = params.limit ?? 12;

  const queryParams = buildCarsParams({
    ...params,
    page,
    limit,
  });

  const response = await api.get('/cars', {
    params: queryParams,
  });

  return normalizeCarsResponse(response, page, limit);
};

export const getCarById = async (id: string): Promise<Car | null> => {
  try {
    const response = await api.get(`/cars/${id}`);
    const payload = response.data;

    if (isRecord(payload) && isRecord(payload.data)) {
      return normalizeCar(payload.data);
    }

    return normalizeCar(payload);
  } catch {
    return null;
  }
};

export const getBrands = async (): Promise<string[]> => {
  const response = await api.get('/brands');
  const payload = response.data;

  if (Array.isArray(payload)) {
    return payload.map(String);
  }

  if (isRecord(payload) && Array.isArray(payload.data)) {
    return payload.data.map(String);
  }

  if (isRecord(payload) && Array.isArray(payload.brands)) {
    return payload.brands.map(String);
  }

  return [];
};
