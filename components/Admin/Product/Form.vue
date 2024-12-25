<template>
    <div>
        <div class="flex items-center justify-between">
            <Heading :title="title" :description="description">
                
            </Heading>
            <Button @click="isAlertModalVisible = !isAlertModalVisible" v-if="isEditing" variant="destructive" color="sm">
                    <Icon name="lucide:trash"  class=" h-4 w-4"></Icon>
            </Button>
        </div>
        <Separator class="my-4"></Separator>
        
        <form @submit.prevent="onSubmit()" class="space-y-8 w-full">
            <FormField v-slot="{ componentField, resetField }" name="images">
                    <FormItem>
                        <FormLabel>Product Images</FormLabel>
                        <FormControl>
                            <!-- <Input placeholder="Product Name" v-bind="componentField" :disabled="isLoading" /> -->
                            <ImageUpload 
                                @on-change="(url) => resetField({ value: [...componentField.modelValue, { url } ] } )" 
                                @on-remove="(url) => resetField({ value: [...componentField.modelValue.filter((currentImage: Image)=>  currentImage.url !== url ) ] } )" 
                                :value="componentField.modelValue.map((image: Image) => image.url)"
                            
                            ></ImageUpload>

                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
            <div class="md:grid md:grid-cols-3 gap-8">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Product Name" v-bind="componentField" :disabled="isLoading" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="price">
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Product price" v-bind="componentField" :disabled="isLoading" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="categoryId">
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                                                {{ category.name    }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                            </Select> 
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="sizeId">
                    <FormItem>
                        <FormLabel>Size</FormLabel>
                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Size" />
                                    </SelectTrigger>
                                </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem v-for="size in sizes" :key="size.id" :value="size.id">
                                                {{ size.name }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                            </Select> 
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="colorId">
                    <FormItem>
                        <FormLabel>Color</FormLabel>
                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Color" />
                                    </SelectTrigger>
                                </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem v-for="color in colors" :key="color.id" :value="color.id">
                                                {{ color.name }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                            </Select> 
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ value, handleChange }"  name="isArchived">
                    <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox :checked="value" @update:checked="handleChange" />
                            </FormControl>
                        <div class="space-y-1 leading-none">
                        <FormLabel>Archived</FormLabel>
                            <FormDescription>
                                This product will not appear anywhere in the shop
                            </FormDescription>
                        <FormMessage />
                        </div>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ value, handleChange }"  name="isFeatured">
                    <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox :checked="value" @update:checked="handleChange" />
                            </FormControl>
                        <div class="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                            <FormDescription>
                                This product will appear features procduct section
                            </FormDescription>
                        <FormMessage />
                        </div>
                    </FormItem>
                </FormField>

            </div>
            <Button :disabled="isLoading" type="submit" class="ml-auto" > {{ action }}</Button>
        </form>
    </div>
    <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteProduct" :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = false"></AlertModal>
</template>
    
<script setup lang="ts">
import type {  RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { Category, Color, Image, Size } from '@prisma/client';


const { isLoading, toggleLoading, toggleError, showMessage, showError, } = useStore();

const title = ref('Edit Product');
const description = ref('Edit Product');
const toastMessage = ref('Product Updated');
const action = ref('Save Changes');
const isEditing = ref(true);
const isAlertModalVisible = ref(false);

const { data: categories} = await useFetch<Category[]>('/api/admin/categories');
const { data: colors} = await useFetch<Color[]>('/api/admin/colors');
const { data: sizes} = await useFetch<Size[]>('/api/admin/sizes');



const route = useRoute();
const { data: currentProduct } = await useFetch(`/api/admin/products/${(route.params as RouteParams).productId}`)

watchEffect(() => {
    if(!currentProduct.value){
        title.value = 'Create Product'
        description.value = 'Add a new Product'
        action.value = 'Create Product'
        isEditing.value = false
        toastMessage.value = 'Product Updated'
    }
})

const formSchema = toTypedSchema(productSchema);

const form = useForm({
    validationSchema: formSchema,
    initialValues: currentProduct.value ? {
        ...currentProduct.value,
        //@ts-ignore
        price: parseFloat(String(currentProduct.value?.price)) 
    } : {
        name: '',
        images: [],
        price: 0,
        categoryId: '',
        colorId: '',
        sizeId: '',
        isFeatured: false,
        isArchived: false,
    }
})


const onSubmit = form.handleSubmit(async (values) => {
    try {

        toggleLoading(true);
        
        if(isEditing.value){
            await $fetch(`/api/admin/products/${(route.params as RouteParams).productId}`, {
                //@ts-ignore
            method: 'PATCH',
            body: values
        })
        } 
        else{
        const data  = await $fetch('/api/admin/products/', {
             method: 'POST',
             body: values
            })
        }
        showMessage({
            title: toastMessage.value
        })
        
        await navigateTo('/admin/products'); 

    } catch (error) {
        const err = handleError(error);
        showError(err);
    }finally{
        toggleLoading(false);
    }
})



const deleteProduct =  async () =>{
    try {
        toggleLoading(true);
        
        await $fetch(`/api/admin/products/${(route.params as RouteParams).productId}`, {
            //@ts-ignore
            method: 'DELETE',
        })

        showMessage({
            title: 'Delete Product'
        })
        
        await navigateTo('/admin/products'); 

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