<template>
  <div class="w-full h-[calc(100vh-7rem)] pl-[7.4375rem] flex">
    <div class="flex flex-col mr-4 pt-28">
      <h1 class="mb-8 text-5xl font-bold leading-relaxed text-left">
        <div class="leading-snug"><span class="text-airbnb">야무진</span> 여행을 위한<br />금융 추천 서비스<br /></div>
        Yamujin Travel !
      </h1>
      <p class="mb-8 text-xl text-left text-semiBlack">
        여행을 계획하고 있으신가요?<br /><span class="text-airbnb">야무진 트레블</span>과 함께라면 여행 계획에 맞는
        상품을<br />추천받고 가입할 수 있습니다 !<br /><br />지금 바로 나에게 맞는 상품을 추천 받아보세요 !
      </p>
      <RouterLink
        class="py-3 font-medium transition border-2 rounded-full w-36 bg-background-100 text-airbnb hover:bg-airbnb hover:text-background-100"
        :to="{ name: 'login' }"
      >
        추천 받기
      </RouterLink>
    </div>
    <homeIcon name="sample" />
  </div>
</template>

<script setup lang="ts"></script>
