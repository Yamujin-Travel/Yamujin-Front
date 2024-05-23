<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GoToBack from '@/components/GoToBack.vue';
import { getAuthInstance } from '@/api/axios';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';

const authInstance = getAuthInstance();

const initialState = {
  title: '',
  content: '',
};

const state = ref({
  ...initialState,
});

const rules = {
  title: {
    required: helpers.withMessage('필수 정보입니다.', required),
    maxLength: helpers.withMessage('300자 이하로 입력해야합니다.', maxLength(300)),
  },
  content: {
    required: helpers.withMessage('필수 정보입니다.', required),
    maxLength: helpers.withMessage('10000자 이하로 입력해야합니다.', maxLength(10000)),
  },
};
const v$ = useVuelidate(rules, state);

const router = useRouter();

const createPost = function () {
  authInstance
    .post(`/board/`, {
      title: state.value.title,
      content: state.value.content,
    })
    .then((res) => {
      router.push({ name: 'PostDetail', params: { id: res.data.id }, query: { page: 1 } });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="flex flex-col w-full px-[10rem] py-[5rem]">
    <div class="flex justify-start">
      <GoToBack :goName="{ name: 'PostList', query: { page: 1 } }" />
    </div>
    <h1 class="mb-8 text-2xl font-medium">게시물 작성하기</h1>
    <v-form class="my-5">
      <v-text-field
        variant="outlined"
        color="#1089FF"
        label="제목"
        v-model="state.title"
        @input="v$.title.$touch"
        @blur="v$.title.$touch"
        @keypress.enter="createPost"
      ></v-text-field>
      <v-textarea
        variant="outlined"
        color="#1089FF"
        label="내용"
        v-model="state.content"
        @input="v$.content.$touch"
        @blur="v$.content.$touch"
        auto-grow
        rows="15"
        row-height="25"
        shaped
      ></v-textarea>
      <v-btn block variant="flat" color="#1089FF" @click.prevent="createPost"> 작성하기 </v-btn>
    </v-form>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  margin: 2rem auto;
}
</style>
