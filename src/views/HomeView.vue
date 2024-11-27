<template>
  <div class="home-container bg-light min-vh-100">
    <!-- Header -->
    <div class="bg-primary px-5 py-3 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <h1 class="h2 mb-0 text-white">Sistema de Gerenciamento de Senhas</h1>
        <span class="text-white">{{ currentDateTime }}</span>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="container-fluid px-5">
      <!-- Cards de Acesso Rápido -->
      <div class="row g-4 mb-4">
        <div v-for="card in quickAccessCards" :key="card.route" class="col-md-3">
          <router-link :to="card.route" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i :class="[card.icon, card.iconColor, 'fs-1 mb-3']"></i>
                <h3 class="h5 mb-2">{{ card.title }}</h3>
                <p class="text-muted mb-0">{{ card.description }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Estatísticas -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white border-0 py-3">
          <h2 class="h5 mb-0">Estatísticas do Dia</h2>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <div v-for="stat in statistics" :key="stat.label" class="col-md-3">
              <div class="text-center">
                <h3 class="h2 mb-2">{{ stat.value }}</h3>
                <p class="text-muted mb-0">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Últimas Senhas -->
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-0 py-3">
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
                    <span :class="['badge', getTipoBadgeClass(senha.tipo)]">
                      {{ getTipoDisplay(senha.tipo) }}
                    </span>
                  </td>
                  <td>Guichê {{ senha.guiche }}</td>
                  <td>{{ formatDateTime(senha.horario) }}</td>
                  <td>
                    <span :class="['badge', getStatusBadgeClass(senha.status)]">
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TipoSenha, StatusSenha, type QueueTicket } from '@/types/queue'

interface QuickAccessCard {
  title: string
  description: string
  icon: string
  iconColor: string
  route: string
}

interface Statistic {
  label: string
  value: string | number
}

const currentDateTime = ref('')

const quickAccessCards: QuickAccessCard[] = [
  {
    title: 'Emitir Senhas',
    description: 'Terminal de autoatendimento',
    icon: 'bi bi-printer',
    iconColor: 'text-primary',
    route: '/totem'
  },
  {
    title: 'Guichê',
    description: 'Atendimento de senhas',
    icon: 'bi bi-person-workspace',
    iconColor: 'text-success',
    route: '/counter'
  },
  {
    title: 'Painel',
    description: 'Visualização de senhas',
    icon: 'bi bi-display',
    iconColor: 'text-info',
    route: '/display'
  },
  {
    title: 'Relatórios',
    description: 'Estatísticas e análises',
    icon: 'bi bi-graph-up',
    iconColor: 'text-warning',
    route: '/reports'
  }
]

const statistics: Statistic[] = [
  { label: 'Total de Senhas', value: 150 },
  { label: 'Senhas Atendidas', value: 98 },
  { label: 'Tempo Médio', value: '12min' },
  { label: 'Guichês Ativos', value: '5/8' }
]

const ultimasSenhas = ref<QueueTicket[]>([
  { 
    id: 1,
    numero: 'AO123',
    tipo: TipoSenha.ATENDIMENTO_ORCAMENTO,
    status: StatusSenha.FINALIZADO,
    guiche: 1,
    horario: new Date(),
    dataCriacao: new Date()
  },
  {
    id: 2,
    numero: 'P052',
    tipo: TipoSenha.PREFERENCIAL,
    status: StatusSenha.EM_ATENDIMENTO,
    guiche: 2,
    horario: new Date(),
    dataCriacao: new Date()
  }
])
const formatDateTime = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const updateDateTime = () => {
  currentDateTime.value = formatDateTime(new Date())
}

const getTipoBadgeClass = (tipo: TipoSenha): string => {
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

const getTipoDisplay = (tipo: TipoSenha): string => {
  const displayMap: Record<TipoSenha, string> = {
    [TipoSenha.ATENDIMENTO_ORCAMENTO]: 'Atendimento/Orçamento',
    [TipoSenha.PREFERENCIAL]: 'Preferencial',
    [TipoSenha.VACINA]: 'Vacina',
    [TipoSenha.AGENDAR_EXAMES]: 'Agendar Exames',
    [TipoSenha.RETIRAR_RESULTADOS]: 'Retirar Resultados',
    [TipoSenha.EXAMES_AGENDADOS]: 'Exames Agendados'
  }
  return displayMap[tipo]
}

const getStatusBadgeClass = (status: StatusSenha): string => {
  const classMap: Record<StatusSenha, string> = {
    [StatusSenha.AGUARDANDO]: 'bg-secondary',
    [StatusSenha.CHAMANDO]: 'bg-warning',
    [StatusSenha.EM_ATENDIMENTO]: 'bg-info',
    [StatusSenha.FINALIZADO]: 'bg-success'
  }
  return classMap[status]
}

onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
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

.badge {
  padding: 0.5rem 0.75rem;
  font-weight: 500;
}

.table > :not(caption) > * > * {
  padding: 1rem 0.75rem;
}

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