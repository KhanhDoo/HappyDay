import type { APIError, SafeProduct } from '~/types'
import { useToast } from '@/components/ui/toast/use-toast'


interface PreviewModalStore{
    isOpen: boolean,
    selectedProduct?: SafeProduct,
}


const state = reactive<PreviewModalStore>({
    isOpen : false,
    selectedProduct: undefined
})

export default () => {

    const {isOpen, selectedProduct, } = toRefs(state);

    const onOpen = (payload: SafeProduct) => {
        state.isOpen = true;
        state.selectedProduct = payload
    }

    const onClose = () => {
        state.isOpen = false;
        state.selectedProduct = undefined
    }

    return {
        isOpen,
        onClose,
        selectedProduct,
        onOpen
        
    }

    
}