<template>
    <div>
        <Card  :data="data"  class="border p-3 shadow-none">
            <CardContent class="p-0">
                <div class="overflow-hidden rounded-md relative">
                    <img :src="data.images[0].url" :alt="data.name" class="h-[200px]">
                    <div class="absolute top-2 left-2" v-if="data.isFeatured"> 
                        <Badge variant="destructive" class="w-auto">Featured</Badge>
                    </div>
                    <div class="absolute top-2 right-2"> 
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button  
                                        @click.stop="() => {
                                            onOpen(data); 
                                        }" 
                                        size="icon" class="rounded-full">
                                        <Icon name="lucide:expand" class="h-4 w-4 text-white"></Icon>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Preview Product</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <h3 class="mt-4 font-bold text-gray-900">{{ data.name }}</h3>
                <p class="italic text-gray-500">{{ data.category.name }}</p>
                <p class="mt-2 font-medium text-foreground">${{ data.price }}</p>
                <Button type="button" @click="() => {addItem(data); console.log('Add')}" variant="secondary" class="mt-4 w-full">
                Add to cart    
            </Button>
            </CardContent>
        </Card>
    </div>
    <ProductModal></ProductModal>
</template>
<script lang="ts" setup>

import type { SafeProduct } from '~/types';

defineProps<{
    data: SafeProduct
}>();

const { onOpen } = usePreviewModal();

const {addItem} = useCart();

</script>
<style scoped></style>