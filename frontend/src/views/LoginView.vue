<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()
const loading = ref(false)

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email obligatorio'),
  password: yup.string().required('Contraseña obligatoria').min(6, 'Mínimo 6 caracteres')
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: 'admin@cafeteria.com',
    password: ''
  }
})

const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  try {
    await authStore.login(values.email, values.password)
    uiStore.showNotify('¡Bienvenido de nuevo!')
    router.push('/admin')
  } catch (err: any) {
    uiStore.showNotify(err.message || 'Error al iniciar sesión', 'error')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 rounded-lg">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="text-center w-100">{{ $t('auth.title') }}</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text class="pt-6">
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                :label="$t('auth.email')"
                prepend-icon="mdi-account"
                type="email"
                variant="outlined"
                :error-messages="emailError"
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :label="$t('auth.password')"
                prepend-icon="mdi-lock"
                type="password"
                variant="outlined"
                :error-messages="passwordError"
                class="mb-4"
              ></v-text-field>

              <v-btn
                block
                color="primary"
                size="large"
                type="submit"
                :loading="loading"
                variant="elevated"
              >
                {{ $t('auth.submit') }}
              </v-btn>
            </v-form>
          </v-card-text>
          
          <v-card-actions class="justify-center pb-4 flex-column">
            <v-btn variant="text" color="secondary" to="/auth/register">
              {{ $t('auth.noAccount') }}
            </v-btn>
            <v-btn variant="text" size="small" to="/" class="mt-2">
              {{ $t('auth.backHome') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
