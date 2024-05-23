import { ref } from 'vue';
import { defineStore } from 'pinia';
import { instance } from '@/api/axios';

interface User {
  nickname: string;
}

interface Post {
  id: number;
  title: string;
  user: User;
}

export const usePostStore = defineStore(
  'posts',
  () => {
    const posts = ref([] as Post[]);
    const totalPage = ref(1);
    const nextLink = ref('');
    const prevLink = ref('');

    const getPosts = function (pageNum = 1) {
      const url = pageNum === 1 ? `/board/` : `/board/?page=${pageNum}`;
      instance
        .get(url)
        .then((res) => {
          posts.value = res.data.results;
          totalPage.value = Math.ceil(res.data.count / 10);
          nextLink.value = res.data.next;
          prevLink.value = res.data.previous;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return { posts, totalPage, nextLink, prevLink, getPosts };
  },
  { persist: true },
);
