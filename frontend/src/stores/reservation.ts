import { defineStore } from 'pinia'
import type { ReservationDTO } from '../core/reservation.dto'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Helper para mapear de API (DB snake_case) a DTO (Frontend camelCase)
const mapToDTO = (r: any): ReservationDTO => ({
    id: r.id,
    customerName: r.customer_name,
    phone: r.phone,
    date: r.date,
    time: r.time,
    guests: r.guests,
    status: r.status,
    notes: r.notes || ''
})

// Helper para mapear de DTO a API
const mapToAPI = (r: Omit<ReservationDTO, 'id'>) => ({
    customer_name: r.customerName,
    phone: r.phone,
    date: r.date,
    time: r.time,
    guests: r.guests,
    status: r.status,
    notes: r.notes
})

export const useReservationStore = defineStore('reservation', {
    state: () => ({
        reservations: [] as ReservationDTO[],
        loading: false
    }),
    actions: {
        async fetchReservations() {
            this.loading = true
            try {
                const response = await fetch(`${API_URL}/reservations`)
                if (!response.ok) {
                    throw new Error('Error en el servidor al cargar reservas')
                }
                const data = await response.json()
                this.reservations = data.map(mapToDTO)
            } catch (err: any) {
                console.error(err.message)
            } finally {
                this.loading = false
            }
        },
        async addReservation(reservation: Omit<ReservationDTO, 'id'>) {
            try {
                const response = await fetch(`${API_URL}/reservations`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mapToAPI(reservation))
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.error || 'Error al guardar la reserva')
                }
                this.reservations.push(mapToDTO(data))
            } catch (err) {
                console.error('Error in addReservation:', err)
                throw err
            }
        },
        async updateReservationStatus(id: number, status: string) {
            try {
                const response = await fetch(`${API_URL}/reservations/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status })
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.error || 'Error al actualizar la reserva')
                }
                const index = this.reservations.findIndex(r => r.id === id)
                if (index !== -1) {
                    this.reservations[index] = mapToDTO(data)
                }
            } catch (err) {
                console.error('Error in updateReservationStatus:', err)
                throw err
            }
        },
        async deleteReservation(id: number) {
            try {
                const response = await fetch(`${API_URL}/reservations/${id}`, { method: 'DELETE' })
                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.error || 'Error al eliminar la reserva')
                }
                this.reservations = this.reservations.filter(r => r.id !== id)
            } catch (err) {
                console.error('Error in deleteReservation:', err)
                throw err
            }
        }
    }
})
