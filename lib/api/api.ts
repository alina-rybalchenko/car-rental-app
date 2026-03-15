import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
  headers: {
    'Content-Type': 'application/json',
  },
});
