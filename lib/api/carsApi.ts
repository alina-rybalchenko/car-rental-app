import { api } from './api';
import { Car, CarsResponse } from '@/types/car';
import { Filters } from '@/types/filters';

type GetCarsParams = Partial<Filters> & {
  page?: number;
  limit?: number;
};

export const getCars = async (params: GetCarsParams): Promise<CarsResponse> => {
  const { data } = await api.get('/cars', { params });
  return data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get(`/cars/${id}`);
  return data;
};

export const getBrands = async (): Promise<string[]> => {
  const { data } = await api.get('/brands');
  return data;
};
