<script setup lang="ts">
import type { ProductDTO } from '../../core/product.dto'

const props = defineProps<{
  product: ProductDTO
}>()

const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <v-card class="mb-4" border>
    <v-card-item>
      <template v-slot:prepend>
        <v-avatar color="primary" icon="mdi-package-variant"></v-avatar>
      </template>
      <v-card-title>{{ product.name }}</v-card-title>
      <v-card-subtitle>{{ product.category }} - Stock: {{ product.stock }} uds</v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{ product.description }}
      <div class="text-h6 mt-2">{{ Number(product.price).toFixed(2) }}€</div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="orange-darken-2" variant="text" prepend-icon="mdi-pencil" @click="emit('edit', product.id)">
        Editar
      </v-btn>
      <v-btn color="red-darken-1" variant="text" prepend-icon="mdi-delete" @click="emit('delete', product.id)">
        Eliminar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
