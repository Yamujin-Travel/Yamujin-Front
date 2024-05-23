<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/users';
import colors from 'vuetify/util/colors';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

const userStore = useUserStore();

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  labels: Array,
  intrRate: Array,
  intrRate2: Array,
});

const chartData: any = {
  labels: props.labels,
  datasets: [
    {
      label: '저축 금리',
      data: props.intrRate,
      backgroundColor: '#F0B6C2',
      stack: 'Stack 0',
    },
    {
      label: '최고 우대 금리',
      data: props.intrRate2,
      backgroundColor: '#B5CFF2',
      stack: 'Stack 1',
    },
  ],
};

const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        font: {
          size: 20, // 범례의 글꼴 크기
        },
      },
    },
    title: {
      display: true,
      text: `${userStore.userInfo.nickname}님의 가입한 상품 금리`,
      font: {
        size: 30,
        weight: 500,
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      ticks: {
        maxRotation: 30,
        minRotation: 0,
        font: {
          size: 20,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 20,
        },
      },
    },
  },
});
</script>

<template>
  <div class="w-3/4">
    <Bar :options="chartOptions" :data="chartData" class="w-full" />
  </div>
</template>

<style scoped></style>
