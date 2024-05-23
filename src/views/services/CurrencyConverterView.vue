<template>
  <div class="w-full pb-10">
    <div class="flex">
      <div class="w-full h-[35vw] bg-[#FFCD57] flex items-center justify-center">
        <searchBankIcon name="webMockup" />
      </div>
      <div class="w-[58vw] h-[30vw] bg-background-200 flex flex-col items-center justify-center">
        <exchangeIcon name="exchange" />
        <h3 class="my-5 text-4xl font-bold text-semiBlack">환율 계산기</h3>
        <p class="text-2xl text-semiBlack">다양한 국가의 환율을 계산할 수 있어요</p>
      </div>
    </div>
    <div class="px-32">
      <h1 class="text-[2.25rem] font-medium my-10">환율 계산기</h1>
      <div class="flex items-center justify-around py-14 rounded-3xl bg-background-100 shadow-calccard">
        <div class="flex flex-col w-1/3">
          <p class="mb-2 text-left pl-7">금액</p>
          <div class="relative flex items-center w-full h-24 bg-background-100 rounded-3xl">
            <input type="number" v-model="inputValue" class="w-full h-24 pl-5 pr-24 border rounded-3xl" />
            <v-select
              variant="plain"
              class="absolute right-2 rounded-3xl"
              :items="[
                { title: 'USD', props: { name: 'USD', value: 'USD' } },
                { title: 'EUR', props: { name: 'EUR', value: 'EUR' } },
                { title: 'JPY', props: { name: 'JPY', value: 'JPY' } },
              ]"
              item-text="name"
              item-value="value"
              v-model="selectedCurrency"
            ></v-select>
          </div>
        </div>
        <exchangeIcon name="arrow" />
        <div class="flex flex-col w-1/3">
          <p class="mb-2 text-left pl-7">환전</p>
          <div class="relative flex items-center w-full h-24 pl-5 pr-24 border rounded-3xl">
            <p>{{ exchangeValue }}</p>
            <p class="absolute font-medium right-5">KRW</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useExchangeData } from '@/assets/data/exchange/exchangeData.ts';
import { ref, computed } from 'vue';

const selectedCurrency = ref('USD');
const inputValue = ref(0);

const exchangeRates = {
  USD: 1367,
  EUR: 1480,
  JPY: 871,
};

const exchangeValue = computed(() => {
  const rate = exchangeRates[selectedCurrency.value];
  return inputValue.value * rate;
});
</script>
