export interface Filters {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

export interface CarsQueryParams extends Partial<Filters> {
  page?: number;
  limit?: number;
}
