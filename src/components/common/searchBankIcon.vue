<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const searchBankIcon = defineAsyncComponent(() => import(`../../assets/svg/searchBank/${props.name}.svg`));
</script>

<template>
  <component :is="searchBankIcon" />
</template>
