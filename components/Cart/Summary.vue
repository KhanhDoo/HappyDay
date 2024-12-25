<template>
    <div class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 class="text-lg font-medium text-gray-900">Order summary for this</h2>
      <div class="mt-6 space-y-4">
        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
          <div class="text-base font-medium text-gray-900">Order total</div>
          <div class="font-semibold">{{ formatter.format(Number(totalPrice)) }}</div>
        </div>
      </div>
    </div>
  </template>
  
  
<script setup lang="ts">
const { cartItem, removeAll } = useCart()

const totalPrice = computed(() => {
  return cartItem.value.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)
})
</script>

<style scoped></style>
