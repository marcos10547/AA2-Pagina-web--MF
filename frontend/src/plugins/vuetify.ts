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
                    primary: '#4E342E',
                    secondary: '#D4A574',
                    accent: '#8D6E63',
                    success: '#2E7D32',
                    error: '#C62828',
                    warning: '#F9A825',
                    info: '#6D4C41',
                    background: '#FAF6F1',
                    surface: '#FFFFFF',
                },
            },
            dark: {
                colors: {
                    primary: '#A1887F',
                    secondary: '#D4A574',
                    accent: '#BCAAA4',
                    success: '#66BB6A',
                    error: '#EF5350',
                    warning: '#FFB74D',
                    info: '#8D6E63',
                    background: '#1A1210',
                    surface: '#2C2220',
                },
            },
        },
    },
})

export default vuetify
