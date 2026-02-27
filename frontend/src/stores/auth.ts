import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Error al iniciar sesión')
                }

                this.user = data.user
                this.token = data.token
                this.isAuthenticated = true

                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
            } catch (err: any) {
                this.logout()
                throw err
            }
        },
        logout() {
            this.user = null
            this.token = null
            this.isAuthenticated = false
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})
