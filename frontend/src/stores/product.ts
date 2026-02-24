import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as any[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        setProducts(products: any[]) {
            this.products = products;
        },
        setLoading(status: boolean) {
            this.loading = status;
        }
    }
});
