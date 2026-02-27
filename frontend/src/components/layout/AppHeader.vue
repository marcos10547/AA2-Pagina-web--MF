<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { locale, t } = useI18n()

const pageTitle = computed(() => {
  switch (route.name) {
    case 'home': return t('nav.home')
    case 'login': return t('nav.login')
    case 'register': return t('nav.register')
    default: return 'Cafetería'
  }
})

const toggleLocale = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>
    
    <v-spacer></v-spacer>

    <!-- Selector de Idioma -->
    <v-btn variant="text" @click="toggleLocale" class="mr-2">
      <v-icon start>mdi-translate</v-icon>
      {{ locale.toUpperCase() }}
    </v-btn>

    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    
    <v-btn icon to="/login">
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn icon to="/admin" color="amber-lighten-4">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>
