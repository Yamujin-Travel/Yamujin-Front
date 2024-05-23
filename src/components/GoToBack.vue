<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  goName: Object,
});

const clickBack = function () {
  // router.go(-1)
  if (props.goName) {
    router.push(props.goName);
  }
};
</script>

<template>
  <div>
    <v-btn class="mb-10" rounded="xl" variant="plain" @click="clickBack">
      <v-icon class="mx-0" start icon="mdi-arrow-left"></v-icon>
      Back
    </v-btn>
  </div>
</template>

<style scoped>
.mb-10 {
  left: -15px;
}
</style>
