<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import type { VendorDTO } from '../../core/vendor.dto'

const props = defineProps<{
  initialData?: VendorDTO
}>()

const emit = defineEmits<{
  (e: 'save', data: Omit<VendorDTO, 'id'>): void
  (e: 'cancel'): void
}>()

const schema = yup.object({
  name: yup.string().required('Empresa obligatoria'),
  contactName: yup.string().required('Contacto obligatorio'),
  email: yup.string().email('Email inválido').required('Email obligatorio'),
  phone: yup.string().required('Teléfono obligatorio').matches(/^[0-9+ ]+$/, 'Solo números/espacios'),
  category: yup.string().required('Categoría obligatoria')
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: props.initialData || {
    name: '',
    contactName: '',
    email: '',
    phone: '',
    category: ''
  }
})

const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: contactName, errorMessage: contactNameError } = useField<string>('contactName')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: phone, errorMessage: phoneError } = useField<string>('phone')
const { value: category, errorMessage: categoryError } = useField<string>('category')

const onSubmit = handleSubmit((values) => {
  emit('save', values as Omit<VendorDTO, 'id'>)
})
</script>

<template>
  <v-card>
    <v-card-title class="bg-secondary text-white">
      {{ initialData ? 'Editar Proveedor' : 'Nuevo Proveedor' }}
    </v-card-title>
    
    <v-card-text class="pt-4">
      <v-form @submit.prevent="onSubmit">
        <v-text-field v-model="name" label="Empresa" :error-messages="nameError" variant="outlined"></v-text-field>
        <v-text-field v-model="contactName" label="Persona de Contacto" :error-messages="contactNameError" variant="outlined"></v-text-field>
        <v-text-field v-model="email" label="Email" :error-messages="emailError" variant="outlined"></v-text-field>
        <v-text-field v-model="phone" label="Teléfono" :error-messages="phoneError" variant="outlined"></v-text-field>
        <v-select
          v-model="category"
          :items="['Lácteos', 'Panadería', 'Café Crudo', 'Limpieza', 'Otros']"
          label="Categoría"
          :error-messages="categoryError"
          variant="outlined"
        ></v-select>

        <v-card-actions class="px-0">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="emit('cancel')">Cancelar</v-btn>
          <v-btn color="secondary" type="submit" variant="elevated">Guardar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
