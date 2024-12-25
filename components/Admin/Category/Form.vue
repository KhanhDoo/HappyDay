<template>
    <div>
        <div class="flex items-center justify-between">
           <Heading :title="title" :description="description">
   
           </Heading>
           <Button @click="isAlertModalVisible = !isAlertModalVisible" v-if="isEditing" variant="destructive" size="sm">
               <Icon name="lucide:trash"  class="h-4 w-4"></Icon>
           </Button>
       </div>
       <Separator class="my-4"></Separator>

       <form @submit.prevent="onSubmit()" class="space-y-8 w-full">
            <div class="md:grid md:grid-cols-3 gap-8">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Category Name" v-bind="componentField" :disabled="isLoading" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <Button :disabled="isLoading" type="submit" class="ml-auto" > {{ action }}</Button>
        </form>
    </div>
    <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteCategory" :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = false"></AlertModal>
</template>

<script setup lang="ts">
import type {RouteParams} from '~/types'
import {toTypedSchema} from '@vee-validate/zod';
import { categorySchema } from '~/utils/validations';
import {useForm} from 'vee-validate';
import { toast } from '~/components/ui/toast';


const { isLoading, toggleLoading, toggleError, showMessage, showError,  } = useStore();

const title = ref('Edit Category');
const description = ref('Edit Category');
const toastMessage = ref('Category Updated');
const action = ref('Save Changes');     
const isEditing = ref(true);
const isAlertModalVisible = ref(false)

const route = useRoute();
const { data: currentCategory } = await useFetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`)

const formSchema = toTypedSchema(categorySchema);

watchEffect(() => {
    if(!currentCategory.value){
        title.value = 'Create Category'
        description.value = 'Add a new Category'
        action.value = 'Save Changes'
        isEditing.value = false
        toastMessage.value = 'Category Updated'
    }
})

const form = useForm({
    validationSchema: formSchema,
    initialValues: currentCategory.value || {
        name: ''
    }
})


const onSubmit = form.handleSubmit(async (values) =>{
    try {
        toggleLoading(true);

        if(isEditing.value){
            await $fetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`, {
                method:'PATCH',
                body: values
           })

        }else{

            const data = await $fetch('/api/admin/categories/', {
                method:'POST',
                body: values
           })

           console.log(data);

        }
        showMessage({
            title: toastMessage.value

        })
        
        // TODO: refresh data
        await navigateTo('/admin/categories');

    } catch (error) {
        const err = handleError(error);
        showError(err);
    }finally{
        toggleLoading(false);
    }
})


const deleteCategory = async () => {
    try {
        toggleLoading(true);

        await $fetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`, {
                method:'DELETE',
           })

        showMessage({
            title: 'Delete Category'
        })
        
        // TODO: refresh data
        await navigateTo('/admin/categories');

    } catch (error) {
        const err = handleError(error);
        showError(err);
    }finally{
        toggleLoading(false);
    }
}

</script>

<style scoped>

</style>