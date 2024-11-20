// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css';         // Ícones necessários
import '@/assets/custom-theme.css'; // Seu CSS customizado
import 'bootstrap/dist/css/bootstrap.min.css';



// Estilos
import './assets/theme.css'           // arquivo que vamos criar
import './style.css'                  // seus estilos personalizados

const app = createApp(App)

app.use(PrimeVue, { ripple: true })
app.use(router)
app.use(ToastService)

// Componentes globais
app.component('Card', Card)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Toast', Toast)

app.mount('#app')