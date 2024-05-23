<script setup lang="ts">
import { ref, onMounted, createCommentVNode } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/users';
import GoToBack from '@/components/GoToBack.vue';
import { instance, getAuthInstance } from '@/api/axios';

const authInstance = getAuthInstance();
const route = useRoute();
const postId = route.params.id;
const router = useRouter();
const pageNum = route.query.page;

const post = ref();
const comments = ref();

const dialog = ref(false);
const isPostedUser = ref(false);
const commentContent = ref('');
const updatedCommentId = ref();
const updatedCommentContent = ref('');

const userStore = useUserStore();

const getComments = function () {
  instance
    .get(`/board/${postId}/comments/`)
    .then((res) => {
      comments.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  instance
    .get(`/board/${postId}/`)
    .then((res) => {
      post.value = res.data;
      post.value.content = res.data.content.replaceAll('\n', '<br />');

      if (post.value.user.username === userStore.userInfo.username) {
        isPostedUser.value = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  getComments();
});

const deletePost = function () {
  const answer = window.confirm('정말 삭제하시겠습니까?');

  if (answer) {
    authInstance
      .delete(`/board/${postId}/`)
      .then((res) => {
        router.push({ name: 'PostList', query: { page: pageNum } });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const createComment = function () {
  authInstance
    .post(`/board/${postId}/comments/`, {
      content: commentContent.value,
    })
    .then((res) => {
      comments.value.push(res.data);
      commentContent.value = '';
      setTimeout(() => {
        window.scrollTo({ left: 0, top: document.body.scrollHeight + 100, behavior: 'smooth' });
      }, 200);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteComment = function (commentId: any) {
  const answer = window.confirm('정말 삭제하시겠습니까?');

  if (answer) {
    authInstance
      .delete(`/board/${postId}/comments/${commentId}/`)
      .then((res) => {
        comments.value = comments.value.filter((comment: any) => comment.id != commentId);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const close = function () {
  dialog.value = false;
};

const editComment = function (commentId: any, value: any) {
  updatedCommentId.value = commentId;
  updatedCommentContent.value = value;

  dialog.value = true;
};

const save = function () {
  authInstance
    .put(`/board/${postId}/comments/${updatedCommentId.value}/`, {
      content: updatedCommentContent.value,
    })
    .then((res) => {
      getComments();
      dialog.value = false;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div>
    <div v-if="post" class="w-full flex flex-col px-[10rem] py-[5rem] gap-8">
      <div class="flex justify-start">
        <GoToBack :goName="{ name: 'PostList', query: { page: pageNum } }" />
      </div>
      <header class="flex flex-col gap-6">
        <p class="text-lg font-bold text-start">{{ post.id }}번째 게시물</p>
        <div class="d-flex justify-space-between align-center">
          <h1>제목: {{ post.title }}</h1>
          <div class="flex items-center">
            <p class="mr-2 text-sm">작성자 :</p>
            <icon :name="`profile${post?.id}`" />
            <p class="ml-2 text-sm">{{ post.user.nickname }}</p>
          </div>
        </div>

        <div class="flex justify-end w-full">
          <div v-if="isPostedUser">
            <v-btn size="small" variant="tonal" color="red-darken-2" @click.prevent="deletePost">삭제</v-btn>
          </div>
        </div>
      </header>
      <div class="flex flex-col items-start w-full pt-4 pb-2">
        <span class="w-full px-2 text-start">
          {{ post.content }}
        </span>
      </div>

      <div class="pt-4 text-lg font-bold border-t text-start">댓글</div>
      <div v-if="userStore.isAuthenticated" class="my-4">
        <v-form class="d-flex align-center" @submit.prevent="createComment">
          <v-text-field label="댓글" color="#1089FF" variant="outlined" v-model="commentContent"></v-text-field>
          <v-btn color="#1089FF" variant="tonal" size="large" class="mb-5 ml-3" @click.prevent="createComment">
            댓글 작성
          </v-btn>
        </v-form>
      </div>

      <div class="comment-container" v-for="comment in comments" :key="comment.id">
        <div class="flex items-center space-x-2">
          <icon :name="`profile${post?.id}`" />
          <p class="text-sm font-normal">{{ comment.user.nickname }}</p>
        </div>
        <div class="flex flex-col items-start w-full gap-4 border-b">
          <div></div>
          <span>{{ comment.content }}</span>
          <div></div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <v-progress-circular color="#FD5C63" indeterminate size="80"></v-progress-circular>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  margin: 2rem auto;
}

.loading {
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
}

.comment-left {
  width: 880px;
}

.right {
  width: 120px;
}
</style>
