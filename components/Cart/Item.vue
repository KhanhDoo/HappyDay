<template>
    <li class="flex py-6 border-b">
      <div class="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <img :src="data.images[0].url" alt="" class="object-cover object-center" />
      </div>
      <div class="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div class="absolute z-10 right-0 top-0 cursor-pointer">
          <Icon name="" @click="onRemove()" />
        </div>
        <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div class="flex justify-between">
            <p class="text-lg font-semibold text-black">{{ data.name }}</p>
          </div>
          <div class="mt-1 flex text-sm">
            <p class="ml-4 border-l border-gray-200 pl-4 text-gray-500">{{ data.size.name }}</p>
          </div>
          <div class="font-semibold">{{ formatter.format(Number(data?.price)) }}</div>
        </div>
      </div>
    </li>
  </template>
  

  <script setup lang="ts">
import type { SafeProduct } from '~/types';

interface CartItemProps {
  data: SafeProduct;
}

const props = defineProps<CartItemProps>();

const { removeItem } = useCart();

const onRemove = () => {
  removeItem(props.data.id);
};
</script>

<style scoped></style>

