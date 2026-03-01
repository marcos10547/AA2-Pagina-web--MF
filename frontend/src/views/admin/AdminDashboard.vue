<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '../../stores/product'
import { useVendorStore } from '../../stores/vendor'

const productStore = useProductStore()
const vendorStore = useVendorStore()

onMounted(() => {
  productStore.fetchProducts()
  vendorStore.fetchVendors()
})
</script>

<template>
  <div>
    <!-- Cabecera del Dashboard  -->
    <div class="d-flex align-center mb-6">
      <v-icon size="36" color="primary" class="mr-3">mdi-view-dashboard-outline</v-icon>
      <div>
        <h1 class="text-h4 font-weight-bold">{{ $t('admin.dashboardTitle') }}</h1>
        <p class="text-body-2 text-medium-emphasis ma-0">Resumen general de tu cafetería</p>
      </div>
    </div>

    <!-- KPI Cards -->
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card class="kpi-card" rounded="xl" elevation="2">
          <v-card-text class="pa-6">
            <div class="d-flex align-center justify-space-between mb-3">
              <v-avatar color="primary" size="48" rounded="lg">
                <v-icon color="white" size="26">mdi-package-variant-closed</v-icon>
              </v-avatar>
              <v-chip color="success" size="small" variant="tonal" prepend-icon="mdi-trending-up">Activo</v-chip>
            </div>
            <div class="text-h3 font-weight-black mb-1">{{ productStore.products.length }}</div>
            <div class="text-body-2 text-medium-emphasis">{{ $t('admin.productsInInventory') }}</div>
            <v-btn variant="tonal" color="primary" class="mt-4 text-none" rounded="lg" block to="/admin/products" prepend-icon="mdi-arrow-right">
              {{ $t('admin.viewList') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="kpi-card" rounded="xl" elevation="2">
          <v-card-text class="pa-6">
            <div class="d-flex align-center justify-space-between mb-3">
              <v-avatar color="secondary" size="48" rounded="lg">
                <v-icon color="white" size="26">mdi-truck-delivery-outline</v-icon>
              </v-avatar>
              <v-chip color="info" size="small" variant="tonal" prepend-icon="mdi-check-circle">Verificados</v-chip>
            </div>
            <div class="text-h3 font-weight-black mb-1">{{ vendorStore.vendors.length }}</div>
            <div class="text-body-2 text-medium-emphasis">{{ $t('admin.activeVendors') }}</div>
            <v-btn variant="tonal" color="secondary" class="mt-4 text-none" rounded="lg" block to="/admin/vendors" prepend-icon="mdi-arrow-right">
              {{ $t('admin.viewList') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="kpi-card" rounded="xl" elevation="2">
          <v-card-text class="pa-6">
            <div class="d-flex align-center justify-space-between mb-3">
              <v-avatar color="accent" size="48" rounded="lg">
                <v-icon color="white" size="26">mdi-coffee-outline</v-icon>
              </v-avatar>
              <v-chip color="warning" size="small" variant="tonal" prepend-icon="mdi-star">Premium</v-chip>
            </div>
            <div class="text-h3 font-weight-black mb-1">☕</div>
            <div class="text-body-2 text-medium-emphasis">Cafetería en línea</div>
            <v-btn variant="tonal" color="accent" class="mt-4 text-none" rounded="lg" block disabled>
              Próximamente
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Acceso rápido -->
    <v-row class="mt-2">
      <v-col cols="12">
        <v-card rounded="xl" elevation="1" class="overflow-hidden">
          <div class="quick-access-header pa-5">
            <h3 class="text-h6 font-weight-bold text-white">
              <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
              Acceso Rápido
            </h3>
          </div>
          <v-card-text class="pa-4">
            <v-row dense>
              <v-col cols="6" sm="3">
                <v-btn variant="tonal" color="primary" block class="pa-4 text-none" rounded="lg" to="/admin/products" style="height: auto;">
                  <div class="text-center">
                    <v-icon size="28" class="mb-1">mdi-plus-circle-outline</v-icon>
                    <div class="text-caption">{{ $t('admin.newProduct') }}</div>
                  </div>
                </v-btn>
              </v-col>
              <v-col cols="6" sm="3">
                <v-btn variant="tonal" color="secondary" block class="pa-4 text-none" rounded="lg" to="/admin/vendors" style="height: auto;">
                  <div class="text-center">
                    <v-icon size="28" class="mb-1">mdi-account-plus-outline</v-icon>
                    <div class="text-caption">{{ $t('admin.newVendor') }}</div>
                  </div>
                </v-btn>
              </v-col>
              <v-col cols="6" sm="3">
                <v-btn variant="tonal" color="accent" block class="pa-4 text-none" rounded="lg" to="/admin/products" style="height: auto;">
                  <div class="text-center">
                    <v-icon size="28" class="mb-1">mdi-format-list-bulleted</v-icon>
                    <div class="text-caption">{{ $t('admin.products') }}</div>
                  </div>
                </v-btn>
              </v-col>
              <v-col cols="6" sm="3">
                <v-btn variant="tonal" color="info" block class="pa-4 text-none" rounded="lg" to="/admin/vendors" style="height: auto;">
                  <div class="text-center">
                    <v-icon size="28" class="mb-1">mdi-truck-outline</v-icon>
                    <div class="text-caption">{{ $t('admin.vendors') }}</div>
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.kpi-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
}
.quick-access-header {
  background: linear-gradient(135deg, #4E342E 0%, #6D4C41 100%);
}
</style>
