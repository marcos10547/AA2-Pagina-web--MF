import { defineStore } from 'pinia'
import type { VendorDTO } from '../core/vendor.dto'

export const useVendorStore = defineStore('vendor', {
    state: () => ({
        vendors: [
            { id: 1, name: 'Distribuidora Láctea S.A.', contactName: 'Juan Pérez', email: 'juan@lactea.com', phone: '600111222', category: 'Lácteos' },
            { id: 2, name: 'Panificadora Central', contactName: 'Marta García', email: 'marta@pancentral.com', phone: '600333444', category: 'Panadería' }
        ] as VendorDTO[],
        loading: false
    }),
    actions: {
        addVendor(vendor: Omit<VendorDTO, 'id'>) {
            const newId = this.vendors.length > 0 ? Math.max(...this.vendors.map(v => v.id)) + 1 : 1
            this.vendors.push({ ...vendor, id: newId })
        },
        updateVendor(id: number, updatedData: Omit<VendorDTO, 'id'>) {
            const index = this.vendors.findIndex(v => v.id === id)
            if (index !== -1) {
                this.vendors[index] = { ...updatedData, id }
            }
        },
        deleteVendor(id: number) {
            this.vendors = this.vendors.filter(v => v.id !== id)
        }
    }
})
