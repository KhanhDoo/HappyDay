<template>
    <div class="flex items-center justify-between">
        <Heading title="Colors" description="Manage Colors">

        </Heading>
        <NuxtLink to="/admin/colors/new">
            <Button>
                <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
                Add New
            </Button>
        </NuxtLink>
    </div>

    <!-- @vue-expect-error -->
    <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="colors ? colors : []"></DataTable>
</template>

<script setup lang="ts">
//@ts-ignore
import { columns } from '~/components/Admin/Color/column';
const { data: colors, status } = await useFetch('/api/admin/colors', {
    key:'colors',
    transform: (colors) => {
        //@ts-ignore
        return colors.map(item =>{
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