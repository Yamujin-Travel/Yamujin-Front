<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const homeIcon = defineAsyncComponent(() => import(`../../assets/svg/home/${props.name}.svg`));
</script>

<template>
  <component :is="homeIcon" />
</template>
