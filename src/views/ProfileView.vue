<template>
  <div class="flex justify-center w-full min-w-max">
    <div class="flex flex-col w-[100rem] h-full gap-[4rem] px-[7.4375rem] py-[4rem]">
      <ProfileCard />
      <div class="flex flex-col items-start w-full gap-[4rem]">
        <h1 class="text-[2.25rem] font-medium border-b-[3px] border-[#222222] ml-[2rem]">가입한 상품</h1>
        <div class="flex justify-between w-full">
          <div class="w-[58.5rem] h-[24rem] border border-gray rounded-2xl"></div>
          <profileIcon name="travel" />
        </div>
      </div>
      <div class="flex flex-col items-start w-full gap-[4rem]">
        <h1 class="text-[2.25rem] font-medium border-b-[3px] border-[#222222] ml-[2rem]">가입한 상품 금리</h1>
        <div class="flex justify-center w-full">
          <img src="@/assets/images/chart.jpg" alt="chart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileCard from '@/components/profile/ProfileCard.vue';
</script>
