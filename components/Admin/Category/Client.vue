<template>
    <div class="flex items-center justify-between">
        <Heading title="Categories" description="Manage Categories">

        </Heading>
        <NuxtLink to="/admin/categories/new">
            <Button>
                <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
                Add New
            </Button>
        </NuxtLink>
    </div>

    <!-- @vue-expect-error -->
    <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="categories ? categories : []"></DataTable>
</template>

<script setup lang="ts">
//@ts-ignore
import { columns } from '@/components/Admin/Category/column';
const { data: categories, status } = await useFetch('/api/admin/categories', {
    key:'categories',
    transform: (colors) => {
        //@ts-ignore
        return colors.map(item =>{
            return {
                id: item.id,
                name: item.name,
                createdAt: useDateFormat(new Date(item.createdAt), 'MMMM D, YYYY').value
            }
        })
    }
});

</script>

<style scoped>

</style>