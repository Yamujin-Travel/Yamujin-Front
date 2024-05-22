import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { instance, getAuthInstance } from '@/api/axios';
import { API } from '@/config';

export const useUserStore = defineStore(
  'users',
  () => {
    const router = useRouter();
    const token = ref(localStorage.getItem('token') || null);
    const isAuthenticated = computed(() => {
      return token.value === null ? false : true;
    });
    const userInfo = ref();

    onMounted(async () => {
      const item = localStorage.getItem('users');

      if (item) {
        const parsedItem = JSON.parse(item);
        token.value = parsedItem.token;
        userInfo.value = { ...parsedItem.userInfo };
      }
    });

    const getUserInfo = async (username: string) => {
      try {
        const authInstance = getAuthInstance();
        const response = await authInstance.get(`${API.USERS}/${username}/info/`);
        if (response) {
          userInfo.value = response.data;
          userInfo.value.profile_img = Math.floor(Math.random() * 9) + 1;
          return true;
        } else {
          throw new Error(`Failed to get user info: ${response}`);
        }
      } catch (err) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', err);
      }
    };

    const signUp = async (payload: any) => {
      const { username, nickname, email, password1, password2 } = payload;

      try {
        const response = await instance.post(`${API.ACCOUNTS}/registration/`, {
          username,
          nickname,
          email,
          password1,
          password2,
        });

        if (response.status === 204) {
          await logIn({ username, password: password1 });
        } else {
          throw new Error(`Failed to sign up: ${response.status}`);
        }
      } catch (err) {
        console.error('회원가입에 실패했습니다:', err);
      }
    };

    const logIn = async (payload: any) => {
      const { username, password } = payload;

      try {
        const response = await instance.post(`${API.ACCOUNTS}/login/`, {
          username,
          password,
        });
        if (response) {
          token.value = response.data.key;
          // console.log(token);
          const isSuccess = await getUserInfo(username);
          if (isSuccess) {
            router.push({ name: 'home' });
          } else {
            throw new Error('Failed to get user info');
          }
        } else {
          throw new Error(`Login failed: ${response}`);
        }
      } catch (err) {
        console.error('로그인에 실패했습니다:', err);
      }
    };

    const logOut = async () => {
      try {
        const response = await instance.post(`${API.ACCOUNTS}/logout/`);

        if (response.status === 200) {
          token.value = null;
          userInfo.value = [];
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
