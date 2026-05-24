<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useReservationStore } from '../../stores/reservation'
import { useUIStore } from '../../stores/ui'
import ReservationForm from '../../components/reservations/ReservationForm.vue'

const reservationStore = useReservationStore()
const uiStore = useUIStore()

onMounted(() => {
  reservationStore.fetchReservations()
})

// Filtro activo
const activeFilter = ref('todas')

const filters = [
  { label: 'reservations.filterAll', value: 'todas', icon: 'mdi-format-list-bulleted', color: 'primary' },
  { label: 'reservations.filterPending', value: 'pendiente', icon: 'mdi-clock-outline', color: 'warning' },
  { label: 'reservations.filterConfirmed', value: 'confirmada', icon: 'mdi-check-circle-outline', color: 'success' },
  { label: 'reservations.filterCancelled', value: 'cancelada', icon: 'mdi-close-circle-outline', color: 'error' },
]

// Computed: lista filtrada
const filteredReservations = computed(() => {
  if (activeFilter.value === 'todas') return reservationStore.reservations
  return reservationStore.reservations.filter(r => r.status === activeFilter.value)
})

// Diálogo
const isDialogOpen = ref(false)

function openCreate() {
  isDialogOpen.value = true
}

async function onSave(formData: any) {
  try {
    await reservationStore.addReservation(formData)
    uiStore.showNotify('Reserva creada correctamente')
    isDialogOpen.value = false
  } catch (err: any) {
    uiStore.showNotify(err.message || 'Error al guardar la reserva', 'error')
  }
}

async function changeStatus(id: number, newStatus: string) {
  try {
    await reservationStore.updateReservationStatus(id, newStatus)
    uiStore.showNotify(`Reserva ${newStatus}`)
  } catch (err: any) {
    uiStore.showNotify(err.message || 'Error al actualizar la reserva', 'error')
  }
}

async function handleDelete(id: number) {
  try {
    await reservationStore.deleteReservation(id)
    uiStore.showNotify('Reserva eliminada', 'error')
  } catch (err: any) {
    uiStore.showNotify(err.message || 'Error al eliminar la reserva', 'error')
  }
}

// Helper: color del chip de estado
function statusColor(status: string) {
  if (status === 'confirmada') return 'success'
  if (status === 'cancelada') return 'error'
  return 'warning'
}

// Helper: icono del estado
function statusIcon(status: string) {
  if (status === 'confirmada') return 'mdi-check-circle'
  if (status === 'cancelada') return 'mdi-close-circle'
  return 'mdi-clock'
}
</script>

<template>
  <v-row>
    <!-- Título + Botón crear -->
    <v-col cols="12" class="d-flex justify-space-between align-center">
      <h1 class="text-h4">{{ $t('reservations.title') }}</h1>
      <v-btn color="secondary" prepend-icon="mdi-plus" @click="openCreate">
        {{ $t('reservations.new') }}
      </v-btn>
    </v-col>

    <v-col cols="12">
      <v-divider class="mb-2"></v-divider>
    </v-col>

    <!-- Botones de filtrado -->
    <v-col cols="12">
      <v-btn-toggle v-model="activeFilter" mandatory color="primary" rounded="lg" class="mb-4">
        <v-btn
          v-for="f in filters"
          :key="f.value"
          :value="f.value"
          :color="activeFilter === f.value ? f.color : undefined"
          :prepend-icon="f.icon"
          variant="tonal"
          class="text-none"
        >
          {{ $t(f.label) }}
        </v-btn>
      </v-btn-toggle>
    </v-col>

    <!-- Listado de Reservas -->
    <v-col cols="12">
      <v-card v-if="filteredReservations.length === 0" variant="outlined" class="pa-8 text-center">
        <v-icon size="48" color="grey" class="mb-2">mdi-calendar-blank-outline</v-icon>
        <p class="text-grey">{{ $t('reservations.empty') }}</p>
      </v-card>

      <v-table v-else hover>
        <thead>
          <tr>
            <th>{{ $t('reservations.customer') }}</th>
            <th>{{ $t('reservations.phone') }}</th>
            <th>{{ $t('reservations.date') }}</th>
            <th>{{ $t('reservations.time') }}</th>
            <th>{{ $t('reservations.guests') }}</th>
            <th>{{ $t('reservations.status') }}</th>
            <th>{{ $t('reservations.notes') }}</th>
            <th>{{ $t('reservations.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in filteredReservations" :key="res.id">
            <td class="font-weight-medium">{{ res.customerName }}</td>
            <td>{{ res.phone }}</td>
            <td>{{ res.date }}</td>
            <td>{{ res.time }}</td>
            <td>
              <v-chip size="small" variant="tonal" color="primary">
                <v-icon start size="14">mdi-account-group</v-icon>
                {{ res.guests }}
              </v-chip>
            </td>
            <td>
              <v-chip :color="statusColor(res.status)" size="small" :prepend-icon="statusIcon(res.status)">
                {{ $t('reservations.status_' + res.status) }}
              </v-chip>
            </td>
            <td class="text-caption">{{ res.notes || '—' }}</td>
            <td>
              <v-btn
                v-if="res.status === 'pendiente'"
                icon="mdi-check"
                size="x-small"
                color="success"
                variant="tonal"
                class="mr-1"
                @click="changeStatus(res.id, 'confirmada')"
              ></v-btn>
              <v-btn
                v-if="res.status === 'pendiente'"
                icon="mdi-close"
                size="x-small"
                color="error"
                variant="tonal"
                class="mr-1"
                @click="changeStatus(res.id, 'cancelada')"
              ></v-btn>
              <v-btn
                icon="mdi-delete-outline"
                size="x-small"
                color="error"
                variant="text"
                @click="handleDelete(res.id)"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>

    <!-- Diálogo para nueva reserva -->
    <v-dialog v-model="isDialogOpen" max-width="500px">
      <ReservationForm @save="onSave" @cancel="isDialogOpen = false" />
    </v-dialog>
  </v-row>
</template>
