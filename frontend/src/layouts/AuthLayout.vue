<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

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
</script>

<template>
  <v-app>
    <!-- Botones flotantes: Idioma + Tema -->
    <div style="position: fixed; top: 16px; right: 16px; z-index: 999; display: flex; gap: 8px;">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="elevated" color="primary" size="small">
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

      <v-btn icon variant="elevated" color="primary" size="small" @click="toggleTheme">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </div>

    <v-main>
      <v-container fill-height fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
