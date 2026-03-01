import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#5D4037',
                    secondary: '#FF8F00',
                    accent: '#8D6E63',
                    success: '#388E3C',
                    error: '#D32F2F',
                    warning: '#F9A825',
                    info: '#1565C0',
                    background: '#FFF8F0',
                    surface: '#FFFFFF',
                    'on-primary': '#FFFFFF',
                    'on-secondary': '#FFFFFF',
                    'on-surface': '#1C1B1F',
                    'on-background': '#1C1B1F',
                },
            },
            dark: {
                colors: {
                    primary: '#FFAB91',
                    secondary: '#FFB74D',
                    accent: '#BCAAA4',
                    success: '#81C784',
                    error: '#EF5350',
                    warning: '#FFB74D',
                    info: '#64B5F6',
                    background: '#1A1210',
                    surface: '#2C2220',
                    'on-primary': '#1A1210',
                    'on-secondary': '#1A1210',
                    'on-surface': '#F5E6D8',
                    'on-background': '#F5E6D8',
                },
            },
        },
    },
})

export default vuetify
