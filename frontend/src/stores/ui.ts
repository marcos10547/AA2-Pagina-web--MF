import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
    state: () => ({
        snackbar: {
            show: false,
            message: '',
            color: 'success',
            timeout: 3000
        },
        loading: false
    }),
    actions: {
        showNotify(message: string, color: string = 'success') {
            this.snackbar.message = message
            this.snackbar.color = color
            this.snackbar.show = true
        },
        setLoading(status: boolean) {
            this.loading = status
        }
    }
})
