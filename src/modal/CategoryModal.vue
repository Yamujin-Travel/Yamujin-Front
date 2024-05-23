<template>
  <teleport to="#modal-root">
    <div ref="modalRef">
      <icon name="nav-modal-triangle" class="absolute z-[9999] top-[68px] left-[157px] nav-modal-triangle" />
      <div
        class="flex justify-center items-center absolute z-[9998] top-[78px] left-[119px] border-[1px] border-[#E0E0E0] w-[234px] h-[290px] rounded-[5px] shadow-category bg-white"
      >
        <div className="flex flex-col justify-between h-[13.875rem] w-[12.625rem]">
          <button
            class="flex items-center w-full h-10 gap-2 pl-10 font-medium hover:bg-background-200 hover:font-bold"
            @click="routeTo('recommend')"
          >
            <icon name="recommend" />
            <span class="text-xs">금융 상품 추천받기</span>
          </button>
          <button class="flex items-center w-full h-10 gap-2 pl-10 hover:bg-background-200" @click="routeTo('compare')">
            <icon name="compare" />
            <span class="text-xs">예적금 금리 비교하기</span>
          </button>
          <button
            class="flex items-center w-full h-10 gap-2 pl-10 hover:bg-background-200"
            @click="routeTo('exchange')"
          >
            <icon name="exchange" />
            <span class="text-xs font-bold">환율 계산하기</span></button
          ><button class="flex items-center w-full h-10 gap-2 pl-10 hover:bg-background-200" @click="routeTo('search')">
            <icon name="search" />
            <span class="text-xs">주변 은행 찾아보기 </span>
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const modalRef = ref(null);

const emit = defineEmits(['update:isModalOpen']);

const routeTo = (routeName: string) => {
  router.push({ name: routeName });
  emit('update:isModalOpen', false);
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    modalRef.value &&
    (modalRef.value as HTMLElement).contains &&
    !(modalRef.value as HTMLElement).contains(event.target as Node)
  ) {
    emit('update:isModalOpen', false);
  }
};

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
