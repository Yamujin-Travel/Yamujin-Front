<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const exchangeIcon = defineAsyncComponent(() => import(`../../assets/svg/exchange/${props.name}.svg`));
</script>

<template>
  <component :is="exchangeIcon" />
</template>
