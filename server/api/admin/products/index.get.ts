import db from '~/utils/db'

export default defineEventHandler(async (event)  => { 

    const query = getQuery(event);

    const categoryId = query.categoryId;
    const sizeId = query.sizeId;
    const isFeatured = query.isFeatured;
    const isArchived = query.isArchived;

    const queryParam: any = {};

    if (categoryId) {
        queryParam.categoryId = categoryId;
    }
    if (sizeId) {
        queryParam.sizeId = sizeId;
    }
    if (isFeatured) {
        queryParam.isFeatured = isFeatured;
    }
    if (isArchived) {
        queryParam.isArchived = isArchived;
    }




    const products = await db.product.findMany({
        orderBy: {
            createdAt: 'desc'
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            where: queryParam
        })
        return products;
})