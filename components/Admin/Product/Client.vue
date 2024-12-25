<template>
    <div class="flex items-center justify-between">
        <Heading title="Products" description="Manage Products">
            
        </Heading>
        <NuxtLink to="/admin/products/new">
            <Button>
                <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
                Add New
            </Button>
        </NuxtLink>
    </div>
    <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="products ? products : []">
    </DataTable>
</template>

<script setup lang="ts">
// @ts-ignore
import { columns } from '~/components/Admin/Product/column';

const { data: products, status, } = await useFetch('/api/admin/products', {
    key: 'products',
    transform: (products) => {
        // @ts-ignore
        return products.map(item =>{
            return {
                id: item.id, 
                name:item.name,
                category: item.category.name, 
                price: formatter.format(+item.price), 
                size: item.size.value, 
                color: item.color.value, 
                isFeatured: item.isFeatured, 
                isArchived: item.isArchived, 
                createdAt: useDateFormat(new Date(item.createdAt), 'MMM D, YYY').value
            }
        })
    },
})



</script>

<style scoped>

</style>