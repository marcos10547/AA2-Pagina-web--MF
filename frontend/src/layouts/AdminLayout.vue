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
  { title: 'Español', value: 'es', flag: '🇪🇸' },
  { title: 'English', value: 'en', flag: '🇬🇧' },
]

function changeLanguage(lang: string) {
  locale.value = lang
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const adminItems = [
  { titleKey: 'admin.dashboard', icon: 'mdi-view-dashboard-outline', to: '/admin' },
  { titleKey: 'admin.products', icon: 'mdi-package-variant-closed', to: '/admin/products' },
  { titleKey: 'admin.vendors', icon: 'mdi-truck-delivery-outline', to: '/admin/vendors' },
]

function handleLogout() {
  authStore.logout()
  router.push('/auth/login')
}
</script>

<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" class="sidebar-custom">
      <!-- Logo/Brand -->
      <div class="sidebar-brand pa-4 text-center">
        <v-avatar color="secondary" size="52" class="mb-2">
          <v-icon size="28" color="white">mdi-coffee</v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold text-white">{{ $t('admin.sidebarTitle') }}</div>
        <div class="text-caption" style="opacity: 0.6; color: white;">{{ $t('admin.sidebarSubtitle') }}</div>
      </div>

      <v-divider class="mx-3" style="opacity: 0.2;"></v-divider>

      <v-list density="compact" nav class="pa-3">
        <v-list-item
          v-for="item in adminItems"
          :key="item.titleKey"
          :prepend-icon="item.icon"
          :title="$t(item.titleKey)"
          :to="item.to"
          rounded="lg"
          class="mb-1"
          active-color="secondary"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-3">
          <v-btn 
            block
            color="error"
            variant="tonal" 
            prepend-icon="mdi-logout" 
            rounded="lg"
            class="text-none"
            @click="handleLogout"
          >
            {{ $t('admin.logout') }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Top Bar -->
    <v-app-bar elevation="0" class="topbar-custom">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-app-bar-title class="font-weight-bold">
        <v-icon class="mr-1" size="20">mdi-coffee</v-icon>
        {{ $t('admin.panelTitle') }}
      </v-app-bar-title>
      
      <v-spacer></v-spacer>

      <!-- Idioma -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon variant="text" v-bind="props" size="small">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list density="compact" rounded="lg">
          <v-list-item
            v-for="lang in languages"
            :key="lang.value"
            :active="locale === lang.value"
            @click="changeLanguage(lang.value)"
          >
            <template v-slot:prepend>
              <span class="mr-2">{{ lang.flag }}</span>
            </template>
            <v-list-item-title>{{ lang.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Tema -->
      <v-btn icon variant="text" size="small" @click="toggleTheme">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <!-- User Avatar -->
      <v-avatar color="secondary" size="32" class="ml-2 mr-2">
        <v-icon size="18" color="white">mdi-account</v-icon>
      </v-avatar>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.sidebar-custom {
  background: linear-gradient(180deg, #3E2723 0%, #4E342E 100%) !important;
  color: white !important;
}
.sidebar-custom :deep(.v-list-item-title),
.sidebar-custom :deep(.v-list-item-subtitle),
.sidebar-custom :deep(.v-list-item__prepend > .v-icon) {
  color: rgba(255, 255, 255, 0.9) !important;
}
.sidebar-custom :deep(.v-list-item--active .v-list-item-title),
.sidebar-custom :deep(.v-list-item--active .v-icon) {
  color: #FFB74D !important;
}
.sidebar-brand {
  padding-top: 20px !important;
}
.topbar-custom {
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
</style>
