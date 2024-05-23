import { instance } from '@/api/axios';
import { API } from '@/config';

export const useExchangeData = async () => {
  try {
    const data = await instance.get(`${API.EXCHANGE}/exchange/`);

    if (data) {
      return data;
    } else {
      throw new Error(`Failed to get exchange data: ${data}`);
    }
  } catch (err) {
    console.error('Failed to get exchange data:', err);
  }
};
