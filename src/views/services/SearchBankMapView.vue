<template>
  <div class="w-full">
    <div class="flex">
      <div class="w-full h-[35vw] bg-[#A7E1EA] flex items-center justify-center">
        <searchBankIcon name="webMockup" />
      </div>
      <div class="w-[58vw] h-[30vw] bg-background-200 flex flex-col items-center justify-center">
        <searchBankIcon name="search" />
        <h3 class="my-5 text-4xl font-bold text-semiBlack">주변 은행 검색</h3>
        <p class="text-2xl text-semiBlack">손쉽게 주변 은행을 찾아보세요 !</p>
      </div>
    </div>
    <div class="flex flex-col items-center px-32 pb-10">
      <div class="flex pt-20 pb-10">
        <div class="flex flex-col mr-[5vw]">
          <label for="city" class="pb-2 pl-8 text-lg font-medium text-left text-smokeBlack">광역시/도</label>
          <select
            name="city"
            id="city"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          ></select>
        </div>
        <div class="flex flex-col mr-[5vw]">
          <label for="address" class="pb-2 pl-8 text-lg font-medium text-left text-smokeBlack focus:text-airbnb"
            >시/군/구</label
          >
          <select
            name="address"
            id="address"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          ></select>
        </div>
        <div class="flex flex-col">
          <label for="bank" class="pb-2 pl-8 text-lg font-medium text-left text-smokeBlack">은행</label>
          <select
            name="bank"
            id="bank"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          ></select>
        </div>
      </div>
      <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" style="width: 100%; border-radius: 1rem">
        <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
      </KakaoMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKakao, ref } from 'vue3-kakao-maps/@utils';
import { KakaoMap, KakaoMapMarker, type KakaoMapMarkerListItem } from 'vue3-kakao-maps';

const MAP_API_KEY = import.meta.env.VITE_APP_KAKAO_MAP_API_KEY;

useKakao(MAP_API_KEY);

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};
</script>
