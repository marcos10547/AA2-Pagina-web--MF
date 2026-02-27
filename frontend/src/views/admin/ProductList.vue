import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../../stores/product'
import { useUIStore } from '../../stores/ui'
import type { ProductDTO } from '../../core/product.dto'
import ProductItem from '../../components/products/ProductItem.vue'
import ProductForm from '../../components/products/ProductForm.vue'

const productStore = useProductStore()
const uiStore = useUIStore()

onMounted(() => {
  productStore.fetchProducts()
})

// State reactivo desde el store
const products = computed(() => productStore.products)

// Estado del diálogo
const isDialogOpen = ref(false)
const selectedProduct = ref<ProductDTO | undefined>(undefined)

function openCreate() {
  selectedProduct.value = undefined
  isDialogOpen.value = true
}

function handleEdit(id: number) {
  selectedProduct.value = products.value.find(p => p.id === id)
  isDialogOpen.value = true
}

function handleDelete(id: number) {
  productStore.deleteProduct(id)
  uiStore.showNotify('Producto eliminado correctamente', 'error')
}

function onSave(formData: Omit<ProductDTO, 'id'>) {
  if (selectedProduct.value) {
    productStore.updateProduct(selectedProduct.value.id, formData)
    uiStore.showNotify('Producto actualizado con éxito')
  } else {
    productStore.addProduct(formData)
    uiStore.showNotify('Producto creado con éxito')
  }
  isDialogOpen.value = false
}
</script>

<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-space-between align-center">
      <h1 class="text-h4">Gestión de Productos</h1>
      <v-btn color="success" prepend-icon="mdi-plus" @click="openCreate">Nuevo Producto</v-btn>
    </v-col>
    
    <v-col cols="12">
      <v-divider class="mb-4"></v-divider>
    </v-col>

    <v-col cols="12" md="8" lg="6">
      <ProductItem 
        v-for="prod in products" 
        :key="prod.id" 
        :product="prod"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </v-col>

    <!-- Diálogo del Formulario -->
    <v-dialog v-model="isDialogOpen" max-width="600px">
      <ProductForm 
        :initial-data="selectedProduct" 
        @save="onSave" 
        @cancel="isDialogOpen = false" 
      />
    </v-dialog>
  </v-row>
</template>
