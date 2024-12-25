<template>
    <div class="flex items-center justify-between">
        <Heading title="Sizes" description="Manage Sizes">

        </Heading>
        <NuxtLink to="/admin/sizes/new">
            <Button>
                <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
                Add New
            </Button>
        </NuxtLink>
    </div>

    <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="sizes ? sizes : []"></DataTable>
</template>

<script setup lang="ts">
//@ts-ignore
import { columns } from '~/components/Admin/Size/column';
const { data: sizes, status } = await useFetch('/api/admin/sizes', {
    key:'sizes',
    transform: (sizes) => {
        //@ts-ignore
        return sizes.map(item =>{
            return {
                id: item.id,
                name: item.name,
                value: item.value,
                createdAt: useDateFormat(new Date(item.createdAt), 'MMMM D, YYYY').value
            }
        })
    }
});

</script>

<style scoped>

</style>