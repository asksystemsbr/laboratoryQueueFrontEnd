```vue
<template>
  <div class="display-container bg-dark text-white">
    <div class="content-wrapper p-4 h-100 d-flex flex-column justify-content-center">
      <!-- Senha Atual -->
      <div 
        class="senha-atual bg-primary rounded p-4 mb-4"
        :class="{ 'animate-call': isNewCall }"
      >
        <h2 class="fw-bold mb-3">SENHA ATUAL</h2>
        <div class="numero-atual fw-bold mb-3">
          {{ senhaAtual?.numero || '--' }}
        </div>
        <div class="guiche h2 mb-0">
          GUICHÊ {{ senhaAtual?.guiche || '--' }}
        </div>
      </div>
      <div class="d-flex gap-4">
        <!-- Próximas Senhas -->
        <div class="proximas-senhas bg-secondary bg-opacity-25 rounded p-4 flex-grow-1">
          <h3 class="fw-bold mb-4 text-center">PRÓXIMAS SENHAS</h3>
          <div class="d-flex justify-content-center gap-4">
            <div v-for="senha in dados?.espera"
                :key="senha.id"
                :class="['senha-card', 'p-3', 'rounded', 'fw-bold', 'h3', 'text-center',
                      getTipoBgClass(senha.tipo)]">
              {{ senha.numero }}
            </div>
          </div>
        </div>
        <!-- Últimas Chamadas -->
        <div class="ultimas-chamadas bg-secondary bg-opacity-25 rounded p-4" style="width: 350px">
          <h3 class="fw-bold mb-4 text-center">ÚLTIMAS CHAMADAS</h3>
          <div class="d-flex flex-column gap-3">
            <div v-for="senha in dados?.ultimasChamadas"
                :key="senha.id"
                class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3">
              <span class="h4 mb-0">{{ senha.numero }}</span>
              <span :class="['badge', getTipoBgClass(senha.tipo)]">
                Guichê {{ senha.guiche }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio ref="audioCall" src="/sounds/service-bell.mp3" preload="auto"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { queueService } from '@/services/api'
import { TipoSenha, type QueueTicket, type QueueDisplay } from '@/types/queue'

const senhaAtual = ref<QueueTicket | null>(null)
const dados = ref<QueueDisplay>({
  atual: null,
  espera: [],
  ultimasChamadas: []
})
const audioCall = ref<HTMLAudioElement | null>(null)
const isNewCall = ref(false)
let intervalId: number

const getTipoBgClass = (tipo: TipoSenha): string => {
  const classMap: Record<TipoSenha, string> = {
    [TipoSenha.ATENDIMENTO_ORCAMENTO]: 'bg-primary',
    [TipoSenha.PREFERENCIAL]: 'bg-success',
    [TipoSenha.VACINA]: 'bg-info',
    [TipoSenha.AGENDAR_EXAMES]: 'bg-warning',
    [TipoSenha.RETIRAR_RESULTADOS]: 'bg-danger',
    [TipoSenha.EXAMES_AGENDADOS]: 'bg-secondary'
  }
  return classMap[tipo]
}

const atualizarPainel = async () => {
  try {
    const response = await queueService.obterPainel()
    if (response.atual?.id !== senhaAtual.value?.id) {
      isNewCall.value = true
      await playSound()
      setTimeout(() => {
        isNewCall.value = false
      }, 3000)
    }
    senhaAtual.value = response.atual
    dados.value = response
  } catch (error) {
    console.error('Erro ao atualizar painel:', error)
  }
}

onMounted(() => {
  atualizarPainel()
  intervalId = window.setInterval(atualizarPainel, 5000)
})

onUnmounted(() => {
  window.clearInterval(intervalId)
})

const playSound = async () => {
  try {
    if (audioCall.value) {
      audioCall.value.currentTime = 0
      await audioCall.value.play()
    }
  } catch (error) {
    console.error('Erro ao reproduzir som:', error)
  }
}



</script>

<style scoped>
.display-container {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
}

.content-wrapper {
  width: 100%;
}

.senha-atual {
  animation: pulse 2s infinite ease-in-out;
}

.numero-atual {
  font-size: 11rem;
  line-height: 1;
}

.senha-card {
  min-width: 140px;
  transition: transform 0.3s ease;
}

.senha-card:hover {
  transform: scale(1.05);
}

.badge {
  font-size: 1rem;
  padding: 8px 16px;
}

.animate-call {
  animation: callAttention 3s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes callAttention {
  0% { transform: scale(1); background-color: var(--bs-warning); }
  50% { transform: scale(1.05); background-color: var(--bs-warning); }
  100% { transform: scale(1); background-color: var(--bs-primary); }
}

@media (min-width: 1400px) {
  .numero-atual {
    font-size: 13rem;
  }
  .senha-card {
    min-width: 160px;
    font-size: 2rem;
  }
  .badge {
    font-size: 1.1rem;
    padding: 10px 20px;
  }
}

@media (max-width: 1200px) {
  .numero-atual {
    font-size: 9rem;
  }
  .senha-card {
    min-width: 120px;
    font-size: 1.6rem;
  }
  .p-4 {
    padding: 1rem !important;
  }
  .gap-4 {
    gap: 1rem !important;
  }
}

@media (max-width: 768px) {
  .d-flex {
    flex-direction: column !important;
  }
  .ultimas-chamadas {
    width: 100% !important;
  }
  .numero-atual {
    font-size: 7rem;
  }
}

</style>
