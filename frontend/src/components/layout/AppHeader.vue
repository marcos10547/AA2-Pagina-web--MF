<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  switch (route.name) {
    case 'home': return 'Inicio'
    case 'login': return 'Acceso'
    default: return 'Cafetería'
  }
})
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>
    
    <v-spacer></v-spacer>

    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    
    <v-btn icon to="/login">
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>
