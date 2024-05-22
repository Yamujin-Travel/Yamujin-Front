<template>
  <div class="w-full h-[15rem] flex items-center justify-between shadow-profilecard min-w-max">
    <div class="px-[7.3125rem] flex items-center space-x-8">
      <profileIcon name="profile1" />
      <div class="flex flex-col items-start gap-5">
        <span class="text-3xl font-normal">{{ userStore.userInfo.nickname }}</span>
        <button class="h-8 border border-airbnb text-sm font-medium text-airbnb rounded-[30px] px-[30px]">
          프로필 랜덤 돌리기 🎲
        </button>
      </div>
    </div>
    <div class="border-l h-[10rem] w-[23.9375rem] border-slate-200 pl-8 flex items-center text-base space-x-[3.375rem]">
      <div class="flex flex-col gap-[1.75rem] items-start font-medium">
        <span>회원 번호</span>
        <span>아이디</span>
        <span>이메일</span>
      </div>
      <div class="flex flex-col gap-[1.75rem] items-start font-normal">
        <span>{{ userStore.userInfo.id }}</span>
        <span>{{ userStore.userInfo.username }}</span>
        <span>{{ userStore.userInfo.email }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/users';

const userStore = useUserStore();
</script>
