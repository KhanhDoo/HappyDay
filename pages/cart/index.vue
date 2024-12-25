<template>
    <div class="px-4 py-16 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-black">Shopping Cart</h1>
        <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div class="lg:col-span-7">
          <!-- Cart Items -->
                <ul>
                    <cartItem v-for="item in cartItem" :key="item.id" :data="item"></cartItem>      
                </ul>
                <p v-if="!cartItem.length" class="text-neutral-500">
                        No Items added to cart 
                </p>
            </div>
            <CartSummary></CartSummary>
        </div>
    </div>
  </template>
  

<script setup lang="ts">
    const { cartItem } = useCart();

</script>

<style scoped></style>
