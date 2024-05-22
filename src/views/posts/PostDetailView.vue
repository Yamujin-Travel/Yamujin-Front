<template>
  <div>
    <h1 class="text-xl font-bold text-red-500">커뮤니티 게시물 상세 페이지입니다. {{ postId }} 번째 게시물입니다.</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const postId = route.params.id;
</script>
