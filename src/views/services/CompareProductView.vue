<template>
  <div class="flex flex-col gap-[8rem] w-full">
    <div class="flex w-full">
      <div class="w-full h-[35vw] bg-[#A7E1EA] flex items-center justify-center">
        <icon name="compare-mockup" />
      </div>
      <div class="w-[58vw] h-[30vw] bg-background-200 flex flex-col items-center justify-center">
        <icon name="compare-bank-logo" />
        <h3 class="my-5 text-4xl font-bold text-semiBlack">예적금 상품 비교</h3>
        <p class="text-2xl text-semiBlack">은행별 예적금 금융 상품의 금리를 비교하세요</p>
        <p class="text-2xl text-semiBlack">마음에 드는 상품은 바로 가입할 수 있습니다 !</p>
      </div>
    </div>
    <div class="flex flex-col w-full gap-[2rem]">
      <div class="flex w-full h-[5rem] pl-8 border-b border-gray">
        <div
          :class="isDeposit ? 'border-b-2 border-airbnb font-bold text-lg' : 'font-regular text-lg'"
          class="w-[16.625rem] h-full flex items-center justify-center cursor-pointer"
          @click="isDeposit = true"
        >
          <span>정기예금</span>
        </div>
        <div
          :class="!isDeposit ? 'border-b-2 border-airbnb font-bold text-lg' : 'font-regular text-lg'"
          class="w-[16.625rem] h-full flex items-center justify-center cursor-pointer"
          @click="isDeposit = false"
        >
          <span>정기적금</span>
        </div>
      </div>
      <DepositList v-if="isDeposit" />
      <SavingList v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import DepositList from '@/components/services/compare/DepositList.vue';
import SavingList from '@/components/services/compare/SavingList.vue';
import { ref } from 'vue';
const isDeposit = ref(true);
</script>
