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

       <form @submit.prevent="onSubmit" class="space-y-8 w-full">
            <div class="md:grid md:grid-cols-3 gap-8">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Size Name" v-bind="componentField" :disabled="isLoading" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="value">
                    <FormItem>
                        <FormLabel>Size Code</FormLabel>
                        <FormControl>
                            <Input placeholder="S,M,L, ..." v-bind="componentField" :disabled="isLoading" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <Button :disabled="isLoading" type="submit" class="ml-auto" > {{ action }}</Button>
        </form>
    </div>
    <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteSize" :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = false"></AlertModal>
</template>

<script setup lang="ts">
import type {RouteParams} from '~/types'
import {toTypedSchema} from '@vee-validate/zod';
import { sizeSchema } from '~/utils/validations';
import {useForm} from 'vee-validate';
import { toast } from '~/components/ui/toast';


const { isLoading, toggleLoading, toggleError, showMessage, showError,  } = useStore();

const title = ref('Edit Size');
const description = ref('Edit Size');
const toastMessage = ref('Size Updated');
const action = ref('Save Changes');     
const isEditing = ref(true);
const isAlertModalVisible = ref(false)

const route = useRoute();
const { data: currentSize } = await useFetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`)

const formSchema = toTypedSchema(sizeSchema);

watchEffect(() => {
    if(!currentSize.value){
        title.value = 'Create Size'
        description.value = 'Add a new Size'
        action.value = 'Save Changes'
        isEditing.value = false
        toastMessage.value = 'Size Updated'
    }
})

const form = useForm({
    validationSchema: formSchema,
    initialValues: currentSize.value || {
        name: '',
        value: ''
    }
})


const onSubmit = form.handleSubmit(async (values) =>{
    try {
        toggleLoading(true);

        if(isEditing.value){
            await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
                method:'PATCH',
                body: values
           })

        }else{

            const data = await $fetch('/api/admin/sizes/', {
                method:'POST',
                body: values
           })

           console.log(data);

        }
        showMessage({
            title: toastMessage.value

        })
        
        // TODO: refresh data
        await navigateTo('/admin/sizes');

    } catch (error) {
        const err = handleError(error);
        showError(err);
    }finally{
        toggleLoading(false);
    }
})


const deleteSize = async () => {
    try {
        toggleLoading(true);

        await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
                method:'DELETE',
           })

        showMessage({
            title: 'Delete Size'
        })
        
        // TODO: refresh data
        await navigateTo('/admin/sizes');

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