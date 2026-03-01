<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import type { ProductDTO } from '../../core/product.dto'

const props = defineProps<{
  initialData?: ProductDTO
}>()

const emit = defineEmits<{
  (e: 'save', data: Omit<ProductDTO, 'id'>): void
  (e: 'cancel'): void
}>()

// Esquema de validación con Yup
const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  category: yup.string().required('La categoría es obligatoria'),
  price: yup.number().typeError('Debe ser un número').required('Precio obligatorio').positive('Debe ser positivo'),
  stock: yup.number().typeError('Debe ser un número').required('Stock obligatorio').integer('Debe ser entero').min(0, 'Mínimo 0'),
  description: yup.string().required('La descripción es obligatoria')
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: props.initialData || {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: ''
  }
})

const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: category, errorMessage: categoryError } = useField<string>('category')
const { value: price, errorMessage: priceError } = useField<number>('price')
const { value: stock, errorMessage: stockError } = useField<number>('stock')
const { value: description, errorMessage: descriptionError } = useField<string>('description')

const onSubmit = handleSubmit((values) => {
  emit('save', values as Omit<ProductDTO, 'id'>)
})
</script>

<template>
  <v-card>
    <v-card-title class="bg-primary text-white">
      {{ initialData ? $t('admin.editProduct') : $t('admin.newProductTitle') }}
    </v-card-title>
    
    <v-card-text class="pt-4">
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="name"
          :label="$t('admin.productName')"
          :error-messages="nameError"
          variant="outlined"
        ></v-text-field>

        <v-select
          v-model="category"
          :items="['Cafés', 'Bollería', 'Postres', 'Bebidas']"
          :label="$t('admin.category')"
          :error-messages="categoryError"
          variant="outlined"
        ></v-select>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.number="price"
              :label="$t('admin.price')"
              type="number"
              :error-messages="priceError"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="stock"
              :label="$t('admin.stock')"
              type="number"
              :error-messages="stockError"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-textarea
          v-model="description"
          :label="$t('admin.description')"
          :error-messages="descriptionError"
          variant="outlined"
          rows="3"
        ></v-textarea>

        <v-card-actions class="px-0">
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="emit('cancel')">{{ $t('admin.cancel') }}</v-btn>
          <v-btn color="primary" type="submit" variant="elevated">{{ $t('admin.save') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
