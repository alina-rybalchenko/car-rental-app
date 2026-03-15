export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  img: string;
  description: string;
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  mileage: number;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalConditions: string[];
}

export interface CarsResponse {
  cars: Car[];
  totalPages: number;
  page: number;
  limit: number;
  totalCars?: number;
}
