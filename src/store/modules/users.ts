import { instance } from './../../api/axios';
import { instance } from '../../api/axios';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import axios from 'axios';
import { instance, authInstance } from '@/api/axios';
import { API } from '@/config';

export const useUserStore = defineStore(
  'users',
  () => {
    const API_URL = API.USERS;
    const router = useRouter();
    const token = ref(localStorage.getItem('token') || null);
    const isAuthenticated = computed(() => {
      return token.value === null ? false : true;
    });
    const userInfo = ref();

    const getUserInfo = async (username: string) => {
      try {
        const response = await authInstance.get(`${API_URL}/${username}/info/`);
        if (response.status === 200) {
          userInfo.value = response.data;
          return true;
        } else {
          throw new Error(`Failed to get user info: ${response.status}`);
        }
      } catch (err) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', err);
      }
    };

    const signUp = async (payload) => {
      const { username, nickname, email, password1, password2 } = payload;

      try {
        const response = await instance.post(`${API_URL}/registration/`, {
          username,
          nickname,
          email,
          password1,
          password2,
        });

        if (response.status === 200) {
          await logIn({ username, password: password1 });
        } else {
          throw new Error(`Failed to sign up: ${response.status}`);
        }
      } catch (err) {
        console.error('회원가입에 실패했습니다:', err);
      }
    };

    const logIn = async (payload) => {
      const { username, password } = payload;

      try {
        const response = await instance.post(`${API_URL}/login/`, {
          username,
          password,
        });

        if (response.status === 200) {
          token.value = response.data.key;
          const isSuccess = await getUserInfo(username);
          if (isSuccess) {
            router.push({ name: 'home' });
          } else {
            throw new Error('Failed to get user info');
          }
        } else {
          throw new Error(`Login failed: ${response.status}`);
        }
      } catch (err) {
        console.error('로그인에 실패했습니다:', err);
      }
    };

    const logOut = async () => {
      try {
        const response = await instance.post(`${API_URL}/logout/`);

        if (response.status === 200) {
          token.value = null;
          userInfo.value = [];
          router.push({ name: 'home' });
        } else {
          throw new Error(`Logout failed: ${response.status}`);
        }
      } catch (err) {
        console.error('로그아웃에 실패했습니다:', err);
      }
    };

    return {
      token,
      isAuthenticated,
      userInfo,
      getUserInfo,
      signUp,
      logIn,
      logOut,
    };
  },
  { persist: true },
);
