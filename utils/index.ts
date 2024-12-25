export const getResourceName = (resourceUrl:string) => {
    return resourceUrl.split('.')[resourceUrl.split('.').length - 2].split('/').pop()
}

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    
})

export function getLocalStorageData<T>(key: string) {
    if (import.meta.client) {
        const data = window.localStorage.getItem(key);
        if (data) {
            return JSON.parse(data) as T;
        }
        return null as T;
    }
    return null as T;
}

export function setStorageData<T>(key: string, data: T | null) {
    if (import.meta.client) {
        if (data) {
            window.localStorage.setItem(key, JSON.stringify(data));
        } else {
            window.localStorage.removeItem(key);
        }
    }
}