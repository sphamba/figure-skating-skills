import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import './style.css'
import './assets/app.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.my-app-dark',
      cssLayer: false
    }
  },
})

app.use(ConfirmationService)

app.mount('#app')
