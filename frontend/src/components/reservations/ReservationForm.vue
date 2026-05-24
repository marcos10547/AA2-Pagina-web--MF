<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits<{
  (e: 'save', data: any): void
  (e: 'cancel'): void
}>()

const schema = yup.object({
  customerName: yup.string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),
  phone: yup.string().required('El teléfono es obligatorio'),
  date: yup.string().required('La fecha es obligatoria'),
  time: yup.string().required('La hora es obligatoria'),
  guests: yup.number().required('Indica el número de personas').min(1, 'Mínimo 1 persona').max(20, 'Máximo 20 personas'),
  notes: yup.string().default('')
})

const { handleSubmit } = useForm({ validationSchema: schema })

const { value: customerName, errorMessage: customerNameError } = useField('customerName')
const { value: phone, errorMessage: phoneError } = useField('phone')
const { value: date, errorMessage: dateError } = useField('date')
const { value: time, errorMessage: timeError } = useField('time')
const { value: guests, errorMessage: guestsError } = useField('guests')
const { value: notes } = useField('notes')

const onSubmit = handleSubmit((values) => {
  emit('save', { ...values, status: 'pendiente' })
})
</script>

<template>
  <v-card>
    <v-card-title class="text-h6">
      <v-icon class="mr-2">mdi-calendar-plus</v-icon>
      {{ $t('reservations.newTitle') }}
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="customerName"
          :label="$t('reservations.customer')"
          :error-messages="customerNameError"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          density="comfortable"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :label="$t('reservations.phone')"
          :error-messages="phoneError"
          prepend-inner-icon="mdi-phone"
          variant="outlined"
          density="comfortable"
          class="mb-2"
        ></v-text-field>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="date"
              :label="$t('reservations.date')"
              :error-messages="dateError"
              type="date"
              prepend-inner-icon="mdi-calendar"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="time"
              :label="$t('reservations.time')"
              :error-messages="timeError"
              type="time"
              prepend-inner-icon="mdi-clock-outline"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          v-model.number="guests"
          :label="$t('reservations.guests')"
          :error-messages="guestsError"
          type="number"
          min="1"
          max="20"
          prepend-inner-icon="mdi-account-group"
          variant="outlined"
          density="comfortable"
          class="mb-2"
        ></v-text-field>

        <v-textarea
          v-model="notes"
          :label="$t('reservations.notes')"
          prepend-inner-icon="mdi-note-text-outline"
          variant="outlined"
          density="comfortable"
          rows="2"
          class="mb-2"
        ></v-textarea>

        <v-card-actions class="px-0">
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="emit('cancel')">{{ $t('admin.cancel') }}</v-btn>
          <v-btn color="secondary" variant="elevated" type="submit">{{ $t('admin.save') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
