<script setup lang="ts">
import CategoryModal from '@/modal/CategoryModal.vue';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/modules/users';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const isModalOpen = ref(false);

const toggleModalOpenStatus = () => {
  isModalOpen.value = !isModalOpen.value;
};
const routeToLogin = () => {
  router.push({ name: 'login' });
};
</script>

<template>
  <CategoryModal v-if="isModalOpen" v-model:isModalOpen="isModalOpen" />
  <div v-if="route.path !== '/login'" class="w-full h-[7rem] flex items-center justify-between px-[34px]">
    <div class="flex items-center gap-8">
      <RouterLink :to="{ name: 'home' }">
        <icon name="nav-logo" />
      </RouterLink>
      <div class="flex gap-8 text-sm font-normal">
        <button class="relative flex items-center gap-2" @click="toggleModalOpenStatus">
          <span :class="isModalOpen ? 'font-bold' : ''">서비스</span>

          <icon
            name="arrow"
            style="transition: transform 0.2s"
            :style="{ transform: isModalOpen ? 'rotate(180deg)' : 'rotate(0)' }"
          />
        </button>
        <RouterLink
          :to="{ name: 'profile' }"
          :class="route.path.startsWith('/profile') ? 'font-bold border-b border-black' : ''"
        >
          마이페이지
        </RouterLink>
        <RouterLink
          :to="{ name: 'PostList', query: { page: 1 } }"
          :class="route.path.startsWith('/posts') ? 'font-bold border-b border-black' : ''"
        >
          커뮤니티
        </RouterLink>
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
