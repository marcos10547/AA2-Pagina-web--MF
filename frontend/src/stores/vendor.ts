import { defineStore } from 'pinia'
import type { VendorDTO } from '../core/vendor.dto'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Helper para mapear de API (DB) a DTO (Frontend)
const mapToDTO = (v: any): VendorDTO => ({
    id: v.id,
    name: v.name,
    contactName: v.contact_name,
    email: v.email,
    phone: v.phone,
    category: v.category
})

// Helper para mapear de DTO a API
const mapToAPI = (v: Omit<VendorDTO, 'id'>) => ({
    name: v.name,
    contact_name: v.contactName,
    email: v.email,
    phone: v.phone,
    category: v.category
})

export const useVendorStore = defineStore('vendor', {
    state: () => ({
        vendors: [] as VendorDTO[],
        loading: false
    }),
    actions: {
        async fetchVendors() {
            this.loading = true
            try {
                const response = await fetch(`${API_URL}/vendors`)
                const data = await response.json()
                this.vendors = data.map(mapToDTO)
            } catch (err) {
                console.error('Error al cargar proveedores')
            } finally {
                this.loading = false
            }
        },
        async addVendor(vendor: Omit<VendorDTO, 'id'>) {
            try {
                const response = await fetch(`${API_URL}/vendors`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mapToAPI(vendor))
                })
                const newVendor = await response.json()
                this.vendors.push(mapToDTO(newVendor))
            } catch (err) {
                throw new Error('Error al guardar proveedor')
            }
        },
        async updateVendor(id: number, updatedData: Omit<VendorDTO, 'id'>) {
            try {
                const response = await fetch(`${API_URL}/vendors/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mapToAPI(updatedData))
                })
                const updated = await response.json()
                const index = this.vendors.findIndex(v => v.id === id)
                if (index !== -1) {
                    this.vendors[index] = mapToDTO(updated)
                }
            } catch (err) {
                throw new Error('Error al actualizar proveedor')
            }
        },
        async deleteVendor(id: number) {
            try {
                await fetch(`${API_URL}/vendors/${id}`, { method: 'DELETE' })
                this.vendors = this.vendors.filter(v => v.id !== id)
            } catch (err) {
                throw new Error('Error al eliminar proveedor')
            }
        }
    }
})
