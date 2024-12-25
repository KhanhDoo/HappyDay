<template>
    <div class="mb-4 flex items-center gap-4">
        
           <div v-for="(url, i) in value" :key="i" class="relative w-[200px] h-[200px] rounded-md overflow-hidden" >
                <div class="z-10 absolute top-2 right-2">
                    <Button :disabled="isLoading" type="button" @click="deleteImage(url)" variant="destructive" size="sm">
                            <Icon name="lucide:trash"  class=" h-4 w-4"></Icon>
                    </Button>
                </div>
                <img :src="url" class="object-cover w-full h-full" alt="Image" />
           </div>

        </div>

           <CldUploadWidget v-slot="{ open }" :uploadPreset="uploadPreset" :on-upload="onUpload" :options="{
                    clientAllowedFormats: allowedFormats,
                    multiple: false,
                    maxFiles: 3
                }">
                <Button type="button" :disabled="isLoading" variant="secondary" @click="open">

                    <Icon name="lucide:image-plus" class="mr-2 w-4 h-4"></Icon>
                    Upload an Image
                </Button>
            </CldUploadWidget>
</template>

<script setup lang="ts">

interface Result {
    info: {
        secure_url: string 
    }
}

interface UploadImageProps {
    value: string[]
    allowedFormats?: string[]
}

defineProps<UploadImageProps>();

const {public: { uploadPreset } } = useRuntimeConfig();

const {isLoading, toggleLoading, showError, showMessage} = useStore();

const emits = defineEmits(['onChange', 'onRemove'])

const onUpload = (result:  Ref<Result>) => {

    console.log( result.value);
    emits('onChange', result.value.info.secure_url)
}

const deleteImage = async (url:string) => {
    try {
        toggleLoading(true);
        const resourceName = getResourceName(url);
        await $fetch(`/api/admin/cloudinary/${resourceName}`, {
            method: 'DELETE'
        })

        showMessage({
            title: 'Image Deleted'
        })
        emits('onRemove', url)

    } catch (err: any ) {
        const error = handleError(err);
        showError(error);
    }finally{
        toggleLoading(false);
    }
}
</script>

<style scoped>

</style>