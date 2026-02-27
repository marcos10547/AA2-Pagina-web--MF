<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mt-5" elevation="2">
          <v-card-title class="text-h4 primary--text">
            <v-icon icon="mdi-coffee" class="mr-2"></v-icon>
            {{ $t('home.welcome') }}
          </v-card-title>
          
          <v-card-text>
            <p class="text-body-1">{{ $t('home.subtitle') }}</p>
            <p class="text-caption mt-2">{{ $t('home.hours') }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" variant="elevated" to="/login">
              <v-icon icon="mdi-login" class="mr-1"></v-icon>
              {{ $t('home.explore') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
