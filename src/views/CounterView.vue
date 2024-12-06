<template>
  <div class="counter-container bg-light min-vh-100">
    <!-- Header -->
    <div class="bg-primary px-5 py-3 mb-4 d-flex justify-content-between align-items-center">
      <h1 class="h2 mb-0 text-white">Guichê {{ guicheAtual }}</h1>
      <div class="d-flex gap-3">
        <button class="btn btn-light px-4" @click="toggleAtendimento">
          {{ emAtendimento ? 'Pausar' : 'Iniciar' }} Atendimento
        </button>
        <button class="btn btn-outline-light px-4" @click="abrirConfigGuiche">
          Configurar
        </button>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="container-fluid px-5">
      <div class="row g-4 mb-4">
        <!-- Senha Atual -->
        <div class="col-lg-7">
          <div class="card h-100">
            <div class="card-header bg-primary py-3">
              <h2 class="h4 mb-0 text-white text-center">Senha Atual</h2>
            </div>
            <div class="card-body d-flex align-items-center justify-content-center bg-white py-5">
              <div v-if="senhaAtual" class="text-center">
                <h1 class="super-display mb-3 text-dark senha-destaque">{{ senhaAtual.numero }}</h1>
                <span :class="['badge fs-4 mb-2', senhaAtual.tipo === 'P' ? 'bg-success' : 'bg-primary']">
                  {{ senhaAtual.tipo === 'P' ? 'Preferencial' : 'Normal' }}
                </span>
              </div>
              <div v-else class="text-center">
                <h3 class="text-muted">Nenhuma senha em atendimento</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles -->
        <div class="col-lg-5">
          <div class="card h-100">
            <div class="card-header bg-primary py-3">
              <h2 class="h4 mb-0 text-white text-center">Controles</h2>
            </div>
            <div class="card-body d-flex flex-column justify-content-center gap-3 p-4 bg-white">
              <button 
                class="btn btn-primary btn-lg py-3 fw-medium"
                @click="chamarProxima"
                :disabled="!emAtendimento">
                Chamar Próxima Senha
              </button>
              <button 
                class="btn btn-success btn-lg py-3 fw-medium"
                @click="finalizarAtendimento"
                :disabled="!senhaAtual">
                Finalizar Atendimento
              </button>
              <button 
                class="btn btn-warning btn-lg py-3 fw-medium"
                @click="rechamarSenha"
                :disabled="!senhaAtual">
                Rechamar Senha Atual
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fila de Espera -->
      <div class="card">
        <div class="card-header bg-primary py-3">
          <h2 class="h4 mb-0 text-white text-center">Fila de Espera</h2>
        </div>
        <div class="card-body p-4 bg-white">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th class="fw-semibold fs-5 py-3">Senha</th>
                  <th class="fw-semibold fs-5 py-3">Tipo</th>
                  <th class="fw-semibold fs-5 py-3">Status</th>
                  <th class="fw-semibold fs-5 py-3">Guichê</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="senha in filaEspera" :key="senha.id" class="senha-row">
                  <td class="py-3">
                    <span class="senha-numero">{{ senha.numero }}</span>
                  </td>
                  <td class="py-3">
                    <span 
                      :class="['badge-tipo', senha.tipo === 'P' ? 'bg-success' : 'bg-primary']">
                      {{ senha.tipo === 'P' ? 'Preferencial' : 'Normal' }}
                    </span>
                  </td>
                  <td class="py-3">
                    <span class="badge-status">{{ senha.status }}</span>
                  </td>
                  <td class="py-3">
                    <span class="guiche-numero">{{ senha.guiche || '-' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Configurações -->
    <div class="modal fade" id="configModal" tabindex="-1" ref="configModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">Configurações do Guichê</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <!-- Número do Guichê -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Número do Guichê</label>
            <input 
              type="number" 
              class="form-control" 
              v-model="configuracoes.numeroGuiche"
              min="1"
            >
          </div>

          <!-- Tipos de Atendimento -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Tipos de Atendimento</label>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="configuracoes.tiposAtendimento.atendimentoOrcamento"
              >
              <label class="form-check-label">Atendimento/Orçamento</label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="configuracoes.tiposAtendimento.preferencial"
              >
              <label class="form-check-label">Preferencial</label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="configuracoes.tiposAtendimento.vacina"
              >
              <label class="form-check-label">Vacina</label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="configuracoes.tiposAtendimento.agendarExames"
              >
              <label class="form-check-label">Agendar Exames</label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="configuracoes.tiposAtendimento.retirarResultados"
              >
              <label class="form-check-label">Retirar Resultados</label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="configuracoes.tiposAtendimento.examesAgendados"
              >
              <label class="form-check-label">Exames Agendados</label>
            </div>
          </div>

          <!-- Notificações -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Notificações</label>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="configuracoes.notificacaoSonora"
              >
              <label class="form-check-label">Som ao chamar senha</label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="configuracoes.notificacaoVisual"
              >
              <label class="form-check-label">Notificação visual</label>
            </div>
          </div>

          <!-- Pausas Programadas -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Pausas Programadas</label>
            <div class="row g-2">
              <div class="col">
                <label class="form-label small">Início</label>
                <input 
                  type="time" 
                  class="form-control" 
                  v-model="configuracoes.pausaInicio"
                >
              </div>
              <div class="col">
                <label class="form-label small">Fim</label>
                <input 
                  type="time" 
                  class="form-control" 
                  v-model="configuracoes.pausaFim"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="salvarConfiguracoes">
            Salvar Configurações
          </button>
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
import { StatusSenha, TipoSenha, type QueueTicket } from '@/types/queue'

// Estados principais
const guicheAtual = ref(1)
const emAtendimento = ref(false)
const senhaAtual = ref<QueueTicket | null>(null)
const filaEspera = ref<QueueTicket[]>([])
const isLoading = ref(false); // Variável de carregamento
   

// Modal e configurações
const configModal = ref<HTMLElement | null>(null)
let modalInstance: Modal | null = null

// Interface para tipos de atendimento
interface TiposAtendimento {
  atendimentoOrcamento: boolean;
  preferencial: boolean;
  vacina: boolean;
  agendarExames: boolean;
  retirarResultados: boolean;
  examesAgendados: boolean;
}

// Interface para configurações
interface Configuracoes {
  numeroGuiche: number;
  tiposAtendimento: TiposAtendimento;
  notificacaoSonora: boolean;
  notificacaoVisual: boolean;
  pausaInicio: string;
  pausaFim: string;
}

// Estado das configurações
const configuracoes = ref<Configuracoes>({
  numeroGuiche: 1,
  tiposAtendimento: {
    atendimentoOrcamento: true,
    preferencial: true,
    vacina: true,
    agendarExames: true,
    retirarResultados: true,
    examesAgendados: true
  },
  notificacaoSonora: true,
  notificacaoVisual: true,
  pausaInicio: '',
  pausaFim: ''
})


const carregarFila = async (): Promise<void> => {
  try {
    const painel = await queueService.obterPainel();
    console.log(painel);
    filaEspera.value = painel.waitingTickets;
  } catch (error) {
    console.error('Erro ao carregar a fila:', error);
  }
};

const fila = ref<QueueTicket[]>([]);

onMounted(() => {
  carregarFila();
});

const toggleAtendimento = () => {
  emAtendimento.value = !emAtendimento.value
}

const finalizarAtendimento = async () => {
  try {
    if (senhaAtual.value) {
      senhaAtual.value.status = 'FINALIZADO'
    }
    senhaAtual.value = null
  } catch (error) {
    console.error('Erro ao finalizar atendimento:', error)
  }
}

const rechamarSenha = async () => {
  try {
    if (senhaAtual.value) {
      senhaAtual.value.status = 'CHAMANDO'
    }
  } catch (error) {
    console.error('Erro ao rechamar senha:', error)
  }
}

const abrirConfigGuiche = () => {
  if (modalInstance) {
    modalInstance.show()
  }
}

const salvarConfiguracoes = async () => {
  try {
    guicheAtual.value = configuracoes.value.numeroGuiche
    
    if (modalInstance) {
      modalInstance.hide()
    }
  } catch (error) {
    console.error('Erro ao salvar configurações:', error)
  }
}

const chamarProxima = async () => {
  try {
    isLoading.value = true;

    // Chamar a API para obter a próxima senha
    const resposta = await queueService.chamarProximo(guicheAtual.value);
    console.error('Erro ao chamar próxima senha:', resposta);
    if (resposta) {
      // Atualizar o estado da senha atual com os dados retornados da API
      senhaAtual.value = {
        ...resposta,
        status: 'EM_ATENDIMENTO', // Atualiza o status da senha
        guiche: guicheAtual.value, // Adiciona o número do guichê
      };
    } else {
      console.warn('Nenhuma senha na fila');
    }
  } catch (error) {
    console.error('Erro ao chamar próxima senha:', error);
  } finally {
    // Desativar estado de carregamento
    isLoading.value = false;
  }
};


// Lifecycle hooks
onMounted(() => {
 carregarFila
  
  if (configModal.value) {
    modalInstance = new Modal(configModal.value)
  }
})
</script>

<style scoped>
.counter-container {
  background-color: #f8f9fa;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-header {
  border-bottom: none;
}

.table {
  color: #212529;
}

.senha-row {
  transition: all 0.2s ease-in-out;
}

.senha-row:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.senha-numero {
  font-size: 1.2rem;
  font-weight: 600;
  color: #212529;
}

.badge-tipo {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  min-width: 100px;
}

.badge-status {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: #e9ecef;
  color: #495057;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.guiche-numero {
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
}

.btn-lg {
  font-size: 1.1rem;
  padding: 1rem;
}

.btn:disabled {
  opacity: 0.65;
}

.senha-destaque {
  color: #212529;
}

.senha-row, .badge-tipo, .badge-status {
  transition: all 0.2s ease-in-out;
}

@media (max-width: 768px) {
  .card-body {
    padding: 1rem;
  }
  
  .senha-numero {
    font-size: 1rem;
  }
  
  .badge-tipo {
    min-width: 80px;
    padding: 0.4rem 0.8rem;
  }

  .display-1 {
    font-size: 4rem;
  }
}

/* Novos estilos para melhor ocupação do espaço */
.counter-container {
  background-color: #f8f9fa;
  padding-bottom: 2rem;
}

.super-display {
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Ajustes responsivos para telas grandes */
@media (min-width: 1400px) {
  .super-display {
    font-size: 10rem;
  }
  
  .card-body {
    padding: 2rem;
  }
  
  .btn-lg {
    padding: 1.2rem;
    font-size: 1.25rem;
  }
}

/* Ajustes para telas médias */
@media (min-width: 992px) and (max-width: 1399px) {
  .super-display {
    font-size: 7rem;
  }
}

/* Ajustes para telas pequenas */
@media (max-width: 991px) {
  .super-display {
    font-size: 5rem;
  }
  
  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .card-body {
    padding: 1rem;
  }
}
.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
}

.form-label {
  color: #495057;
}

.form-check {
  margin-bottom: 0.5rem;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-check {
  margin-bottom: 0.75rem;
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.form-check-label {
  color: #495057;
  font-size: 0.95rem;
}
</style>