import type { SafeProduct } from '~/types'

interface CartState {
    items: SafeProduct[]
}

const state = reactive<CartState>({
    items: getLocalStorageData<SafeProduct[]>('be-afraid') ? getLocalStorageData<SafeProduct[]>('be-afraid') : []
})

export default () => {
    const { items } = toRefs(state)

    const { showMessage } = useStore()

    const addItem = (data: SafeProduct) => {

        console.log(data)

        const currentItems = state.items
        const existingItem = currentItems.find(item => item.id === data.id)

        if (existingItem) {
            return showMessage({
                title: 'Item already exist',
                variant: 'destructive'
            })
        }

        state.items = [...state.items,data]

        setStorageData<SafeProduct[]>('be-afraid',state.items);


        showMessage({
            title: 'Item added to cart'
        })
    }


    const removeItem = (id: string) => {

        state.items = [...state.items.filter(item => item.id !== id)]
        setStorageData<SafeProduct[]>('be-afraid',state.items);
        showMessage({
            title: 'Item remove from the cart'
        })
    }

    const removeAll = ( ) => {

        state.items = []
        setStorageData<SafeProduct[]>('be-afraid', null);
        showMessage({
          title: 'Cart is empty'
        })
      }

    return {
        removeAll,
        addItem,
        removeItem,
        cartItem: items,

    }
}
