import db from '~/utils/db'
import { categorySchema} from '~/utils/validations'

export default defineEventHandler(async(event) => {

    await requireUserSession(event)

    const session = await getUserSession(event)

    if(session.user && session.user.role === 'ADMIN'){

        const { name } = await readValidatedBody(event, (body) => categorySchema.parse(body))

        const category = await db.category.create({
            data: {
                name,
                userId: session.user.id
            }
        })

        return category

    }else{
        throw createError({
             statusCode: 401,
            statusMessage: "Unauthorized. You don't have admin access"
        })
    }


    return null
})