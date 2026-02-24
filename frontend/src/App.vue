<script setup lang="ts">
import { useUIStore } from './stores/ui'
const uiStore = useUIStore()
</script>

<template>
  <router-view />

  <!-- Notificaciones Globales -->
  <v-snackbar
    v-model="uiStore.snackbar.show"
    :color="uiStore.snackbar.color"
    :timeout="uiStore.snackbar.timeout"
    location="top right"
  >
    {{ uiStore.snackbar.message }}
    
    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="uiStore.snackbar.show = false"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style>
/* Estilos globales */
</style>
