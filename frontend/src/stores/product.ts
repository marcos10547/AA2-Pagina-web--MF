import { defineStore } from 'pinia'
import type { ProductDTO } from '../core/product.dto'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [
            { id: 1, name: 'Café Espresso', description: 'Café intenso de tueste natural', price: 1.5, stock: 100, category: 'Cafés' },
            { id: 2, name: 'Croissant Recreo', description: 'Mantequilla pura y masa hojaldrada', price: 2.2, stock: 30, category: 'Bollería' },
            { id: 3, name: 'Tarta de Queso', description: 'Receta casera estilo New York', price: 4.5, stock: 12, category: 'Postres' }
        ] as ProductDTO[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        addProduct(product: Omit<ProductDTO, 'id'>) {
            const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1
            this.products.push({ ...product, id: newId })
        },
        updateProduct(id: number, updatedData: Omit<ProductDTO, 'id'>) {
            const index = this.products.findIndex(p => p.id === id)
            if (index !== -1) {
                this.products[index] = { ...updatedData, id }
            }
        },
        deleteProduct(id: number) {
            this.products = this.products.filter(p => p.id !== id)
        },
        setLoading(status: boolean) {
            this.loading = status
        }
    }
})
