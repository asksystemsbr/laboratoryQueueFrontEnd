```vue
<template>
  <div class="totem-container bg-light min-vh-100">
    <!-- Header -->
    <header class="text-center py-5">
      <h1 class="display-4 fw-bold">Sistema de Senhas</h1>
      <p class="lead">Selecione o tipo de atendimento desejado</p>
    </header>

    <!-- Conteúdo Principal -->
    <div class="container px-4">
      <div class="row g-4">
        <div v-for="tipo in tiposAtendimento" :key="tipo.value" class="col-md-4">
          <div class="card h-100 border-0 shadow-sm service-card">
            <div class="card-body d-flex flex-column align-items-center p-4">
              <div 
                class="icon-wrapper mb-4"
                :style="{ backgroundColor: `${tipo.color}33` }"
              >
                <i :class="['bi', tipo.icon, 'fs-1']" :style="{ color: tipo.color }"></i>
              </div>
              <h5 class="card-title fw-bold mb-3">{{ tipo.label }}</h5>
              <p class="text-muted small mb-4">{{ tipo.description }}</p>
              <button 
                class="btn btn-lg w-100 mt-auto fw-bold text-white"
                :style="{ backgroundColor: tipo.color }"
                @click="gerarSenha(tipo.value)"
                :disabled="isLoading"
              >
                Gerar Senha
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Senha Gerada -->
    <div class="modal fade" ref="successModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center p-5">
            <div class="mb-4">
              <i class="bi bi-check-circle-fill text-success fs-1"></i>
            </div>
            <h2 class="mb-4">Sua senha é:</h2>
            <div class="display-1 fw-bold mb-4">{{ senhaNova?.numero }}</div>
            <p class="text-muted">Aguarde ser chamado no painel</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import { queueService } from '@/services/api'
import { TipoSenha, type QueueTicket } from '@/types/queue'

const isLoading = ref(false)
const senhaNova = ref<QueueTicket | null>(null)
const successModal = ref<HTMLElement | null>(null)
let modalInstance: Modal | null = null

const tiposAtendimento = [
  {
    label: 'Atendimento/Orçamento',
    value: TipoSenha.ATENDIMENTO_ORCAMENTO,
    description: 'Atendimento relacionado a orçamentos',
    icon: 'bi-clipboard-data',
    color: '#FF5733'
  },
  {
    label: 'Preferencial',
    value: TipoSenha.PREFERENCIAL,
    description: 'Atendimento prioritário',
    icon: 'bi-person-heart',
    color: '#33FF57'
  },
  {
    label: 'Vacina',
    value: TipoSenha.VACINA,
    description: 'Agendamento e aplicação de vacinas',
    icon: 'bi-bandaid',
    color: '#FFC300'
  },
  {
    label: 'Agendar Exames',
    value: TipoSenha.AGENDAR_EXAMES,
    description: 'Marcar exames laboratoriais',
    icon: 'bi-calendar-check',
    color: '#28A745'
  },
  {
    label: 'Retirar Resultados',
    value: TipoSenha.RETIRAR_RESULTADOS,
    description: 'Receber resultados de exames',
    icon: 'bi-file-text',
    color: '#C70039'
  },
  {
    label: 'Exames Agendados',
    value: TipoSenha.EXAMES_AGENDADOS,
    description: 'Consulta de exames já marcados',
    icon: 'bi-card-checklist',
    color: '#900C3F'
  }
]

const gerarSenha = async (tipo: TipoSenha) => {
  try {
    isLoading.value = true
    senhaNova.value = await queueService.gerarSenha(tipo)
    modalInstance?.show()
    
    setTimeout(() => {
      modalInstance?.hide()
      senhaNova.value = null
    }, 5000)
  } catch (error) {
    console.error('Erro ao gerar senha:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (successModal.value) {
    modalInstance = new Modal(successModal.value, {
      backdrop: 'static',
      keyboard: false
    })
  }
})
</script>

<style scoped>
.totem-container {
  background-color: #f8f9fa;
}

.service-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-lg {
  padding: 1rem 2rem;
  border-radius: 8px;
  transition: opacity 0.2s ease;
}

.btn-lg:hover:not(:disabled) {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem;
  }
  
  .lead {
    font-size: 1rem;
  }
}
</style>
```