<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVendorStore } from '../../stores/vendor'
import { useUIStore } from '../../stores/ui'
import VendorItem from '../../components/vendors/VendorItem.vue'
import VendorForm from '../../components/vendors/VendorForm.vue'

const vendorStore = useVendorStore()
const uiStore = useUIStore()

onMounted(() => {
  vendorStore.fetchVendors()
})

const vendors = computed(() => vendorStore.vendors)

const isDialogOpen = ref(false)
const selectedVendor = ref(undefined as any)

function openCreate() {
  selectedVendor.value = undefined
  isDialogOpen.value = true
}

function handleEdit(id: number) {
  selectedVendor.value = vendors.value.find((v: any) => v.id === id)
  isDialogOpen.value = true
}

function handleDelete(id: number) {
  vendorStore.deleteVendor(id)
  uiStore.showNotify('Proveedor eliminado', 'error')
}

function onSave(formData: any) {
  if (selectedVendor.value) {
    vendorStore.updateVendor(selectedVendor.value.id, formData)
    uiStore.showNotify('Proveedor actualizado')
  } else {
    vendorStore.addVendor(formData)
    uiStore.showNotify('Proveedor añadido')
  }
  isDialogOpen.value = false
}
</script>

<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-space-between align-center">
      <h1 class="text-h4">Gestión de Proveedores</h1>
      <v-btn color="secondary" prepend-icon="mdi-plus" @click="openCreate">Nuevo Proveedor</v-btn>
    </v-col>

    <v-col cols="12">
      <v-divider class="mb-4"></v-divider>
    </v-col>

    <v-col cols="12" md="10" lg="8">
      <v-row>
        <v-col v-for="vendor in vendors" :key="vendor.id" cols="12" sm="6">
          <VendorItem :vendor="vendor" @edit="handleEdit" @delete="handleDelete" />
        </v-col>
      </v-row>
    </v-col>

    <v-dialog v-model="isDialogOpen" max-width="500px">
      <VendorForm :initial-data="selectedVendor" @save="onSave" @cancel="isDialogOpen = false" />
    </v-dialog>
  </v-row>
</template>
