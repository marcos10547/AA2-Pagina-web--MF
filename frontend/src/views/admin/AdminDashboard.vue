<script setup lang="ts">
import { useProductStore } from '../../stores/product'
import { useVendorStore } from '../../stores/vendor'

const productStore = useProductStore()
const vendorStore = useVendorStore()
</script>

<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-h4 mb-4">Panel de Administración</h1>
      <v-divider class="mb-6"></v-divider>
    </v-col>

    <v-col cols="12" md="4">
      <v-card color="primary" theme="dark">
        <v-card-text class="text-center">
          <div class="text-h6">Productos en Inventario</div>
          <div class="text-h2 font-weight-bold">{{ productStore.products.length }}</div>
          <v-btn variant="text" to="/admin/products" prepend-icon="mdi-eye">Ver Lista</v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card color="success" theme="dark">
        <v-card-text class="text-center">
          <div class="text-h6">Proveedores Activos</div>
          <div class="text-h2 font-weight-bold">{{ vendorStore.vendors.length }}</div>
          <v-btn variant="text" to="/admin/vendors" prepend-icon="mdi-eye">Ver Lista</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
