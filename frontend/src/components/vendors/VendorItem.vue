<script setup lang="ts">
import type { VendorDTO } from '../../core/vendor.dto'

const props = defineProps<{
  vendor: VendorDTO
}>()

const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <v-card class="mb-4" border variant="outlined">
    <v-card-item>
      <template v-slot:prepend>
        <v-icon color="secondary" size="large">mdi-store</v-icon>
      </template>
      <v-card-title>{{ vendor.name }}</v-card-title>
      <v-card-subtitle>{{ vendor.category }}</v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="d-flex align-center mb-1">
        <v-icon size="small" class="mr-2">mdi-account-tie</v-icon>
        <span>{{ vendor.contactName }}</span>
      </div>
      <div class="d-flex align-center mb-1">
        <v-icon size="small" class="mr-2">mdi-email</v-icon>
        <span class="text-caption">{{ vendor.email }}</span>
      </div>
      <div class="d-flex align-center">
        <v-icon size="small" class="mr-2">mdi-phone</v-icon>
        <span class="text-caption">{{ vendor.phone }}</span>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="secondary" variant="text" size="small" @click="emit('edit', vendor.id)">{{ $t('admin.edit') }}</v-btn>
      <v-btn color="error" variant="text" size="small" @click="emit('delete', vendor.id)">{{ $t('admin.delete') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
