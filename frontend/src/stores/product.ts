import { defineStore } from 'pinia'
import type { ProductDTO } from '../core/product.dto'

const API_URL = 'http://localhost:3000/api'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as ProductDTO[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchProducts() {
            this.loading = true
            try {
                const response = await fetch(`${API_URL}/products`)
                this.products = await response.json()
            } catch (err) {
                this.error = 'Error al cargar productos'
            } finally {
                this.loading = false
            }
        },
        async addProduct(product: Omit<ProductDTO, 'id'>) {
            try {
                const response = await fetch(`${API_URL}/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                })
                const newProduct = await response.json()
                this.products.push(newProduct)
            } catch (err) {
                throw new Error('No se pudo guardar el producto')
            }
        },
        async updateProduct(id: number, updatedData: Omit<ProductDTO, 'id'>) {
            try {
                const response = await fetch(`${API_URL}/products/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData)
                })
                const updated = await response.json()
                const index = this.products.findIndex(p => p.id === id)
                if (index !== -1) {
                    this.products[index] = updated
                }
            } catch (err) {
                throw new Error('No se pudo actualizar el producto')
            }
        },
        async deleteProduct(id: number) {
            try {
                await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' })
                this.products = this.products.filter(p => p.id !== id)
            } catch (err) {
                throw new Error('No se pudo eliminar el producto')
            }
        }
    }
})
