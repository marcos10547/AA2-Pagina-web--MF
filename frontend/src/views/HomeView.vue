<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mt-5" elevation="2">
          <v-card-title class="text-h4 primary--text">
            <v-icon icon="mdi-coffee" class="mr-2"></v-icon>
            Gestión de Inventario - Cafetería
          </v-card-title>
          
          <v-card-text>
            <p class="text-body-1">Bienvenido a la aplicación de gestión. Esta es la página principal pública.</p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" variant="elevated" to="/login">
              <v-icon icon="mdi-login" class="mr-1"></v-icon>
              Ir al Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
