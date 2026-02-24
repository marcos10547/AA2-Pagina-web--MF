<script setup lang="ts">
import { ref } from 'vue'
import type { ProductDTO } from '../../core/product.dto'
import ProductItem from '../../components/products/ProductItem.vue'

// Datos de prueba (luego vendrán del store/backend)
const products = ref<ProductDTO[]>([
  { id: 1, name: 'Café Espresso', description: 'Café intenso de tueste natural', price: 1.50, stock: 100, category: 'Cafés' },
  { id: 2, name: 'Croissant Recreo', description: 'Mantequilla pura y masa hojaldrada', price: 2.20, stock: 30, category: 'Bollería' },
  { id: 3, name: 'Tarta de Queso', description: 'Receta casera estilo New York', price: 4.50, stock: 12, category: 'Postres' }
])

function handleEdit(id: number) {
  console.log('Editando producto:', id)
}

function handleDelete(id: number) {
  products.value = products.value.filter(p => p.id !== id)
}
</script>

<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-space-between align-center">
      <h1 class="text-h4">Gestión de Productos</h1>
      <v-btn color="success" prepend-icon="mdi-plus">Nuevo Producto</v-btn>
    </v-col>
    
    <v-col cols="12">
      <v-divider class="mb-4"></v-divider>
    </v-col>

    <v-col cols="12" md="8" lg="6">
      <!-- Ejemplo de cumplimiento: No mezclamos v-for con el diseño principal -->
      <ProductItem 
        v-for="prod in products" 
        :key="prod.id" 
        :product="prod"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </v-col>
  </v-row>
</template>
