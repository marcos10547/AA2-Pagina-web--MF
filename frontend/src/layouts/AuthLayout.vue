<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const languages = [
  { title: 'Español', value: 'es' },
  { title: 'English', value: 'en' },
]

function changeLanguage(lang: string) {
  locale.value = lang
}
</script>

<template>
  <v-app>
    <!-- Botón de idioma flotante en la esquina superior derecha -->
    <div style="position: fixed; top: 16px; right: 16px; z-index: 999;">
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
    </div>

    <v-main class="bg-grey-lighten-4">
      <v-container fill-height fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
