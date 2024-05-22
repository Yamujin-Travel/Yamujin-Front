import axios from 'axios';
import { BASE_API_URL } from '@/config';

export const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Token ${getToken('token')}`,
  },
});
