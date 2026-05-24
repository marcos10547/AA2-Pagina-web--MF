export interface ReservationDTO {
    id: number;
    customerName: string;
    phone: string;
    date: string;        // Formato: YYYY-MM-DD
    time: string;        // Formato: HH:MM
    guests: number;
    status: 'pendiente' | 'confirmada' | 'cancelada';
    notes: string;
}
