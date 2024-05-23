<template>
  <div class="w-full h-[calc(100vh-7rem)] pl-[7.4375rem] flex">
    <div class="flex flex-col mr-4 pt-28">
      <h1 class="mb-8 text-5xl font-bold leading-relaxed text-left">
        <div class="leading-snug"><span class="text-airbnb">야무진</span> 여행을 위한<br />금융 추천 서비스<br /></div>
        Yamujin Travel !
      </h1>
      <p class="mb-8 text-xl text-left text-semiBlack">
        야무야무야무얌무야무야무야무<br />야무야무야무 무무무무뭄 야무!! 야무야무야무야무뀨뀨<br />무야무야무야무야진
        여행!
      </p>
      <RouterLink
        class="py-3 font-medium transition border-2 rounded-full w-36 bg-background-100 text-airbnb hover:bg-airbnb hover:text-background-100"
        :to="{ name: 'recommend' }"
      >
        추천 받기
      </RouterLink>
    </div>
    <homeIcon name="sample" />
  </div>
</template>

<script setup lang="ts"></script>
