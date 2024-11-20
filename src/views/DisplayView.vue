```vue
<template>
  <div class="display-container bg-dark text-white min-vh-100">
    <!-- Template mantido igual -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { queueService } from '@/services/api'
import type { QueueTicket, QueueDisplay } from '@/types/queue'

const senhaAtual = ref<QueueTicket | null>(null)
const senhasEspera = ref<QueueTicket[]>([])
const ultimasChamadas = ref<QueueTicket[]>([])
const audio = new Audio('/sounds/bell.mp3')

const atualizarPainel = async () => {
  try {
    const dados = await queueService.obterPainel()
    
    if (dados.atual?.numero !== senhaAtual.value?.numero) {
      audio.play()
      senhaAtual.value = dados.atual
    }
    
    senhasEspera.value = dados.espera
    ultimasChamadas.value = dados.ultimasChamadas
  } catch (error) {
    console.error('Erro ao atualizar painel:', error)
  }
}

// Definindo o tipo correto para o intervalo
let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  atualizarPainel()
  intervalId = setInterval(atualizarPainel, 5000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

```

<style scoped>
.display-container {
  overflow: hidden;
}

.current-ticket {
  animation: pulse 2s ease-in-out infinite;
}

.waiting-ticket {
  transition: transform 0.3s ease;
}

.waiting-ticket:hover {
  transform: scale(1.05);
}

.last-called {
  transition: background-color 0.3s ease;
}

.last-called:hover {
  background-color: #f8f9fa;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

/* Responsividade */
@media (max-width: 768px) {
  .display-container {
    font-size: 0.9rem;
  }

  .current-number {
    font-size: 4rem !important;
  }
}
</style>
```