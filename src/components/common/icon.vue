<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon = defineAsyncComponent(async () => await import(`../../assets/svg/${props.name}.svg`));
</script>

<template>
  <component :is="icon" />
</template>
