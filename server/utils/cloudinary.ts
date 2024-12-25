import { v2 as cloudianry} from 'cloudinary';
import { getResourceName } from '~/utils';

export const deleteResourceFromCloudinary = async (resourceName : string, resource_type: string | undefined = 'image') => {
    const config = useRuntimeConfig();
    cloudianry.config({
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret,
        cloud_name: config.public.cloudinaryCloudName
    })
    await cloudianry.uploader.destroy(resourceName, {
        resource_type
    })
}