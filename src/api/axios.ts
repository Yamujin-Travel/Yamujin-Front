import axios from 'axios';
import { BASE_API_URL } from '@/config';
import { useUserStore } from '@/store/modules/users';

export const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAuthInstance = () => {
  const userStore = useUserStore();
  return axios.create({
    baseURL: BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${userStore.token}`,
    },
  });
};
