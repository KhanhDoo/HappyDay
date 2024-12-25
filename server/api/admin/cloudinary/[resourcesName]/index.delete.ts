import {deleteResourceFromCloudinary} from '~/server/utils/cloudinary'



export default defineEventHandler(async (event)  => {
    await requireUserSession(event);

    const session = await getUserSession(event)

    if(session.user && session.user.role === 'ADMIN'){

        const resourceName = getRouterParam(event, 'resourcesName')

        if(resourceName){
            await deleteResourceFromCloudinary(resourceName);
        }

    }
        else{
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized. You don't have admin access"
            })
        }
   
})