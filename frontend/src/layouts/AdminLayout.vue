<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const drawer = ref(true)
const authStore = useAuthStore()
const router = useRouter()
const { locale } = useI18n()
const theme = useTheme()

const languages = [
  { title: 'Español', value: 'es' },
  { title: 'English', value: 'en' },
]

function changeLanguage(lang: string) {
  locale.value = lang
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const adminItems = [
  { titleKey: 'admin.dashboard', icon: 'mdi-view-dashboard', to: '/admin' },
  { titleKey: 'admin.products', icon: 'mdi-package-variant', to: '/admin/products' },
  { titleKey: 'admin.vendors', icon: 'mdi-truck', to: '/admin/vendors' },
]

function handleLogout() {
  authStore.logout()
  router.push('/auth/login')
}
</script>

<template>
  <v-app>
    <!-- Sidebar de Administración -->
    <v-navigation-drawer v-model="drawer" color="grey-darken-3">
      <v-list>
        <v-list-item
          prepend-icon="mdi-shield-account"
          :title="$t('admin.sidebarTitle')"
          :subtitle="$t('admin.sidebarSubtitle')"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in adminItems"
          :key="item.titleKey"
          :prepend-icon="item.icon"
          :title="$t(item.titleKey)"
          :to="item.to"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item 
          prepend-icon="mdi-logout" 
          :title="$t('admin.logout')" 
          value="logout" 
          color="error"
          @click="handleLogout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Header de Administración -->
    <v-app-bar color="grey-darken-4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ $t('admin.panelTitle') }}</v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- Selector de Idioma -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item
            v-for="lang in languages"
            :key="lang.value"
            :title="lang.title"
            :active="locale === lang.value"
            @click="changeLanguage(lang.value)"
          ></v-list-item>
        </v-list>
      </v-menu>

      <!-- Toggle Tema Oscuro/Claro -->
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <v-btn icon @click="handleLogout" color="error">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Contenido Principal -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
