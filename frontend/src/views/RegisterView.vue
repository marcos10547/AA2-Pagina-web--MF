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
  initialValues: { name: '', email: '', password: '', confirmPassword: '' }
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  try {
    await authStore.register(values.name, values.email, values.password)
    await authStore.login(values.email, values.password)
    uiStore.showNotify('¡Cuenta creada! Bienvenido.')
    router.push('/admin')
  } catch (err: any) {
    uiStore.showNotify(err.message || 'Error al registrarse', 'error')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="register-wrapper">
    <div class="register-brand">
      <div class="brand-content">
        <v-icon size="80" color="white" class="mb-4">mdi-coffee</v-icon>
        <h1 class="text-h3 font-weight-bold text-white mb-2">Cafetería</h1>
        <p class="text-subtitle-1 text-white" style="opacity: 0.85">
          {{ $t('home.subtitle') }}
        </p>
      </div>
    </div>

    <div class="register-form-panel">
      <v-card class="register-card" elevation="0" rounded="xl">
        <v-card-text class="pa-8">
          <div class="text-center mb-5">
            <v-avatar color="secondary" size="56" class="mb-3">
              <v-icon size="30" color="white">mdi-account-plus-outline</v-icon>
            </v-avatar>
            <h2 class="text-h5 font-weight-bold">{{ $t('auth.registerTitle') }}</h2>
          </div>

          <v-form @submit.prevent="onSubmit">
            <v-text-field v-model="name" :label="$t('auth.name')" prepend-inner-icon="mdi-account-outline" variant="outlined" rounded="lg" :error-messages="nameError" class="mb-1" color="primary"></v-text-field>
            <v-text-field v-model="email" :label="$t('auth.email')" prepend-inner-icon="mdi-email-outline" type="email" variant="outlined" rounded="lg" :error-messages="emailError" class="mb-1" color="primary"></v-text-field>
            <v-text-field v-model="password" :label="$t('auth.password')" prepend-inner-icon="mdi-lock-outline" type="password" variant="outlined" rounded="lg" :error-messages="passwordError" class="mb-1" color="primary"></v-text-field>
            <v-text-field v-model="confirmPassword" :label="$t('auth.confirmPassword')" prepend-inner-icon="mdi-lock-check-outline" type="password" variant="outlined" rounded="lg" :error-messages="confirmPasswordError" class="mb-2" color="primary"></v-text-field>

            <v-btn block color="secondary" size="large" type="submit" :loading="loading" variant="elevated" rounded="lg" class="mt-3 text-none font-weight-bold">
              <v-icon start>mdi-account-check</v-icon>
              {{ $t('auth.registerSubmit') }}
            </v-btn>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="justify-center pb-6">
          <v-btn variant="text" color="primary" to="/auth/login" class="text-none">
            {{ $t('auth.alreadyAccount') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.register-wrapper {
  display: flex;
  min-height: 100vh;
}
.register-brand {
  flex: 1;
  background: linear-gradient(135deg, #4E342E 0%, #6D4C41 40%, #8D6E63 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.register-brand::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%);
  animation: pulseGlow 6s ease-in-out infinite;
}
@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}
.brand-content { text-align: center; z-index: 1; }
.register-form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: rgb(var(--v-theme-background));
}
.register-card {
  width: 100%;
  max-width: 460px;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(0,0,0,0.08);
}
@media (max-width: 768px) {
  .register-wrapper { flex-direction: column; }
  .register-brand { flex: 0 0 150px; }
}
</style>
