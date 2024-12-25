import db from '~/utils/db'
import { productSchema} from '~/utils/validations'

export default defineEventHandler(async (event)  => {


    await requireUserSession(event);

    const session = await getUserSession(event)

    if(session.user && session.user.role === 'ADMIN'){

        const { name, categoryId, price, sizeId, colorId, images, isFeatured, isArchived } = await readValidatedBody(event, (body) => productSchema.parse(body))

        const product = await db.product.create({
            data:{ 
                name, 
                categoryId, 
                price, 
                sizeId, 
                colorId, 
                images: {
                    createMany: {
                        data: [
                            ...images.map(img => img)
                        ]
                    }
                }, 
                isFeatured, 
                isArchived,
                userId: session.user.id
            }
        })

        return product

    }   
    else{
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized. You don't have admin access"
        })
    }

})