<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)

const adminItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/admin' },
  { title: 'Productos', icon: 'mdi-package-variant', to: '/admin/products' },
  { title: 'Proveedores', icon: 'mdi-truck', to: '/admin/vendors' },
  { title: 'Volver a la Web', icon: 'mdi-arrow-left', to: '/' },
]
</script>

<template>
  <v-app>
    <!-- Sidebar de Administración -->
    <v-navigation-drawer v-model="drawer" color="grey-darken-3">
      <v-list>
        <v-list-item
          prepend-icon="mdi-shield-account"
          title="ADMINISTRACIÓN"
          subtitle="Panel de Gestión"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in adminItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Header de Administración -->
    <v-app-bar color="grey-darken-4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Cafetería - Panel Control</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Contenido Principal -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
