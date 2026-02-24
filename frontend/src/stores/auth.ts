import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any,
        token: null as string | null,
        isAuthenticated: false,
    }),
    actions: {
        login(userData: any, token: string) {
            this.user = userData;
            this.token = token;
            this.isAuthenticated = true;
        },
        logout() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
        }
    }
});
