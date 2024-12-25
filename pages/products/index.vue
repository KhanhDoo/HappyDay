<template>
    <div>
      <div class="mx-auto max-w-6xl w-full my-4">
        <div class="px-4 pb-24">
          <div class="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <!-- Mobile Filter -->
            <div class="hidden lg:block">
              <!-- Filters -->
                <Filter valueKey="sizeId" name="Sizes" :data="sizes" />  
                <Filter valueKey="categoryId" name="Categories" :data="categories" />
            </div>
            <div class="mt-6 lg:col-span-4 lg:mt-0">

                <NoResults v-if="status !== 'pending' && (!products || products.length)"></NoResults>
                <div class="grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    <template v-if="status !== 'pending' && products && products.length">
                        <ProductCard v-for="item in products" :key="item.id" :data="item"></ProductCard>
                    </template>

                    <template v-else>
                        <div class="grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                            <CardLoader v-for="i in 6" :key="i"></CardLoader>
                        </div>
                    </template>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>


<script setup lang="ts">
import type { RouteParams, SafeProduct } from '~/types';

const route = useRoute();

const sizeId = computed(() => (route.query as RouteParams).sizeId);
const categoryId = computed(() => (route.query as RouteParams).categoryId);

const { data: products, status, } = await useFetch<SafeProduct[]>('/api/admin/products', {
    lazy: true,
    query: {
      sizeId: sizeId,
      categoryId: categoryId,
    }
})


const {data: cachedSizes } = useNuxtData('sizes');

const { data: sizes, status:sizeStatus } = await useFetch('/api/admin/sizes', {
    key:'sizes',
    default() {
        return cachedSizes.value
    }
});

const {data: cachedCategories } = useNuxtData('categories');

const { data: categories, status:categoriesStatus } = await useFetch('/api/admin/categories', {
    key:'categories',
    default() {
        return cachedCategories.value
    }
});

</script>

<style scoped>

</style>
