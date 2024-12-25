<template>
    <div class="space-y-4">
        <h3 class="font-bold text-3xl">All Products</h3>

        <NoResults></NoResults>
        <div class="grid grid-cols-3 gap-8">

            <template v-if="!isLoading">
                <ProductCard v-for="item in items" :key="item.id" :data="item"></ProductCard>
            </template>

            <template v-else>
                    <CardLoader v-for="i in 6" :key="i"></CardLoader>
            </template>

        </div>
    </div>
</template>

<script setup lang="ts">


import type { SafeProduct } from '~/types';



defineProps<{
    title: string;
    items: SafeProduct[];
    isLoading: boolean
}>()

</script>

<style scoped>

</style>