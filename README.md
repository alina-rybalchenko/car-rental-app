# Car Rental App 🚗

Frontend web application for browsing and renting cars.  
The project allows users to view available vehicles, filter them by different criteria, add cars to favorites, and submit a rental request.

---

## Live Demo

Live page:

Repository:  
https://github.com/alina-rybalchenko/car-rental-app

---

## Technologies Used

- Next.js (App Router)
- TypeScript
- Axios
- Zustand
- CSS Modules

---

## Features

- Home page with banner and call to action
- Catalog page with list of available cars
- Filtering cars by:
  - brand
  - price
  - mileage (from / to)
- Backend filtering via API
- Pagination with **Load More** button
- Add cars to favorites
- Favorites persist after page reload
- Car details page
- Rental form with success notification
- Loading indicators for async requests

---

## Project Structure

app/
page.tsx
catalog/
page.tsx
[id]/page.tsx

components/
catalog/
details/
home/
shared/

lib/
api/
utils/

store/
carsStore.ts
favoritesStore.ts

types/
car.ts
filters.ts

---

## API

The application uses the provided backend API:

https://car-rental-api.goit.global/api-docs/

---

## Installation

Clone the repository:

```bash
git clone https://github.com/alina-rybalchenko/car-rental-app.git

Install dependencies:

npm install

Run the development server:

npm run dev

Open in browser:

http://localhost:3000

Author

Alina Rybalchenko

```
