<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const profileIcon = defineAsyncComponent(() => import(`../../assets/svg/profile/${props.name}.svg`));
</script>

<template>
  <component :is="profileIcon" />
</template>
