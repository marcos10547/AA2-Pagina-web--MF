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
    email: '',
    password: ''
  }
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

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
  <div class="login-wrapper">
    <!-- Panel izquierdo decorativo -->
    <div class="login-brand">
      <div class="brand-content">
        <v-icon size="80" color="white" class="mb-4">mdi-coffee</v-icon>
        <h1 class="text-h3 font-weight-bold text-white mb-2">Cafetería</h1>
        <p class="text-subtitle-1 text-white-darken-2" style="opacity: 0.85;">
          {{ $t('home.subtitle') }}
        </p>
        <div class="brand-decoration">
          <v-icon size="24" color="white" style="opacity:0.3" class="mx-1">mdi-coffee-outline</v-icon>
          <v-icon size="24" color="white" style="opacity:0.3" class="mx-1">mdi-coffee-outline</v-icon>
          <v-icon size="24" color="white" style="opacity:0.3" class="mx-1">mdi-coffee-outline</v-icon>
        </div>
      </div>
    </div>

    <!-- Panel derecho con el formulario -->
    <div class="login-form-panel">
      <v-card class="login-card" elevation="0" rounded="xl">
        <v-card-text class="pa-8">
          <div class="text-center mb-6">
            <v-avatar color="primary" size="56" class="mb-3">
              <v-icon size="30" color="white">mdi-lock-outline</v-icon>
            </v-avatar>
            <h2 class="text-h5 font-weight-bold">{{ $t('auth.title') }}</h2>
            <p class="text-body-2 text-medium-emphasis mt-1">Introduce tus credenciales</p>
          </div>

          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              :label="$t('auth.email')"
              prepend-inner-icon="mdi-email-outline"
              type="email"
              variant="outlined"
              rounded="lg"
              :error-messages="emailError"
              class="mb-1"
              color="primary"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :label="$t('auth.password')"
              prepend-inner-icon="mdi-lock-outline"
              type="password"
              variant="outlined"
              rounded="lg"
              :error-messages="passwordError"
              class="mb-2"
              color="primary"
            ></v-text-field>

            <v-btn
              block
              color="primary"
              size="large"
              type="submit"
              :loading="loading"
              variant="elevated"
              rounded="lg"
              class="mt-4 text-none font-weight-bold"
              style="letter-spacing: 0.5px;"
            >
              <v-icon start>mdi-login</v-icon>
              {{ $t('auth.submit') }}
            </v-btn>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="justify-center pb-6 flex-column">
          <v-btn variant="text" color="secondary" to="/auth/register" class="text-none">
            {{ $t('auth.noAccount') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  min-height: 100vh;
}

.login-brand {
  flex: 1;
  background: linear-gradient(135deg, #4E342E 0%, #6D4C41 40%, #8D6E63 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-brand::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%);
  animation: pulseGlow 6s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}

.brand-content {
  text-align: center;
  z-index: 1;
}

.brand-decoration {
  margin-top: 24px;
}

.login-form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: rgb(var(--v-theme-background));
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(0,0,0,0.08);
}

@media (max-width: 768px) {
  .login-wrapper {
    flex-direction: column;
  }
  .login-brand {
    flex: 0 0 180px;
  }
}
</style>
