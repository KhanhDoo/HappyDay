import type { APIError } from '~/types'
import { useToast } from '@/components/ui/toast/use-toast'


interface State{
    isLoading: boolean,
    appError: APIError | null,
    isAlertModalVisible: boolean
}


const state = reactive<State>({
    isLoading : false,
    appError: null,
    isAlertModalVisible: false,
})

export default () => {

    const {isLoading, appError, isAlertModalVisible } = toRefs(state);
    const { toast } = useToast()

    const toggleLoading = (v: boolean) => {
        state.isLoading = v;
    }

    
    const toggleAlertModal = (v: boolean) => {
        state.isAlertModalVisible = v;
    }
   
    const toggleError = (error: null | APIError) => {
        state.appError = error
    }

    const showError = (error: APIError) => {
        toast({
            variant:'destructive',
            title: error.statusCode + '',
            description: error.message ? error.message : error.statusMessage
        })
    }

    const showMessage = (content: {title: string, description?: string, variant?: "destructive" | "default" | null | undefined}) => {
        toast({
            variant:content.variant,
            title: content.title,
            description: content.description
        })
    }

    return {
        isLoading,
        appError,
        showError,
        showMessage,
        toggleLoading,
        toggleError ,
        toggleAlertModal,
        isAlertModalVisible

    }
}