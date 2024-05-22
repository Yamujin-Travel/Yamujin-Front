<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/modules/users';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const routeToLogin = () => {
  router.push({ name: 'login' });
};
</script>

<template>
  <div v-if="route.path !== '/login'" class="w-full h-[7rem] flex items-center justify-between px-[34px]">
    <div class="flex items-center gap-8">
      <RouterLink :to="{ name: 'home' }">
        <icon name="nav-logo" />
      </RouterLink>
      <div class="flex h-6 gap-8 text-sm font-normal">
        <RouterLink :to="{ name: 'recommend' }"> 서비스 </RouterLink>
        <RouterLink :to="{ name: 'profile' }"> 마이페이지 </RouterLink>
        <RouterLink :to="{ name: 'PostList', query: { page: 1 } }"> 커뮤니티 </RouterLink>
      </div>
    </div>
    <button
      v-if="!userStore.isAuthenticated"
      class="w-[6rem] h-10 rounded-[10px] bg-[#FD5C63] text-sm font-normal text-white"
      @click="routeToLogin"
    >
      <span class="text-center">시작하기</span>
    </button>
  </div>
</template>

<style scoped></style>
