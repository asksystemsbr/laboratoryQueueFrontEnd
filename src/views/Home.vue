<template>
  <div class="home-container bg-light min-vh-100">
    <!-- Header -->
    <div class="bg-primary px-5 py-3 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <h1 class="h3 mb-0 text-white">Sistema de Gerenciamento de Senhas</h1>
        <div class="d-flex gap-3">
          <span class="text-white">
            <i class="bi bi-clock"></i> {{ currentDateTime }}
          </span>
        </div>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="container-fluid px-5">
      <!-- Cards de Acesso Rápido -->
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <router-link to="/totem" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-printer fs-1 text-primary mb-3"></i>
                <h3 class="h5 mb-3">Emitir Senhas</h3>
                <p class="text-muted mb-0">Terminal de autoatendimento para emissão de senhas</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-md-3">
          <router-link to="/counter" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-person-workspace fs-1 text-success mb-3"></i>
                <h3 class="h5 mb-3">Guichê de Atendimento</h3>
                <p class="text-muted mb-0">Interface para atendentes chamarem as senhas</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-md-3">
          <router-link to="/display" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-display fs-1 text-info mb-3"></i>
                <h3 class="h5 mb-3">Painel de Senhas</h3>
                <p class="text-muted mb-0">Visualização das senhas chamadas</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-md-3">
          <router-link to="/reports" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-graph-up fs-1 text-warning mb-3"></i>
                <h3 class="h5 mb-3">Relatórios</h3>
                <p class="text-muted mb-0">Estatísticas e relatórios de atendimento</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Estatísticas do Dia -->
      <div class="row g-4 mb-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom py-3">
              <h2 class="h5 mb-0">Estatísticas do Dia</h2>
            </div>
            <div class="card-body">
              <div class="row g-4">
                <div class="col-md-3">
                  <div class="text-center">
                    <h3 class="h2 mb-2">{{ stats.totalSenhas }}</h3>
                    <p class="text-muted mb-0">Total de Senhas</p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="text-center">
                    <h3 class="h2 mb-2">{{ stats.senhasAtendidas }}</h3>
                    <p class="text-muted mb-0">Senhas Atendidas</p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="text-center">
                    <h3 class="h2 mb-2">{{ stats.tempoMedioAtendimento }}</h3>
                    <p class="text-muted mb-0">Tempo Médio</p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="text-center">
                    <h3 class="h2 mb-2">{{ stats.guichesAtivos }}/{{ stats.totalGuiches }}</h3>
                    <p class="text-muted mb-0">Guichês Ativos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Últimas Senhas -->
      <div class="row">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom py-3">
              <h2 class="h5 mb-0">Últimas Senhas Chamadas</h2>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Senha</th>
                      <th>Tipo</th>
                      <th>Guichê</th>
                      <th>Horário</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="senha in ultimasSenhas" :key="senha.id">
                      <td>{{ senha.numero }}</td>
                      <td>
                        <span :class="['badge', senha.tipo === 'P' ? 'bg-success' : 'bg-primary']">
                          {{ senha.tipo === 'P' ? 'Preferencial' : 'Normal' }}
                        </span>
                      </td>
                      <td>Guichê {{ senha.guiche }}</td>
                      <td>{{ formatTime(senha.horario) }}</td>
                      <td>
                        <span :class="['badge', getStatusClass(senha.status)]">
                          {{ senha.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

// Estado
const currentDateTime = ref('')
const stats = ref({
  totalSenhas: 0,
  senhasAtendidas: 0,
  tempoMedioAtendimento: '0min',
  guichesAtivos: 0,
  totalGuiches: 0
})

const ultimasSenhas = ref([
  {
    id: 1,
    numero: 'A123',
    tipo: 'N',
    guiche: 1,
    horario: new Date(),
    status: 'FINALIZADO'
  },
  {
    id: 2,
    numero: 'P052',
    tipo: 'P',
    guiche: 2,
    horario: new Date(),
    status: 'EM_ATENDIMENTO'
  }
])

// Métodos
const updateDateTime = () => {
  currentDateTime.value = format(new Date(), "dd 'de' MMMM', ' HH:mm:ss", { locale: ptBR })
}

const formatTime = (date: Date) => {
  return format(date, 'HH:mm:ss')
}

const getStatusClass = (status: string) => {
  const statusMap: { [key: string]: string } = {
    'AGUARDANDO': 'bg-secondary',
    'CHAMANDO': 'bg-warning',
    'EM_ATENDIMENTO': 'bg-info',
    'FINALIZADO': 'bg-success'
  }
  return statusMap[status] || 'bg-secondary'
}

const loadStats = async () => {
  // Mock de dados - substituir por chamada à API
  stats.value = {
    totalSenhas: 150,
    senhasAtendidas: 98,
    tempoMedioAtendimento: '12min',
    guichesAtivos: 5,
    totalGuiches: 8
  }
}

// Lifecycle hooks
onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
  loadStats()
})
</script>

<style scoped>
.home-container {
  background-color: #f8f9fa;
}

.hover-card {
  transition: transform 0.2s ease-in-out;
}

.hover-card:hover {
  transform: translateY(-5px);
}

.card {
  overflow: hidden;
}

.bi {
  line-height: 1;
}

.table > :not(caption) > * > * {
  padding: 1rem 0.75rem;
}

.badge {
  padding: 0.5rem 0.75rem;
  font-weight: 500;
}

/* Responsividade */
@media (max-width: 768px) {
  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .card-body {
    padding: 1rem;
  }
}
</style>