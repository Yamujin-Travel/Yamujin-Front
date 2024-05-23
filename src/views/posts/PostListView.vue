<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/store/modules/posts';
import { useUserStore } from '@/store/modules/users';

const postStore = usePostStore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const queryPage = route.query?.page;
const page = ref(Number(queryPage));

watch(page, () => {
  postStore.getPosts(page.value);
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  router.push({ name: 'PostList', query: { page: page.value } });
});

const clickTr = (postId: number) => {
  router.push({ name: 'PostDetail', params: { id: postId }, query: { page: page.value } });
};

onMounted(() => {
  postStore.getPosts(page.value);
});
</script>

<template>
  <div class="flex flex-col w-full gap-8 px-[10rem] py-[5rem]">
    <div class="d-flex justify-space-between align-end">
      <h1 class="text-3xl font-medium">금융상품 <span class="text-airbnb">자유</span> 게시판</h1>
      <v-btn v-if="userStore.isAuthenticated" variant="flat" color="#FD5C63" :to="{ name: 'PostCreate' }"
        >글 쓰기</v-btn
      >
    </div>
    <v-table class="table elevation-6">
      <thead>
        <tr>
          <th class="text-left">제목</th>
          <th class="text-left">작성자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in postStore.posts" :key="post?.id" @click="clickTr(post?.id)">
          <td class="text-left">{{ post?.title }}</td>
          <td class="text-left" width="40%">
            <div class="flex items-center w-full space-x-4">
              <icon :name="`profile${post?.id}`" />
              <span>{{ post?.user?.nickname }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="page"
      :length="postStore.totalPage"
      :total-visible="6"
      color="#1089FF"
      rounded="circle"
    ></v-pagination>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  margin: 2rem auto;
}

.container > * {
  margin: 1rem;
}

.table {
  /* border: 1px solid gray; */
  border-radius: 5px;
}

tbody > tr {
  transition: 200ms;
  cursor: pointer;
}

tbody > tr:hover {
  background-color: rgb(247, 250, 253);
}
</style>
