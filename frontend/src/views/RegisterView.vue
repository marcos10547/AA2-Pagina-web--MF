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
  name: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  email: yup.string().email('Email inválido').required('Email obligatorio'),
  password: yup.string().required('Contraseña obligatoria').min(6, 'Mínimo 6 caracteres'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Debes confirmar tu contraseña')
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
})

const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  try {
    await authStore.register(values.name, values.email, values.password)
    uiStore.showNotify('¡Cuenta creada correctamente! Ya puedes iniciar sesión.')
    router.push('/auth/login')
  } catch (err: any) {
    uiStore.showNotify(err.message || 'Error al registrarse', 'error')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-card class="elevation-12 rounded-lg">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title class="text-center w-100">{{ $t('auth.registerTitle') }}</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text class="pt-6">
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="name"
                :label="$t('auth.name')"
                prepend-icon="mdi-account-circle"
                variant="outlined"
                :error-messages="nameError"
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="email"
                :label="$t('auth.email')"
                prepend-icon="mdi-email"
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
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                :label="$t('auth.confirmPassword')"
                prepend-icon="mdi-lock-check"
                type="password"
                variant="outlined"
                :error-messages="confirmPasswordError"
                class="mb-4"
              ></v-text-field>

              <v-btn
                block
                color="secondary"
                size="large"
                type="submit"
                :loading="loading"
                variant="elevated"
              >
                {{ $t('auth.registerSubmit') }}
              </v-btn>
            </v-form>
          </v-card-text>
          
          <v-card-actions class="justify-center pb-4 flex-column">
            <v-btn variant="text" color="primary" to="/auth/login">
              {{ $t('auth.alreadyAccount') }}
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
