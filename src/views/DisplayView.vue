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
          {{ senhaAtual?.counter?.name || '--' }}
        </div>

      </div>
      <div class="d-flex gap-4">
        <!-- Próximas Senhas -->
        <div class="proximas-senhas bg-secondary bg-opacity-25 rounded p-4 flex-grow-1">
          <h3 class="fw-bold mb-4 text-center">PRÓXIMAS SENHAS</h3>
          <div class="d-flex justify-content-center gap-4">
            <div class="d-flex justify-content-center gap-4">
            <div 
              v-for="senha in dados?.waitingTickets" 
              :key="senha.id" 
              class="senha-card p-3 rounded fw-bold h3 text-center"
            >
              {{ senha.numero }}
            </div>
          </div>
          </div>
        </div>
        <!-- Últimas Chamadas -->
        <div class="ultimas-chamadas bg-secondary bg-opacity-25 rounded p-4" style="width: 350px">
          <h3 class="fw-bold mb-4 text-center">ÚLTIMAS CHAMADAS</h3>
          <div class="d-flex flex-column gap-3">
          <div 
            v-for="senha in dados?.calledTickets" 
            :key="senha.id" 
            class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3"
          >
            <span class="h4 mb-0">{{ senha.numero }}</span>
            <span class="badge">{{ senha.guiche }}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
    <audio ref="audioCall" src="/sounds/service-bell.mp3" preload="auto"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { queueService } from '@/services/api'
import type { QueueTicket, QueueDisplay } from '@/types/queue'

const senhaAtual = ref<QueueTicket | null>(null)
  const dados = ref<QueueDisplay>({
  currentTicket: null,
  waitingTickets: [],
  calledTickets: []
});

const audioCall = ref<HTMLAudioElement | null>(null)
const isNewCall = ref(false)
let intervalId: number

const atualizarPainel = async () => {
  try {
    const response = await queueService.obterPainel();
    console.log('Dados do painel:', response);
    console.log('Guichê da senha atual:', response.currentTicket?.guiche);

    senhaAtual.value = response.currentTicket;
    dados.value = {
      currentTicket: response.currentTicket,
      waitingTickets: response.waitingTickets,
      calledTickets: response.calledTickets || []
    };
  } catch (error) {
    console.error('Erro ao atualizar painel:', error);
  }
};



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

onMounted(() => {
  atualizarPainel()
  intervalId = window.setInterval(atualizarPainel, 5000)
})

onUnmounted(() => {
  window.clearInterval(intervalId)
})
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
}
</style>
